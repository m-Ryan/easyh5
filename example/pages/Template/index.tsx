import { ActionBus } from '@/utils/ActionBus';
import React, { useEffect } from 'react';
import { message, notification } from 'antd';
import jsonFormat from 'json-format';
import withTemplate from './components/BasicTemplate';

export default withTemplate(() => {

  useEffect(() => {

    ActionBus.on('formSubmit', (data) => {
      const args = {
        message: '您当前提交的信息为：',
        description:
          <p style={{ whiteSpace: 'pre-wrap' }}>{
            jsonFormat(data.payload, {
              type: 'space',
              size: 2
            })
          }
          </p>,
        duration: 0,
      };
      notification.open(args);
    });

    ActionBus.on('DragonBoatFestival', (data) => {
      console.log('data.actionName', data.actionName);
      if (data.actionName === 'start_game') {
        message.warning('游戏暂未开始');
      }

    });
  }, []);

  return <></>;
});