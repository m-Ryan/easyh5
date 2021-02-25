import { useField, useFormikContext } from 'formik';
import { INodeItem } from '../typings';
import { useCallback } from 'react';
import { ITemplate } from '@/store/template';
import { get } from 'lodash';
import { getParseAction } from '@VisualEditor/utils/actions';
import { useDialog } from './useDialog';
import { IPage } from '@VisualEditor/components/blocks/basic/Page';

const setDataByVariable = (nodes: INodeItem[], variableMap: { [key: string]: any; }) => {
  nodes.forEach(item => {
    const variable = item.data.variable;
    if (variable && variableMap[variable]) {
      item.data.value = variableMap[variable];
    }
    setDataByVariable(item.children, variableMap);
  });
};

export interface RendererTemplate extends Omit<ITemplate, 'focusIdx'> {

}

export function useRendererContext() {
  const pageIdx = 'content.[0]';
  const [{ value: pageValue }] = useField<IPage>(pageIdx);
  const temporary = pageValue.data.value.temporary;
  const { setFormikState, setValues, initialValues, values } = useFormikContext<RendererTemplate>();

  const { openDialog, closeDialog } = useDialog();

  const setVariable = useCallback((map: { [key: string]: any; }) => {

    setFormikState(((prevState) => {
      const prevVal = prevState.values;
      Object.assign(prevVal.variableMap, map);
      setDataByVariable(prevVal.content, prevVal.variableMap);
      return { ...prevState };
    }));
  }, [setFormikState]);

  const getValueByIdx = <T extends any>(idx: string): INodeItem<T> | null => {
    return get(values, idx);
  };

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
    initialValues,
    setValues,
    setVariable,
    getValueByIdx,
    onAction,
    pageIdx,
    pageValue,
    temporary
  };
}

