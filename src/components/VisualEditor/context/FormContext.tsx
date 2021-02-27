import { ITemplate } from '@/store/template';
import { PAGE_TEMPORARY_IDX } from '@VisualEditor/constants';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import React, { useCallback, useContext, useMemo } from 'react';

let formId = 0;
export const FormContext = React.createContext({
  id: `formId-${formId++}`
});

const getTouchedObj = (errors: any) => {
  const touched: any = {};
  Object.keys(errors).map(key => {
    if (Array.isArray(errors[key])) {
      errors[key].map((val: any, index: any) => {
        if (index == 0) touched[key] = [];
        touched[key].push(getTouchedObj(val));
      });
    } else {
      touched[key] = true;
    }
  });

  return touched;
};

export function useFormContext() {
  const context = useContext(FormContext);
  const { values, errors, setTouched, touched } = useFormikContext<ITemplate>();

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
    return getFormValues()?.[name];
  }, [getFormValues]);

  const handleSubmit = async () => {
    if (errors && Object.keys(errors).length > 0) {
      const touchedObj = getTouchedObj(errors);
      setTouched(touchedObj, true);
    }

    console.log('handleSubmit', getFormValues());
  };

  const isValid = useMemo(() => {
    const errorObj = get(errors, formName);
    return Boolean(errorObj && Object.keys(errorObj).length > 0);
  }, [errors, formName]);

  const isTouched = useMemo(() => {
    return get(touched, formName);
  }, [formName, touched]);

  return { getFieldName, getFieldValue, handleSubmit, isValid, isTouched };
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