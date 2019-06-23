/**
 * Tabs
 * @namespace gel
 * @method gel.Tabs.init
 */

(function () {
  if (!window.gel) { window.gel = {}; }
  var self = gel.Tabs = {};

  self.init = function () { }

  self.constructor = function (elem) {
    var tablist = elem.querySelector('ul');
    var tabs = elem.querySelectorAll('a');
    var panels = elem.querySelectorAll('section[id]');

    tablist.setAttribute('role', 'tablist');

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
        tabs[oldIndex].setAttribute('aria-selected', 'false');
        panels[oldIndex].hidden = true;
      }

      tabs[tabInfo.index].setAttribute('aria-selected', 'true');
      panels[tabInfo.index].hidden = false;

      if (typeof oldIndex !== 'undefined' && tabInfo.focus) {
        panels[tabInfo.index].focus();
      }
    }

    Array.prototype.forEach.call(tabs, function (tab, i) {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', 'false');
      tab.parentNode.setAttribute('role', 'presentation');
      tab.id = 'tab-' + tab.getAttribute('href').substring(1);

      var panel = panels[i];
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.hidden = true;
    });

    // Use event delegation to listen to all 'keyup' events
    // within `tablist`. If 'Space' was pressed on a tab
    // element, then click it triggering a 'hashchange'.
    tablist.addEventListener('keyup', function (e) {
      var isTab = e.target.matches('[role="tab"]');
      var keyCode = e.code;

      if (isTab && keyCode === 'Space') {
        e.target.click();
      }
    });

    window.addEventListener('hashchange', function (e) {
      var selected = tablist.querySelector('[aria-selected="true"]');
      var oldIndex = selected ? Array.prototype.indexOf.call(tabs, selected) : undefined;
      switchTab(oldIndex, tabInfo());
    }, false);

    window.addEventListener('DOMContentLoaded', function () {
      switchTab(undefined, tabInfo());
    });
  }

})();