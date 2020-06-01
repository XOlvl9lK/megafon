const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const cssLoaders = loader => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                url: false
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                path: './js/postcss.config.js'
            }
        },
    ];

    if (loader) {
        loaders.push(loader)
    }

    return loaders;
};

const optimization =() => {
    const optimization = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        optimization.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return optimization;
};


module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: ['@babel/polyfill', './js/index.js'],
    output: {
        filename: "./js/bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: isDev ? 'source-map' : '',
    mode: "production",
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./html/index.html",
            filename: "index.html",

            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: './fonts',
                to: "./fonts"
            },
            {
                from: './img',
                to: './img'
            },
            {
                from: './favicon',
                to: './favicon'
            },
        ]),
        new MiniCssExtractPlugin({
            filename: './css/style.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'img'
                        }
                    }
                ],

            }
        ]
    }
};