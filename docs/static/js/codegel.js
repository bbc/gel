/**
 * Accordion
 * @namespace codegel
 * @method codegel.Accordion.init 
 */

(function () {
  if (!window.codegel) { window.codegel = {}; }
  var self = codegel.Accordion = {};

  self.init = function () { }

  self.constructor = function (elem) {
    this.sections = [];
    for (i = 0; i < elem.children.length; i++) {
      var section = {};
      section.elem = elem.children[i];

      section.handle = section.elem.firstElementChild;
      section.handle.classList.add('codegel-accordion-handle');

      if (section.handle.nodeName === 'BUTTON') {
        console.error('The first child of each accordion element must not be a <button>');
        return;
      }

      var button = document.createElement('button');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('type', 'button');
      button.innerHTML = '<span>' + section.handle.innerHTML + '</span>';
      button.innerHTML += '<svg viewBox="0 0 32 32" class="gel-icon gel-icon--text"><path d="M16 29L32 3h-7.2L16 18.3 7.2 3H0"></path></svg>';

      section.handle.innerHTML = null;
      section.handle.appendChild(button);
      section.button = button;

      var contents = Array.prototype.slice.call(section.elem.children, 1);
      section.drawer = document.createElement('div');
      section.drawer.classList.add('codegel-accordion-drawer');
      section.drawer.hidden = true;
      contents.forEach(function (node) {
        section.drawer.appendChild(node);
      });
      section.elem.appendChild(section.drawer);

      this.sections.push(section);
    }

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

    document.addEventListener('DOMContentLoaded', this.hashHandle());
    window.addEventListener('hashchange', function () {
      this.hashHandle();
    }.bind(this));

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
})();/**
 * Promo
 * @namespace codegel
 * @method codegel.ActionDialog.init - Adds click behaviour to the image element in codegel-promo components.
 */

(function () {
  if (!window.codegel) { window.codegel = {}; }
  var self = codegel.ActionDialog = {};

  self.init = function () {
    // Inert attribute polyfill
    "inert" in HTMLElement.prototype || (Object.defineProperty(HTMLElement.prototype, "inert", { enumerable: !0, get: function () { return this.hasAttribute("inert") }, set: function (h) { h ? this.setAttribute("inert", "") : this.removeAttribute("inert") } }), window.addEventListener("load", function () {
      function h(a) {
        var b = null; try { b = new KeyboardEvent("keydown", { keyCode: 9, which: 9, key: "Tab", code: "Tab", keyIdentifier: "U+0009", shiftKey: !!a, bubbles: !0 }) } catch (g) {
          try {
            b = document.createEvent("KeyboardEvent"), b.initKeyboardEvent("keydown",
              !0, !0, window, "Tab", 0, a ? "Shift" : "", !1, "en")
          } catch (d) { }
        } if (b) { try { Object.defineProperty(b, "keyCode", { value: 9 }) } catch (g) { } document.dispatchEvent(b) }
      } function k(a) { for (; a && a !== document.documentElement;) { if (a.hasAttribute("inert")) return a; a = a.parentElement } return null } function e(a) { var b = a.path; return b && b[0] || a.target } function l(a) { a.path[a.path.length - 1] !== window && (m(e(a)), a.preventDefault(), a.stopPropagation()) } function m(a) {
        var b = k(a); if (b) {
          if (document.hasFocus() && 0 !== f) {
            var g = (c || document).activeElement;
            h(0 > f ? !0 : !1); if (g != (c || document).activeElement) return; var d = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, { acceptNode: function (a) { return !a || !a.focus || 0 > a.tabIndex ? NodeFilter.FILTER_SKIP : b.contains(a) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT } }); d.currentNode = b; d = (-1 === Math.sign(f) ? d.previousNode : d.nextNode).bind(d); for (var e; e = d();)if (e.focus(), (c || document).activeElement !== g) return
          } a.blur()
        }
      } (function (a) {
        var b = document.createElement("style"); b.type = "text/css"; b.styleSheet ?
          b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a)); document.body.appendChild(b)
      })("/*[inert]*/* [inert]{ -webkit - user - select: none; -moz - user - select: none; -ms - user - select: none; user - select: none; pointer - events: none } "); var n = function (a) { return null }; window.ShadowRoot && (n = function (a) { for (; a && a !== document.documentElement;) { if (a instanceof window.ShadowRoot) return a; a = a.parentNode } return null }); var f = 0; document.addEventListener("keydown", function (a) { f = 9 === a.keyCode ? a.shiftKey ? -1 : 1 : 0 }); document.addEventListener("mousedown",
        function (a) { f = 0 }); var c = null; document.body.addEventListener("focus", function (a) { var b = e(a); a = b == a.target ? null : n(b); if (a != c) { if (c) { if (!(c instanceof window.ShadowRoot)) throw Error("not shadow root: " + c); c.removeEventListener("focusin", l, !0) } a && a.addEventListener("focusin", l, !0); c = a } m(b) }, !0); document.addEventListener("click", function (a) { var b = e(a); k(b) && (a.preventDefault(), a.stopPropagation()) }, !0)
    }));
  }

  self.constructor = function (dialogElem, invokerElem, center) {
    this.dialogElem = dialogElem;
    // Hide the dialog element to start with
    this.dialogElem.hidden = true;
    // Save the invoking element 
    // (this may not exist if the dialog is an interruption)
    this.invokerElem = invokerElem;
    // Save a collection of <body> children for making inert
    this.inertElems = document.querySelectorAll('body > *');
    // Save the first focusable link or button in the dialog
    // (to be focused on opening the dialog)
    this.firstControl = this.dialogElem.querySelector('a[href], button:not(:disabled)');
    this.closeButton = this.dialogElem.querySelector('.codegel-action-dialog-close');
    // Move the dialog element to be a child of <body>
    // (needed for the `inert` functionality to work)
    document.body.appendChild(this.dialogElem);

    // Honor the center positioning if chosen
    if (center) {
      this.dialogElem.classList.add('codegel-action-dialog-center');
    }

    // If the invoking element exists, 
    // listen to clicks for opening the dialog
    if (this.invokerElem) {
      this.invokerElem.addEventListener('click', function () {
        this.open();
      }.bind(this));
    }

    // If the close button exists,
    // listen to clicks for closing the dialog
    if (this.closeButton) {
      this.closeButton.addEventListener('click', function () {
        this.close();
      }.bind(this));
    }

    // Listen on the dialog element
    // to close the dialog on ESC
    this.dialogElem.addEventListener('keydown', function (e) {
      if (e.keyCode == 27) {
        this.close();
      }
    }.bind(this));
  }

  // The open method
  self.constructor.prototype.open = function () {
    // Add a class to the body for [inert] styling
    document.body.classList.add('codegel-action-dialog-open');
    // Make all siblings of the dialog inert
    Array.prototype.forEach.call(this.inertElems, function (elem) {
      if (elem !== this.dialogElem) {
        elem.setAttribute('inert', 'inert');
      }
    }.bind(this));
    // Show the dialog
    this.dialogElem.hidden = false;
    // Focus the first of the controls
    this.firstControl.focus();
  }

  // The close method
  self.constructor.prototype.close = function () {
    document.body.classList.remove('codegel-action-dialog-open');
    Array.prototype.forEach.call(this.inertElems, function (elem) {
      elem.removeAttribute('inert');
    }.bind(this));
    this.dialogElem.hidden = true;
    // Refocus the invoking element
    // if it exists
    if (this.invokerElem) {
      this.invokerElem.focus();
    }
  }

})();/**
 * BreakoutBox
 * @namespace codegel
 * @method codegel.BreakoutBox.init
 */

