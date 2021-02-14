import path from 'path';
import { getBasicConfiguration } from './webpack.config';

export default getBasicConfiguration({
  mode: 'development',
  // cache: {
  //   type: 'filesystem'
  // },
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://h5.maocanhua.cn',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },
});