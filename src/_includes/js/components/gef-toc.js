/**
 * Masthead
 * @namespace gef
 * @method gef.TableOfContents.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.TableOfContents = {};

  self.init = function () {
  }

  self.constructor = function (elem) {
    elem.classList.add('gef-toc-with-js');
    this.moreButtons = elem.querySelectorAll('.gef-toc-more-button');
    this.menuButton = elem.querySelector('.gef-toc-menu-button button');
    this.menu = elem.querySelector('.gef-toc-list');

    Array.prototype.forEach.call(this.moreButtons, function (btn) {
      btn.addEventListener('click', function () {
        this.submenuToggle(btn);
      }.bind(this));
    }.bind(this));

    this.menuButton.addEventListener('click', function () {
      this.menuToggle();
    }.bind(this));
  }

  self.constructor.prototype.submenuToggle = function (btn) {
    Array.prototype.forEach.call(this.moreButtons, function (otherBtn) {
      if (otherBtn !== btn) {
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBtn.nextElementSibling.hidden = true;
      }
    });

    var currentState = btn.getAttribute('aria-expanded') === 'true' || false;
    var submenu = btn.nextElementSibling;
    btn.setAttribute('aria-expanded', !currentState);
    submenu.hidden = currentState;
  }

  self.constructor.prototype.menuToggle = function () {
    var currentState = this.menuButton.getAttribute('aria-expanded') === 'true' || false;
    this.menuButton.setAttribute('aria-expanded', !currentState);
    this.menu.classList.toggle('gef-toc-open', !currentState);
  }
})();