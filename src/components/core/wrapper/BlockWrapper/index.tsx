import { classnames } from '@/utils/classnames';
import { BLOCK_HOVER_CLASSNAME, BLOCK_SELECTED_CLASSNAME } from '@/constants';
import { ToolBar } from '@/Editor/components/ToolBar';
import { useEditorContext } from '@/hooks/useEditorContext';
import { findBlockByType, getValueByIdx } from '@/utils/block';
import { Tooltip } from 'antd';
import React, { DOMAttributes, useState } from 'react';

interface BlockWrapperProps extends DOMAttributes<HTMLDivElement> {
  children: React.ReactElement;
  idx: string;
}
export function BlockWrapper(props: BlockWrapperProps) {
  const [isHover, setIsHover] = useState(false);
  const { idx, children } = props;
  const {
    focusIdx,
    values,
    setFocusIdx
  } = useEditorContext();

  const node = getValueByIdx(values, idx)!;
  const block = findBlockByType(node.type);
  const isFocus = focusIdx === idx;

  const content = React.createElement(children.type, {
    ...children.props,
    ...props,
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      setFocusIdx(idx);
    },
    ['data-node-type']: node.type,
    ['data-node-idx']: idx,
    style: {
      ...(children.props.style || {}),
      ...node.style,
      cursor: 'grab'
    },
    className: classnames(isHover && BLOCK_HOVER_CLASSNAME, isFocus && BLOCK_SELECTED_CLASSNAME, children.props.className),
  });

  const onHover = (visible: boolean) => {
    setIsHover(visible);
  };

  return isFocus ? (
    <Tooltip
      key={1}
      placement="topLeft"
      visible={true}
      title={<ToolBar />
      }
    >
      {content}
    </Tooltip>
  ) : (
      <Tooltip
        key={2}
        placement="leftTop"
        title={block?.name}
        onVisibleChange={onHover}
      >
        {content}
      </Tooltip>
    );

}
