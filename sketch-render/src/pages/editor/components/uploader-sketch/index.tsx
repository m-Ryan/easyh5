import { Button, message } from "antd";
import React, { useState, useCallback } from 'react';
import { Uploader } from '@/util/uploader';
import services from '@/services';
import { INodeItem } from '@/components/templete/templete.type';

export function UploaderSketch({ onSuccess }: { onSuccess: (list: INodeItem[])=> any}) {

  const [ loading, setLoading] = useState(false);

  const onUploadSketch = useCallback(()=>{
    const uploader = new Uploader(services.common.postSketchToJson, {
      count: 1
    });

    uploader.on('start', () => {
      setLoading(true);
    });

    uploader.on('success', list => {
      setLoading(false);
      onSuccess(list[0]);
    });

    uploader.on('error', errMsg => {
      message.error(errMsg);
      setLoading(false);
    });

    uploader.chooseFile();

  }, [onSuccess])


  return <Button loading={loading} type="primary" onClick={onUploadSketch}>sketch</Button>
}
