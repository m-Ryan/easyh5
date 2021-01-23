import { article, IArticle } from '@/services/article';
import { delay } from '@/util/delay';
import createSliceState from './common/createSliceState';

export const TEMPLATE_FETCH_VY_ID = 'template/fetchByIdStatus';

export default createSliceState({
  name: 'template',
  initialState: null as IArticle | null,
  reducers: {
    set: (state, action) => state,
  },
  effects: {
    fetchTemplateById: async (state, id: number) => {
      const data = await article.getArticle(id);
      await delay()
      return data;
    }
  }
})
