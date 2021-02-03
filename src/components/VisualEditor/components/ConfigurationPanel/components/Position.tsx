import React, { useMemo } from 'react';
import { SelectField, TextField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useTemplate } from '@VisualEditor/hooks/useTemplate';
import { TextStyle } from '@/components/TextStyle';
import { getOptionsByStringArray } from '@VisualEditor/utils/getOptionsByStringArray';

const positionOptions = getOptionsByStringArray([
  'static',
  'absolute',
  'relative',
  'fixed,'
]);

export function Position() {
  const { focusIdx } = useTemplate();

  return useMemo(() => {
    return (
      <Stack vertical spacing="extraTight">

        <TextStyle variation="strong" size={'large'}>定位</TextStyle>
        <SelectField label="定位方式" name={`${focusIdx}.style.position`} options={positionOptions} inline />
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField label="上" name={`${focusIdx}.style.top`} inline />
          </Stack.Item>
          <Stack.Item fill>
            <TextField label="下" name={`${focusIdx}.style.bottom`} inline />
          </Stack.Item>
        </Stack>

        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField label="左" name={`${focusIdx}.style.left`} inline />
          </Stack.Item>
          <Stack.Item fill>
            <TextField label="右" name={`${focusIdx}.style.right`} inline />
          </Stack.Item>
        </Stack>


      </Stack>
    );
  }, [focusIdx]);
}
