import styles from './index.module.scss';
import _ from 'lodash';
interface IOptions {
	element: HTMLElement;
	initX: number;
	initY: number;
	onMove: (x: number, y: number) => void;
	onEnd?: () => void;
}

export function onDrag(options: IOptions) {
	const element = options.element;
	element.draggable = false;
	element.classList.add(styles.focus);
	const { top, left } = window.getComputedStyle(element);
	const initX = options.initX;
	const initY = options.initY;
	const initTop = parseFloat(top || '0');
	const initLeft = parseFloat(left || '0');

	const onTouchMove = _.debounce((event: MouseEvent) => {
		event.stopPropagation();
		let offsetX = event.pageX - initX;
		let offsetY = event.pageY - initY;
    options.onMove(initLeft + offsetX, initTop + offsetY);
	});

	const onTouchEnd = (event: MouseEvent) => {
		element.classList.remove(styles.focus);
		document.removeEventListener('mousemove', onTouchMove);
    document.removeEventListener('mouseup', onTouchEnd);
    options.onEnd && options.onEnd();
	};

	document.addEventListener('mousemove', onTouchMove);
	document.addEventListener('mouseup', onTouchEnd);
}
