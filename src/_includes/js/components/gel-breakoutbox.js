/**
 * Promo
 * @namespace gelui
 * @method gelui.BreakoutBox.init
 */

(function() {
 var g = window.gelui || {};
 var self = g.BreakoutBox = {};

 self.init = function() {
    console.log('BreakoutBox: init()');
 }

 if (!window.gelui) { window.gelui = g; }
})();