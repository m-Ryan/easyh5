import { Stack } from '@/components/Stack';
import React from 'react';
import { Animation } from './Animation';
import { Link } from './Link';
import { Variable } from './Variable';

export function Extra() {
  return (
    <Stack vertical>
      <Link />
      <Animation />
      <Variable />
    </Stack>
  );
}
