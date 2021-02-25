import { ITemplate } from '@/store/template';
import { PAGE_TEMPORARY_IDX } from '@VisualEditor/constants';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import React, { useCallback, useContext, useMemo } from 'react';

let formId = 0;
export const FormContext = React.createContext({
  id: `formId-${formId++}`
});

export function useFormContext() {
  const context = useContext(FormContext);
  const { values } = useFormikContext<ITemplate>();

  const formName = useMemo(() => {
    return PAGE_TEMPORARY_IDX + '.' + context.id;
  }, [context.id]);

  const getFormValues = useCallback(() => {
    return get(values, formName);
  }, [formName, values]);

  const getFieldName = useCallback((name: string) => {
    return formName + '.' + name;
  }, [formName]);

  const getFieldValue = useCallback((name: string) => {
    return getFormValues()?.name;
  }, [getFormValues]);

  const handleSubmit = () => {
    console.log('handleSubmit', getFormValues());
  };

  return { getFieldName, getFieldValue, handleSubmit };
}

export interface FormProvierProps {
  children: React.ReactNode;
}
export function FormProvier(props: FormProvierProps) {
  const id = useMemo(() => `formId-${formId++}`, []);
  return (
    <FormContext.Provider value={{ id }}>
      {props.children}
    </FormContext.Provider>
  );
}