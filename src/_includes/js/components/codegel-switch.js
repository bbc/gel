/**
 * Switch
 * @namespace codegel
 * @method codegel.Switch.init
 */

(function () {
  var g = window.codegel || {};
  var self = g.Switch = {};

  self.init = function () {
  }

  self.constructor = function (button) {
    this.button = button;
    this.onOffSpan = this.button.querySelector('[aria-hidden]');
    this.button.addEventListener('click', this.toggle.bind(this));
    let currentState = this.button.getAttribute('aria-pressed') === 'true';
    this.button.setAttribute('aria-pressed', currentState);
    this.onOffSpan.textContent = currentState ? 'on' : 'off';
  }

  // The toggle method
  self.constructor.prototype.toggle = function () {
    let currentState = this.button.getAttribute('aria-pressed') === 'true';
    this.button.setAttribute('aria-pressed', !currentState);
    this.onOffSpan.textContent = currentState ? 'off' : 'on';
  }

  if (!window.codegel) { window.codegel = g; }
})();