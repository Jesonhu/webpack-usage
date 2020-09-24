const path = require('path')

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'
  },
  output: {
    // filename: 'main.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    host: '192.168.1.15',
    before: function(app, server, compiler) {
      app.get('/some/path1', function(req, res) {
        res.json({ custom: 'response from before' });
      });
    },
    after: function(app, server, compiler) {
      app.get('/some/path2', function(req, res) {
        res.json({ custom: 'response from after' });
      });
    }
  }
}