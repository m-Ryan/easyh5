import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import postcssNormalize from 'postcss-normalize';

const config: webpack.Configuration = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://h5.maocanhua.cn',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve('src')
    },
  },
  module: {
    rules: [
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
            use: getLoader({ modules: true })
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
}

function getLoader(options: { modules?: boolean } = {}) {
  return [
    "style-loader",
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: Boolean(options.modules),
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
    }
  ]
}

export default config;