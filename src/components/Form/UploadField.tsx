import services from '@/services';
import { Uploader } from '@/util/uploader';
import { Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

export interface UploadFieldProps {
  onChange: (val: string) => void;
  value: string;
  inputDisabled?: boolean;
}

export function UploadField(props: UploadFieldProps) {
  const { onChange, inputDisabled = false } = props;
  const [loading, setLoading] = useState(false);
  const { current: uploader } = useRef(new Uploader(services.common.uploadByQiniu, {
    count: 1
  }));

  useEffect(() => {
    uploader.on('start', () => {
      setLoading(true);
      uploader.on('end', (photos) => {
        setLoading(false);
        onChange(photos.filter(item => item.status === 'done').map(item => item.url)[0] || '');
      });
    });

  }, [onChange, uploader]);

  const onClick = () => {
    if (loading) return;
    uploader.chooseFile();
  };

  return (
    <Input prefix={loading ? <LoadingOutlined /> : <UploadOutlined onClick={onClick} />} value={props.value} onChange={inputDisabled ? undefined : (e) => onChange(e.target.value)} />

  );
}