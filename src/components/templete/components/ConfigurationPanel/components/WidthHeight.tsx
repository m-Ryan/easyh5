import React, { useMemo } from 'react';
import { TextField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useTemplate } from '@/components/templete/hooks/useTemplate';
import { InputNumberAdapter } from '@/components/templete/utils/InputNumberAdapter';



export default function WidthHeight() {
  const { focusIdx } = useTemplate();


  return useMemo(() => {
    return (

      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField label="宽" name={`${focusIdx}.style.width`} inline onChangeAdapter={InputNumberAdapter} />
        </Stack.Item>
        <Stack.Item fill>
          <TextField label="高" name={`${focusIdx}.style.height`} inline onChangeAdapter={InputNumberAdapter} />
        </Stack.Item>

      </Stack>
    );
  }, [focusIdx]);
}
