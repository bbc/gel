/**
 * Accordion
 * @namespace gel
 * @method gel.Accordion.init 
 */

(function () {
  if (!window.gel) { window.gel = {}; }
  var self = gel.Accordion = {};

  self.init = function () { }

  self.constructor = function (elem) {
    this.sections = [];
    for (i = 0; i < elem.children.length; i++) {
      var section = {};
      // Save the section element
      section.elem = elem.children[i];

      // Make the first element in the section the 'handle'
      section.handle = section.elem.firstElementChild;
      section.handle.classList.add('gel-accordion__handle');

      if (section.handle.nodeName === 'BUTTON') {
        console.error('The first child of each accordion element must not be a <button>');
        return;
      }

      // Create the handle's button
      var button = document.createElement('button');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('type', 'button');
      button.innerHTML = '<span>' + section.handle.innerHTML + '</span>';
      button.innerHTML += '<svg viewBox="0 0 32 32" class="gel-icon gel-icon--text"><path d="M16 29L32 3h-7.2L16 18.3 7.2 3H0"></path></svg>';

      section.handle.innerHTML = '';
      section.handle.appendChild(button);
      section.button = button;

      // Make the contents everything in the section
      // except the handle
      var contents = Array.prototype.slice.call(section.elem.children, 1);
      // Create the drawer into which to place the contents
      section.drawer = document.createElement('div');
      section.drawer.classList.add('gel-accordion__drawer');
      section.drawer.hidden = true;
      // Place the contents in the draw
      contents.forEach(function (node) {
        section.drawer.appendChild(node);
      });
      section.elem.appendChild(section.drawer);

      // Save a reference to the section
      this.sections.push(section);
    }

    // If the URL contains a hash corresponding to a section
    // or child of a section, open the section
    // and focus the fragment
    this.hashHandle = function () {
      var id = window.location.hash.substring(1);
      var target = document.getElementById(id);
      this.sections.forEach(function (section) {
        if (section.elem.contains(target)) {
          this.open(section);
          target.tabIndex = -1;
          target.focus();
        }
      }.bind(this));
    }

    // Handle the hash behaviour
    document.addEventListener('DOMContentLoaded', this.hashHandle());
    window.addEventListener('hashchange', function () {
      this.hashHandle();
    }.bind(this));

    // Listen to clicks on the handle buttons to 
    // toggle the section state between collapsed and expanded
    this.sections.forEach(function (section) {
      section.button.addEventListener('click', function () {
        var expanded = !section.drawer.hidden;
        if (expanded) {
          this.close(section);
        } else {
          this.open(section);
        }
      }.bind(this));
    }.bind(this));
  }

  // The open method
  self.constructor.prototype.open = function (section) {
    section.button.setAttribute('aria-expanded', 'true');
    section.drawer.hidden = false;
  }

  // The close method
  self.constructor.prototype.close = function (section) {
    section.button.setAttribute('aria-expanded', 'false');
    section.drawer.hidden = true;
  }

  // The openAll method
  self.constructor.prototype.openAll = function () {
    this.sections.forEach(function (section) {
      this.open(section);
    }.bind(this));
  }

  // The closeAll method
  self.constructor.prototype.closeAll = function () {
    this.sections.forEach(function (section) {
      this.close(section);
    }.bind(this));
  }
})();