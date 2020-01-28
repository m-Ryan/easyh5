import React, { useEffect } from 'react';
import { useSelector } from '@/modal';
import { promotionList } from './promotion';
import { actionBus } from '@/components/templete/actionBus';

export function CustomServiceComponent() {
  const { tagId } = useSelector('article');
  const item = promotionList.find(item => item.id === tagId);

  useDialogService();
  useCommonService();

  return (
    <>
      {item && <item.serviceComponent />}
    </>
  )

}

function useCommonService() {

}

function useDialogService() {
  const { setDialogShow } = useSelector('article');
  useEffect(() => {
    actionBus.on('dialog', (params) => {
      setDialogShow(parseInt(params.actionName));
    })

  }, [setDialogShow])
}
