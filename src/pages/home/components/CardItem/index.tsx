import { Picture } from '@/components/Picture';
import { IArticle } from '@/services/article';
import React from 'react';
import { CopyOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './index.module.scss';
import { QrCode } from '@/components/qrcode';
import { Popconfirm } from 'antd';

interface CardItemProps {
  data: IArticle;
}

export function CardItem(props: CardItemProps) {
  const { data } = props;
  return (
    <div key={data.article_id} className={styles.templeteItem}>
      <Picture className={styles.previewImg} src={data.picture} />
      <div className={styles.bottom}>
        <div className={styles.title}>标题：{data.title}</div>
        <div className={styles.title}>创建时间：{dayjs().format('YYYY-MM-DD')}</div>
      </div>
      <div className={styles.mask}>
        <div className={styles.qrcode}><QrCode url={`/preview?id=${data.article_id}`} logo={'http://assets.maocanhua.cn/FuPYsNk512cqHpUPqGCLdJMflZEz'} /></div>
        <div className={styles.listBottom}>
          <div className={styles.listItem}  >
            <EditOutlined />&nbsp;编辑
        </div>
          <div className={styles.listItem}>
            <CopyOutlined />&nbsp;复制

        </div>
          <div className={styles.listItem}>
            <Popconfirm
              title="您确定要删除吗?"
              // onConfirm={() => onConfirm(data.article_id)}
              okText="确定"
              cancelText="取消"
            >
              <DeleteOutlined />&nbsp;删除
          </Popconfirm>

          </div>
        </div>
      </div>
    </div>
  );
}