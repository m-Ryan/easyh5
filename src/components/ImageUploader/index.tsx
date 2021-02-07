import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { message, Modal } from 'antd';
import { PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import services from '../../services/index';
import { Uploader, UploadItem } from '@/util/uploader';
import { classnames } from '@/util/utils';
import { useFormikContext, withFormik } from 'formik';
import { uniqueId, isEqual } from 'lodash';

const ERROR_ICON = 'http://assets.maocanhua.cn/FvIaPNdMk32QDYBmaVJF1S6Q0MAW';
const LOADING_ICON = 'http://assets.maocanhua.cn/Fi_vI4vyLhTM-Tp6ivq4dR_ieGHk';

export interface ImageUploaderProps {
  urls?: string | string[];
  count?: number;
  onChange?: (url: string[]) => void;
}

function ImageUploader({
  count = 1,
  onChange
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { values, setValues, touched } = useFormikContext<UploadItem[]>();
  const ref = useRef<string[]>([]);

  useEffect(() => {
    const newVals = values.map(item => item.url).filter(url => !!url);
    if (!isEqual(ref.current, newVals)) {
      ref.current = newVals;
      touched && onChange?.(ref.current);
    }

  }, [touched, values, onChange]);

  const onUpload = () => {

    if (isUploading) {
      return message.warning('正在上传中，请等待上传完成');
    }

    setIsUploading(true);
    const uploader = new Uploader(services.common.uploadByQiniu, {
      count
    });

    uploader.on('start', photos => {
      const newVal = [...values, ...photos];

      setValues(newVal);

      uploader.on('progress', photos => {
        setValues(newVal.map(item => {
          const photo = photos.find(p => p.idx === item.idx);
          return photo || item;
        }));
      });

      uploader.on('end', () => {
        setIsUploading(false);
      });
    });

    uploader.chooseFile();
  };

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
        setIsUploading(true);
        const pastePicture: UploadItem = { url: '', status: 'pending', idx: `paste-${uniqueId()}` };
        setValues([...values, pastePicture]);
        try {
          const url = await services.common.uploadByQiniu(blob);
          setValues(values.map(item => {
            if (pastePicture.idx === item.idx) {
              return {
                ...item,
                status: 'done'
              };
            }
            return item;
          }));
        } catch (error) {
          setValues(values.map(item => {
            if (pastePicture.idx === item.idx) {
              return {
                ...item,
                status: 'error'
              };
            }
            return item;
          }));
        }
        setIsUploading(false);
        message.destroy();
      }
    }
  }, [values, setValues]);

  const onRemove = (index: number) => {
    setValues(values.filter((item, idx) => idx !== index));
  };

  const showUploader = values.length < count;

  return (
    <div onPaste={onPaste} className={styles.wrap}>
      <div className={styles['container']}>
        {values.map((item, index) => <ImageUploaderItem key={index} index={index} value={item} remove={onRemove} />)}
        {
          showUploader &&
          (
            <div className={styles['upload']} onClick={onUpload}>
              <PlusOutlined />
              <div className='ant-upload-text'>Upload</div>
            </div>
          )
        }
      </div>
    </div>
  );
}

interface ImageUploaderItemProps {
  index: number;
  value: UploadItem;
  remove: (index: number) => void;
}

function ImageUploaderItem(props: ImageUploaderItemProps) {
  const { remove, index, value } = props;

  const [preview, setPreview] = useState(false);

  if (value.status === 'pending') {
    return (
      <div className={styles['item']}>
        <div className={classnames(styles['info'])}>
          <img src={LOADING_ICON} alt='加载中' />
          <div className={styles['btn-wrap']} />
        </div>
      </div>
    );
  } else if (value.status === 'error') {
    return (
      <div className={classnames(styles['item'], styles.error)}>
        <div className={classnames(styles['info'])}>
          <img src={ERROR_ICON} alt='上传失败' />
          <div className={styles['btn-wrap']}>
            <a title='移除' onClick={() => remove(index)}>
              <DeleteOutlined />
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles['item']}>
        <div className={classnames(styles['info'])}>
          <img src={value.status === 'done' ? value.url : ERROR_ICON} alt='标题图：' />
          <div className={styles['btn-wrap']}>
            <a title='预览' onClick={() => setPreview(true)}>
              <EyeOutlined />
            </a>
            <a title='移除' onClick={() => remove(index)}>
              <DeleteOutlined />
            </a>
          </div>

        </div>

        <Modal visible={preview} footer={null} onCancel={() => setPreview(false)}>
          <img alt='预览图' style={{ width: '100%' }} src={value.url} />
        </Modal>
      </div>
    );
  }

}

export default withFormik<ImageUploaderProps, UploadItem[]>({
  handleSubmit: () => { },
  mapPropsToValues: (props) => (Array.isArray(props.urls) ? props.urls : []).map(item => ({ url: item, status: 'done', idx: '' }))
})(ImageUploader);