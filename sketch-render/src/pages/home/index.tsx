import React, { useEffect, useState, useCallback } from 'react';
import styles from './index.module.scss';
import { AppHeader } from './components/app-header';
import { AppMenu } from './components/app-menu';
import services from '@/services';
import { ListResponse, IArticle } from '@/services/article';
import dayjs from 'dayjs';
import { Link, useHistory } from 'react-router-dom';
import { AppTitle } from './components/app-title';
import { Button, message, Popover, Icon, Popconfirm } from 'antd';
import { QrCode } from '@/components/qrcode';
import { getPublishPath } from '@/util/utils';
import { Loading } from '@/components/loading';
import { Picture } from '@/components/Picture';

export function Home() {

  const [templete, setTemplete] = useState<ListResponse<IArticle> & { loading: boolean }>({ list: [], count: 0, loading: false })
  const history = useHistory();

  useEffect(() => {
    const getTemplete = async () => {
      setTemplete((templete)=>({
        ...templete,
        loading: true
      }))
      const data = await services.article.getArticleList(1, 10);
      setTemplete({
        list: data.list,
        count: data.count,
        loading: false
      });
      message.destroy();
    }
    getTemplete()
  }, [])

  const onEditor = useCallback((id: number) => {
    history.push(`/editor?id=${id}`)
  }, [history])

  const onConfirm = useCallback(async (id: number) => {
    try {
      message.loading('正在删除');
      await services.article.deleteArticle(id);
      setTemplete((state) => {
        state.list = state.list.filter(item => item.article_id !== id);
        return {
          ...state
        }
      })
      message.success('删除成功');
    } catch (error) {
      message.error(error.message);
    }
  }, [])




  const renderTemplete = (item: IArticle) => {

    return (
      <div key={item.article_id} className={styles.templeteItem}>
        <Picture className={styles.previewImg} src={item.picture}/>
        <div className={styles.bottom}>
          <div className={styles.title}>标题：{item.title}</div>
          <div className={styles.title}>创建时间：{dayjs().format('YYYY-MM-DD')}</div>
        </div>
        <div className={styles.mask}>
          <div className={styles.qrcode}><QrCode url={getPublishPath() + `/preview?id=${item.article_id}`} logo={'http://assets.maocanhua.cn/FuPYsNk512cqHpUPqGCLdJMflZEz'} /></div>
          <div className={styles.listBottom}>
            <div className={styles.listItem} onClick={() => onEditor(item.article_id)} >
              <Icon type="edit" />&nbsp;编辑
            </div>
            <div className={styles.listItem}>
              <Icon type="copy" />&nbsp;复制

            </div>
            <div className={styles.listItem}>
              <Popconfirm
                title="您确定要删除吗?"
                onConfirm={() => onConfirm(item.article_id)}
                okText="确定"
                cancelText="取消"
              >
                <Icon type="delete" />&nbsp;删除
              </Popconfirm>

            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <AppHeader />
      <div className={styles.wrap}>
        <div className={styles.menu}>
          <AppMenu />
        </div>
        <div className={styles.contentWrap}>
          <AppTitle title={'模板'} aside={
            <div>
              
              <Button><Link to={'/editor'}>新建</Link></Button>
            </div>
          }></AppTitle>
          <div className={styles.content}>
            <Loading loading={templete.loading}>
              {
                templete.list.map((item) => renderTemplete(item))
              }
            </Loading>
          </div>
        </div>
      </div>
    </div>
  );
}
