/**
 * Promo
 * @namespace codegel
 * @method codegel.Promo.init - Adds click behaviour to the image element in codegel-promo components.
 */

(function() {
  if (!window.codegel) { window.codegel = {}; }
  var self = codegel.Promo = {};
  
  self.init = function() {
    var promos = document.querySelectorAll('.codegel-promo');
    
    Array.prototype.forEach.call(promos, function (promo) {
      var img = promo.querySelector('.codegel-promo-image');
      var link = promo.querySelector('.codegel-promo-headline a');

      if (img && link) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
          link.click();
        });
      }
    });
  }

})();