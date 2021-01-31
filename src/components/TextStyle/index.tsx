import { classnames } from '@/util/utils';
import React from 'react';
import styles from './TextStyle.module.scss';

export interface TextStyleProps {
  variation?: 'strong' | 'subdued';
  size?: 'large' | 'normal' | 'small';
}

export const TextStyle: React.FC<TextStyleProps> = (props) => {
  const { variation = '', size = 'normal' } = props;
  return <span className={classnames(styles[variation], styles[size])}>{props.children}</span>;
};