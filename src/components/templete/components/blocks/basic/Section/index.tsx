import Panel from './Panel';
import { Preview } from './Preview';
import { Main } from './Main';
import config from './config';
const create = () => {
  return {
    type: config.type,
    data: {

    },
    style: {
      position: 'relative',
      width: '100%',
      height: 200,
      backgroundColor: '#f5f5f5'
    },
    children: []
  };
};

export const Section = {
  Panel,
  Main,
  Preview,
  config,
  create
};
