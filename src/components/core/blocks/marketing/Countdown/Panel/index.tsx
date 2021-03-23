import React from 'react';
import { CollapsePanels } from '@/components/CollapsePanels';
import { Position } from '@/components/ConfigurationPanel/components/Position';
import { useBlock } from '@/hooks/useBlock';
import { Stack } from '@/components/Stack';
import { ColorPickerField, DatePickerField, SelectField } from '@/components/core/Form';
import { getOptionsByStringArray } from '@/utils/getOptionsByStringArray';
import moment from 'moment';
import 'moment/locale/zh-cn';

const options = getOptionsByStringArray([
  'date',
  'hour',
]);

export function Panel() {
  const { focusIdx } = useBlock();
  return (
    <CollapsePanels options={[
      {
        title: '弹窗配置',
        children: (
          <Stack vertical>
            <SelectField
              label='日期类型'
              name={`${focusIdx}.data.value.type`}
              options={options}
              inline
            />
            <ColorPickerField inline label="字体颜色" name={`${focusIdx}.data.value.gridColor`} />
            <ColorPickerField inline label="背景颜色" name={`${focusIdx}.data.value.gridBgColor`} />
            <DatePickerField showTime allowClear={false} inline label="结束日期" format="YYYY-MM-DD HH:mm" valueAdapter={moment} name={`${focusIdx}.data.value.endTime`} />
          </Stack>
        ),
        active: true,
      },
      {
        title: '位置',
        children: <Position />,
        active: true,
      },

    ]}
    />
  );

}
