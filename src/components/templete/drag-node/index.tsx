import React, { useCallback, useMemo, useEffect } from 'react';
import { INodeItem, INodeStyle } from '@/components/templete/templete.type';
import { onDrag } from '@/util/onDrag';
import { useSelector } from '@/modal';

export const DragNode = ({
  children,
  element
}: {
  children: React.ReactElement;
  element: INodeItem;
}) => {
  const { updateStyle, focusId, setTarget } = useSelector('article');
  const style = element.style;

  const onChangeStyle = useCallback(
    <T extends keyof INodeStyle>(property: T, value: any) => {
      updateStyle(property, value);

    },
    [updateStyle]
  );

  const onMouseDown = useCallback(
      (event: MouseEvent) => {
        event.stopPropagation();
        setTarget(element.id);

        onDrag({
          event,
          onMove(diffX, diffY) {
            onChangeStyle('left', style.left + diffX);
            onChangeStyle('top', style.top + diffY);
          }
        });
      },
      [element.id, onChangeStyle, setTarget, style.left, style.top]
  );

  const isFocus = focusId === element.id;
  return useMemo(() => {
    return React.createElement(children.type, {
      ref: children['ref'],
      ...children.props,
      onMouseDown,
      ['data-node-type']: element.type,
      ['data-node-id']: element.id,
      style: {
        ...(children.props.style || {}),
        ...element.style,
        outline: isFocus
          ? 'solid red'
          : element.style.boxShadow
      }
    });
  }, [children, onMouseDown, element.type, element.id, element.style, isFocus]);
};
