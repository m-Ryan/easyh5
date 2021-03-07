import React, {
  useMemo
} from 'react';
import styles from './index.module.scss';

import { Checkbox } from 'antd';
import { useDialog } from '@VisualEditor/hooks/useDialog';

export const DialogBar = () => {
  const { dialogList, dialogUid, openDialog } = useDialog();

  return useMemo(() => {
    return (
      <div className={styles.sideBar}>
        <Checkbox.Group value={[dialogUid]}
          options={dialogList.map(item => {
            return { label: item.data.value.name, value: item.data.value.uid };
          })}
          onChange={(uids) => {
            const selectedId = uids.filter(uid => uid !== dialogUid)[0] as string | undefined;
            openDialog(selectedId ? selectedId : '');
          }}
        />

      </div>

    );
  }, [dialogList, dialogUid, openDialog]);
};
