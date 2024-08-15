const path = require('path');

module.exports = {
  // Basic Webpack configuration
  resolve: {
    fallback: {
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
    }
  }
};
