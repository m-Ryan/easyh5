
import React, { useMemo } from 'react';
import { ImageUploaderField, SwitchField, UploadField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@/hooks/useEditorContext';
import { WidthHeight } from '@/components/ConfigurationPanel/components/WidthHeight';
import { CollapsePanels } from '@/components/CollapsePanels';
import { Extra } from '@/components/ConfigurationPanel/components/Extra';

export function Panel() {
  const { focusIdx, focusBlock } = useEditorContext();

  return useMemo(() => {

    return (
      <CollapsePanels options={[
        {
          title: '音频',
          children: (
            <Stack vertical>

              <UploadField
                label='音频地址'
                name={`${focusIdx}.data.value.src`}
                inline
              />
              <SwitchField
                label='控制按钮'
                name={`${focusIdx}.data.value.controls`}
                inline
              />
              <SwitchField
                label='自动播放'
                name={`${focusIdx}.data.value.autoplay`}
                inline
              />
              <SwitchField
                label='循环播放'
                name={`${focusIdx}.data.value.loop`}
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

  }, [focusIdx]);
}
