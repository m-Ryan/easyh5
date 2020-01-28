export enum NodeType {
	BLOCK = 'block',
	TEXT = 'text',
	BITMAP = 'bitmap',
	PLAIN_TEXT = 'plain_text'
}

export enum CustomComponentType {
	VideoPlayer = 'video',
	SliderNumber = 'sliderNumber',
	Swiper = 'swiper',
	Turntable = 'turntable',
  Scratchcard = 'scratchcard',
  // 可修改的
  Countdown = 'countdown',
  Dialog = 'dialog',

  // 营销组件
  Example1List = 'example1List'
}

export const tranformProperty = [
  'width',
  'height',
  'left',
  'top',
  'fontSize',
  'lineHeight',
  'borderWidth',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'transform'
];

export const none = {
  name: 'none',
  comment: '无',
  actions: [],
  variable: []
};

/**
 * 
 */
export const common = {
  name: 'common',
  comment: '通用',
  actions: [
    
  ],
  variable: []
};

export const example1 = {
  name: 'example1',
  comment: '粽子活动1',
  variable: [
    {
      name: 'scratchcard',
      comment: '中奖图'
    },
    {
      name: 'day',
      comment: '天'
    },
    {
      name: 'hour',
      comment: '时'
    },
    {
      name: 'minute',
      comment: '分'
    },
    {
      name: 'second',
      comment: '秒'
    },
    {
      name: 'milliseconds',
      comment: '毫秒'
    }
  ],
  actions: [
    {
      name: 'scratchcard',
      comment: '刮卡回调'
    }
  ]
  
};

export const example2 = {
  name: 'example2',
  comment: '测试2-转盘',
  actions: [
    {
      name: 'draw',
      comment: '抽奖'
    }
  ],
  variable: [
    {
      name: 'turnable',
      comment: '转盘'
    }
  ]
};

export const dialog = {
  name: 'dialog',
  comment: '打开弹窗',
  actions: [],
  variable: []
};


export const componentActionMap = {
  none,
  common,
  dialog,
  example1,
  example2
};

export type IComponentActionMap = typeof componentActionMap;

export type IComponentActionMapKey = keyof IComponentActionMap;
export type IComponentActionMapActionKey = keyof IComponentActionMap[keyof IComponentActionMap]['actions']