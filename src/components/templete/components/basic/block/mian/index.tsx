import React from 'react';
import _ from 'lodash';
import { DragNode } from '../../../../drag-node';
import { INodeItem } from '@/components/templete/templete.type';
import { IBox } from '../../block';
import { useField, FieldArray, FormikProps, Formik } from 'formik';
import { RenderEditorItem } from '@/components/templete/RenderEditor/components/RenderEditorItem';
type IProps = {
  index: string;
};

export function Main(props: IProps) {
  const name = props.index;
  const [field] = useField<INodeItem<IBox>>(name);
  return (
    <DragNode name={name}>
      <div>
        <FieldArray
          name={name}
          render={arrayHelpers => {

            return (
              <>
                {
                  field.value.children.map((item, index) => {
                    const childIndex = `${props.index}.children.[${index}]`;
                    return <RenderEditorItem key={childIndex} index={childIndex} />;
                  })
                }
              </>
            );
          }}
        />
      </div>
    </DragNode>
  );
}
