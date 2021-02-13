import { Stack } from '@/components/Stack';
import React from 'react';
import { Actions } from './Actions';
import { Animation } from './Animation';
import { Link } from './Link';
import { Variables } from './Variables';

export function Extra() {
  return (
    <Stack vertical>
      <Link />
      <Animation />
      <Variables />
      <Actions />
    </Stack>
  );
}
