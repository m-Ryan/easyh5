import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo
} from 'react';
import styles from './index.module.scss';

import { Tooltip, Popconfirm } from 'antd';
import { UpOutlined, DownOutlined, UpSquareOutlined, DownSquareOutlined, CopyOutlined, CloseOutlined, BorderOuterOutlined } from '@ant-design/icons';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { Stack } from '@/components/Stack';

type SideBarItem = {
  icon: React.ReactNode;
  title: string;
  method: () => void;
  confirm?: boolean;
  toolTip?: React.ReactNode;
};

export const ToolBar = () => {

  const { moveByIdx, getSiblingIdx, focusBlock, copyBlock, removeBlock, focusIdx, setFocusIdx, getParentIdx, isExistBlock } = useEditorContext();

  const sidebarList = useMemo(() => {
    if (!focusBlock) return [];
    const hasChildren = focusBlock.children.length > 0;
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
      hasChildren && {
        icon: <DownSquareOutlined />,
        title: '选中子级',
        toolTip: (
          <Stack>            {
            focusBlock.children.map((item, index) => {
              return <Tooltip key={index} placement="topLeft" title={`选中子节点 ${index + 1}`}><BorderOuterOutlined onClick={() => setFocusIdx(`${focusIdx}.children.[${index}]`)} /></Tooltip>;
            })
          }
          </Stack>
        ),
        method() { }
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
    ].filter(item => !!item) as SideBarItem[];
  }, [copyBlock, focusBlock, focusIdx, getParentIdx, getSiblingIdx, moveByIdx, removeBlock, setFocusIdx]);

  return useMemo(() => {
    return (

      <ul className={styles.sideBar}>
        {
          sidebarList.map(item => {
            return (
              <li key={item.title} className={styles.barItem}>
                <Tooltip placement="right" title={item.toolTip || item.title}>
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
