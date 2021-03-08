import React from 'react';
import { IImage } from '..';
import { useField } from 'formik';
import { Picture } from '@/components/Picture';
import { RenderItem } from '@/Renderer/components/RenderItem';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [field] = useField<IImage>(props.idx);
  return (

    <div
      data-node-type={field.value.type}
      data-node-idx={props.idx}
      style={field.value.style}
    >
      <Picture src={field.value.data.value} style={{ width: '100%', height: '100%', }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
        {field.value.children.map((item, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return <RenderItem key={childIndex} idx={childIndex} />;
        })}
      </div>

    </div>
  );
}
