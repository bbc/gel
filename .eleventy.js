module.exports = function (eleventyConfig) {
  const hljs = require('highlight.js');
  const cheerio = require('cheerio');

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
        } catch (__) { }
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  }).use(require('markdown-it-anchor'));

  eleventyConfig.addPlugin(function(eleventyConfig, pluginNamespace) {
    eleventyConfig.namespace(pluginNamespace, () => {
      eleventyConfig.addFilter('toc', function(content, opts){
        var $ = cheerio.load(content);
        var result = '<ol id="gel-toc__links" class="gel-toc">';
        $('h2').each(function(i, h2) {
          result += '<li><a href="#' + h2.attribs.id + '">' + $(h2).text() + '</a></li>';
        });
        return result + '</ol>';
      })
    })
  });
  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addPassthroughCopy("src/static/css");
  eleventyConfig.addPassthroughCopy("src/static/css/bbc-grandstand/dist");
  eleventyConfig.addPassthroughCopy("src/static/images");
  eleventyConfig.addPassthroughCopy("src/static/js");

  return {
    passthroughFileCopy: true
  };
};
