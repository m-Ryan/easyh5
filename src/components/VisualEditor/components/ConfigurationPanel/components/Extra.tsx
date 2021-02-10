import { Stack } from '@/components/Stack';
import React from 'react';
import { Animation } from './Animation';
import { Link } from './Link';

export function Extra() {
  return (
    <Stack vertical>
      <Link />
      <Animation />
    </Stack>
  );
}