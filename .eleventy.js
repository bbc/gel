const fs = require('fs');
const nunjucks = require('nunjucks');
const crypto = require('crypto');
const slug = require('slug')

var slugCounts = {};
function toSlug(title) {
  if (typeof title === 'undefined') {
    title = 'undefined';
  }
  var slugged = slug(title);
  if ( Object.prototype.hasOwnProperty.call(slugCounts, slugged) ) {
    slugged += '-' + slugCounts[slugged]++;
  }
  else {
    slugCounts[slugged] = 1
  }
  return slugged.toLowerCase();
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
          <div class="geltags-demo">${renderedContent}</div>
        `;
      }
    },
    cta: {
      render: function (attrs) {
        var label = attrs.label;
        var href = attrs.href;

        return `
          <p><a class="gel-cta gel-long-primer-bold" href="${href}" target="_new"><span class="gel-button__label">${label}</span><svg class="gel-button__icon gel-icon gel-icon--text"><use xlink:href="${data.site.basedir}static/images/gel-icons-core-set.svg#gel-icon-external-link"></use></svg></a></p>
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
  })
    .use(require('markdown-it-anchor'), {
      slugify: toSlug
    })
    .use(require('markdown-it-shortcode-tag'), shortcodes)
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-container'), 'breakout', {
      validate: (p) => !!p.trim().match(/^(info|help|alert)/),
      render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^(info|help|alert) ([\s\S]+)/);
        if (m && tokens[idx].nesting === 1) {
          var id = toSlug( tokens[idx].info );
          return `
            <aside class="geltags-breakout-box geltags-breakout-box extra-padding" aria-labelledby="aside-${id}">
              <h4 id="aside-${id}" aria-hidden="true"><svg class="geltags-breakout-box__icon geltags-icon geltags-icon--text"><use xlink:href="${data.site.basedir}static/images/gel-icons-core-set.svg#gel-icon-${m[1]}" style="fill:#404040;"></use></svg>` + md.renderInline( (''+m[2]).trim() ) + `</h4><div>`;
        } else {
          return `</aside>`;
        }
      }
    });

    let origRender = md.render;
    md.render = function() {
      //console.log('new render!', arguments);
      slugCounts = {};
      return origRender.apply(md, arguments);
    };

  eleventyConfig.addPlugin(function (eleventyConfig, pluginNamespace) {
    eleventyConfig.namespace(pluginNamespace, () => {
      eleventyConfig.addFilter('toc', function (content, opts) {
        var $ = cheerio.load(content);
        var result = '<ol id="geltags-toc__links" class="geltags-toc">';
        $('h2').each(function (i, h2) {
          var id = h2.attribs.id;
          if ( !h2.attribs || !h2.attribs.class || !h2.attribs.class.match( /(^| )no-toc( |$)/ ) ) {
            result += '<li><a href="#' + h2.attribs.id + '">' + $(h2).text() + '</a></li>';
          }
        });
        return result + '</ol>';
      });
    });
  });
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addPassthroughCopy('src/static/css');
  eleventyConfig.addPassthroughCopy('src/static/css/bbc-grandstand/dist');
  eleventyConfig.addPassthroughCopy('src/static/images');
  eleventyConfig.addPassthroughCopy('src/static/videos');
  eleventyConfig.addPassthroughCopy('src/static/js');

  return {
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true
  };
};
