import { VisualEditorProps } from '@/components/VisualEditorProvider';
import { useFormikContext } from 'formik';

export function useEditorContext() {
  const formikContext = useFormikContext<VisualEditorProps>();
  const { pageIndex, pages } = formikContext.values;
  const pageData = pages[pageIndex];
  return {

    ...formikContext,
    pageData,
  };
}
