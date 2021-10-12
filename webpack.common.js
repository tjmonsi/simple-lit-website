const { resolve } = require('path');
const { version } = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { default: HTMLInlineCSSWebpackPlugin } = require('html-inline-css-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
  const IS_MODULE_BUILD = env.BROWSERS === 'module';

  return {
    entry: {
      main: './src/index.js'
    },
    resolve: {
      symlinks: true
    },
    output: {
      filename: IS_MODULE_BUILD
        ? `module.[name].bundle.${version}.js`
        : `[name].bundle.${version}.js`,
      // chunkFilename: '[name].bundle.js',
      publicPath: '/',
      path: resolve(__dirname, 'dist')
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        version,
        // scriptLoading: 'defer',
        // inject: 'body',
        cache: false,
        showErrors: true
      }),
      // new ScriptExtHtmlWebpackPlugin({
      //   inline: [
      //     `module.main.bundle.${version}.js`
      //   ],
      //   module: [
      //     `module.main.bundle.${version}.js`
      //   ]
      // }),
      new HTMLInlineCSSWebpackPlugin({
        replace: {
          target: 'src/index.scss'
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NO_MODULE': JSON.stringify(false)
      })
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: [
                        'last 2 Chrome versions',
                        'Safari 11'
                      ]
                    }
                  }
                ]
              ],
              plugins: [
                [
                  '@babel/plugin-proposal-decorators',
                  {
                    decoratorsBeforeExport: true
                  }
                ],
                '@babel/plugin-proposal-class-properties',
                // [
                //   '@babel/plugin-transform-runtime',
                //   {
                //     helpers: false,
                //     regenerator: true
                //   }
                // ],
                [
                  '@babel/plugin-proposal-object-rest-spread',
                  { useBuiltIns: true }
                ]
              ]
            }
          }
        },
        {
          test: /index\.s[ac]ss$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.component\.s[ac]ss$/i,
          use: [
            'raw-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.partial\.ejs$/,
          loader: 'ejs-loader',
          options: {
            esModule: false
          }
        },
        {
          test: /\.worker\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            { loader: 'worker-loader' },
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        browsers: [
                          'last 2 Chrome versions',
                          'Safari 11'
                        ]
                      }
                    }
                  ]
                ],
                plugins: [
                  [
                    '@babel/plugin-proposal-decorators',
                    {
                      decoratorsBeforeExport: true
                    }
                  ],
                  '@babel/plugin-proposal-class-properties',
                  // [
                  //   '@babel/plugin-transform-runtime',
                  //   {
                  //     helpers: false,
                  //     regenerator: true
                  //   }
                  // ],
                  [
                    '@babel/plugin-proposal-object-rest-spread',
                    { useBuiltIns: true }
                  ]
                ]
              }
            }
          ]
        }
      ]
    }
  };
};
