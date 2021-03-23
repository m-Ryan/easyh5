
const deviation = 5;
type Direction = 'top' | 'right' | 'bottom' | 'left';

export function getTangentDirection(ev: DragEvent | MouseEvent): Direction | '' {
  const target = ev.target as HTMLElement;
  const { top, height, left, width } = target.getBoundingClientRect();
  const mouseY = ev.clientY;
  const mouseX = ev.clientX;

  if (Math.abs(top - mouseY) <= deviation) {
    return 'top';
  }
  if (Math.abs(left + width - mouseX) <= deviation) {
    return 'right';
  }
  if (Math.abs(top + height - mouseY) <= deviation) {
    return 'bottom';
  }
  if (Math.abs(left - mouseX) <= deviation) {
    return 'left';
  }
  return '';
}