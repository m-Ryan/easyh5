export type BlockType = BasicType | FormType;

export enum BasicType {
  PAGE = 'page',
  SECTION = 'section',
  BOX = 'box',
  IMAGE = 'image',
  AUDIO = 'audio',
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

export const PAGE_IDX = 'content.[0]';
export const PAGE_TEMPORARY_IDX = 'content.[0].data.value.temporary';

export const DRAG_HOVER_CLASSNAME = 'block-dragover';
export const DRAG_TANGENT_CLASSNAME = 'block-tangent';
export const BLOCK_SELECTED_CLASSNAME = 'block-selected';
export const BLOCK_HOVER_CLASSNAME = 'block-hover';