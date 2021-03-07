
import React, { useMemo } from 'react';
import { ImageUploaderField } from '@VisualEditor/components/core/Form';
import { Stack } from '@VisualEditor/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { WidthHeight } from '@VisualEditor/components/ConfigurationPanel/components/WidthHeight';
import { CollapsePanels } from '@VisualEditor/components/CollapsePanels';
import { Extra } from '@VisualEditor/components/ConfigurationPanel/components/Extra';

export function Panel() {
  const { focusIdx, focusBlock } = useEditorContext();

  return useMemo(() => {

    return (
      <CollapsePanels options={[
        {
          title: '图片',
          children: (
            <Stack vertical>

              <ImageUploaderField
                label='图片地址'
                name={`${focusIdx}.data.value`}
                inline
              />
              <WidthHeight />
            </Stack>
          ),
          active: true
        },

        {
          title: '额外',
          children: <Extra />,
          active: true,
        },
      ]}
      />
    );

  }, [focusIdx]);
}
