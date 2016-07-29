const  webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    // entry:{
    //     bundle:'./index.jsx',
    // },
    entry:['babel-polyfill', './index.jsx'],
    output:{
        path: __dirname + '/bundle',
        // path:'/Users/condy/nodejs/sails/CR/assets/bundle/',
        filename: 'bundle.js',
    },
    watch:true,
    resolve:{
        alias:{
            //...
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            },{
                test: /\.css$/,
                loader: 'style!css?modules',
                include: /flexboxgrid/,
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        //new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
  ]
}