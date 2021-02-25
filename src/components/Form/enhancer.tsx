import { Form } from 'antd';
import { Field, FieldProps, useField, useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import { useCallback } from 'react';
import { Stack, StackProps } from '../Stack';
import styles from './index.module.scss';

interface Props extends Partial<FieldProps> {
  name: string;
  label: React.ReactNode;
  lableHidden?: boolean;
  alignment?: StackProps['alignment'];
  distribution?: StackProps['distribution'];
  helpText?: React.ReactNode;
  inline?: boolean;
  valueAdapter?: (value: any) => any;
  onChangeAdapter?: (value: any) => any;
  validate?: (value: any) => string | undefined | Promise<string | undefined>;
}

let primaryId = 0;
export default function enhancer<P, T extends React.FC<P>>(Component: T, changeAdapter: (e: any) => any,) {
  return (props: Props & Omit<P, 'value' | 'onChange'>) => {

    const { name,
      onChangeAdapter,
      valueAdapter,
      inline,
      label,
      lableHidden,
      helpText,
      alignment,
      distribution,
      validate,
      ...rest
    } = props;

    const [field, { error }, hepler] = useField(name);

    const onChange = useCallback((e) => {
      const newVal = onChangeAdapter ?
        onChangeAdapter(changeAdapter(e))
        : changeAdapter(e);

      hepler.setValue(newVal);
    }, [onChangeAdapter, hepler]);

    const id = useMemo(() => {
      return `enhancer-${primaryId++}`;
    }, []);

    return (

      <Field name={name} validate={validate}>
        {() => (
          <Form.Item
            style={{ margin: 0 }}
            validateStatus={error ? 'error' : undefined}
            help={error}
          >
            <Stack vertical spacing='extraTight'>
              <Stack spacing={inline ? undefined : 'extraTight'}
                wrap={false}
                vertical={!inline}
                alignment={alignment ? alignment : (inline ? 'center' : undefined)}
                distribution={distribution}
              >
                <Stack.Item>
                  <label className={lableHidden ? styles['label-hidden'] : undefined} htmlFor={id}>
                    <span style={{ fontSize: 14, whiteSpace: 'pre' }}>{label}{error}</span>
                  </label>
                </Stack.Item>
                <Stack.Item fill={inline}>
                  <Component
                    {...rest}
                    id={id}
                    name={name}
                    checked={valueAdapter ? valueAdapter(field.value) : field.value}
                    value={valueAdapter ? valueAdapter(field.value) : field.value}
                    onChange={onChange}
                  />
                </Stack.Item>
              </Stack>
              <div className={styles.helperText}><small>{helpText}</small></div>
            </Stack>
          </Form.Item>
        )}

      </Field>
    );

  };
}
