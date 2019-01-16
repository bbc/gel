/**
 * Load more
 * @namespace codegel
 * @method codegel.LoadMore.init
 */

(function () {
  if (!window.codegel) { window.codegel = {}; }
  var self = codegel.LoadMore = {};

  self.init = function () { }

  self.constructor = function (elem, amount, start, baseURL) {
    this.elem = elem;
    // Save refs to key elements
    this.loadBay = this.elem.querySelector('.codegel-loader-items');
    this.pages = this.elem.querySelector('.codegel-pages');
    this.paginator = this.elem.querySelector('.codegel-pages');
    this.button = this.elem.querySelector('.codegel-loader-button');
    this.loading = this.elem.querySelector('.codegel-loader-loading');
    this.loadingText = this.loading.querySelector('.codegel-loader-loading-text');

    // Only run if Promises are supported
    if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
      // Reveal load more button
      this.button.hidden = false;
      // Hide fallback paginator
      this.paginator.hidden = true;

      this.amount = amount;
      this.start = start;

      this.loadItems = function (amount, start) {
        // Make array of URLs to request using the base URL
        var urls = [];
        for (i = this.start; i < this.start + this.amount; i++) {
          urls.push(baseURL + i);
        }

        // Factory to create the separator element that marks
        // the start of the new results and takes focus
        var createSeparator = function (message) {
          var sep = document.createElement('li');
          sep.setAttribute('role', 'separator');
          sep.tabIndex = 0;
          sep.textContent = message;
          return sep;
        }

        // Factory to create elements to wrap request data
        var createItem = function (item) {
          var itemElem = document.createElement('li');
          itemElem.classList.add('codegel-loader-item');
          itemElem.innerHTML = '<p>' + item.title + '</p>';
          itemElem.innerHTML += '<a class="codegel-cta" href="/path/to/1">Read more about result ' + item.id + '</a>';
          return itemElem;
        }

        // Enter loading state by appending to
        // live region
        this.loading.hidden = false;
        this.loadingText.textContent = 'Loading, please wait.';

        var results = [];

        Promise.all(urls.map(url => fetch(url)
          .then(resp => resp.json())))
          .then(items => {
            items.forEach(function (item) {
              results.push(createItem(item));
            });
            var sep = createSeparator('Results ' + items[0].id + ' to ' + items[items.length - 1].id);
            results.unshift(sep);
            results.forEach(function (result) {
              this.loadBay.appendChild(result);
            }.bind(this));
            // Focus the 'continue' element above the
            // new results
            sep.focus();
            // Exit loading state
            this.loading.hidden = true;
            this.loadingText.textContent = '';
            // Increment this.start for next run
            this.start = this.start + this.amount;
          });
      }

      // Listen on the 'load more' button
      this.button.addEventListener('click', function () {
        this.load();
      }.bind(this));
    }
  }

  // The load method
  self.constructor.prototype.load = function () {
    this.loadItems(this.start, this.amount);
  }
})();