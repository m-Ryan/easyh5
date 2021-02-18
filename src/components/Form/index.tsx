import { InputNumber, Input as AntdInput, Switch, } from 'antd';
import { TextAreaProps, } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';
import ImageUploader, { ImageUploaderProps } from '../ImageUploader';
import { UploadField as Uploader, UploadFieldProps } from './UploadField';
import { ColorPicker, ColorPickerProps } from './ColorPicker';
import { Select, SelectProps } from './Select';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import enhancer from './enhancer';
import { RadioChangeEvent } from 'antd/lib/radio';
import { TreeSelect, TreeSelectProps } from './TreeSelect';
import { Input, InputProps } from './Input';
import { SwitchProps } from 'antd/lib/switch';

export const TextField = enhancer<InputProps, any>(Input, (value) => value);

export const TextAreaField = enhancer<TextAreaProps, any>(AntdInput.TextArea, (e: React.ChangeEvent<HTMLTextAreaElement>) => e.target.value);

export const NumberField = enhancer<InputNumberProps, any>(InputNumber, (e: number | string | undefined | null) => e);

export const ColorPickerField = enhancer<ColorPickerProps, any>(ColorPicker, (e: string) => e);

export const UploadField = enhancer<UploadFieldProps, any>(Uploader, (val: string) => val);

export const ImageUploaderField = enhancer<ImageUploaderProps, any>(ImageUploader, (urls: string[]) => urls);

export const SelectField = enhancer<SelectProps, any>(Select, (e: string) => e);

export const RadioGroupField = enhancer<RadioGroupProps, any>(RadioGroup, (e: RadioChangeEvent) => e.target.value);

export const TreeSelectField = enhancer<TreeSelectProps, any>(TreeSelect, (e: string) => e);

export const SwitchField = enhancer<SwitchProps, any>(Switch, (e: boolean) => e);