(function() {
  if (!window.codegel) { window.codegel = {}; }
  var self = codegel.BreakoutBox = {};

  self.init = function() {
    // nothing to initialise
  }

})();/**
 * Carousel
 * @namespace codegel
 * @method codegel.Carousel.init
 */

(function() {
  if (!window.codegel) { window.codegel = {}; }
  var self = codegel.Carousel = {};
  
  self.init = function() {
    /* inert attribute polyfill, from https://github.com/GoogleChrome/inert-polyfill */
    "inert" in HTMLElement.prototype || (Object.defineProperty(HTMLElement.prototype, "inert", { enumerable: !0, get: function () { return this.hasAttribute("inert") }, set: function (h) { h ? this.setAttribute("inert", "") : this.removeAttribute("inert") } }), window.addEventListener("load", function () {
      function h(a) {
        var b = null; try { b = new KeyboardEvent("keydown", { keyCode: 9, which: 9, key: "Tab", code: "Tab", keyIdentifier: "U+0009", shiftKey: !!a, bubbles: !0 }) } catch (g) {
          try {
            b = document.createEvent("KeyboardEvent"), b.initKeyboardEvent("keydown",
              !0, !0, window, "Tab", 0, a ? "Shift" : "", !1, "en")
          } catch (d) { }
        } if (b) { try { Object.defineProperty(b, "keyCode", { value: 9 }) } catch (g) { } document.dispatchEvent(b) }
      } function k(a) { for (; a && a !== document.documentElement;) { if (a.hasAttribute("inert")) return a; a = a.parentElement } return null } function e(a) { var b = a.path; return b && b[0] || a.target } function l(a) { a.path[a.path.length - 1] !== window && (m(e(a)), a.preventDefault(), a.stopPropagation()) } function m(a) {
        var b = k(a); if (b) {
          if (document.hasFocus() && 0 !== f) {
            var g = (c || document).activeElement;
            h(0 > f ? !0 : !1); if (g != (c || document).activeElement) return; var d = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, { acceptNode: function (a) { return !a || !a.focus || 0 > a.tabIndex ? NodeFilter.FILTER_SKIP : b.contains(a) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT } }); d.currentNode = b; d = (-1 === Math.sign(f) ? d.previousNode : d.nextNode).bind(d); for (var e; e = d();)if (e.focus(), (c || document).activeElement !== g) return
          } a.blur()
        }
      } (function (a) {
        var b = document.createElement("style"); b.type = "text/css"; b.styleSheet ?
          b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a)); document.body.appendChild(b)
      })("/*[inert]*/*[inert]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}"); var n = function (a) { return null }; window.ShadowRoot && (n = function (a) { for (; a && a !== document.documentElement;) { if (a instanceof window.ShadowRoot) return a; a = a.parentNode } return null }); var f = 0; document.addEventListener("keydown", function (a) { f = 9 === a.keyCode ? a.shiftKey ? -1 : 1 : 0 }); document.addEventListener("mousedown",
        function (a) { f = 0 }); var c = null; document.body.addEventListener("focus", function (a) { var b = e(a); a = b == a.target ? null : n(b); if (a != c) { if (c) { if (!(c instanceof window.ShadowRoot)) throw Error("not shadow root: " + c); c.removeEventListener("focusin", l, !0) } a && a.addEventListener("focusin", l, !0); c = a } m(b) }, !0); document.addEventListener("click", function (a) { var b = e(a); k(b) && (a.preventDefault(), a.stopPropagation()) }, !0)
    }));

    (function () {
      var cards = document.querySelectorAll('.codegel-carousel');
      Array.prototype.forEach.call(cards, function (carousel) {
        var scrollable = carousel.querySelector('.codegel-carousel-scrollable');
        var list = carousel.querySelector('.codegel-carousel-list');
        var items = list.children;
        var scrollAmount = list.offsetWidth / 2;
        var prev = carousel.querySelector('.codegel-carousel-prev');
        var next = carousel.querySelector('.codegel-carousel-next');

        prev.disabled = true;

        prev.addEventListener('click', function (e) {
          scrollable.scrollLeft += -scrollAmount;
        });
        next.addEventListener('click', function (e) {
          scrollable.scrollLeft += scrollAmount;
        });

        function disableEnable() {
          prev.disabled = scrollable.scrollLeft < 1;
          next.disabled = scrollable.scrollLeft === list.scrollWidth - list.offsetWidth;
        }

        // Debounce the button disabling function on scroll
        var debounced;
        scrollable.addEventListener('scroll', function () {
          window.clearTimeout(debounced);
          debounced = setTimeout(disableEnable, 200);
        });

        if ('IntersectionObserver' in window) {
          var observerSettings = {
            root: scrollable,
            threshold: 0.5
          }

          var callback = function (items, observer) {
            Array.prototype.forEach.call(items, function (item) {
              if (item.isIntersecting) {
                item.target.removeAttribute('inert');
              } else {
                item.target.setAttribute('inert', 'inert');
              }
            });
          }

          var observer = new IntersectionObserver(callback, observerSettings);
          Array.prototype.forEach.call(items, function (item) {
            observer.observe(item);
          });
        }
      });
    })();
  }

})();/**
 * Promo
 * @namespace codegel
 * @method codegel.Promo.init - Adds click behaviour to the image element in codegel-promo components.
 */

