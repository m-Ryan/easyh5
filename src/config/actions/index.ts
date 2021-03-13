import { dialogClose, dialogOpen } from './dialog';
import { formSubmit } from './form';

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
    dialogOpen,
    formSubmit
  ];