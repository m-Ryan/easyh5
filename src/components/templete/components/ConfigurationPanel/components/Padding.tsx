import React, { useMemo } from 'react';
import { TextField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useTemplate } from '@/components/templete/hooks/useTemplate';
import { InputNumberAdapter } from '@/components/templete/utils/InputNumberAdapter';
import { TextStyle } from '@/components/TextStyle';



export default function Padding() {
  const { focusIdx } = useTemplate();


  return useMemo(() => {
    return (
      (
        <Stack vertical spacing="extraTight">

          <TextStyle size={'large'}>内边距</TextStyle>
          <Stack wrap={false}>
            <Stack.Item fill>
              <TextField label="上" name={`${focusIdx}.style.paddingTop`} inline onChangeAdapter={InputNumberAdapter} />
            </Stack.Item>
            <Stack.Item fill>
              <TextField label="下" name={`${focusIdx}.style.paddingBottom`} inline onChangeAdapter={InputNumberAdapter} />
            </Stack.Item>
          </Stack>

          <Stack wrap={false}>
            <Stack.Item fill>
              <TextField label="左" name={`${focusIdx}.style.paddingLeft`} inline onChangeAdapter={InputNumberAdapter} />
            </Stack.Item>
            <Stack.Item fill>
              <TextField label="右" name={`${focusIdx}.style.paddingRight`} inline onChangeAdapter={InputNumberAdapter} />
            </Stack.Item>
          </Stack>


        </Stack>
      )
    );
  }, [focusIdx]);
}
