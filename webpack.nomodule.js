const { resolve } = require('path');
const { version } = require('./package.json');
const webpack = require('webpack');

module.exports = env => {
  const IS_MODULE_BUILD = env.BROWSERS === 'module';

  const targets = {
    ios: '9',
    safari: '9',
    chrome: '58',
    ie: '11'
  };

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
      new webpack.DefinePlugin({
        'process.env.NO_MODULE': JSON.stringify(true)
      })
    ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // useBuiltIns: 'usage',
                    targets,
                    debug: true
                  }
                ]
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                [
                  '@babel/plugin-proposal-decorators',
                  {
                    decoratorsBeforeExport: true
                  }
                ],
                '@babel/plugin-proposal-class-properties',
                [
                  '@babel/plugin-transform-runtime',
                  {
                    helpers: false,
                    regenerator: true
                  }
                ],
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
          test: /\.worker\.js$/,
          use: [
            {
              loader: 'worker-loader'
            },
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets,
                      debug: true
                    }
                  ]
                ],
                plugins: [
                  '@babel/plugin-syntax-dynamic-import',
                  [
                    '@babel/plugin-proposal-decorators',
                    {
                      decoratorsBeforeExport: true
                    }
                  ],
                  '@babel/plugin-proposal-class-properties',
                  [
                    '@babel/plugin-transform-runtime',
                    {
                      helpers: false,
                      regenerator: true
                    }
                  ],
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
