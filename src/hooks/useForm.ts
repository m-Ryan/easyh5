import { IForm } from '@/components/core/blocks/form/Form';
import { VisualEditorProps } from '@/components/VisualEditorProvider';
import { FormType } from '@/constants';
import { useFormikContext } from 'formik';
import { useMemo } from 'react';

export function useForm() {
  const formikContext = useFormikContext<VisualEditorProps>();
  const { pageIndex, pages } = formikContext.values;
  const pageData = pages[pageIndex];

  const formList = useMemo(() => {
    return pageData.children.filter(item => item.type === FormType.FORM) as IForm[];
  }, [pageData]);

  return {
    formList,
  };
}