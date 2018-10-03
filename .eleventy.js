module.exports = function(eleventyConfig) {
  var hljs = require('highlight.js');
  var md = require('markdown-it')({
      html: true,
      breaks: true,
      linkify: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
                   hljs.highlight(lang, str, true).value +
                   '</code></pre>';
          } catch (__) {}
        }
     
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
      }
    });
  
    eleventyConfig.setLibrary("md", md);
    eleventyConfig.addPassthroughCopy("src/static/css");
    eleventyConfig.addPassthroughCopy("src/static/images");

    return {
        passthroughFileCopy: true
    };
};
