import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo
} from 'react';
import styles from './index.module.scss';

import { Radio, Button, message, Tooltip, Popconfirm } from 'antd';
import { UpOutlined, DownOutlined, UpSquareOutlined, DownSquareOutlined, CopyOutlined, CloseOutlined } from '@ant-design/icons';
import _, { cloneDeep } from 'lodash';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';

type SideBarItem = {
  icon: React.ReactNode;
  title: string;
  method: () => void;
  confirm?: boolean;
};

export const ToolBar = () => {

  const { moveByIdx, getSiblingIdx, focusBlock, copyBlock, removeBlock, focusIdx, setFocusIdx, getParentIdx, isExistBlock } = useEditorContext();

  const sidebarList = useMemo((): SideBarItem[] => {

    return [
      {
        icon: <UpOutlined />,
        title: '上移',
        method() {
          moveByIdx(focusIdx, getSiblingIdx(focusIdx, -1));
        }
      },
      {
        icon: <DownOutlined />,
        title: '下移',
        method() {
          moveByIdx(focusIdx, getSiblingIdx(focusIdx, 1));
        }
      },
      {
        icon: <UpSquareOutlined />,
        title: '选中父级',
        method() {
          const parentIdx = getParentIdx(focusIdx);
          if (parentIdx) {
            setFocusIdx(parentIdx);
          }

        }
      },
      {
        icon: <DownSquareOutlined />,
        title: '选中子级',
        method() {
          const idx = `${focusIdx}.children.[0]`;
          const childBlock = isExistBlock(idx);
          if (childBlock) {
            setFocusIdx(idx);
          }
        }
      },
      {
        icon: <CopyOutlined />,
        title: '复制',
        method() {
          copyBlock(focusIdx);
        }
      },
      {
        icon: <CloseOutlined />,
        title: '删除',
        confirm: true,
        method() {
          removeBlock(focusIdx);
        }
      }
    ];
  }, [copyBlock, focusIdx, getParentIdx, getSiblingIdx, isExistBlock, moveByIdx, removeBlock, setFocusIdx]);

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
                          {item.icon}
                        </Popconfirm>
                      )
                      : (
                        <span onClick={item.method}>{item.icon}</span>
                      )
                  }

                </Tooltip>
              </li>
            );
          })
        }

      </ul>
    );
  }, [sidebarList]);
};
