const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        path.resolve('src/index.js')

    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                }
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?sourceMap&sourceComments'
                ]
            },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
            

        ]
    },
    postcss: () => {
        return [
            /* eslint-disable global-require */
            require('postcss-cssnext')
            /* eslint-enable global-require */
        ];
    },
    sassLoader: {
        data: '@import "theme/_config.scss";',
        includePaths: [path.resolve(__dirname, './src')]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({ filename: 'dist/bundle.css', disable: false, allChunks: true }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: Infinity
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};
