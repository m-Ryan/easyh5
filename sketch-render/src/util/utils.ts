import { ElementType } from "@/typings/ISketckItem";

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
		if (name === key) {
			value = item.split('=')[1];
		}
  });
  return value;
}

export function getDefaultStyle(type?: ElementType): React.CSSProperties {
	const style: React.CSSProperties = {
		zIndex: 0,
		position: 'absolute',
		backgroundSize: '100%',
		left: '0px',
		top: '0px'
	};

	if (type === ElementType.TEXT) {
		style.width = '250px';
		style.height = '18px';
	}
	return style;
}
