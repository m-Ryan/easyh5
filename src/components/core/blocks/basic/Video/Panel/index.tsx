
import React, { useMemo } from 'react';
import { SwitchField, UploadField } from '@/components/core/Form';
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
          title: '视频',
          children: (
            <Stack vertical>

              <UploadField
                label='视频地址'
                name={`${focusIdx}.data.value.src`}
                inline
                accept="video/*"
                uploadHandler={uploadHandler}
              />
              <SwitchField
                label='静音播放'
                name={`${focusIdx}.data.value.muted`}
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
          active: false,
        },
      ]}
      />
    );

  }, [focusIdx, uploadHandler]);
}
