/**
 * Pocket
 * @namespace gel
 * @method gel.Pocket.init
 */

(function () {
  if (!window.gel) { window.gel = {}; }
  var self = gel.Pocket = {};

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
    this.truncated = this.elem.querySelector('.gel-pocket__truncated');

    // Feature detect IntersectionObserver before continuing
    if ('IntersectionObserver' in window) {
      // Set up InstersectionObserver to work on child elements
      // of the truncated wrapper
      const truncatedItems = this.truncated.children;
      var observerSettings = {
        root: this.truncated,
        threshold: [0.9]
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
      this.foot.classList.add('gel-pocket__foot');

      // Create the 'show more' button
      this.button = document.createElement('button');
      this.button.classList.add('gel-button');
      this.foot.appendChild(this.button);

      // Define the icon 
      this.buttonIcon = '<svg viewBox="0 0 32 32" aria-hidden="false" focusable="false"><path d="M16 29L32 3h-7.2L16 18.3 7.2 3H0"></path></svg>';

      // Append the footer element after the 
      // truncated element
      this.elem.appendChild(this.foot);

      // Create continue element
      this.continue = document.createElement('div');
      this.continue.textContent = this.continueText;
      this.continue.classList.add('gel-pocket__continue');
      this.continue.tabIndex = -1;

      // Toggle on click
      this.button.addEventListener('click', function () {
        this.shown ? this.showLess() : this.showMore();
        this.foot.classList.toggle('gel-pocket--foot-shown');
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
})();