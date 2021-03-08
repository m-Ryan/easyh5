import React from 'react';
import { IImage } from '..';
import { useField } from 'formik';
import Moveable from '@/components/core/wrapper/Moveable';
import { Picture } from '@/components/Picture';
import { EditorItem } from '@/Editor/components/EditorItem';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [field] = useField<IImage>(props.idx);
  return (
    <Moveable idx={props.idx}>
      <div>
        <Picture src={field.value.data.value} style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
          {field.value.children.map((item, index) => {
            const childIndex = `${props.idx}.children.[${index}]`;
            return <EditorItem key={childIndex} idx={childIndex} />;
          })}
        </div>
      </div>
    </Moveable>
  );
}
