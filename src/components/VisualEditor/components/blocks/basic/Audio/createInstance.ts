import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { merge } from 'lodash';
import { IAudio } from '.';

const musicIcon = 'http://assets.maocanhua.cn/FvNHssKFRQ-sM6Yqus-INfd9pTYj';

export const createInstance: CreateInstance<IAudio> = (payload) => {
  return merge(
    {
      type: BlockType.AUDIO,
      data: {
        value: {
          controls: true,
          src: 'http://assets.maocanhua.cn/llSQJIBwGLZGhowxAi192bkzJav0',
          autoplay: true,
          loop: true,
        },
      },
      style: {
        position: 'absolute',
        right: '0px',
        top: '100px',
        width: '32px',
        height: '30px',
        backgroundImage: `url(${musicIcon})`,
        backgroundSize: '100%',
        zIndex: 19,
        cursor: 'pointer'
      },
      children: [],
    },
    payload
  );
};
