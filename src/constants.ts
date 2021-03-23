export type BlockType = BasicType | FormType | MarketingType;

// 基础组件
export enum BasicType {
  PAGE = 'page',
  BOX = 'box',
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
  TEXT = 'text',
  PARAGRAPH = 'paragraph',
  DIALOG = 'dialog',
}

// 表单
export enum FormType {
  FORM = 'form',
  INPUT = 'input',
  SWITCH = 'switch',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  SELECT = 'select',
  SUBMIT_BTN = 'submit_button',
}

// 营销组件
export enum MarketingType {
  COUNTDOWN = 'countdown'
}

export const DRAG_HOVER_CLASSNAME = 'block-dragover';
export const DRAG_TANGENT_CLASSNAME = 'block-tangent';
export const BLOCK_SELECTED_CLASSNAME = 'block-selected';
export const BLOCK_HOVER_CLASSNAME = 'block-hover';