const  webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:{
        bundle:'./index.jsx',
        //vendor:['react','redux','react-dom','react-redux','reqwest','react-router','redux-thunk']
    },
    output:{
        path: '/Users/condy/nodejs/sails/CR/assets',
        //publicPath:'bundle/',
        filename: 'bundle.js',
        //chunkFilename: '[name].chunk.js'
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
    }
//     plugins: [
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false
//             }
//         }),
//         new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),        
//         //new webpack.optimize.DedupePlugin(),
//         new webpack.optimize.OccurenceOrderPlugin(),
//         new webpack.DefinePlugin({
//             'process.env.NODE_ENV': JSON.stringify('production')
//         })
//   ]
}