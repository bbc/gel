/**
 * Promo
 * @namespace gelui
 * @method gelui.Promo.init
 */

(function() {
 var g = window.gelui || {};
 var self = g.Promo = {};
 
 self.init = function() {
    console.log('Promo: init()');
 }

 if (!window.gelui) { window.gelui = g; }
})();