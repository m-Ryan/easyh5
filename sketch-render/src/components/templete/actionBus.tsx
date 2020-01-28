import EventEmitter from 'eventemitter3';
import { getTextFormat } from '@/modal/useArticle';
import { IComponentActionMapKey } from './constants';

export const actionBus = new class {
  private emitter = new EventEmitter();

  emit(action: string, params: { [key: string]: any } = {}) {
    const { group, name } = getTextFormat(action);
    this.emitter.emit(group, { actionName: name, ...params });
  }

  on(name: IComponentActionMapKey, fn: <T extends { actionName: string } = any>(params: T) => void) {
    this.emitter.on(name, fn);
  }
}
