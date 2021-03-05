/**
 * Card
 * @namespace gel
 */

(function () {
  if (!window.gel) { window.gel = {}; }
  var self = gel.Card = {};

  self.init = function () {
  }

  self.constructor = function (cardElem) {
    var moreBtn = cardElem.querySelector('[aria-expanded="false"]');
    var moreElem = cardElem.querySelector('.gel-card__info');
    var moreHeading = moreElem.querySelector('.gel-card-info__heading');

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