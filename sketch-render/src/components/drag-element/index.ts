import styles from './index.module.scss';
interface IOptions {
  element: HTMLElement
  initX: number;
  initY: number;
}

export class DragElement {
  private initX = 0;
  private initY = 0;
  private initLeft = 0;
  private initTop = 0;
  private element: HTMLElement
  constructor(options: IOptions) {
    this.element = options.element;
    this.element.draggable = false;
    this.element.classList.add(styles.focus);
    const { top, left } = window.getComputedStyle(this.element);
    this.initX = options.initX;
    this.initY = options.initY;
    this.initTop = parseFloat(top || '0');
    this.initLeft = parseFloat(left || '0');
    document.addEventListener('mousemove', this.onTouchMove);
    document.addEventListener('mouseup', this.onTouchEnd);

  }

  onTouchMove = (event: MouseEvent) => {
    event.stopPropagation();
    const element = this.element;
    let offsetX = event.pageX - this.initX;
    let offsetY = event.pageY - this.initY;
    element.style.left = this.initLeft + offsetX + 'px';
    element.style.top = this.initTop + offsetY + 'px';
  }

  onTouchEnd = (event: MouseEvent) => {
    this.element.classList.remove(styles.focus);
    document.removeEventListener('mousemove', this.onTouchMove);
    document.removeEventListener('mouseup', this.onTouchEnd);
  }

}
