import { BlockType } from '@/components/templete/constants';
import { unZipStyle } from '@/components/templete/style-tranform';
import { INodeItem } from '@/components/templete/templete.type';
import { ASSET_DOMAIN } from '@/constants';
import services from '@/services';
import { article, IArticle } from '@/services/article';
import { delay } from '@/util/delay';
import { getImageFile } from '@/util/utils';
import createSliceState from './common/createSliceState';

export const TEMPLATE_FETCH_VY_ID = 'template/fetchByIdStatus';
import mockData from './template.json';

export interface ITemplate extends Omit<IArticle, 'content'> {
  content: INodeItem[];
  focusIdx: string;
}

export default createSliceState({
  name: 'template',
  initialState: null as ITemplate | null,
  reducers: {
    set: (state, action) => state,
  },
  effects: {
    fetchById: async (state, id: number) => {
      // const data = await article.getArticle(id);
      // const content = unZipStyle(JSON.parse(data.content.content) as INodeItem[]);
      // await tranformOutSitePicture(content);
      // return { ...data, content, focusIdx: 'content.[0]' };
      return mockData as any as ITemplate;
    }
  }
});

const tranformOutSitePicture = async (list: INodeItem[]) => {
  await Promise.all(list.map(async (item) => {
    const value = item.data.value;
    if (item.type === BlockType.BITMAP) {
      if (!value.startsWith(ASSET_DOMAIN)) {
        if (value.startsWith('data:image')) {
          item.data.value = await services.common.uploadByQiniu(await getImageFile(value));
        } else {
          item.data.value = await services.common.uploadByUrl(value);
        }

      }
      const backgroundImage = item.style.backgroundImage;
      if (backgroundImage && backgroundImage.startsWith('http') && !backgroundImage.startsWith(ASSET_DOMAIN)) {
        item.style.backgroundImage = await services.common.uploadByUrl(backgroundImage);
      }
    }
    item.children = await tranformOutSitePicture(item.children);
    return item;
  })).catch(e => e);
  return list;
};