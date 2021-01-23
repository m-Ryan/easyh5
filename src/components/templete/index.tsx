import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import styles from './index.module.scss';

import { Radio, Button, message, Icon, Tooltip } from 'antd';
import { RenderEditorItem } from './render-editor-item/index';
import { RenderPreviewItem } from './render-preview-item/index';
import services from '@/services';
import { toZipStyle, unZipStyle } from './style-tranform';
import { useSelector } from '@/modal';
import { Loading } from '@/components/loading';
import { PRIMARY_COLOR, APP_EDITOR_CONTAINER_ID } from '@/constants';
import _ from 'lodash';
import { domToImage } from '@/util/utils';
import { useHistory } from 'react-router-dom';
import { SideBar } from './side-bar';
import { DialogBar } from './dialog-bar';
import { INodeItem } from '@/components/templete/templete.type';
import { UploaderSketch } from '../../pages/editor/components/uploader-sketch/index';

export const AppContainer = () => {
  const {
    list,
    articleId,
    addItem,
    setData,
    setTarget,
    initData,
    title,
    loading,
    updateStyle,
    deleteItem,
    focusElement,
    updatePicture
  } = useSelector('article');
  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const [ isEditor, setIsEditor ] = useState(true);
  const [ isSubmit, setIsSubmit ] = useState(false);

  const onDrop = useCallback(
      (event: DragEvent) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        addItem(
            {
              type: event.dataTransfer!.getData('Text') as any,
              payload: ''
            },
            target.getAttribute('data-node-id') || undefined
        );
      },
      [ addItem ]
  );

  const onDragover = useCallback((ev: DragEvent) => {
    ev.preventDefault();
  }, []);

  useEffect(
      () => {
        const ele = ref.current;
        if (!ele || !isEditor) {
          return;
        }
        ele.addEventListener('dragover', onDragover);
        ele.addEventListener('drop', onDrop);
        return () => {
          ele.removeEventListener('dragover', onDragover);
          ele.removeEventListener('drop', onDrop);
        };
      },
      [ isEditor, onDragover, onDrop ]
  );

  useEffect(
      () => {
        if (!focusElement) {
          return;
        }

        const toLeftCode = 37;
        const toTopCode = 38;
        const toRightCode = 39;
        const toBottomCode = 40;
        const deleteCode = 8;
        const step = 1;

        const onKeydown = (ev: KeyboardEvent) => {
          if ([ toLeftCode, toTopCode, toRightCode, toBottomCode ].find((item) => item === ev.keyCode)) {
            if (document.activeElement && document.activeElement.getAttribute('data-listener-input')) {
              ev.preventDefault();
              ev.stopPropagation();

              if (ev.keyCode === toLeftCode) {
                updateStyle('left', focusElement.style.left - step);
              } else if (ev.keyCode === toTopCode) {
                updateStyle('top', focusElement.style.top - step);
              } else if (ev.keyCode === toRightCode) {
                updateStyle('left', focusElement.style.left + step);
              } else if (ev.keyCode === toBottomCode) {
                updateStyle('top', focusElement.style.top + step);
              }
            }
          }
        };

        document.addEventListener('keydown', onKeydown);

        return () => {
          document.removeEventListener('keydown', onKeydown);
        };
      },
      [ deleteItem, focusElement, updateStyle ]
  );

  const onSave = useCallback(
      async () => {
        if (isSubmit) {
          return;
        }
        setIsSubmit(true);
        setTarget('');
        try {
          const blob = await domToImage(appRef.current!);
          const picture = await services.common.uploadByQiniu(blob);
          updatePicture(picture);

          const zipJson = toZipStyle(list);
          if (articleId) {
            await services.article.updateArticle(articleId, {
              content: zipJson,
              picture,
              title
            });
          } else {
            const data = await services.article.addArticle(title, zipJson, picture);
            setData({ articleId: data.article_id });
            history.replace(`?id=${data.article_id}`);
          }
          message.success('保存成功');
        } catch (error) {
          message.error(error.message);
        } finally {
          setIsSubmit(false);
        }
      },
      [ articleId, history, isSubmit, list, setData, setTarget, title, updatePicture ]
  );

  const onSuccessUpload = useCallback(
      (list: INodeItem[]) => {
        initData({
          list
        });
      },
      [ initData ]
  );

  return useMemo(
      () => {
        return (
          <div className={styles.container} ref={ref}>
            <div className={styles.switchTab}>
              <Radio.Group value={isEditor} onChange={(val) => setIsEditor(val.target.value)}>
                <Radio.Button value={true}>编辑</Radio.Button>
                <Radio.Button value={false}>预览</Radio.Button>
              </Radio.Group>
						&emsp;
              <UploaderSketch onSuccess={onSuccessUpload} />
						&emsp;
              <Button ghost type="primary" loading={isSubmit} onClick={onSave}>
							保存
              </Button>
            </div>
            <div className={styles.appWrap}>
              <div className={styles.appWrapBorder}>
                <div id={APP_EDITOR_CONTAINER_ID} ref={appRef} className={styles.app}>
                  <Loading color={PRIMARY_COLOR} loading={loading}>
                    {isEditor ? <RenderEditorItem list={list} /> : <RenderPreviewItem list={list} />}
                  </Loading>
                </div>
              </div>
              <SideBar />
              <DialogBar />
            </div>
          </div>
        );
      },
      [ isEditor, isSubmit, list, loading, onSave, onSuccessUpload ]
  );
};
