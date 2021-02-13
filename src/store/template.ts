import { BlockType } from '@VisualEditor/constants';
import { INodeItem } from '@VisualEditor/typings';
import { ASSET_DOMAIN } from '@/constants';
import services from '@/services';
import { article, IArticle } from '@/services/article';
import { getImageFile } from '@/util/utils';
import createSliceState from './common/createSliceState';

export const TEMPLATE_FETCH_VY_ID = 'template/fetchByIdStatus';
import mockData from './template.json';
import { cloneDeep } from 'lodash';
import { message } from 'antd';
import { history } from '@/util/history';
export interface ITemplate extends Omit<IArticle, 'content'> {
  content: INodeItem[];
  focusIdx: string;
  dialogUid: string;
  variableMap: { [key: string]: any; };
  actionMap: { [key: string]: any; };
}

export default createSliceState({
  name: 'template',
  initialState: null as ITemplate | null,
  reducers: {
    set: (state, action) => state,
  },
  effects: {
    fetchById: async (state, id: number) => {
      try {
        const data = await article.getArticle(id);
        const content = JSON.parse(data.content.content) as INodeItem[];
        await tranformOutSitePicture(content);
        return { ...data, content, focusIdx: 'content.[0]', variableMap: {}, actionMap: {}, dialogUid: '' };
      } catch (error) {
        history.replace('/');
        throw error;
      }
    },
    fetchDefaultTemplate: async (state) => {
      return cloneDeep(mockData) as any as ITemplate;
    },
    create: async (state, payload: { template: ITemplate, success: (id: number) => void; }) => {
      const data = await article.addArticle({ ...payload.template, content: JSON.stringify(payload.template.content) });
      payload.success(data.article_id);
      return { ...data, ...payload.template };
    },
    updateById: async (state, payload: { id: number, template: ITemplate; success: () => void; }) => {
      await article.updateArticle(payload.id, {
        ...payload.template,
        content: JSON.stringify(payload.template.content)
      });
      payload.success();
      return { ...payload.template };
    },
    removeById: async (state, payload: { id: number; success: () => void; }) => {
      await article.deleteArticle(payload.id);
      payload.success();
      message.success('删除成功');
    },
  }
});

const tranformOutSitePicture = async (list: INodeItem[]) => {
  await Promise.all(list.map(async (item) => {
    const value = item.data.value;
    if (item.type === BlockType.IMAGE) {
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