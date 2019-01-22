/**
 * Promo
 * @namespace gef
 * @method gef.Promo.init - Adds click behaviour to the image element in gef-promo components.
 */

(function() {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Promo = {};
  
  self.init = function() {
    var promos = document.querySelectorAll('.gef-promo');
    
    Array.prototype.forEach.call(promos, function (promo) {
      var img = promo.querySelector('.gef-promo-image');
      var link = promo.querySelector('.gef-promo-headline a');

      if (img && link) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
          link.click();
        });
      }
    });
  }

})();