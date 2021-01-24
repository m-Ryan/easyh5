import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import styles from './index.module.scss';

import { Radio, Button, message, Tooltip } from 'antd';
import { RenderEditor } from './RenderEditor';
import { Loading } from '@/components/loading';
import { PRIMARY_COLOR, APP_EDITOR_CONTAINER_ID } from '@/constants';
import { Formik } from 'formik';
import _ from 'lodash';
import { UploaderSketch } from '../../pages/editor/components/uploader-sketch/index';
import { IArticle } from '@/services/article';

interface Props {
  data: IArticle | null;
  loading?: boolean;
}
export const AppContainer = (props: Props) => {
  // const {
  //   list,
  //   articleId,
  //   addItem,
  //   setData,
  //   setTarget,
  //   initData,
  //   title,
  //   loading,
  //   updateStyle,
  //   deleteItem,
  //   focusElement,
  //   updatePicture
  // } = useSelector('article');
  // const history = useHistory();
  // const ref = useRef<HTMLDivElement>(null);
  // const appRef = useRef<HTMLDivElement>(null);
  // const [ isEditor, setIsEditor ] = useState(true);
  // const [ isSubmit, setIsSubmit ] = useState(false);

  // const onDrop = useCallback(
  //     (event: DragEvent) => {
  //       event.preventDefault();
  //       const target = event.target as HTMLElement;
  //       addItem(
  //           {
  //             type: event.dataTransfer!.getData('Text') as any,
  //             payload: ''
  //           },
  //           target.getAttribute('data-node-id') || undefined
  //       );
  //     },
  //     [ addItem ]
  // );

  // const onDragover = useCallback((ev: DragEvent) => {
  //   ev.preventDefault();
  // }, []);

  // useEffect(
  //     () => {
  //       const ele = ref.current;
  //       if (!ele || !isEditor) {
  //         return;
  //       }
  //       ele.addEventListener('dragover', onDragover);
  //       ele.addEventListener('drop', onDrop);
  //       return () => {
  //         ele.removeEventListener('dragover', onDragover);
  //         ele.removeEventListener('drop', onDrop);
  //       };
  //     },
  //     [ isEditor, onDragover, onDrop ]
  // );

  // useEffect(
  //     () => {
  //       if (!focusElement) {
  //         return;
  //       }

  //       const toLeftCode = 37;
  //       const toTopCode = 38;
  //       const toRightCode = 39;
  //       const toBottomCode = 40;
  //       const deleteCode = 8;
  //       const step = 1;

  //       const onKeydown = (ev: KeyboardEvent) => {
  //         if ([ toLeftCode, toTopCode, toRightCode, toBottomCode ].find((item) => item === ev.keyCode)) {
  //           if (document.activeElement && document.activeElement.getAttribute('data-listener-input')) {
  //             ev.preventDefault();
  //             ev.stopPropagation();

  //             if (ev.keyCode === toLeftCode) {
  //               updateStyle('left', focusElement.style.left - step);
  //             } else if (ev.keyCode === toTopCode) {
  //               updateStyle('top', focusElement.style.top - step);
  //             } else if (ev.keyCode === toRightCode) {
  //               updateStyle('left', focusElement.style.left + step);
  //             } else if (ev.keyCode === toBottomCode) {
  //               updateStyle('top', focusElement.style.top + step);
  //             }
  //           }
  //         }
  //       };

  //       document.addEventListener('keydown', onKeydown);

  //       return () => {
  //         document.removeEventListener('keydown', onKeydown);
  //       };
  //     },
  //     [ deleteItem, focusElement, updateStyle ]
  // );

  // const onSave = useCallback(
  //     async () => {
  //       if (isSubmit) {
  //         return;
  //       }
  //       setIsSubmit(true);
  //       setTarget('');
  //       try {
  //         const blob = await domToImage(appRef.current!);
  //         const picture = await services.common.uploadByQiniu(blob);
  //         updatePicture(picture);

  //         const zipJson = toZipStyle(list);
  //         if (articleId) {
  //           await services.article.updateArticle(articleId, {
  //             content: zipJson,
  //             picture,
  //             title
  //           });
  //         } else {
  //           const data = await services.article.addArticle(title, zipJson, picture);
  //           setData({ articleId: data.article_id });
  //           history.replace(`?id=${data.article_id}`);
  //         }
  //         message.success('保存成功');
  //       } catch (error) {
  //         message.error(error.message);
  //       } finally {
  //         setIsSubmit(false);
  //       }
  //     },
  //     [ articleId, history, isSubmit, list, setData, setTarget, title, updatePicture ]
  // );

  // const onSuccessUpload = useCallback(
  //     (list: INodeItem[]) => {
  //       initData({
  //         list
  //       });
  //     },
  //     [ initData ]
  // );


  if (!props.data) {
    return (
      <Loading color={PRIMARY_COLOR} loading={Boolean(props.loading)}>
        <div className={styles.container}></div>
      </Loading>
    );
  }

  return (
    <Formik
      initialValues={props.data}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <div className={styles.container}>
          <div className={styles.switchTab}>
            <Radio.Group>
              <Radio.Button value={true}>编辑</Radio.Button>
              <Radio.Button value={false}>预览</Radio.Button>
            </Radio.Group>
						&emsp;
              <UploaderSketch onSuccess={() => { }} />
						&emsp;
              <Button ghost type="primary" >
              保存
              </Button>
          </div>
          <div className={styles.appWrap}>
            <div className={styles.appWrapBorder}>
              <div id={APP_EDITOR_CONTAINER_ID} className={styles.app}>
                <Loading color={PRIMARY_COLOR} loading={Boolean(props.loading)}>
                  <RenderEditor />
                </Loading>
              </div>
            </div>
            {/* <SideBar /> */}
            {/* <DialogBar /> */}
          </div>
        </div>
      )}
    </Formik>

  );
};
