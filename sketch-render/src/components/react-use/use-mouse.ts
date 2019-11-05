import _ from 'lodash';
interface IOptions {
  element: HTMLElement
  initX: number;
  initY: number;
}
let index = 0;
export class DragElement {
  private initX = 0;
  private initY = 0;
  private initLeft = 0;
  private initTop = 0;
  private element: HTMLElement
  constructor(options: IOptions) {
    this.element = options.element;
    const styles = window.getComputedStyle(this.element);
    this.initX = options.initX;
    this.initY = options.initY;
    this.initTop = parseFloat(styles.top || '0');
    this.initLeft = parseFloat(styles.left || '0');
    document.addEventListener('mousemove', this.onTouchMove);
    document.addEventListener('mouseup', this.onTouchEnd);

  }

  restory = () => {
    document.removeEventListener('mousemove', this.onTouchMove);
    document.removeEventListener('mouseup', this.onTouchEnd);
  }



  onTouchMove = (event: MouseEvent) => {
    console.log(event)
    console.log('start' + index)
    event.stopPropagation();
    const element = this.element;
    let offsetX = event.pageX - this.initX;
    let offsetY = event.pageY - this.initY;
    console.log(offsetX, event.pageX, this.initX)
    element.style.left = this.initLeft + offsetX + 'px';
    element.style.top = this.initTop + offsetY + 'px';
    console.log('end' + index);
    index++;
  }
  
  onTouchEnd = (event: MouseEvent) => {
    this.restory();
  }

}
