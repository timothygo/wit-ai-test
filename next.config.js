const withPlugins = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
const optimizedImages = require("next-optimized-images");
module.exports = withPlugins([[optimizedImages], [sass, { cssModules: true }]]);
