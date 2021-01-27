import { Config } from './Panel';
import { Preview } from './Preview';
import { Main } from './Main';
import config from './config';
const create = () => {
  return {
    nodeItem: {
      type: config.type,
      data: {

      },
      style: {
        position: 'relative',
        width: '100%',
        height: 200,
        background: '#ccc'
      },
      children: []
    }
  };
};

export const Section = {
  Config,
  Main,
  Preview,
  config,
  create
};
