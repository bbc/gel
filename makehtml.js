const fs = require('fs');
const nunjucks = require('nunjucks');
const slug = require('slug');
const cheerio = require('cheerio');
const site = require('./_site/data/site.json');

let slugCounts = {};
function toSlug(title) {
    if (typeof title === 'undefined') {
        title = 'undefined';
    }
    let slugged = slug(title);
    if (Object.prototype.hasOwnProperty.call(slugCounts, slugged)) {
        slugged += '-' + slugCounts[slugged]++;
    } else {
        slugCounts[slugged] = 1
    }
    return slugged.toLowerCase();
}

const shortcodes = {
    mark: {
        render: function(attrs) {
            let char = (attrs.is === 'good') ? '✓' : (attrs.is === 'bad') ? '✕' : '?';
            return `<div class="circular circular__${attrs.is}" aria-hidden="true">${char}</div>`;
        }
    },
    icon: {
        render: function(attrs) {
            return `<svg class="${attrs.class}"><use xlink:href="${site.basedir}static/images/gel-icons-all.svg#${attrs.name}" style="${attrs.style}"></use></svg>`;
        }
    },
    include: {
        render: function(attrs) {
            let filePath = attrs.src;
            let fileContent = fs.readFileSync('./_content/' + filePath, 'utf8');
            if (fileContent.substr(0, 3) === '---') {
                fileContent = fileContent.replace(/^---([\s\S]+?)---/, '<!-- $1 -->');
            }

            let renderedContent = nunjucks.renderString(fileContent, {site});

            return `<div class="geltags-demo">${renderedContent}</div>`;
        }
    },
    cta: {
        render: function(attrs) {
            let label = attrs.label;
            let href = attrs.href;

            return `<p><a class="gel-cta gel-long-primer-bold" href="${href}" target="_new"><span class="gel-button__label">${label}</span><svg class="gel-button__icon gel-icon gel-icon--text"><use xlink:href="${site.basedir}static/images/gel-icons-core-set.svg#gel-icon-external-link"></use></svg></a></p>`;
        }
    }
};

const md = require('markdown-it')({
        html: true,
        breaks: true,
        linkify: true,
        highlight: function(str, lang) {
            if (lang) {
                try {
                    return '<pre><code class="prettyprint syntax-' + lang + '">' +
                        md.utils.escapeHtml(str) +
                        '</code></pre>';
                } catch (e) {}
            }

            return '<pre><code class="prettyprint">' + md.utils.escapeHtml(str) + '</code></pre>';
        }
    })
    .use(require('markdown-it-anchor'), {
        slugify: toSlug
    })
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-shortcode-tag'), shortcodes)
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-container'), 'breakout', {
        validate: (p) => !!p.trim().match(/^(info|help|alert)/),
        render: function(tokens, idx) {
            let m = tokens[idx].info.trim().match(/^(info|help|alert) ([\s\S]+)/);
            if (m && tokens[idx].nesting === 1) {
                let id = toSlug(tokens[idx].info);
                return `
                    <aside class="geltags-breakout-box geltags-breakout-box extra-padding" aria-labelledby="aside-${id}">
                    <h4 id="aside-${id}" aria-hidden="true"><svg class="geltags-breakout-box__icon geltags-icon geltags-icon--text"><use xlink:href="${site.basedir}static/images/gel-icons-core-set.svg#gel-icon-${m[1]}" style="fill:#404040;"></use></svg>` + md.renderInline(('' + m[2]).trim()) + `</h4><div>`;
            } else {
                return `</aside>`;
            }
        }
    });

const origRender = md.render;
md.render = function() {
    slugCounts = {};
    return origRender.apply(md, arguments);
};

const path = require('path');
const glob = require('glob');
const headmatter = require('headmatter');
const copydir = require('copy-dir');

let templateEnv = new nunjucks.Environment();
templateEnv.addFilter('toc', function(content) {
    const $ = cheerio.load(content);
    let result = '<ol id="geltags-toc__links" class="geltags-toc">';
    $('h2').each(function(i, h2) {
        let id = h2.attribs.id;
        if (!h2.attribs || !h2.attribs.class || !h2.attribs.class.match(/(^| )no-toc( |$)/)) {
            result += '<li><a href="#' + h2.attribs.id + '">' + $(h2).text() + '</a></li>';
        }
    });
    return result + '</ol>';
});

const contentSources = [{
        match: '_content/components/*.md',
        options: {
            layout: '_site/templates/layout-components.njk',
            outfile: 'docs/components/{{ basename }}/index.html'
        }
    },
    {
        match: '_content/foundations/*.md',
        options: {
            layout: '_site/templates/layout-components.njk',
            outfile: 'docs/foundations/{{ basename }}/index.html'
        }
    },
    {
        match: '_content/components/demos/*.html',
        options: {
            layout: '_site/templates/layout-demos.njk',
            outfile: 'docs/components/demos/{{ basename }}/index.html'
        }
    },
    {
        match: '_content/index.md',
        options: {
            layout: '_site/templates/layout-index.njk',
            outfile: 'docs/index.html'
        }
    },
    {
        match: '_content/contributors.md',
        options: {
            layout: '_site/templates/layout-index.njk',
            outfile: 'docs/contributors/index.html'
        }
    }
];

contentSources.forEach(contentSource => {
    glob(contentSource.match, {}, (err, files) => {
        files.forEach(file => {
            let fileContent = fs.readFileSync(file, 'utf8');
            let { head, content } = headmatter.parse(fileContent);
            content = md.render(content);
            let data = Object.assign({ site, content }, (contentSource.options || {}), head);
            const template = fs.readFileSync(data.layout, 'utf8');
            let output = templateEnv.renderString(template, data);
            let outfile = nunjucks.renderString(data.outfile, { basename: path.basename(file).replace(/\.(html|md)$/i, '') });
            let outdir = path.dirname(outfile);
            fs.mkdir(outdir, { recursive: true }, (err) => {
                if (err) throw err;
                console.log(`> ${outfile}`);
                fs.writeFile(outfile, output, 'utf8', (err) => {
                    if (err) throw err;
                })              
            });
        });
    });
});

const staticSources = [{
    src: '_site/static',
    dest: 'docs/static'
}];

staticSources.forEach(staticSource => {
    copydir.sync(staticSource.src, staticSource.dest, {
        filter: (stat, filepath, filename) => !filename.match(/^\./)
    });
});