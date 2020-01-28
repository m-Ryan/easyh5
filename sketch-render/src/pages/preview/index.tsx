import React, { useEffect, useCallback, useMemo } from 'react';
import styles from './index.module.scss';
import { useSelector } from '@/modal';
import { useTemplete } from '@/components/react-use/useTemplete';
import { getLocationParamValue } from '@/util/utils';
import { useSetDocumentSize } from '@/components/react-use/useSetDocumentSize';
import { CustomServiceComponent } from './CustomServiceComponent';
import { RenderPreviewItem } from '@/components/templete/render-preview-item';
import { Loading } from '@/components/loading';
export function Preview() {

  useSetDocumentSize();

  useTemplete(getLocationParamValue('id'), false);


  const { list, tagId, loading, title } = useSelector('article');

  useEffect(() => {
    document.body.classList.add(styles.noScrollBar);
  }, [])

  useEffect(()=> {
    document.title = title;
  }, [title])

  return useMemo(() => (
    <div className={styles.app}>
      <Loading loading={loading}>
        <RenderPreviewItem list={list} />
        {<CustomServiceComponent />}
      </Loading>
    </div>
  ), [list, loading]);
}
