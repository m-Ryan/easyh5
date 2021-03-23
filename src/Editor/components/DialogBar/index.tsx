import React, {
  useCallback,
  useMemo
} from 'react';
import styles from './index.module.scss';

import { Checkbox } from 'antd';
import { useDialog } from '@/hooks/useDialog';
import { useBlock } from '@/hooks/useBlock';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

export const DialogBar = () => {
  const { dialogList, dialogUid, openDialog } = useDialog();
  const { setFocusIdx } = useBlock();

  const onChange = useCallback((uids: CheckboxValueType[]) => {
    const selectedId = uids.filter(uid => uid !== dialogUid)[0] as string | undefined;
    openDialog(selectedId || '');
    if (selectedId) {
      setTimeout(() => {
        const idx = document.querySelector(`[data-dialog-uid="${selectedId}"]`)?.getAttribute('data-node-idx');
        idx && setFocusIdx(idx);
      }, 300);
    }

  }, [dialogUid, openDialog, setFocusIdx]);

  return useMemo(() => {
    return (
      <div className={styles.sideBar}>
        <Checkbox.Group value={[dialogUid]}
          options={dialogList.map(item => {
            return { label: item.data.value.name, value: item.data.value.uid };
          })}
          onChange={onChange}
        />

      </div>

    );
  }, [dialogList, dialogUid, onChange]);
};
