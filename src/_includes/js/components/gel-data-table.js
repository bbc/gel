/**
 * Data table
 * @namespace gel
 * @method gel.DataTable.init
 */

(function () {
  if (!window.gel) { window.gel = {}; }
  var self = gel.DataTable = {};

  self.init = function () { };

  self.constructor = function (elem, sortable) {
    // Save the table and (child) thead elements
    this.table = elem.querySelector('table');
    this.thead = this.table.querySelector('thead');

    // Only add sorting markup/functionality if requested
    if (sortable) {
      this.headers = Array.prototype.slice.call(this.thead.querySelectorAll('th'));

      // Icon made unfocusable (IE/Edge issue)
      var icon = '<svg viewBox="0 0 32 32" class="gel-icon gel-icon--text" focusable="false" aria-hidden="true"><path d="M18.033 25.5v-19l5.6 5.7 2.4-2.4-10-9.8-10 9.8 2.4 2.4 5.6-5.7v19l-5.6-5.7-2.4 2.4 10 9.8 10-9.8-2.4-2.4"></path></svg>';
      this.headers.forEach(function (h) {
        h.setAttribute('aria-sort', 'none');
        // Buttons should have a visually hidden text label to accompany the icon
        h.innerHTML += ' <button class="gel-table__sort"><span class="gel-sr">Sort</span>' + icon + '</button>';
      });

      this.buttons = Array.prototype.slice.call(this.thead.querySelectorAll('button'));
      this.buttons.forEach(function (b) {
        b.addEventListener('click', function () {
          // Find out which column the button was pressed in
          var col = this.buttons.indexOf(b);
          // Save last sorting state as a string
          var dir = b.parentElement.getAttribute('aria-sort');
          // Set the sorting direction
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
          // Save outerHTML, so <td> or <th> is preserved
          rowArr.push(c.outerHTML);
        });
        rowsArr.push(rowArr);
      });

      // Function to help sort by text content
      // rather than stringified HTML
      this.getText = function (string) {
        var proxy = document.createElement('div');
        proxy.innerHTML = string;
        return proxy.textContent;
      }

      this.sort = function (col, dir, header) {
        // Find out if values are number-like
        var numeric = !isNaN(this.getText(rowsArr[0][col]));
        let sorted = rowsArr.slice(0).sort(function (a, b) {
          // Save text content for sorting algorithm
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
          // Flip aria-sort to match new direction
          h.setAttribute('aria-sort', 'none');
        });
        header.setAttribute('aria-sort', dir);

        var newRows = [];
        sorted.forEach(function (r) {
          // Recreate the new row as HTML
          newRows.push('<tr>' + r.join('') + '</tr>');
        });
        // Replace body of table with sorted data
        this.tbody.innerHTML = newRows.join('');
      }.bind(this);
    }

    // Feature RO first
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
          var cr = entry.contentRect;
          // Comparison: true if the container is overflowing
          var noScroll = cr.width >= this.table.offsetWidth;
          // Only make the container focusable if it needs scrolling
          entry.target.tabIndex = noScroll ? -1 : 0;
          // Instate sticky headers for non-scrolling table
          entry.target.style.overflowX = noScroll ? 'visible' : 'auto';
          this.thead.classList.toggle('gel-table__sticky', noScroll);
        }.bind(this));
      }.bind(this));

      ro.observe(elem);
    }
  }
})();
