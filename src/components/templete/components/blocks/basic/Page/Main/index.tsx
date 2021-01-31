import React from 'react';
import _ from 'lodash';
import { INodeItem } from '@/components/templete/templete.type';
import { useField, FieldArray, FormikProps, Formik } from 'formik';
import { RenderEditorItem } from '@/components/templete/RenderEditor/components/RenderEditorItem';
type IProps = {
  idx: string;
};

export function Main(props: IProps) {
  const [field] = useField<INodeItem<any>>(props.idx);
  return (

    <section style={field.value.style} data-node-type={field.value.type} data-node-idx={props.idx}>
      <FieldArray
        name={props.idx}
        render={arrayHelpers => {

          return (
            <>
              {
                field.value.children.map((item, idx) => {
                  const childIndex = `${props.idx}.children.[${idx}]`;
                  return <RenderEditorItem key={childIndex} idx={childIndex} />;
                })
              }
            </>
          );
        }}
      />
    </section>
  );
}
