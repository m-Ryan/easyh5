import { isNumber } from '@/util/utils';
export function InputNumberAdapter(val: string | number) {
  return isNumber(Number(val)) ? Number(val) : val;
}