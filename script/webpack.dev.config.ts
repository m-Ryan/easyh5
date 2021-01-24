import path from 'path';
import { getBasicConfiguration } from './webpack.config';

export default getBasicConfiguration({
  mode: "development",
  cache: {
    type: 'filesystem'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
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