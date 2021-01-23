import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo
} from 'react';
import styles from './index.module.scss';

import { Radio, Button, message, Icon, Tooltip, Popconfirm } from 'antd';
import { useSelector } from '@/modal';
import _ from 'lodash';

type SideBarItem = {
  type: string;
  title: string;
  method: () => void;
  confirm?: boolean;
}

export const SideBar = () => {
  const { copyItem, switchPosition, deleteItem, focusElement, setFocusParent, setFocusSon } = useSelector('article');

  const sidebarList = useMemo((): SideBarItem[] => {
    if (!focusElement) return [];

    return [
      {
        type: 'up',
        title: '上移',
        method() {
          switchPosition(-1);
        }
      },
      {
        type: 'down',
        title: '下移',
        method() {
          switchPosition(1);
        }
      },
      {
        type: 'up-square',
        title: '父级',
        method() {
          setFocusParent();
        }
      },
      {
        type: 'down-square',
        title: '子级',
        method() {
          setFocusSon();
        }
      },
      {
        type: 'copy',
        title: '复制',
        method() {
          copyItem();
        }
      },
      {
        type: 'close',
        title: '删除',
        confirm: true,
        method() {
          deleteItem();
        }
      }
    ]
  }, [copyItem, deleteItem, focusElement, setFocusParent, setFocusSon, switchPosition])


  return useMemo(() => {
    return (

      <ul className={styles.sideBar}>
        {
          sidebarList.map(item => {
            return (
              <li key={item.title} className={styles.barItem}>
                <Tooltip placement="right" title={item.title}>
                  {
                    item.confirm
                      ? (
                        <Popconfirm
                          title={`你确定要${item.title}吗`}
                          onConfirm={item.method}
                          okText="确定"
                          cancelText="取消"
                        >
                          <Icon type={item.type} />
                        </Popconfirm>
                      )
                      : (
                        <Icon type={item.type} onClick={item.method} />
                      )
                  }

                </Tooltip>
              </li>
            )
          })
        }

      </ul>
    );
  }, [sidebarList]);
};
