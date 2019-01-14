/**
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
 * Switch
 * @namespace codegel
 * @method codegel.Pocket.init
 */

(function () {
  var g = window.codegel || {};
  var self = g.Pocket = {};

  self.init = function () {
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
  }

  self.constructor = function (elem, height, continueText) {
    this.elem = elem;
    this.height = height;
    this.continueText = continueText || 'Continued below...';
    this.truncated = this.elem.querySelector('.codegel-pocket-truncated');

    // Feature detect IntersectionObserver before continuing
    if ('IntersectionObserver' in window) {
      // Set up InstersectionObserver to work on child elements
      // of the truncated wrapper
      const truncatedItems = this.truncated.children;
      var observerSettings = {
        root: this.truncated,
        threshold: [0.95]
      }

      var callback = function (items, observer) {
        Array.prototype.forEach.call(items, function (item) {
          if (!item.isIntersecting) {
            // Add the inert attr if the element is cut off
            // or invisible
            item.target.setAttribute('inert', 'inert');
          } else {
            // Remove inert from all elements when the
            // truncated element's height becomes 'auto'
            item.target.removeAttribute('inert');
          }
        });
      }

      // Apply the observer
      var observer = new IntersectionObserver(callback, observerSettings);
      Array.prototype.forEach.call(truncatedItems, function (item) {
        observer.observe(item);
      });

      // Create the footer element
      this.foot = document.createElement('div');
      this.foot.classList.add('codegel-pocket-foot');

      // Create the 'show more' button
      this.button = document.createElement('button');
      this.button.classList.add('codegel-button');
      this.foot.appendChild(this.button);

      // Define the icon 
      this.buttonIcon = '<svg viewBox="0 0 32 32" aria-hidden="false" focusable="false"><path d="M16 29L32 3h-7.2L16 18.3 7.2 3H0"></path></svg>';

      // Append the footer element after the 
      // truncated element
      this.elem.appendChild(this.foot);

      // Create continue element
      this.continue = document.createElement('div');
      this.continue.textContent = this.continueText;
      this.continue.classList.add('codegel-pocket-continue');
      this.continue.tabIndex = -1;

      // Toggle on click
      this.button.addEventListener('click', function () {
        this.shown ? this.showLess() : this.showMore();
        this.foot.classList.toggle('codegel-pocket-foot-shown');
      }.bind(this));

      // Show less initially
      this.showLess();
    }
  }

  // Unveil the hidden content
  self.constructor.prototype.showMore = function () {
    this.shown = true;
    this.next = this.truncated.querySelector('[inert]').previousElementSibling;
    this.truncated.style.height = 'auto';
    this.truncated.insertBefore(this.continue, this.next);
    this.continue.focus();
    this.button.innerHTML = '<span>Show less</span> ' + this.buttonIcon;
  }

  // Reset to truncated state
  self.constructor.prototype.showLess = function () {
    this.shown = false;
    this.truncated.style.height = this.height;
    this.truncated.contains(this.continue) && this.continue.parentNode.removeChild(this.continue);
    this.button.innerHTML = '<span>Show more</span> ' + this.buttonIcon;
  }

  if (!window.codegel) { window.codegel = g; }
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

})();