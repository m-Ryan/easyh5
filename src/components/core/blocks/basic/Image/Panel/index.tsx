
import React, { useMemo } from 'react';
import { ImageUploaderField, TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { WidthHeight } from '@/components/ConfigurationPanel/components/WidthHeight';
import { CollapsePanels } from '@/components/CollapsePanels';
import { Extra } from '@/components/ConfigurationPanel/components/Extra';
import { useEditorContext } from '@/hooks/useEditorContext';
import { TextStyle } from '@/components/TextStyle';
import { Position } from '@/components/ConfigurationPanel/components/Position';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Margin } from '@/components/ConfigurationPanel/components/Margin';

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
              <TextStyle>图片地址</TextStyle>
              <Stack vertical spacing="none">
                <ImageUploaderField
                  label=''
                  lableHidden
                  name={`${focusIdx}.data.value`}
                  inline
                  uploadHandler={uploadHandler}
                />
                <TextField
                  lableHidden
                  label=""
                  inline
                  name={`${focusIdx}.data.value`}
                />
              </Stack>
              <WidthHeight />
              <Padding />
              <Margin />
              <Position />
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
