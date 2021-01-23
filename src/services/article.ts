import { request } from './axios.config';
import { IUser } from './user';
import { CATEGORY_ID } from '@/constants';

export const article = {
  async getArticle(id: number | string): Promise<IArticle> {
    return request.get<IArticle>('/api/article/user/detail', {
      params: {
        article_id: id
      }
    });
  },
  async getArticleList(page: number, size: number, categoryId: number = 56): Promise<ListResponse<IArticle>> {
    return request.get<ListResponse<IArticle>>('/api/article/user/list', {
      params: {
        page,
        size,
        category_id: categoryId
      }
    });
  },
  async addArticle(title: string, content: string, picture: string): Promise<IArticle> {
    return request.post<IArticle>('/api/article/user/create-article', {
      title,
      content,
      summary: '这个人很懒，什么都没有写',
      picture ,
      category_id: CATEGORY_ID,
      tags: [74],
      secret: 0
    });
  },
  async updateArticle(id: number, options: {title?: string, content?: string, picture?: string, summary?: string}): Promise<IArticle> {
    return request.post<IArticle>('/api/article/user/update-article', {
      article_id: id,
      tags: [74],
      ...options
    });
  },
  async deleteArticle(id: number): Promise<string> {
    return request.get('/api/article/user/delete', {
      params: {
        article_id: id
      }
    });
  }
};

export interface ListResponse<T> {
  list: T[];
  count: number;
}

interface content {
  article_id: number;
  content: string;
}

export interface IArticle {
  article_id: number;
  writer_id: number;
  category_id: number;
  tags: {tag_id: number}[]; // 由于懒得写接口，这个接口是拿之前的，其实不需要数组
  picture: string;
  writer: IUser;
  title: string;
  summary: string;
  secret: number;
  readcount: number;
  updated_at: number;
  created_at: number;
  level: number;
  content: content;
}
