import _ from 'lodash';
import styles from './index.module.scss';
interface IOptions {
  element: HTMLElement
  initX: number;
	initY: number;
	onMove: (x: number, y: number) =>void;
}

export class DragElement {
  private initX = 0;
  private initY = 0;
  private initLeft = 0;
  private initTop = 0;
  private element: HTMLElement
  private onMove:  (x: number, y: number) =>void
  constructor(options: IOptions) {
		this.element = options.element;
    this.element.draggable = false;
		this.element.classList.add(styles.focus);
		this.onMove = options.onMove;
    const { top, left } = window.getComputedStyle(this.element);
    this.initX = options.initX;
    this.initY = options.initY;
    this.initTop = parseFloat(top || '0');
    this.initLeft = parseFloat(left || '0');
    document.addEventListener('mousemove', this.onTouchMove);
    document.addEventListener('mouseup', this.onTouchEnd);

  }

  private onTouchMove = _.debounce((event: MouseEvent) => {
    event.stopPropagation();
    let offsetX = event.pageX - this.initX;
    let offsetY = event.pageY - this.initY;
		this.onMove(this.initLeft + offsetX, this.initTop + offsetY)
  }
)
	private onTouchEnd = (event: MouseEvent) => {
    document.removeEventListener('mousemove', this.onTouchMove);
    document.removeEventListener('mouseup', this.onTouchEnd);
	}
	
	destory = ()=> {
    this.element.classList.remove(styles.focus);
	}

}
