/**
 * Site menu
 * @namespace gef
 * @method gef.SiteMenu.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.SiteMenu = {};

  self.init = function () { }

  self.constructor = function (elem) {
    elem.classList.add('gef-sitemenu--with-js');
    this.moreButtons = elem.querySelectorAll('.gef-sitemenu__more-button');
    this.menuButton = elem.querySelector('.gef-sitemenu__menu-button');
    this.menu = elem.querySelector('.gef-sitemenu__list');

    Array.prototype.forEach.call(this.moreButtons, function (btn) {
      var submenu = btn.nextElementSibling;
      submenu.hidden = true;
      if (submenu.querySelector('[aria-current]')) {
        this.submenuToggle(btn);
      }

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
    this.menu.classList.toggle('gef-sitemenu__open', !currentState);
  }
})();