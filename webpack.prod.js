/**
 * @module
 * @description Webpack configuration for production
 *
 * @license
 * Copyright 2020, UPLB HCI Lab Group.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 const { resolve } = require('path');
 const { description: appDescription, author, version } = require('./package.json');
 const { merge } = require('webpack-merge');
 const ManifestPlugin = require('webpack-manifest-plugin');
 const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
 const CopyWebpackPlugin = require('copy-webpack-plugin');
 const common = require('./webpack.common');
 const WorkboxPlugin = require('workbox-webpack-plugin');
 const webpack = require('webpack');
 
 module.exports = env => (merge(common(env), {
   mode: 'production',
   devtool: 'source-map',
   plugins: [
     new CopyWebpackPlugin({
       patterns: [
         {
           from: resolve(__dirname, './node_modules/@webcomponents/webcomponentsjs/bundles/*.js'),
           to: `${version}/bundles/[name].[ext]`
         },
         {
           from: resolve(__dirname, './node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
           to: `${version}/bundles/custom-elements-es5-adapter.js`
         },
         {
           from: resolve(__dirname, './node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'),
           to: `${version}/bundles/webcomponents-loader.js`
         },
         {
           from: resolve(__dirname, './node_modules/proxy-polyfill/proxy.min.js'),
           to: `${version}/bundles/proxy.min.js`
         }
       ]
     }),
     new ManifestPlugin(),
     new FaviconsWebpackPlugin({
       logo: './src/assets/logo/logo.png',
       inject: true,
       favicons: {
         appDescription,
         developerName: author,
         background: '#fff',
         theme_color: '#fff',
         display: 'standalone',
         orientation: 'portrait',
         start_url: '/',
         version: '1.0',
         logging: true,
         icons: {
           android: true,
           appleIcon: true,
           appleStartup: false,
           favicons: true,
           firefox: true,
           windows: false,
           yandex: false
         }
       }
     }),
     new WorkboxPlugin.InjectManifest({
       swSrc: resolve(__dirname, './src/service-worker/index.js'),
       swDest: 'sw.js'
     }),
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
     })
   ]
 }));
 