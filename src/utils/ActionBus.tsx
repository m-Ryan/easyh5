import EventEmitter from 'eventemitter3';
import { getParseAction } from './actions';

export class ActionBus {
  private static emitter = new EventEmitter();

  static emit<T extends any = any>(action: string, ev: MouseEvent, params?: T) {
    const { group, name } = getParseAction(action);
    this.emitter.emit(group, { actionName: name, payload: params });
  }

  static on(name: string, fn: <T extends any = any>(params: { actionName: string; payload: T; }) => void) {
    this.emitter.on(name, fn);
  }
};
