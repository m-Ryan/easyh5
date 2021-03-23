import { BridgeEvent } from '@/constants';

type Handler<T extends any = any> = (data: T) => void;

interface EventHandlers {
  [key: string]: Handler[];
}

export class Bridge {
  private static handlers: EventHandlers = {};

  private static callHandler = ({ data }: MessageEvent<any>) => {
    const event = data.type;
    Bridge.handlers[event]?.forEach((fn) => fn(data));
  };

  public static on<T>(event: BridgeEvent, fn: Handler<T>) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event].push(fn);

    window.addEventListener('message', this.callHandler);
  }

  public static off(event: BridgeEvent, fn: Handler) {
    this.handlers[event] = this.handlers[event].filter(handler => handler === fn);
  }

  public static emitToEditor(event: BridgeEvent, data: any) {
    window.parent.postMessage({ data, type: event }, '*');
  }

  public static emitToPreview(
    iframe: HTMLIFrameElement,
    event: BridgeEvent,
    data: any
  ) {
    iframe.contentWindow?.postMessage({ data, type: event }, '*');
  }
}