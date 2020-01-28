import React from 'react';
import styles from './index.module.scss';

interface Props {
	title: string | React.ReactNode;
	aside?: React.ReactNode;
}

export function AppTitle(props: Props) {
  return (
    <div className={styles.title}>
      {props.title}
      {props.aside}
    </div>
  );
}