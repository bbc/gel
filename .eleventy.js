module.exports = function (eleventyConfig) {
  const data = {
    site: require('./src/_data/site.json')
  };
  const hljs = require('highlight.js');
  const cheerio = require('cheerio');

  var shortcodes = {
    note: {
      render: function (attrs) {
        return `
        <div class="gel-breakout-box gel-breakout-box extra-padding">
          <aside class="note" aria-label="Note:">
            <h4 aria-hidden="true"><svg class="gel-breakout-box__icon gel-icon gel-icon--text"><use xlink:href="${data.site.basedir}static/images/gel-icons-core-set.svg#gel-icon-info" style="fill:#404040;"></use></svg>Note</h4><div>
            <p>${md.render(attrs.text)}</p>
          </aside>
        </div>
        `;
      }
    },
    important: {
      render: function (attrs) {
        return `
          <aside class="note" aria-label="Important:">
            <p class="note_label" aria-hidden="true"><strong>Important</strong></p>
            <p>${md.render(attrs.text)}</p>
          </aside>
        `;
      }
    },
    mark: {
      render: function (attrs) {
        var markIs = attr.is;
        var char = attr.is === 'good'? '✓' : attr.is === 'bad'? ':(' : '?';
        return `
          <div class="circular circular__${attr.is}">${char}</div>
        `;
      }
    }
  }

  const md = require('markdown-it')({
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
  }).use(require('markdown-it-anchor')).use(require('markdown-it-shortcode-tag'), shortcodes);

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
