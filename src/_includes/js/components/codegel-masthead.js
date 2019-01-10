/**
 * Masthead
 * @namespace codegel
 * @method codegel.Masthead.init
 */

(function () {
  if (!window.codegel) { window.codegel = {}; }
  var self = codegel.Masthead = {};

  self.init = function () {
  }

  self.constructor = function (elem) {
    elem.classList.add('codegel-masthead-with-js');

    var links = elem.querySelector('.codegel-masthead-links');
    var menus = [
      {
        button: elem.querySelector('.codegel-masthead-alerts-option button'),
        target: elem.querySelector('.codegel-masthead-alerts')
      },
      {
        button: elem.querySelector('.codegel-masthead-more-option button'),
        target: elem.querySelector('.codegel-masthead-more-menu')
      },
      {
        button: elem.querySelector('.codegel-masthead-search-option button'),
        target: elem.querySelector('.codegel-masthead-search')
      }
    ];

    menus.forEach(function (menu) {
      menu.first = menu.target.querySelector('a[href], button:not([disabled]), input');
      if (!menu.first) {
        menu.first = menu.target;
        menu.target.tabIndex = -1;
      }
      menu.button.addEventListener('click', function () {
        menus.forEach(function (otherMenu) {
          if (otherMenu !== menu) {
            otherMenu.target.style.display = 'none';
            otherMenu.button.setAttribute('aria-expanded', 'false');
          }
        });

        var open = menu.button.getAttribute('aria-expanded') === 'true' || false;
        menu.button.setAttribute('aria-expanded', !open);
        menu.target.style.display = open ? 'none' : 'block';
        if (!open) menu.first.focus();
      });

      menu.button.addEventListener('keydown', function (e) {
        if (!e.shiftKey && e.keyCode == 9) {
          if (menu.target.style.display === 'block') {
            e.preventDefault();
            menu.first.focus();
          }
        }
      });

      menu.first.addEventListener('keydown', function (e) {
        if (e.shiftKey && e.keyCode == 9) {
          e.preventDefault();
          menu.button.focus();
        }
      });

      menu.target.addEventListener('keydown', function (e) {
        if (e.keyCode == 27) {
          menu.button.setAttribute('aria-expanded', 'false');
          menu.button.focus();
          menu.target.style.display = 'none';
        }
      });
    });

    // Watch the visibility of masthead link items to add
    // or drop from the UI
    if ('IntersectionObserver' in window) {
      links.classList.add('codegel-masthead-links-observed');
      var items = links.querySelectorAll('li');
      var observerSettings = {
        root: links,
        threshold: 1
      }

      var callback = function (items, observer) {
        Array.prototype.forEach.call(items, function (item) {
          if (item.isIntersecting) {
            item.target.classList.remove('codegel-masthead-link-hidden');
          } else {
            item.target.classList.add('codegel-masthead-link-hidden');
          }
        });
      }

      var observer = new IntersectionObserver(callback, observerSettings);
      Array.prototype.forEach.call(items, function (item) {
        observer.observe(item);
      });
    }
  }
})();