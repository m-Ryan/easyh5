import { BlockType } from '@VisualEditor/constants';

export function createInstance() {
  return {
    type: BlockType.PARAGRAPH,
    data: {
      value: ''
    },
    style: {
      width: '100%',
      zIndex: 1,
      position: 'relative',
      fontSize: 14,
      left: 0,
      top: 0,
    },
    children: [
      {
        type: BlockType.TEXT,
        data: {
          value: '可视化编辑器是MediaWiki扩展程序，一种向维基百科提供“可视化”或“所见即所得”式在线多信息文本编辑器，由维基媒体基金会和Wikia共同开发。测试版在默认情况下启用，该功能2013年7月起在Mediawiki.org和维基百科多个大型语言版本可选择性撤销。'
        },
        style: {
          width: '100%',
          zIndex: 1,
          position: 'relative',
          fontSize: 14,
          left: 0,
          top: 0,
        },
        children: []
      }
    ]
  };

}