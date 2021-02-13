import { useFormikContext } from 'formik';
import { INodeItem } from '../typings';
import { useCallback } from 'react';
import { ITemplate } from '@/store/template';

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
  const { setFormikState, setValues, initialValues, } = useFormikContext<RendererTemplate>();

  const setVariable = useCallback((map: { [key: string]: any; }) => {

    setFormikState(((prevState) => {
      const prevVal = prevState.values;
      Object.assign(prevVal.variableMap, map);
      setDataByVariable(prevVal.content, prevVal.variableMap);
      return prevState;
    }));
  }, [setFormikState]);

  return {
    initialValues,
    setValues,
    setVariable
  };
}
