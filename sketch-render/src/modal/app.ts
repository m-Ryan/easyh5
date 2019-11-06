import { observable, action, computed } from "mobx";
import { unitConver } from "@/util/utils";
import { ISketchItem } from "@/typings/ISketckItem";
import _ from 'lodash';

export interface IElementItem extends ISketchItem {
  id: number;
  children: IElementItem[]
}

export class App {
  @observable elements: IElementItem[] = [];
  @observable targetElement: IElementItem | null = null;

  @action
  setElements = (data: ISketchItem | ISketchItem[]) => {
    let id = 0;

    const tranformStyle = (child: ISketchItem) => {
      child['id'] = id;
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

  setTargetElement = (target: IElementItem) => {
    console.log('set', target)
    this.targetElement = target;
  }

  @computed 
  get targetStyle() {
    return this.targetElement ? this.targetElement.style : {};
  }

  @action
  setTargetStyle = <T extends keyof React.CSSProperties>(property: T, value: any) => {
    if (this.targetElement) {
      const element = getElementById(this.elements, this.targetElement.id);
      if (element) {
        if (_.isNumber(parseFloat(value))) {
          element.style[property] = parseFloat(value.toString()) as any;
          this.targetElement.style[property] = parseFloat(value.toString()) as any;
        } else {
          element.style[property] = value;
          this.targetElement.style[property] = value;
        }
        this.elements = [...this.elements];
      }
    }
  }
}

const getElementById = (child: IElementItem[], id: number): ISketchItem | null => {
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
  child.forEach(item=>findById(item));
  console.log('target', !!target, target)
  return target;
}