(function() {
  if (!window.codegel) { window.codegel = {}; }
  var self = codegel.Promo = {};
  
  self.init = function() {
    var promos = document.querySelectorAll('.codegel-promo');
    
    Array.prototype.forEach.call(promos, function (promo) {
      var img = promo.querySelector('.codegel-promo-image');
      var link = promo.querySelector('.codegel-promo-headline a');

      if (img && link) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
          link.click();
        });
      }
    });
  }

})();/**
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
})();/**
 * Tabs
 * @namespace codegel
 * @method codegel.Tabs.init
 */

(function() {
  if (!window.codegel) { window.codegel = {}; }
  var self = codegel.Tabs = {};
  
  self.init = function() {
    var tabInterfaces = document.querySelectorAll('.codegel-tabs');
    Array.prototype.forEach.call(tabInterfaces, function (tabInterface) {
      var tablist = tabInterface.querySelector('ul');
      var tabs = tablist.querySelectorAll('a');
      var panels = tabInterface.querySelectorAll('section[id]');

      var tabInfo = function () {
        var focus;
        var tab;
        if (window.location.hash) {
          tab = Array.prototype.indexOf.call(
            tabs,
            document.getElementById('tab-' + window.location.hash.substring(1))
          );
        }
        if (typeof tab === 'undefined' || tab < 0) {
          tab = 0;
          focus = false;
        }
        else {
          focus = true;
        }
        return {
          index: tab,
          focus: focus
        };
      }

      var switchTab = function (oldIndex, tabInfo) {
        if (typeof oldIndex !== 'undefined' && oldIndex > -1) {
          tabs[oldIndex].removeAttribute('aria-current');
          panels[oldIndex].hidden = true;
        }

        tabs[tabInfo.index].setAttribute('aria-current', 'true');
        panels[tabInfo.index].hidden = false;

        if (typeof oldIndex !== 'undefined' && tabInfo.focus) {
          panels[tabInfo.index].focus();
        }
      }

      Array.prototype.forEach.call(tabs, function (tab, i) {
        tab.id = 'tab-' + tab.getAttribute('href').substring(1);

        var panel = panels[i];
        panel.setAttribute('tabindex', '-1');
        panel.setAttribute('aria-labelledby', tab.id);
        panel.hidden = true;
      });

      window.addEventListener('hashchange', function (e) {
        var selected = tablist.querySelector('[aria-current]');
        var oldIndex = selected ? Array.prototype.indexOf.call(tabs, selected) : undefined;
        switchTab(oldIndex, tabInfo());
      }, false);

      window.addEventListener('DOMContentLoaded', function () {
        switchTab(undefined, tabInfo());
      });
    });
  }

})();/**
 * Promo
 * @namespace codegel
 * @method codegel.Validation.init - Adds click behaviour to the image element in codegel-promo components.
 */

