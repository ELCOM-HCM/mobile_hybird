var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const dist = path.resolve(__dirname, 'www');
module.exports = {
  entry: [
    'babel-polyfill', './src/esmile_mobile',
    './src/common/app.plugin'
    
  ],
  watch: true,
  module: {
    loaders: [
      { test: /\.js?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: 'style!css' },
    ]
  },
  rules:[
       /* {
            test:/\.(s*)css$/,
            use: ExtractTextPlugin.extract({ 
                fallback: 'style-loader',
                use: ['css-loader','sass-loader']
            })
        },*/
        {
            test: /\.(png|jp(e*)g|svg)$/,  
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 8000, // Convert images < 8kb to base64 strings
                    name: './assets/stylesheets/images/[hash]-[name].[ext]'
                } 
            }]
        }
    ],
  resolve: {
	root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'elcom.esmile.dangtm.js'
  },
  devServer: {
    contentBase: './dist',
    // Display only errors to reduce the amount of output.
    stats: "errors-only",
    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || "0.0.0.0";
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST, // Defaults to `localhost`
    port: 19091,//process.env.PORT, // Defaults to 8080
    open: true, // Open the page in browser
    watchContentBase: true,
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
   // new CleanWebpackPlugin([dist]),
    new HtmlWebpackPlugin({
        title: 'Hot Module Reload',
        filename: 'esmile_mobile.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
//    new webpack.DefinePlugin({
//    	  'process.env': {
//    	    NODE_ENV: JSON.stringify('production')
//    	  }
//    }),
//    new webpack.optimize.UglifyJsPlugin()
//    new webpack.optimize.UglifyJsPlugin({
//	    compress: {
//	      warnings: false // https://github.com/webpack/webpack/issues/1496
//	    }
//	})
  ]
};
