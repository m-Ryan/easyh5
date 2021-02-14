import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import postcssNormalize from 'postcss-normalize';
const isProduct = process.env.NODE_ENV === 'production';

export function getBasicConfiguration(config: Partial<webpack.Configuration>) {

  const defaultConfig: webpack.Configuration = {
    mode: isProduct ? 'production' : 'development',
    devtool: 'inline-source-map',
    entry: './src/index.tsx',
    output: {
      filename: 'main.js',
      path: path.resolve('dist'),
    },

    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@VisualEditor': path.resolve('src/components/VisualEditor'),
        '@': path.resolve('src'),
      },
    },
    module: {

      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: true,
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
                fix: true,
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: path.resolve('src')
        },
        {
          oneOf: [
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: path.resolve('src'),
              exclude: [path.resolve('node_modules')],
              loader: require.resolve('babel-loader'),

              options: {
                presets: ['@babel/preset-env', "@babel/preset-react", '@babel/preset-typescript'],
                plugins: [
                  '@babel/plugin-proposal-object-rest-spread',
                  '@babel/plugin-transform-runtime',
                  'transform-class-properties',

                ],
                cacheDirectory: true,
              }
            },
            {
              test: /\.module\.(scss|sass)$/,
              use: getLoader({
                modules: {
                  localIdentName: process.env.NODE_ENV === 'development' ? '[path][name]__[local]' : '[local]--[hash:base64:5]'
                }
              })
            },
            {
              test: /\.(scss|css)$/,
              use: getLoader()
            },
          ]
        }

      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management',
        inject: true,
        template: path.resolve('public/index.html'),
      }),
    ],
  };

  return {
    ...defaultConfig,
    ...config
  };
}


function getLoader(options: { modules?: any; } = {}) {
  return [
    'style-loader',
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: options.modules || false,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          plugins: [
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),

            postcssNormalize(),
          ]
        },
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {}
    },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: [
          path.resolve('src/styles/common.scss'),
        ]
      }
    }
  ];
}
