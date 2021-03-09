import { IDialog } from '@/components/core/blocks/basic/Dialog';
import { BasicType } from '@/constants';
import { useField } from 'formik';
import { useCallback, useMemo } from 'react';
import { useEditorContext } from './useEditorContext';

export function useDialog() {
  const { pageData } = useEditorContext();
  const [{ value: dialogUid, }, , hepler] = useField<string>('dialogUid');

  const dialogList = useMemo(() => {
    return pageData.children.filter(item => item.type === BasicType.DIALOG) as IDialog[];
  }, [pageData]);

  const openDialog = useCallback((uid: string) => {
    hepler.setValue(uid);
  }, [hepler]);

  const closeDialog = useCallback(() => {
    hepler.setValue('');
  }, [hepler]);

  return {
    dialogList,
    dialogUid,
    openDialog,
    closeDialog
  };
}