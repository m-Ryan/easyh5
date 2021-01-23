import React, { useState, useCallback, useMemo } from 'react';
import styles from './index.module.scss';
import { Icon, Modal, message, Spin, Input } from 'antd';
import { Uploader } from '@/util/uploader';
import services from '../../services/index';

interface ImageUploaderProps {
  url: string;
  count?: number;
  onRemove: () => void;
  onSuccess: (url: string[]) => void;
}

export function ImageUploader({
  url,
  onRemove,
  onSuccess,
  count = 1
}: ImageUploaderProps) {
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const onUpload = useCallback(() => {
    const uploader = new Uploader(services.common.uploadByQiniu, {
      count
    });

    uploader.on('start', () => {
      setLoading(true);
    });

    uploader.on('success', urls => {
      setLoading(false);
      onSuccess(urls);
    });

    uploader.on('error', errMsg => {
      message.error(errMsg);
      setLoading(false);
    });

    uploader.chooseFile();
  }, [count, onSuccess]);

  const onChangeUrl = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onSuccess([event.target.value]);
  }, [onSuccess])

  const onPaste = useCallback(async (e: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = e.clipboardData!;

    for (let i = 0; i < clipboardData.items.length; i++) {
      const item = clipboardData.items[i];
      if (item.kind == 'file') {
        const blob = item.getAsFile();

        if (!blob || blob.size === 0) {
          return;
        }
        message.loading('正在上传粘贴图片');
        const url = await services.common.uploadByQiniu(blob)
        onSuccess([url]);
        message.destroy();
      }
    }
  }, [onSuccess])

 
  const renderContent = useMemo(()=> {
    if (loading) {
      return (
        <div className={styles['upload']} onClick={onUpload}>
          <Spin size={'large'} />
        </div>
      );
    }
  
    if (!url) {
      return (
        <div className={styles['upload']} onClick={onUpload}>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
    }
  
    return (
      <div className={styles['container']}>
        <div className={styles['info']}>
          <img src={url} alt="标题图：" />
          <div className={styles['btn-wrap']}>
            <a title="预览" onClick={() => setPreview(true)}>
              <Icon type="eye" />
            </a>
            <a title="移除" onClick={onRemove}>
              <Icon type="delete" />
            </a>
          </div>

        </div>

        <Modal visible={preview} footer={null} onCancel={() => setPreview(false)}>
          <img alt="预览图" style={{ width: '100%' }} src={url} />
        </Modal>
      </div>
    )
  }, [loading, onRemove, onUpload, preview, url])

  return (
    <div className={styles.wrap}>
      { renderContent }
      <div className={styles.urlInput}>
        <span>图片地址：</span><Input onChange={onChangeUrl} onPaste={onPaste} style={{ width: 200 }} value={url} />
      </div>
    </div>
  );
}
