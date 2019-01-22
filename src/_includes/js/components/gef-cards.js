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
    var moreBtn = cardElem.querySelector('[aria-haspopup="true"]');
    var moreElem = cardElem.querySelector('.gef-card-info');
    var moreHeading = moreElem.querySelector('.gef-card-info-heading');

    moreBtn.addEventListener('click', function () {
      moreElem.hidden = !moreElem.hidden;
      if (!moreElem.hidden) {
        moreHeading.focus();
        moreBtn.textContent = 'Close';
      } else {
        moreBtn.textContent = 'More info';
      }
    });

    moreElem.addEventListener('keydown', function (e) {
      if (e.which === 27) {
        moreElem.hidden = true;
        moreBtn.textContent = 'More info';
        moreBtn.focus();
      }
    });
  }
})();