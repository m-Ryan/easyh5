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
  @observable targetId: number = 0;

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

  setTargetId = (targetId: number) => {
    console.log(targetId)
    this.targetId = targetId;
  }

  @computed 
  get targetStyle() {
    const target = getElementById(this.elements, this.targetId);
    if (target) {
      return target.style;
    }
    return {};
  }

  @action
  setTargetStyle = <T extends keyof React.CSSProperties>(property: T, value: any) => {
    const element = getElementById(this.elements, this.targetId);
      if (element) {
        if (_.isNumber(parseFloat(value))) {
          element.style[property] = parseFloat(value.toString()) as any;
        } else {
          element.style[property] = value;
        }
        this.elements = [...this.elements];
      }
  }
}

const getElementById = (elements: IElementItem[], id: number): ISketchItem | null => {
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
