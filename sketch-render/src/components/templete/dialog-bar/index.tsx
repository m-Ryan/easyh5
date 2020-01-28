import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo
} from 'react';
import styles from './index.module.scss';

import { Checkbox } from 'antd';
import { useSelector } from '@/modal';
import _ from 'lodash';

export const DialogBar = () => {
  const { dialogList, dialogId, setDialogShow } = useSelector('article');


  const onChangeShow = useCallback((id: number) => {
    if (dialogId === id) {
      setDialogShow(0);
    } else {
      setDialogShow(id);
    }
  }, [dialogId, setDialogShow])

  return useMemo(() => {
    return (
      <div
        className={styles.sideBar}
      >
        {
          dialogList.map((item => {
            const uid = item.data.value.uid;
            return (
              <Checkbox key={item.id} onChange={() => onChangeShow(uid)} className={styles.barItem} checked={dialogId === item.data.value.uid} value={uid}>{item.data.value.title}</Checkbox>
            )
          }))
        }
      </div>

    );
  }, [dialogId, dialogList, onChangeShow]);
};
