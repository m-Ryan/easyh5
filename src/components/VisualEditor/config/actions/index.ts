import { dialogClose, dialogOpen } from './dialog';

export const actions: Array<{
  name: string;
  label: string;
  actions: {
    name: string;
    label: string;
  }[];
}> = [
    {
      name: 'none',
      label: '无',
      actions: [],
    },
    dialogClose,
    dialogOpen
  ];