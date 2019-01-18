/**
 * Card
 * @namespace codegel
 * @method codegel.Card.init - Adds click behaviour to the image element in codegel-promo components.
 */

(function () {
  if (!window.codegel) { window.codegel = {}; }
  var self = codegel.Card = {};

  self.init = function () {
  }

  self.constructor = function (cardElem) {
    var moreBtn = cardElem.querySelector('[aria-haspopup="true"]');
    var moreElem = cardElem.querySelector('.codegel-card-info');
    var moreHeading = moreElem.querySelector('.codegel-card-info-heading');

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