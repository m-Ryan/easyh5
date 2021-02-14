import React, { useMemo } from 'react';
import { TreeSelectField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { actions } from '@VisualEditor/config/actions';
import { getFormatAction } from '@VisualEditor/utils/actions';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { useDialog } from '@VisualEditor/hooks/useDialog';

export function Actions() {
  const { focusIdx } = useEditorContext();
  const { dialogList } = useDialog();

  const options = useMemo(() => {
    return actions.map(item => ({
      value: item.name,
      label: item.label,
      selectable: false,
      options:
        item.name === 'dialog'
          ? dialogList.map(dialog => ({
            value: getFormatAction(item.name, dialog.data.value.uid),
            label: dialog.data.value.name
          }))
          : item.actions.map(action => ({
            value: getFormatAction(item.name, action.name),
            label: action.label,
          }))
    }));

  }, [dialogList]);

  return (
    <Stack spacing='none'>
      <TreeSelectField title="动作"
        treeDefaultExpandAll
        style={{ width: 200 }} label='绑定动作'
        name={`${focusIdx}.data.action`}
        inline options={options}

      />
    </Stack>
  );
}
