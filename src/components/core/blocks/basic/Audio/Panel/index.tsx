
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
          title: '音频',
          children: (
            <Stack vertical>

              <UploadField
                label='音频地址'
                name={`${focusIdx}.data.value.src`}
                inline
                uploadHandler={uploadHandler}
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

  }, [focusIdx, uploadHandler]);
}
