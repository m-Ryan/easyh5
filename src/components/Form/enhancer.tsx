import { useField } from 'formik';
import React, { useMemo } from 'react';
import { useCallback } from 'react';
import { Stack, StackProps } from '../Stack';
import styles from './index.module.scss';

interface Props {
  name: string;
  label: React.ReactNode;
  lableHidden?: boolean;
  alignment?: StackProps['alignment'];
  distribution?: StackProps['distribution'];
  helpText?: React.ReactNode;
  inline?: boolean;
  valueAdapter?: (value: any) => any;
  onChangeAdapter?: (value: any) => any;
}

let primaryId = 0;
export default function enhancer<P, T extends React.FC<P>>(Component: T, changeAdapter: (e: any) => any,) {
  return (props: Props & Omit<P, 'value' | 'onChange'>) => {
    const { name, onChangeAdapter, valueAdapter, inline, label, lableHidden, helpText, alignment, distribution, ...rest } = props;
    const [field, meta, hepler] = useField(name);
    const initialValue = meta.initialValue;

    const onChange = useCallback((e) => {
      const newVal = onChangeAdapter ?
        onChangeAdapter(changeAdapter(e))
        : changeAdapter(e);

      hepler.setValue(newVal);
      hepler.setTouched(newVal !== initialValue);
    }, [initialValue, hepler, onChangeAdapter]);

    const id = useMemo(() => {
      return `enhancer-${primaryId++}`;
    }, []);

    return (
      <Stack vertical spacing='extraTight'>
        <Stack spacing={inline ? undefined : 'extraTight'}
          wrap={false}
          vertical={!inline}
          alignment={alignment ? alignment : (inline ? 'center' : undefined)}
          distribution={distribution}
        >
          <Stack.Item>
            <label className={lableHidden ? styles['label-hidden'] : undefined} htmlFor={id}>
              <span style={{ fontSize: 14 }}>{label}</span>
            </label>
          </Stack.Item>
          <Stack.Item fill={inline}>
            <Component
              {...rest}
              id={id}
              name={name}
              value={valueAdapter ? valueAdapter(field.value) : field.value}
              onChange={onChange}
            />
          </Stack.Item>
        </Stack>
        <div className={styles.helperText}>{helpText}</div>
      </Stack>
    );
  };
}