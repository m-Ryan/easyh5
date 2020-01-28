import React, { useEffect, useCallback, useMemo, useState } from 'react';

import services from '@/services';
import { useSelector } from '@/modal';
import { message } from 'antd';
import { useCountdown } from '@/components/react-use/useCountdown';
import { actionBus } from '@/components/templete/actionBus';

const example1Id = 74;

function Main() {

  const { updateVariableValue } = useSelector('article');
  const [seconds, setSeconds] = useState(0);
  const { day, hour, minute, second } = useCountdown(seconds)

  useEffect(()=> {
  
    const getData = async ()=> {
      try {
        const data = await services.promotion.getExample1Data();
        setSeconds(data.end_time - new Date().getTime() / 1000);
        updateVariableValue([{
          variable: 'example1-scratchcard',
          value: {
            bitmap: 'http://assets.maocanhua.cn/FpPIbzeWFiXBOuDmFeiZIfTPCiPX',
            lineWidth: 80
          }
        }])
      } catch (error) {
        message.error(error.message);
      }
    }
    getData();

  }, [updateVariableValue]);

  useEffect(()=> {
    // updateVariableValue([
    //   {
    //     variable: "example1-day",
    //     value: day
    //   },
    //   {
    //     variable: "example1-hour",
    //     value: hour
    //   },
    //   {
    //     variable: "example1-minute",
    //     value: minute
    //   },
    //   {
    //     variable :"example1-second",
    //     value: second
    //   }
    // ])
  }, [day, hour, minute, second, updateVariableValue])

  useEffect(()=> {
    actionBus.on('example1', (params) => {
      switch (params.actionName) {
        case 'scratchcard':
          message.success('恭喜你获得杨超越一个！！！');
          break;
      }
    })
    
  }, [])

  return null;

}

export const Example1 = {
  id: example1Id,
  serviceComponent: Main
}