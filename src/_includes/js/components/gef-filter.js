/**
 * Filter
 * @namespace gef
 * @method gef.Filter.init 
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Filter = {};

  self.init = function () { }

  self.constructor = function (elem) {
    this.list = elem.querySelector('.gef-filter__list');
    this.popup = elem.querySelector('.gef-filter__popup');
    this.moreButton = elem.querySelector('.gef-filter__more');

    this.moreButton.addEventListener('click', function () {
      this.popup.hidden ? this.showPopup() : this.hidePopup();
    }.bind(this));

    if ('IntersectionObserver' in window) {
      this.list.classList.add('gef-filter__list-observed');
      var items = this.list.querySelectorAll('li');
      var observerSettings = {
        root: this.list,
        threshold: 0.98
      }

      var callback = function (items, observer) {
        Array.prototype.forEach.call(items, function (item) {
          if (item.intersectionRatio > 0.98) {
            item.target.classList.remove('gef-filter__item-more');
          } else {
            item.target.classList.add('gef-filter__item-more');
          }
          var moreElems = this.list.querySelectorAll('.gef-filter__item-more')
          var moreElemsArray = Array.prototype.slice.call(moreElems);
          if (moreElemsArray.length > 0) {
            this.moreButton.hidden = false;
            var moreElemStrings = moreElemsArray.map(function (i) {
              return i.outerHTML;
            });
            this.popup.innerHTML = '<ul>' + moreElemStrings.join('') + '</ul>';
          } else {
            this.moreButton.hidden = true;
            this.hidePopup();
            this.popup.innerHTML = '';
          }
        }.bind(this));
      }.bind(this);

      var observer = new IntersectionObserver(callback, observerSettings);
      Array.prototype.forEach.call(items, function (item) {
        observer.observe(item);
      });
    }
  }

  self.constructor.prototype.showPopup = function () {
    this.moreButton.setAttribute('aria-expanded', 'true');
    this.popup.hidden = false;
  }

  self.constructor.prototype.hidePopup = function () {
    this.moreButton.setAttribute('aria-expanded', 'false');
    this.popup.hidden = true;
  }
})();