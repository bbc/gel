/**
 * Card
 * @namespace gef
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Card = {};

  self.init = function () {
  }

  self.constructor = function (cardElem) {
    var moreBtn = cardElem.querySelector('[aria-expanded="false"]');
    var moreElem = cardElem.querySelector('.gef-card-info');
    var moreHeading = moreElem.querySelector('.gef-card-info-heading');

    moreBtn.addEventListener('click', function () {
      moreElem.hidden = !moreElem.hidden;
      moreBtn.setAttribute('aria-expanded', !moreElem.hidden);
    });

    moreElem.addEventListener('keydown', function (e) {
      if (e.which === 27) {
        moreElem.hidden = true;
        moreBtn.setAttribute('aria-expanded', 'false');
        moreBtn.focus();
      }
    });
  }
})();