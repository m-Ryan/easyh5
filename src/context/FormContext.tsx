import { ITemplate } from '@/store/template';
import { PAGE_TEMPORARY_IDX } from '@/constants';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import React, { useCallback, useContext, useMemo } from 'react';

let formId = 0;
export const FormContext = React.createContext({
  id: `formId-${formId++}`
});

const getTouchedObj = (errors: any) => {
  const touched: any = {};
  for (let key in errors) {
    const errorObject = errors[key];
    if (typeof errorObject === 'string') {
      touched[key] = true;
    } else if (Array.isArray(errorObject)) {
      touched[key] = errorObject.map(getTouchedObj);
    } else {
      touched[key] = {};
      for (let childKey in errorObject) {
        touched[key][childKey] = getTouchedObj(errorObject[childKey]);
      }
    }
  }
  return touched;
};

export function useFormContext() {
  const context = useContext(FormContext);
  const { values, errors, setTouched, touched, validateForm } = useFormikContext<ITemplate>();

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
    const validateError = await validateForm(values);
    if (validateError && Object.keys(validateError).length > 0) {
      const touchedObj = getTouchedObj(validateError);
      setTouched(touchedObj, true);
    }

    console.log('handleSubmit', getFormValues());
  };

  const isValid = useMemo(() => {
    const errorObj = get(errors, formName);
    if (!errorObj) return true;
    return Object.keys(errorObj).length === 0;
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