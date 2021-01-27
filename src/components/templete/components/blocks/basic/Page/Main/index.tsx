import React from 'react';
import _ from 'lodash';
import { INodeItem } from '@/components/templete/templete.type';
import { useField, FieldArray, FormikProps, Formik } from 'formik';
import { RenderEditorItem } from '@/components/templete/RenderEditor/components/RenderEditorItem';
type IProps = {
  index: string;
};

export function Main(props: IProps) {
  const name = props.index;
  const [field] = useField<INodeItem<any>>(name);
  return (

    <section style={field.value.style} data-node-type={field.value.type} data-node-idx={name}>
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
    </section>
  );
}
