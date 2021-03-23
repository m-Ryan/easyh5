import { Stack } from '@/components/Stack';
import React from 'react';
import { Actions } from './Actions';
import { Animation } from './Animation';
import { Link } from './Link';
import { Variables } from './Variables';

export function Extra() {
  return (
    <div id="ConfigurationPanel-extra">
      <Stack vertical>
        <Variables />
        <Actions />
        <Link />
        <Animation />
      </Stack>
    </div>
  );
}
