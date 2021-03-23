import { useFormikContext } from 'formik';
import { IBlockData } from '../typings';
import { useCallback, useMemo } from 'react';
import { getParseAction } from '@/utils/actions';
import { useDialog } from './useDialog';
import { TemplateRenderProps } from '@/components/TemplateRenderProvider';
import { useForm } from './useForm';
import { ActionBus } from '@/utils/ActionBus';
import { get } from 'lodash';

const setDataByVariable = (nodes: IBlockData[], variableMap: { [key: string]: any; }) => {
  nodes.forEach(item => {
    const variable = item.data.variable;
    if (variable) {
      const newVal = get(variableMap, variable);
      item.data.value = newVal;
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

  const variableBlocks = useMemo(() => {
    return pageData.children.filter(item => {
      return Boolean(item.data.variable);
    });
  }, [pageData]);

  const setVariable = useCallback((map: { [key: string]: any; }) => {

    setFormikState(((prevState) => {
      const prevVal = prevState.values;
      Object.assign(prevVal.variableMap, map);
      setDataByVariable(variableBlocks, prevVal.variableMap);
      return { ...prevState };
    }));
  }, [variableBlocks, setFormikState]);

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
        handleSubmit((v) => {
          ActionBus.emit(action, ev, v);
        });
        break;
      default:
        ActionBus.emit(action, ev);
    }
  };

  return {
    ...formikContext,
    pageIndex,
    setVariable,
    onAction,
    temporary,
    variableBlocks,
    pageData,

  };
}

