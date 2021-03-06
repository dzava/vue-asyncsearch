const path = require('path');
const merge = require('webpack-merge');

module.exports = merge(require('./webpack.base'), {
    context: __dirname,
    mode: 'production',
    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'vue-asyncsearch',
        libraryTarget: 'umd',
    },

    externals: {
        vue: 'vue',
    },
});
