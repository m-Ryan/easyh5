import React, { useCallback } from 'react';
import styles from './index.module.scss';
import { Header } from '@/pages/editor/components/header';
import { ComponentMenu } from '@/pages/editor/components/component-menu';
import { ConfigMenu } from '@/pages/editor/components/config-menu';
import { getLocationParamValue } from '@/util/utils';
import { useSelector } from '@/modal';
import { useTemplete } from '@/components/react-use/useTemplete';
import { AppContainer } from '@/components/templete';
import { useSetEditorDocumentSize } from '@/components/react-use/useSetEditorDocumentSize';

export function Editor() {
  const { setTarget, focusElement, focusId } = useSelector('article');

  useSetEditorDocumentSize();

  useTemplete(getLocationParamValue('id'), true);

  const onSetBulr = useCallback(async () => {
    setTarget('')
  }, [setTarget]);


  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrap}>
        <div className={styles.leftMenu}>
          <ComponentMenu />
        </div>
        <div className={styles.contentWrap} onClick={onSetBulr}>
          <div className={styles.content} onClick={e => e.stopPropagation()}>
            <AppContainer />
          </div>
        </div>
        <div className={styles.rightMenu}>
          {focusElement && <ConfigMenu target={focusElement} key={focusId} />}
        </div>
      </div>
    </div>
  );
}
