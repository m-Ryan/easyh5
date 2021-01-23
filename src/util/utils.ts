import * as ISketckItem from '@/components/templete/templete.type';
import qRCode from 'qrcode-generator';
import _ from 'lodash';
import qs from 'qs';
import { BASE_NAME } from '@/constants/config';
import domtoimage from 'dom-to-image';
export function unitConver(declaration: string, options: ICssRulesOptions) {
  const {
    originUnit = 'px',
    replaceUnit = 'px',
    precision = 2,
    times = 1
  } = options;
  if (typeof declaration !== 'string') {
    return declaration;
  }
  const pattern = new RegExp(`(\\d+(\\.\\d+)?)(${originUnit})\\b`, 'mig');
  return declaration.replace(pattern, function (
    group1: string,
    group2: string,
    group3: string,
    group4: string
  ) {
    const newText =
      parseFloat((Number(group2) * times).toFixed(precision)) + replaceUnit;
    return newText;
  });
}

export function isPC() {
  return !isIOS() && !isAndroid();
}

export function isIOS() {
  return /(iPhone|iPod|ios)/i.test(navigator.userAgent);
}

export function isAndroid() {
  return (
    navigator.userAgent.indexOf('Android') > -1 ||
    navigator.userAgent.indexOf('Adr') > -1
  );
}

export interface ICssRulesOptions {
  originUnit?: string;
  replaceUnit?: string;
  precision?: number;
  times?: number;
}

export function getCookie(key: string) {
  let value = '';
  document.cookie.split(';').forEach(item => {
    const name = item.split('=')[0];
    if (name.trim() === key) {
      value = item.replace(`${name}=`, '');
    }
  });
  return value;
}

export function getDefaultStyle(): ISketckItem.INodeStyle {
  const style: ISketckItem.INodeStyle = {
    zIndex: 1,
    position: 'relative',
    backgroundSize: '100%',
    fontSize: 14,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 1
  };

  return style;
}

export function addStyle(
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
) {
  Object.keys(styles).forEach(key => {
    element.style[key] = styles[key];
  });
}

export function getLocationParamValue(key: string): string | undefined {
  return qs.parse(window.location.search.replace('?', ''))[key];
}

/**
 * 判断是不是数字，或者字符串数字
 * @param num
 */
export function isNumber(num: any): num is number {
  if (typeof num !== 'string' && typeof num !== 'number') return false;
  return new RegExp("^(\\-|\\+)?\\d+(\\.\\d+)?$").test(num.toString());
}

export function classnames(...rest: string[]) {
  return rest.filter(item => typeof item === 'string').join(' ');
}

export function previewLoadImage(url: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const img = new Image();
    img.setAttribute("crossOrigin", 'Anonymous');
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
  });
}

export async function getImageFile(url: string) {
  const pic = await previewLoadImage(url);
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;
  canvas.style.width = '0px';
  canvas.style.height = '0px';
  ctx.drawImage(pic, 0, 0);
  const blob = await new Promise<Blob>(resolve => canvas.toBlob(blob => resolve(blob!)));
  canvas.parentNode!.removeChild(canvas);
  return blob;
}

export function previewLoadImageList(
  list: string[]
): Promise<HTMLImageElement[]> {
  return Promise.all(
    list.map(item => {
      return new Promise<HTMLImageElement>(resolve => {
        const img = new Image();
        img.setAttribute("crossOrigin", 'Anonymous');
        img.src = item;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
      });
    })
  );
}

export function randomRange(min: number, max: number, isInt = true) {
  if (isInt) {
    return parseInt((Math.random() * (max - min + 1) + min).toString(), 10);
  }
  return Math.random() * (max - min + 1) + min;
}

export const isMouseEvent = (
  event: MouseEvent | TouchEvent
): event is MouseEvent => !!(event.type.indexOf('mouse') !== -1);

export const isReactMouseEvent = (
  event: React.TouchEvent | React.MouseEvent
): event is React.MouseEvent => !!(event.type.indexOf('mouse') !== -1);

