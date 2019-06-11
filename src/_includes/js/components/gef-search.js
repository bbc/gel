/**
 * Search
 * @namespace gef
 * @method gef.Search.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Search = {};

  self.init = function () { }

  self.constructor = function (elem, options) {
    var settings = {
      debounce: 500
    };

    // Overwrite defaults where they are provided in options
    for (var setting in options) {
      if (options.hasOwnProperty(setting)) {
        settings[setting] = options[setting];
      }
    }

    this.input = elem.querySelector('input');
    this.suggestions = elem.querySelector('.gef-search-suggestions');
    this.suggestionsLabel = this.suggestions.querySelector('.gef-search-suggestions-label');

    this.suggest = function (input) {
      if (input.value === '') {
        this.suggestions.hidden = true;
        return;
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