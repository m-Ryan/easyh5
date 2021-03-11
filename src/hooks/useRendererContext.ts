import { useField, useFormikContext } from 'formik';
import { INodeItem } from '../typings';
import { useCallback } from 'react';
import { get } from 'lodash';
import { getParseAction } from '@/utils/actions';
import { useDialog } from './useDialog';
import { IPage } from '@/components/core/blocks/basic/Page';
import { TemplateRenderProps } from '@/components/TemplateRenderProvider';

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
  const { values, setFormikState, setValues } = useFormikContext<TemplateRenderProps>();
  const { pageIndex, pages, temporary } = values;
  const pageData = pages[pageIndex];

  const { openDialog, closeDialog } = useDialog();

  const setVariable = useCallback((map: { [key: string]: any; }) => {

    setFormikState(((prevState) => {
      const prevVal = prevState.values;
      Object.assign(prevVal.variableMap, map);
      setDataByVariable([pageData], prevVal.variableMap);
      return { ...prevState };
    }));
  }, [pageData, setFormikState]);

  const onAction = (action: string) => {
    const { group, name } = getParseAction(action);
    switch (group) {
      case 'dialogOpen':
        openDialog(name);
        break;
      case 'dialogClose':
        closeDialog();
        break;

    }
  };

  return {
    pageIndex,
    values,
    setValues,
    setVariable,
    onAction,
    temporary,
    pageData
  };
}

