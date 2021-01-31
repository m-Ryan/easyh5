import React from 'react';
import _ from 'lodash';
import { useTemplate } from '@/components/templete/hooks/useTemplate';
import { RenderEditorItem } from '@/components/templete/RenderEditor/components/RenderEditorItem';
import Draggable from '@/components/templete/components/Draggable';
import { useField } from 'formik';
import { INodeItem } from '@/components/templete/templete.type';

type IProps = {
  idx: string;
};

export function Main(props: IProps) {
  const [{ value },] = useField<INodeItem<{}>>(props.idx);

  return (

    <Draggable idx={props.idx} data={value}>
      <section
        style={{ ...value.style }}
      >
        {
          value.children.map((_, index) => {
            const childIndex = `${props.idx}.children.[${index}]`;
            return <RenderEditorItem key={childIndex} idx={childIndex} />;
          })
        }
      </section>
    </Draggable>
  );
}


