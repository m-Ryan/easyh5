import React, { useMemo } from 'react';
import { TreeSelectField } from '@/components/core/Form';
import { actions } from '@/config/actions';
import { getFormatAction } from '@/utils/actions';
import { useDialog } from '@/hooks/useDialog';
import { useBlock } from '@/hooks/useBlock';
import { useForm } from '@/hooks/useForm';

export function Actions() {
  const { focusIdx } = useBlock();
  const { dialogList } = useDialog();
  const { formList } = useForm();

  const options = useMemo(() => {

    return actions.map(item => {
      let options = item.actions.map(action => ({
        value: getFormatAction(item.name, action.name),
        label: <span style={{ fontSize: 12 }}>{item.label + '-' + action.label}</span>,
      }));

      if (item.name === 'dialogOpen' || item.name === 'dialogClose') {
        options = dialogList.map(dialog => ({
          value: getFormatAction(item.name, dialog.data.value.uid),
          label: <span style={{ fontSize: 12 }}>{item.label + '-' + dialog.data.value.name}</span>
        }));
      }

      if (item.name === 'formSubmit') {
        options = formList.map(dialog => ({
          value: getFormatAction(item.name, dialog.data.value.uid),
          label: <span style={{ fontSize: 12 }}>{item.label + '-' + dialog.data.value.name}</span>
        }));
      }

      return {
        value: item.name,
        label: item.label,
        selectable: item.name === 'none',
        options
      };
    });

  }, [dialogList, formList]);

  return (
    <TreeSelectField title="动作"
      treeDefaultExpandAll
      style={{ width: '100%' }} label='绑定动作'
      name={`${focusIdx}.data.action`}
      inline options={options}

    />
  );
}
