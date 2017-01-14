'use strict';
var path = require('path');
var gulp = require('gulp');
var tap = require('gulp-tap');
var replaceExt = require('replace-ext');

function createRenderer() {
  var hljs = require('highlight.js');
  var mdnh = require('markdown-it-named-headers');
  var md = require('markdown-it')({
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return "<pre class=\"hljs\"><code><div>" + hljs.highlight(lang, str, true).value + "</div></code></pre>";
        }
        catch (error) {}
      }
      return "<pre class=\"hljs\"><code><div>" + md.utils.escapeHtml(str) + "</div></code></pre>";
    }
  }).use(mdnh, {});
  return md;
};

var md = createRenderer();

var mdFilPath = '*.md';
var dest = './dest/';
var htmlExt = '.html';
var title = 'HTML title';
// light, dark, high-contrast
var theme = 'light';

var header = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <link href="markdown.css" rel="stylesheet">
</head>
<body class="vscode-${theme}">

`;

var footer = `
</body>
</html>
`;

function markdownToHtml(file) {
  var result = md.render(file.contents.toString());
  file.contents = new Buffer(header + result + footer);
  file.path = replaceExt(file.path, htmlExt);
  return;
}

gulp.task('build', function() {
  return gulp.src(mdFilPath)
    .pipe(tap(markdownToHtml))
    .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
  gulp.watch(mdFilPath, ['build']);
});

gulp.task('default', ['build']);