(function () {
  if (!window.codegel) { window.codegel = {}; }
  var self = codegel.Validation = {};

  self.init = function () {
    // Polyfill the `find` array method
    Array.prototype.find || Object.defineProperty(Array.prototype, 'find', { value: function (r) { if (null == this) throw new TypeError('"this" is null or not defined'); var e = Object(this), t = e.length >>> 0; if ("function" != typeof r) throw new TypeError('predicate must be a function'); for (var n = arguments[1], i = 0; i < t;) { var o = e[i]; if (r.call(n, o, i, e)) return o; i++; } }, configurable: !0, writable: !0 });
  }

  self.constructor = function (formElem, rules, options) {
    // Defaults for the options object
    var settings = {
      warning: 'Please fix the errors in the form before continuing',
      prefix: '<strong>Error:</strong>',
      debounce: 500
    };

    // Overwrite defaults where they are provided in options
    for (var setting in options) {
      if (options.hasOwnProperty(setting)) {
        settings[setting] = options[setting];
      }
    }

    // Turn off native browser validation
    formElem.setAttribute('novalidate', true);

    // Initialize errors array for tracking
    var allErrors = [];

    // Get submit button
    var submit = formElem.querySelector('[type="submit"]');
    // Create and insert general message live region
    var warn = document.createElement('div');
    warn.setAttribute('aria-live', 'assertive');
    warn.classList.add('gel-form-warning');
    submit.parentNode.insertBefore(warn, submit);

    // Do not initially bother users by validating for required
    var testRequired = false;

    // Add errors if they don't already exist
    function saveError(name) {
      if (allErrors.indexOf(name) < 0) {
        allErrors.push(name);
      }
    }

    // Delete errors
    function deleteError(name) {
      allErrors = allErrors.filter(function (f) {
        return f !== name;
      });
    }

    // Function to show or hide warning live region
    function showHideWarn() {
      var message = allErrors.length > 0 ? settings.prefix + ' ' + settings.warning : '';
      warn.innerHTML = message;
    }

    // Switch field to valid state
    function toValid(field, errorElem) {
      field.setAttribute('aria-invalid', 'false');
      errorElem.innerHTML = '';
    }

    // Switch field to invalid state
    function toInvalid(field, errorElem, message) {
      field.setAttribute('aria-invalid', 'true');
      errorElem.innerHTML = settings.prefix + ' ' + message;
    }

    // Field validation function
    function validate(field) {
      // Get the error element
      var errorElem = document.getElementById(field.name + '-error');

      // Find the relevant rule
      var rule = rules.find(function (r) {
        return r.name === field.name;
      });

      // Validate for required first
      // if its being observed
      if (rule.required) {
        if (field.value.trim() === '' && testRequired) {
          toInvalid(field, errorElem, 'This field is required');
          saveError(field.name);
          return;
        } else {
          toValid(field, errorElem);
          deleteError(field.name);
          showHideWarn();
        }
      }

      // Test against each rule in `test`
      if (rule.tests) {
        // Find the first test that returns true if it exists
        var errored = rule.tests.find(function (t) {
          return t.error(field.value);
        });

        // Switch validation state
        if (errored) {
          toInvalid(field, errorElem, errored.message);
          saveError(field.name);
        } else {
          toValid(field, errorElem);
          deleteError(field.name);
          showHideWarn();
        }
      }
    }

    // Get all elements defined in the rules object
    var fields = rules.map(function (rule) {
      return document.querySelector('[name="' + rule.name + '"]');
    });

    // Initialize error markup and bindings
    fields.forEach(function (field, index) {
      // Set aria-describedby
      field.setAttribute('aria-describedby', field.name + '-error');

      // If `required`, set `aria-required`
      if (rules[index].required) {
        field.setAttribute('aria-required', 'true');
      }

      // Bind to keyup event
      var debounced;
      field.addEventListener('keyup', function (e) {
        var key = e.which || e.keyCode;
        // Don't run on the Tab and Shift keys
        if (key !== 9 && key !== 16) {
          window.clearTimeout(debounced);
          debounced = setTimeout(function () {
            validate(field);
          }, settings.debounce);
        }
      });
    });

    // Listen on submit
    formElem.addEventListener('submit', function (e) {
      e.preventDefault();
      fields.forEach(function (field) {
        testRequired = true;
        validate(field);
      });
      showHideWarn();
    });
  }
})();