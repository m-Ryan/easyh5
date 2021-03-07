import { IDialog } from '@VisualEditor/components/blocks/basic/Dialog';
import { BasicType } from '@VisualEditor/constants';
import { INodeItem } from '@VisualEditor/typings';
import { useField } from 'formik';
import { useCallback, useMemo } from 'react';

export function useDialog() {
  const [{ value }] = useField<INodeItem>('content.[0]');
  const [{ value: dialogUid, }, , hepler] = useField<string>('dialogUid');

  const dialogList = useMemo(() => {
    return value.children.filter(item => item.type === BasicType.DIALOG) as IDialog[];
  }, [value]);

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