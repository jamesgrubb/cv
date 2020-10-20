const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs')
const parseIso = require('date-fns/parseISO')
const pluginSeo = require('eleventy-plugin-seo')

module.exports = function (eleventyConfig) {

  const md = new markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAttrs,{
    leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: [] 
  });

  eleventyConfig.addPlugin(pluginSeo, require("./_data/seo.json"))

  eleventyConfig.addNunjucksFilter("prettyUrl", (value) => {    
    return value.replace(/^(https?:|)\/\//,'')
  })

  eleventyConfig.addPairedShortcode("markdown", (content) => {
    return md.render(content);
  });

  eleventyConfig.addNunjucksFilter("dateFormatter", function(value) {
    
    return parseIso(value,  { additionalDigits: 1 })
   });
   eleventyConfig.addPassthroughCopy({'./fonts':'./fonts'})

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addWatchTarget("./_tmp/style.css");

  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });

  eleventyConfig.addPassthroughCopy({
    "./node_modules/alpinejs/dist/alpine.js": "./js/alpine.js",
  });

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });
};