export const isElement = (
  event: HTMLElement | ChildNode
): event is HTMLElement => !!(event as HTMLElement).tagName;

export type FilterType<T, K> = {
  [P in keyof T]:
  T[P] extends K ? P : never
}[keyof T];

export function easeInOutCubic(pos: number) {
  if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
  return 0.5 * (Math.pow(pos - 2, 3) + 2);
}

export function getStyleBgImg(url: string) {
  if (url === 'none') return '';
  return url.replace(/(.*)(http(.*))\)/, '$2').replace(`"`, '').replace(`'`, '');
}

export function setStyleBgImg(url: string) {
  return `url(${url})`;
}


export async function createQrcode(url: string, logo?: string) {
  try {
    const canvasWidth = 500;
    const logoWidth = canvasWidth / 3;
    const padding = 10;
    const canvas = document.createElement('canvas');
    canvas.style.height = '0px';
    canvas.style.width = '0px';
    canvas.width = canvasWidth;
    canvas.style.visibility = 'hidden';
    canvas.height = canvasWidth;

    document.body.appendChild(canvas);
    const qr = qRCode(0, 'H');
    qr.addData(url);
    qr.make();
    const qrcodeUrl = qr.createDataURL(5);

    if (!logo) {
      return qrcodeUrl;
    }

    const qrcodeImage = await previewLoadImage(qrcodeUrl);
    const logoImage = await previewLoadImage(logo);
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(qrcodeImage, 0, 0, canvasWidth, canvasWidth);
    ctx.fillStyle = 'white';
    ctx.fillRect((canvasWidth - logoWidth) / 2 - padding, (canvasWidth - logoWidth) / 2 - padding, logoWidth + 2 * padding, logoWidth + 2 * padding);
    ctx.drawImage(logoImage, (canvasWidth - logoWidth) / 2, (canvasWidth - logoWidth) / 2, logoWidth, logoWidth);
    ctx.save();
    const logoQrCode = canvas.toDataURL('png');
    document.body.removeChild(canvas);
    return logoQrCode;
  }
  catch (error) {
    console.log(error);
    return '';
  }
}

export function getPublishPath() {
  return window.location.origin + '/' + BASE_NAME;
}

export async function domToImage<T extends HTMLElement = any>(element: T) {
  return domtoimage.toBlob(element) as Promise<Blob>;

}

export function lockContaier(id: string | HTMLElement) {
  const element = typeof id === 'string' ? document.getElementById(id) : id;
  if (!element) return;
  const style = window.getComputedStyle(element);
  window['lockBodyElement'] = {
    height: style.height,
    overflowY: style.overflowY,
    scrollTop: element.scrollTop
  };
  element.style.overflowY = 'hidden';

}

export function unlockContaier(id: string | HTMLElement) {
  const element = typeof id === 'string' ? document.getElementById(id) : id;
  if (!element || !window['lockBodyElement']) return;
  const { scrollTop = 0 } = window['lockBodyElement'];
  element.style.overflowY = 'auto';
  try {
    element.scrollTo(0, scrollTop);
  } catch (error) {

  }
  delete window['lockBodyElement'];
}


/**
 *
 * @param styleStr html string <div ></div>
 */
export const replaceToReactStyle = (styleStr: string) => {
  const tempStyleList: any[] = [];
  let count = 1;
  const htmlCOntent = styleStr
    .replace(/\s+data\-node\-type\=\"(.*?)\"/mg, '')
    .replace(/\s+data\-node\-id\=\"(.*?)\"/mg, '')
    .replace(/\<img (.*?)>/mg, '<img $1/>')
    .replace(/style="(.*?)"/mg, (str, g1) => {
      const mask = count++;
      tempStyleList.push(`
    .sty_${mask} {
      ${g1}
    }
  `);
      return `className={styles.sty_${mask}}`;
    });

  console.log(htmlCOntent);
  console.log('-----------------------');
  console.log('-----------------------');
  console.log('-----------------------');
  console.log('-----------------------');
  console.log(tempStyleList.join(''));
};

window['replaceToReactStyle'] = replaceToReactStyle;
