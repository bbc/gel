/**
 * Search
 * @namespace gef
 * @method gef.Search.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Search = {};

  self.init = function () { }

  self.toggle = function (button, search) {
    search.hidden = true;
    button.hidden = false;

    var input = search.querySelector('input');
    var closeButton = search.querySelector('.gef-search-close');
    button.addEventListener('click', function () {
      search.hidden = false;
      input.focus();
    });

    closeButton.addEventListener('click', function () {
      search.hidden = true;
      button.focus();
    });
  }

  self.constructor = function (elem, data, buildFunction, options) {
    var settings = {
      debounce: 250
    };

    // Overwrite defaults where they are provided in options
    for (var setting in options) {
      if (options.hasOwnProperty(setting)) {
        settings[setting] = options[setting];
      }
    }

    this.data = data;
    this.input = elem.querySelector('input');
    this.suggestions = elem.querySelector('.gef-search-suggestions');
    this.suggestions.hidden = false;
    this.suggestionsLinks = this.suggestions.querySelector('.gef-search-suggestions-links');
    this.suggestionsLabel = this.suggestions.querySelector('.gef-search-suggestions-label');

    this.suggestions.style.height = '0';

    this.hideSuggestions = function () {
      var height = this.suggestions.scrollHeight;
      var elTransition = this.suggestions.style.transition;
      this.suggestions.style.transition = '';

      requestAnimationFrame(function () {
        this.suggestions.style.height = height + 'px';
        this.suggestions.style.transition = elTransition;

        requestAnimationFrame(function () {
          this.suggestions.style.height = 0 + 'px';
        }.bind(this));
      }.bind(this));

      this.suggestions.setAttribute('aria-hidden', 'true');
    }

    this.showSuggestions = function () {
      var height = this.suggestions.scrollHeight;

      this.suggestions.style.height = height + 'px';
    }

    this.suggest = function (input) {
      if (input.value === '') {
        this.suggestions.setAttribute('aria-hidden', 'true');
        this.hideSuggestions();
        return;
      } else {
        buildFunction(this);
        this.suggestions.setAttribute('aria-hidden', 'false');
        this.suggestionsLabel.innerHTML = 'We have <span class="search-suggestion-count">' + this.suggestionsLinks.querySelector('a').length + '</span> suggestions for you<span class="gef-sr">, please find them below</span>:'
        this.showSuggestions();
      }
    }

    var debounced;
    this.input.addEventListener('keyup', function (e) {
      var key = e.which || e.keyCode;
      // Don't run on the Tab and Shift keys
      if (key !== 9 && key !== 16) {
        window.clearTimeout(debounced);
        debounced = setTimeout(function () {
          this.suggest(this.input);
        }.bind(this), settings.debounce);
      }
    }.bind(this));
  }
})();