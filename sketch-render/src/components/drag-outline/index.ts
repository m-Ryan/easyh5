import styles from './index.module.scss';
import { addStyle } from '@/util/utils';

export function getDragOutline(style: Partial<CSSStyleDeclaration>) {
	const div = document.createElement('div');
	addStyle(div, style);
	div.classList.add(styles.container);
	div.innerHTML = `
		<div class='${styles.tl}'></div>
		<div class='${styles.tm}'></div>
		<div class='${styles.tr}'></div>
		<div class='${styles.ml}'></div>
		<div class='${styles.mr}'></div>
		<div class='${styles.bl}'></div>
		<div class='${styles.bm}'></div>
		<div class='${styles.br}'></div>
	`;
	return div;
}
