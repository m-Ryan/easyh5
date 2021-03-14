import { useFormikContext } from 'formik';
import { INodeItem } from '../typings';
import { useCallback } from 'react';
import { getParseAction } from '@/utils/actions';
import { useDialog } from './useDialog';
import { TemplateRenderProps } from '@/components/TemplateRenderProvider';
import { useForm } from './useForm';

const setDataByVariable = (nodes: INodeItem[], variableMap: { [key: string]: any; }) => {
  nodes.forEach(item => {
    const variable = item.data.variable;
    if (variable && variableMap[variable]) {
      item.data.value = variableMap[variable];
    }
    setDataByVariable(item.children, variableMap);
  });
};

export function useRendererContext() {
  const formikContext = useFormikContext<TemplateRenderProps>();
  const { values, setFormikState } = formikContext;
  const { pageIndex, pages, temporary } = values;
  const pageData = pages[pageIndex];

  const { openDialog, closeDialog } = useDialog();
  const { handleSubmit } = useForm();

  const setVariable = useCallback((map: { [key: string]: any; }) => {

    setFormikState(((prevState) => {
      const prevVal = prevState.values;
      Object.assign(prevVal.variableMap, map);
      setDataByVariable([pageData], prevVal.variableMap);
      return { ...prevState };
    }));
  }, [pageData, setFormikState]);

  const onAction = (ev: MouseEvent, action: string) => {
    const { group, name } = getParseAction(action);
    switch (group) {
      case 'dialogOpen':
        openDialog(name);
        break;
      case 'dialogClose':
        closeDialog();
        break;
      case 'formSubmit':
        handleSubmit((v) => console.log(v));
        break;
    }
  };

  return {
    ...formikContext,
    pageIndex,
    setVariable,
    onAction,
    temporary,
    pageData,

  };
}

