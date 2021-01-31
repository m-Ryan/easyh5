import { Input, InputNumber } from 'antd';
import { InputProps } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';
import ImageUploader, { ImageUploaderProps } from '../ImageUploader';
import { ColorPicker, ColorPickerProps } from './ColorPicker';
import enhancer from './enhancer';

export const TextField = enhancer<InputProps, any>(Input, (e: React.ChangeEvent<HTMLInputElement>) => e.target.value);

export const NumberField = enhancer<InputNumberProps, any>(InputNumber, (e: number | string | undefined | null) => e);

export const ColorPickerField = enhancer<ColorPickerProps, any>(ColorPicker, (e: string) => e);


export const ImageUploaderField = enhancer<ImageUploaderProps, any>(ImageUploader, (urls: string[]) => urls[0]);

