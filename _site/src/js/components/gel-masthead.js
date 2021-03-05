/**
 * Masthead
 * @namespace gel
 * @method gel.Masthead.init
 */

(function () {
  if (!window.gel) { window.gel = {}; }
  var self = gel.Masthead = {};

  self.init = function () {
  }

  self.constructor = function (elem) {
    // Add JS class for upgrading styles
    elem.classList.add('gel-masthead--with-js');

    // Save an object of all submenus
    var links = elem.querySelector('.gel-masthead__links');
    var menus = [
      {
        link: elem.querySelector('.gel-masthead__alerts-option a'),
        target: elem.querySelector('.gel-masthead__alerts')
      },
      {
        link: elem.querySelector('.gel-masthead__more-option a'),
        target: elem.querySelector('.gel-masthead__more-menu')
      }
    ];

    // Set up each menu's expand/collapse functionality
    menus.forEach(function (menu) {
      menu.first = menu.target.querySelector('a[href], button:not([disabled]), input');
      if (!menu.first) {
        menu.first = menu.target.querySelector('h2, h3, h4');
        menu.first.tabIndex = -1;
      }

      // Enhance each link into a button
      // to reflect button-like expand/collapse behaviour
      menu.link.setAttribute('role', 'button');
      menu.link.setAttribute('aria-haspopup', 'true');
      menu.link.setAttribute('aria-expanded', 'false');

      menu.link.addEventListener('click', function (e) {
        e.preventDefault();
        // Toggle expanded state
        var expanded = menu.link.getAttribute('aria-expanded') === 'true' || false;
        menu.link.setAttribute('aria-expanded', !expanded);
        menus.forEach(function (otherMenu) {
          // Close other menus and cancel expanded state
          if (otherMenu !== menu) {
            otherMenu.target.style.display = 'none';
            otherMenu.link.setAttribute('aria-expanded', 'false');
          }
        });

        var open = menu.target.style.display === 'block' || false;
        menu.target.style.display = open ? 'none' : 'block';
        if (!open) {
          // Move focus to the expanded menu
          menu.first.focus();
        }
      });

      // Ensure the link behaves link a <button>
      // By activating click events on SPACE
      menu.link.addEventListener('keydown', function (e) {
        if (e.keyCode === 32) {
          e.preventDefault();
          menu.link.click();
        }
      });

      // Set up the close button, to hide the menu
      // and switch expanded/collapsed state on click
      var closeButton = document.createElement('button');
      closeButton.innerHTML = '<span class="gel-sr">Close</span><svg class="gel-icon gel-icon--text" aria-hidden="true" focusable="false" viewBox="0 0 32 32"> <path d="M32 3.5L28.5 0 16 12.5 3.5 0 0 3.5 12.5 16 0 28.5 3.5 32 16 19.5 28.5 32l3.5-3.5L19.5 16"/> </svg>';
      closeButton.classList.add('gel-masthead__close-button');
      closeButton.addEventListener('click', function () {
        menu.target.style.display = 'none';
        menu.link.setAttribute('aria-expanded', 'false');
        menu.link.focus();
      });
      menu.target.appendChild(closeButton);
    });

    // Watch the visibility of masthead link items to add
    // or drop from the UI
    if ('IntersectionObserver' in window) {
      links.classList.add('gel-masthead__links-observed');
      var items = links.querySelectorAll('li');
      var observerSettings = {
        root: links,
        threshold: 0.98
      }

      var callback = function (items, observer) {
        Array.prototype.forEach.call(items, function (item) {
          // Change visibility and availability
          // of menu items depending on whether they
          // are intersecting
          if (item.intersectionRatio > 0.98) {
            item.target.classList.remove('gel-masthead__link-hidden');
          } else {
            item.target.classList.add('gel-masthead__link-hidden');
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