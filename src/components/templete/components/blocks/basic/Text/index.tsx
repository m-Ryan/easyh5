import Panel from './Panel';
import Preview from './Preview';
import { Main } from './Main';
import config from './config';
import { getDefaultStyle } from '@/util/utils';


const create = () => {
  return {
    type: config.type,
    data: {
      value: '新增文本'
    },
    style: {
      ...getDefaultStyle(),
      ...{
        width: 375,
        height: 'auto',
        color: '#000',
        display: 'inline-block'
      }
    },
    children: []
  };
};

export const Text = {
  Panel,
  Main,
  Preview,
  config,
  create
};

