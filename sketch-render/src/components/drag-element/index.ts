import _ from 'lodash';
import styles from './index.module.scss';
import { addStyle } from '@/util/utils';
import { getDragOutline } from '../drag-outline';
interface IOptions {
	element: HTMLElement;
	onMove: (x: number, y: number) => void;
}

export class DragElement {
	private initX = 0;
	private initY = 0;
	private initLeft = 0;
	private initTop = 0;
	private hasMove = false;
	public element: HTMLElement;
	public borderElement: HTMLElement;
	private onMove: (x: number, y: number) => void;

	constructor(options: IOptions) {
		this.element = options.element;
		this.element.draggable = false;
		this.element.classList.add(styles.focus);
		this.onMove = options.onMove;
		const { top, left, width, height } = window.getComputedStyle(this.element);
		const borderElement = getDragOutline({
			left: `calc(${left || '0px'} - 5px)`,
			top: `calc(${top || '0px'} - 5px)`,
			width: `calc(${width || '0px'} + 10px)`,
			height: `calc(${height || '0px'} + 10px)`,
		});
		this.borderElement = borderElement;
		this.element.parentNode!.appendChild(borderElement);
		this.addListener();
	}

	private addListener =()=> {
		document.addEventListener('mousemove', this.onTouchMove);
		document.addEventListener('mouseup', this.onTouchEnd);
	}

	private onTouchMove = _.debounce((event: MouseEvent) => {
		event.stopPropagation();
		if (!this.hasMove) {
			const { top, left } = window.getComputedStyle(this.element);
			this.initTop = parseFloat(top || '0');
			this.initLeft = parseFloat(left || '0');
			this.initX = event.pageX;
			this.initY = event.pageY;
			this.hasMove = true;
		} else {
			let offsetX = event.pageX - this.initX;
			let offsetY = event.pageY - this.initY;
			const left = this.initLeft + offsetX;
			const top = this.initTop + offsetY;
			addStyle(this.borderElement, {
				left: `calc(${left + 'px'} - 5px)`,
				top: `calc(${top + 'px'} - 5px)`
			})
			this.onMove(left, top);
		}
	});

	private onTouchEnd = (event: MouseEvent) => {
		this.hasMove = false;
		document.removeEventListener('mousemove', this.onTouchMove);
		document.removeEventListener('mouseup', this.onTouchEnd);
		document.addEventListener('mousedown', this.addListener);
	};

	destory = () => {
		this.borderElement.parentNode!.removeChild(this.borderElement);
		this.element.classList.remove(styles.focus);
		document.removeEventListener('mousedown', this.addListener);
	};
}
