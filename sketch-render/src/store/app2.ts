import { observable, action, computed } from "mobx";
import { unitConver } from "@/util/utils";
import { ISketchItem } from "@/typings/ISketckItem";
import _ from 'lodash';
import { DragElement } from "@/components/drag-element";

export interface IElementItem extends ISketchItem {
  id: number;
  children: IElementItem[];
  link?: string;
}

export class App {
  @observable elements: IElementItem[] = [];
  @observable targetId: number = 0;
  @observable dragElement: DragElement|null = null;

  @action
  setElements = (data: ISketchItem | ISketchItem[]) => {
    let id = 0;

    const tranformStyle = (child: ISketchItem) => {
      child['id'] = ++id;
      const style = child.style;
      for (let key in style) {
        style[key] = unitConver(style[key], { times: 0.5 })
      }
      child.children.forEach(item => {
        tranformStyle(item);
      })
    }

    if (!Array.isArray(data)) {
      data = [data];
    }
    data.forEach(item => {
      tranformStyle(item)
    })
    this.elements = data as IElementItem[];
  }

  setTarget = <T extends HTMLElement>(targetId: number, event: React.MouseEvent<T, MouseEvent>) => {
    if (this.dragElement) {
      this.dragElement.destory();
    }
    this.targetId = targetId;
    this.dragElement = new DragElement({
      element: event.target as HTMLElement, 
      initX: event.pageX, 
      initY: event.pageY,
      onMove: (x, y)=> {
        this.setTargetStyle('left', x);
        this.setTargetStyle('top', y);
      }
    });
  }

  @computed 
  get targetStyle() {
    const target = getElementById(this.elements, this.targetId);
    if (target) {
      return target.style;
    }
    return {};
  }

  @computed 
  get target() {
    const target = getElementById(this.elements, this.targetId);
    if (target) {
      return target;
    }
    return null;
  }

  @action
  setTargetStyle = <T extends keyof React.CSSProperties>(property: T, value: any) => {
    const element = getElementById(this.elements, this.targetId);
      const formatValue = value.toString().trim();
      if (element) {
        
        // 如果是数字字符串必须转成数字
        if (/^\d+$/.test(formatValue)) {
          element.style[property] = Number(formatValue) as React.CSSProperties[T];
        } else {
          element.style[property] = value;
        }
        this.elements = [...this.elements];
      }
  }

  @action
  seValue =(value: string) => {
    const element = getElementById(this.elements, this.targetId);
    if (element) {
      element.value = value;
    }
    this.elements = [...this.elements];
  }

  @action
  setLink =(value: string) => {
    const element = getElementById(this.elements, this.targetId);
    if (element) {
      element.link = value;
    }
    this.elements = [...this.elements];
  }
}


const getElementById = (elements: IElementItem[], id: number): IElementItem | null => {
  let target: IElementItem | null = null
  const findById = (element: IElementItem) => {
    if (element.id === id) {
      target = element;
      return;
    }
    element.children.forEach(item => {
      findById(item);
    });
  }
  elements.forEach(item=>findById(item));
  return target;
}
