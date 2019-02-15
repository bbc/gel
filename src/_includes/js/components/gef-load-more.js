/**
 * LoadMore
 * @namespace gef
 * @method gef.LoadMore.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.LoadMore = {};

  self.init = function () { }

  self.constructor = function (elem, /* number */amount, /* number */start, /* fn => Promise */dataProvider) {
    /*this.elem = elem;
    // Save refs to key elements
    this.loadBay = this.elem.querySelector('.gef-loader-items');
    this.pages = this.elem.querySelector('.gef-pages');
    this.paginator = this.elem.querySelector('.gef-pages');
    this.button = this.elem.querySelector('.gef-loader-button');
    this.loading = this.elem.querySelector('.gef-loader-loading');
    this.loadingText = this.loading.querySelector('.gef-loader-loading-text');

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
        var requestQueue = [];
        for (var i = this.start; i < this.start + this.amount; i++) {
          requestQueue.push(i);
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
          itemElem.classList.add('gef-loader-item');
          itemElem.innerHTML = '<p>' + item.title + '</p>';
          itemElem.innerHTML += '<a class="gef-cta" href="http://www.example.com/path/to/' + item.id + '">Read more about result ' + item.id + '</a>';
          return itemElem;
        }

        // Enter loading state by appending to
        // live region
        this.loading.hidden = false;
        this.loadingText.textContent = 'Loading, please wait.';

        var results = [];

        Promise.all(requestQueue.map(i => dataProvider(i)
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
    }*/
  }

  // The load method
  self.constructor.prototype.load = function () {
    this.loadItems(this.start, this.amount);
  }
})();