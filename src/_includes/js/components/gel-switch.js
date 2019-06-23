/**
 * Switch
 * @namespace gel
 * @method gel.Switch.init
 */

(function () {
  if (!window.gel) { window.gel = {}; }
  var self = gel.Switch = {};

  self.init = function () { }

  self.constructor = function (button) {
    this.button = button;
    // The 'on/off' text is provided in an aria-hidden <span>
    this.onOffSpan = this.button.querySelector('[aria-hidden]');

    // Set aria-pressed to false if the attribute is absent
    let currentState = this.button.getAttribute('aria-pressed') === 'true';
    this.button.setAttribute('aria-pressed', currentState);
    // Set the span's text to match the state
    this.onOffSpan.textContent = currentState ? 'on' : 'off';

    // Bind to the toggle method
    this.button.addEventListener('click', this.toggle.bind(this));
  }

  // The toggle method
  self.constructor.prototype.toggle = function () {
    let currentState = this.button.getAttribute('aria-pressed') === 'true';
    this.button.setAttribute('aria-pressed', !currentState);
    this.onOffSpan.textContent = currentState ? 'off' : 'on';
  }
})();