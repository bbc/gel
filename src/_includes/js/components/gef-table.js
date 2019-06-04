/**
 * Table
 * @namespace gef
 * @method gef.Table.init 
 */

(function () {
  if (!window.gef) { window.gef = {}; }
  var self = gef.Table = {};

  self.constructor = function (elem, sortable) {
    this.table = elem.querySelector('table');
    this.thead = this.table.querySelector('thead');

    if (sortable) {
      this.headers = Array.prototype.slice.call(this.thead.querySelectorAll('th'));

      var icon = '<svg viewBox="0 0 32 32" class="gel-icon gel-icon--text" focusable="false" aria-hidden="true"><path d="M18.033 25.5v-19l5.6 5.7 2.4-2.4-10-9.8-10 9.8 2.4 2.4 5.6-5.7v19l-5.6-5.7-2.4 2.4 10 9.8 10-9.8-2.4-2.4"></path></svg>';
      this.headers.forEach(function (h) {
        h.setAttribute('aria-sort', 'none');
        h.innerHTML += ' <button class="gef-table-sort"><span class="gef-sr">Sort</span>' + icon + '</button>';
      });

      this.buttons = Array.prototype.slice.call(this.thead.querySelectorAll('button'));
      this.buttons.forEach(function (b) {
        b.addEventListener('click', function () {
          var col = this.buttons.indexOf(b);
          var dir = b.parentElement.getAttribute('aria-sort');
          var newDir = dir !== 'ascending' ? 'ascending' : 'descending';
          this.sort(col, newDir, b.parentElement);
        }.bind(this));
      }.bind(this));

      var rowsArr = [];
      this.tbody = this.table.querySelector('tbody');
      var rows = Array.prototype.slice.call(this.tbody.querySelectorAll('tr'));
      rows.forEach(function (r, i) {
        var cells = r.querySelectorAll('th, td');
        var rowArr = [];
        Array.prototype.forEach.call(cells, function (c, i) {
          rowArr.push(c.outerHTML);
        });
        rowsArr.push(rowArr);
      });

      this.getText = function (string) {
        var proxy = document.createElement('div');
        proxy.innerHTML = string;
        return proxy.textContent;
      }

      this.sort = function (col, dir, header) {
        var numeric = !isNaN(this.getText(rowsArr[0][col]));
        let sorted = rowsArr.slice(0).sort(function (a, b) {
          var one = this.getText(a[col]);
          var other = this.getText(b[col]);
          if (numeric) {
            if (dir === 'ascending') {
              return one - other;
            } else {
              return other - one;
            }
          } else {
            if (dir === 'ascending') {
              return one > other ? 1 : one < other ? -1 : 0
            } else {
              return one < other ? 1 : one > other ? -1 : 0;
            }
          }
        }.bind(this));

        this.headers.forEach(function (h) {
          h.setAttribute('aria-sort', 'none');
        });
        header.setAttribute('aria-sort', dir);

        var newRows = [];
        sorted.forEach(function (r) {
          newRows.push('<tr>' + r.join('') + '</tr>');
        });
        this.tbody.innerHTML = newRows.join('');
      }.bind(this);
    }

    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(entries => {
        for (var entry of entries) {
          var cr = entry.contentRect;
          var noScroll = cr.width >= this.table.offsetWidth;
          entry.target.tabIndex = noScroll ? -1 : 0;
          entry.target.style.overflowX = noScroll ? 'visible' : 'auto';
          this.thead.classList.toggle('sticky', noScroll);
        }
      });

      ro.observe(elem);
    }
  }
})();