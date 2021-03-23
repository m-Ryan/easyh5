import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IVideo } from '.';

export const createInstance: CreateInstance<IVideo> = (payload) => {
  const defaultData: IVideo = {
    type: BasicType.VIDEO,
    data: {
      value: {
        controls: true,
        src: 'https://www.runoob.com/try/demo_source/movie.mp4',
      },
    },
    style: {
      position: 'relative',
      width: '100%',
      height: '200px',
      zIndex: 19,
      objectFit: 'fill'
    },
    children: [],
  };
  return merge(
    defaultData,
    payload
  );
};
