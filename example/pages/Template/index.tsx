import { useRendererContext } from '@/index';
import React, { useEffect } from 'react';

import withTemplate from './components/BasicTemplate';

export default withTemplate(() => {

  const { setVariable } = useRendererContext();

  useEffect(() => {
    setVariable({
      'user-nickname': 'Ryan mao'
    });
  }, [setVariable]);

  return <div>111</div>;
});