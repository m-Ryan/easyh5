import { IForm } from '@/components/core/blocks/form/Form';
import { TemplateRenderProps } from '@/components/TemplateRenderProvider';
import { VisualEditorProps } from '@/components/VisualEditorProvider';
import { FormType } from '@/constants';
import { FormContext } from '@/context/FormContext';
import { useFormikContext } from 'formik';
import { get } from 'lodash';
import { useCallback, useContext, useMemo } from 'react';

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

export function useForm<T extends { [key: string]: any; }>() {
  const formikContext = useFormikContext<VisualEditorProps>();
  const { pageIndex, pages } = formikContext.values;
  const pageData = pages[pageIndex];

  const formList = useMemo(() => {
    return pageData.children.filter(item => item.type === FormType.FORM) as IForm[];
  }, [pageData]);

  const context = useContext(FormContext);
  const { values, errors, setTouched, touched, validateForm } = formikContext;

  const formName = useMemo(() => {
    return 'temporary' + '.' + context.uid;
  }, [context.uid]);

  const getFormValues = useCallback(() => {
    return get(values, formName) as T;
  }, [formName, values]);

  const getFieldName = useCallback((name: string) => {
    return formName + '.' + name;
  }, [formName]);

  const getFieldValue = useCallback((name: string) => {
    return getFormValues()?.[name];
  }, [getFormValues]);

  const handleSubmit = async (submitHandle: (value: T) => any) => {
    const validateError = await validateForm(values);
    const hasError = validateError && Object.keys(validateError).length > 0;
    if (hasError) {
      const touchedObj = getTouchedObj(validateError);
      setTouched(touchedObj, true);
    } else {
      submitHandle(getFormValues());
    }

  };

  const isValid = useMemo(() => {
    const errorObj = get(errors, formName);
    if (!errorObj) return true;
    return Object.keys(errorObj).length === 0;
  }, [errors, formName]);

  const isTouched = useMemo(() => {
    return get(touched, formName);
  }, [formName, touched]);

  return { getFieldName, getFieldValue, handleSubmit, isValid, isTouched, formList };

}