/**
 * Comments
 * @namespace gel
 * @method gel.Comments.init 
 */

(function () {
  if (!window.gel) { window.gel = {}; }
  var self = gel.Comments = {};

  self.init = function () { };

  self.constructor = function (selector, options) {
    this.node = document.querySelector(selector);
    this.data = options.data;
    this.template = options.template;
    this.form = this.node.querySelector('form');
    this.commentBox = this.form.querySelector('textarea');
    this.submitBtn = this.form.querySelector('[type="submit"]');
    this.success = this.form.querySelector('.gel-comment__success');
    this.stream = this.node.querySelector('.gel-comments__stream');

    this.submitBtn.disabled = false;

    this.sanitize = function (str) {
      var temp = document.createElement('div');
      temp.textContent = str;
      return temp.innerHTML;
    }

    this.form.addEventListener('submit', function () {
      comments.addComment({
        id: Math.random().toString(36).substr(2, 9),
        time: Date.now(),
        name: 'Your Name',
        comment: this.sanitize(this.form.comment.value)
      });
    }.bind(this));

    this.form.addEventListener('gel-submitted', function () {
      this.success.textContent = 'Your comment was posted successfully.';
      this.commentBox.value = '';
    }.bind(this));

    this.commentBox.addEventListener('focus', function () {
      this.success.textContent = '';
    }.bind(this));
  }

  self.constructor.prototype.render = function () {
    if (!this.stream) return;
    var data = this.data;
    switch (this.sortMethod) {
      case 'timeAsc':
        data.sort(function (a, b) {
          return a.time - b.time;
        });
        break;
      default: // by time, ascending
        data.sort(function (a, b) {
          return b.time - a.time;
        });
    }
    this.stream.innerHTML = this.template(data);
  }

  self.constructor.prototype.addComment = function (comment) {
    this.data.push(comment);
    this.render();
  }

  self.constructor.prototype.sortBy = function (mode) {
    this.sortMethod = mode;
    this.render();
  }
})();