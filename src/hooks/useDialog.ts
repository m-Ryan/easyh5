import { IDialog } from '@/components/core/blocks/basic/Dialog';
import { VisualEditorProps } from '@/components/VisualEditorProvider';
import { BasicType } from '@/constants';
import { useField, useFormikContext } from 'formik';
import { useCallback, useMemo } from 'react';

export function useDialog() {
  const formikContext = useFormikContext<VisualEditorProps>();
  const { pageIndex, pages } = formikContext.values;
  const pageData = pages[pageIndex];
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