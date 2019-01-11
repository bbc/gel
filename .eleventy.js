const fs = require('fs');
const nunjucks = require('nunjucks');
const crypto = require('crypto');
const slug = require('slug')

var slugCounts = {};
function sluggify(content) {
  if (typeof content === 'undefined') {
    content = 'undefined';
  }
  var slugged = slug(content);
  if ( Object.prototype.hasOwnProperty.call(slugCounts, slugged) ) {
    slugged += '-' + slugCounts[slugged]++;
  }
  else {
    slugCounts[slugged] = 1
  }
  return slugged;
}

module.exports = function (eleventyConfig) {
  const data = {
    site: require('./src/_data/site.json')
  };
  const hljs = require('highlight.js');
  const cheerio = require('cheerio');

  var shortcodes = {
    mark: {
      render: function (attrs) {
        var char = (attrs.is === 'good') ? '✓' : (attrs.is === 'bad') ? '✕' : '?';
        return `
          <div class="circular circular__${attrs.is}" aria-hidden="true">${char}</div>
        `;
      }
    },
    icon: {
      render: function (attrs) {
        return `
          <svg class="${attrs.class}"><use xlink:href="${data.site.basedir}static/images/gel-icons-all.svg#${attrs.name}" style="${attrs.style}"></use></svg>
        `;
      }
    },
    include: {
      render: function (attrs) {
        var filePath = attrs.src;
        var fileContent = fs.readFileSync('./src/' + filePath, 'utf8');
        if (fileContent.substr(0, 3) === '---') {
          fileContent = fileContent.replace(/^---([\s\S]+?)---/, '<!-- $1 -->');
        }

        var renderedContent = nunjucks.renderString(fileContent, data);

        return `
          <div class="geldocs-demo">${renderedContent}</div>
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
        } catch (e) { }
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });

  md.use(require('markdown-it-anchor'))
    .use(require('markdown-it-shortcode-tag'), shortcodes)
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-container'), 'breakout', {
      validate: (p) => !!p.trim().match(/^(info|help|alert)/),
      render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^(info|help|alert) ([\s\S]+)/);
        if (m && tokens[idx].nesting === 1) {
          var id = sluggify( tokens[idx].info );
          return `
            <aside class="geldocs-breakout-box geldocs-breakout-box extra-padding" aria-labelledby="aside-${id}">
              <h4 id="aside-${id}" aria-hidden="true"><svg class="geldocs-breakout-box__icon geldocs-icon geldocs-icon--text"><use xlink:href="${data.site.basedir}static/images/gel-icons-core-set.svg#gel-icon-${m[1]}" style="fill:#404040;"></use></svg>` + md.renderInline( (''+m[2]).trim() ) + `</h4><div>`;
        } else {
          return `</aside>`;
        }
      }
    });

  eleventyConfig.addPlugin(function (eleventyConfig, pluginNamespace) {
    eleventyConfig.namespace(pluginNamespace, () => {
      eleventyConfig.addFilter('toc', function (content, opts) {
        var $ = cheerio.load(content);
        var result = '<ol id="geldocs-toc__links" class="geldocs-toc">';
        $('h2').each(function (i, h2) {
          result += '<li><a href="#' + h2.attribs.id + '">' + $(h2).text() + '</a></li>';
        });
        return result + '</ol>';
      })
    })
  });
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addPassthroughCopy('src/static/css');
  eleventyConfig.addPassthroughCopy('src/static/css/bbc-grandstand/dist');
  eleventyConfig.addPassthroughCopy('src/static/images');
  eleventyConfig.addPassthroughCopy('src/static/js');

  return {
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true
  };
};
