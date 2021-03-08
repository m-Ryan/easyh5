import { article, IArticle } from '@example/services/article';
import { delay } from '@example/util/delay';
import createSliceState from './common/createSliceState';

export const TEMPLATE_FETCH_VY_ID = 'template/fetchByIdStatus';

export default createSliceState({
  name: 'templateList',
  initialState: [] as IArticle[],
  reducers: {
    set: (state, action) => state,
  },
  effects: {
    fetch: async (state) => {
      const data = await article.getArticleList(1, 1000);
      return data.list;
    }
  }
});
