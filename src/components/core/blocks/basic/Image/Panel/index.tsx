
import React, { useMemo } from 'react';
import { ImageUploaderField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { WidthHeight } from '@/components/ConfigurationPanel/components/WidthHeight';
import { CollapsePanels } from '@/components/CollapsePanels';
import { Extra } from '@/components/ConfigurationPanel/components/Extra';
import { useEditorContext } from '@/hooks/useEditorContext';

export function Panel() {
  const { focusIdx } = useBlock();
  const { values: { props: { uploadHandler } } } = useEditorContext();

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
                uploadHandler={uploadHandler}
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

  }, [focusIdx, uploadHandler]);
}
