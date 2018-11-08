/**
 * Promo
 * @namespace gelui
 * @method gelui.Promo.init - Adds click behaviour to the image element in gel-promo components.
 */

(function() {
  var g = window.gelui || {};
  var self = g.Promo = {};
  
  self.init = function() {
    var promos = document.querySelectorAll('.gel-promo');
    
    Array.prototype.forEach.call(promos, function (promo) {
      var img = promo.querySelector('.gel-promo-image');
      var link = promo.querySelector('.gel-promo-headline a');

      if (img && link) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
          link.click();
        });
      }
    });
  }

  if (!window.gelui) { window.gelui = g; }
})();