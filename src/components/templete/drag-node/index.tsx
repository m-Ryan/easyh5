import React, { useCallback, useMemo, useEffect } from 'react';
import { INodeItem, INodeStyle } from '@/components/templete/templete.type';
import { onDrag } from '@/util/onDrag';
import { useField } from 'formik';

export const DragNode = ({
  children,
  name
}: {
  children: React.ReactElement;
  name: string;
}) => {
  const [{ value: focusIdx }, , { setValue: setFocusIdx }] = useField<string>('focusIdx');
  const [{ value: element }, , helpers] = useField<INodeItem<any>>(name);


  const onMouseDown =
    (event: MouseEvent) => {
      event.stopPropagation();
      const newStyle = { ...element.style };
      setFocusIdx(name);
      onDrag({
        event,
        onMove(diffX, diffY) {
          element.style.left = newStyle.left + diffX;
          element.style.top = newStyle.top + diffY;
          helpers.setValue(element);
        }
      });
    };

  const isFocus = focusIdx === name;
  return React.createElement(children.type, {
    ...children.props,
    onMouseDown,
    ['data-node-type']: element.type,
    ['data-node-idx']: name,
    style: {
      ...(children.props.style || {}),
      ...element.style,
      outline: isFocus
        ? 'solid red'
        : element.style.boxShadow
    }
  });

};
