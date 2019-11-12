import { NodeType, INodeStyle } from "@/typings/ISketckItem";

export function unitConver(declaration: string, options: ICssRulesOptions) {
	const { originUnit = 'px', replaceUnit = 'px', precision = 2, times = 1 } = options;
	if (typeof declaration !== 'string') {
		return declaration;
	}
	const pattern = new RegExp(`(\\d+(\\.\\d+)?)(${originUnit})\\b`, 'mig');
	return declaration.replace(pattern, function(group1: string, group2: string, group3: string, group4: string) {
		const newText = parseFloat((Number(group2) * times).toFixed(precision)) + replaceUnit;
		return newText;
	});
}

export interface ICssRulesOptions {
	originUnit?: string;
	replaceUnit?: string;
	precision?: number;
	times?: number;
}

export function getCookie(key: string) {
	let value = '';
	document.cookie.split(';').forEach((item) => {
		const name = item.split('=')[0];
		if (name.trim() === key) {
			value = item.replace(`${name}=`, '');
			console.log(value)
		}
  });
  return value;
}

export function getDefaultStyle(type?: NodeType): INodeStyle {
	const style: INodeStyle = {
		zIndex: 0,
		position: 'absolute',
		backgroundSize: '100%',
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		opacity: 1
	};

	if (type === NodeType.TEXT) {
		style.width = 250;
		style.height = 18;
	}

	if (type === NodeType.BITMAP) {
		style.width = 250;
		style.height = 250;
	}

	if (type === NodeType.BOX) {
		style.width = 100;
		style.height = 100;
	}

	return style;
}

export function addStyle(element: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
	Object.keys(styles).forEach(key=> {
		element.style[key] = styles[key];
	})
}