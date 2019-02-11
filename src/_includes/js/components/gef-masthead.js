/**
 * Masthead
 * @namespace gef
 * @method gef.Masthead.init
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Masthead = {};

  self.init = function () {
  }

  self.constructor = function (elem) {
    // Add JS class for upgrading styles
    elem.classList.add('gef-masthead-with-js');

    // Save an object of all submenus
    var links = elem.querySelector('.gef-masthead-links');
    var menus = [
      {
        link: elem.querySelector('.gef-masthead-alerts-option a'),
        target: elem.querySelector('.gef-masthead-alerts')
      },
      {
        link: elem.querySelector('.gef-masthead-more-option a'),
        target: elem.querySelector('.gef-masthead-more-menu')
      }
    ];

    menus.forEach(function (menu) {
      menu.first = menu.target.querySelector('a[href], button:not([disabled]), input');
      if (!menu.first) {
        menu.first = menu.target.querySelector('h2, h3, h4');
        menu.first.tabIndex = -1;
      }
      menu.link.addEventListener('click', function (e) {
        e.preventDefault();
        menus.forEach(function (otherMenu) {
          if (otherMenu !== menu) {
            otherMenu.target.style.display = 'none';
          }
        });

        var open = menu.target.style.display === 'block' || false;
        menu.target.style.display = open ? 'none' : 'block';
        if (!open) {
          menu.first.focus();
        }
      });

      var closeButton = document.createElement('button');
      closeButton.innerHTML = '<span class="gef-sr">Close</span><svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false" viewBox="0 0 32 32"> <path d="M32 3.5L28.5 0 16 12.5 3.5 0 0 3.5 12.5 16 0 28.5 3.5 32 16 19.5 28.5 32l3.5-3.5L19.5 16"/> </svg>';
      closeButton.classList.add('gef-masthead-close-button');
      closeButton.addEventListener('click', function () {
        menu.target.style.display = 'none';
        menu.link.focus();
      });
      menu.target.appendChild(closeButton);
    });

    // Watch the visibility of masthead link items to add
    // or drop from the UI
    if ('IntersectionObserver' in window) {
      links.classList.add('gef-masthead-links-observed');
      var items = links.querySelectorAll('li');
      var observerSettings = {
        root: links,
        threshold: 0.98
      }

      var callback = function (items, observer) {
        Array.prototype.forEach.call(items, function (item) {
          if (item.intersectionRatio > 0.98) {
            item.target.classList.remove('gef-masthead-link-hidden');
          } else {
            item.target.classList.add('gef-masthead-link-hidden');
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