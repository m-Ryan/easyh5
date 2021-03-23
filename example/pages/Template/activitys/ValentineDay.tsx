import { ActionBus } from '@/utils/ActionBus';
import React, { useEffect } from 'react';

import withTemplate from '../components/BasicTemplate';

export default withTemplate(() => {

  useEffect(() => {

    ActionBus.on('formSubmit', (data) => {
      console.log('data', data);
    });
  }, []);

  return <></>;
});