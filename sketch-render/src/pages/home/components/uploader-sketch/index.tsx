import { Button, message } from "antd";
import React, { useState, useCallback } from 'react';
import { Uploader } from '@/util/uploader';
import services from '@/services';
import { INodeItem } from '@/components/templete/templete.type';

export function UploaderSketch({ onSuccess }: { onSuccess: (json: INodeItem[])=> any}) {

  const [ loading, setLoading] = useState(false);

  const onUploadSketch = useCallback(()=>{
    const uploader = new Uploader(services.common.postSketchToJson, {
      count: 1
    });

    uploader.on('start', () => {
      setLoading(true);
    });

    uploader.on('success', urls => {
      console.log(urls)
      setLoading(false);
      // onSuccess(urls);
    });

    uploader.on('error', errMsg => {
      message.error(errMsg);
      setLoading(false);
    });

    uploader.chooseFile();

  }, [])


  return <Button loading={loading} onClick={onUploadSketch}>上传sketch</Button>
}
