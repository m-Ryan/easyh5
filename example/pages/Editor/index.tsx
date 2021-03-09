import React, { useCallback, useEffect, useMemo } from 'react';
import styles from './index.module.scss';
import { Header } from '@example/components/Header';
import { useDispatch } from 'react-redux';
import template, { ITemplate } from '@example/store/template';
import { useAppSelector } from '@example/hooks/useAppSelector';
import { useLoading } from '@example/hooks/useLoading';
import { Formik, FormikHelpers } from 'formik';
import { Button, message } from 'antd';
import { useQuery } from '@example/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { Stack } from '@example/components/Stack';
import { ExamplePage } from '@/index';
import { VisualEditorProvider } from '@/index';
import services from '@example/services';

export default function Editor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const templateData = useAppSelector('template');

  const { id } = useQuery();
  const loading = useLoading(template.loadings.fetchById);
  const isSubmitting = useLoading([template.loadings.create, template.loadings.updateById]);

  useEffect(() => {
    if (id) {
      dispatch(template.actions.fetchById(+id));
    } else {
      dispatch(template.actions.fetchDefaultTemplate(undefined));
    }

  }, [dispatch, id]);

  const onSave = useCallback((values: ITemplate) => {
    if (id) {
      dispatch(template.actions.updateById({
        id: +id,
        template: values,
        success() {
          message.success('更新成功');
        }
      }));
    } else {
      dispatch(template.actions.create({
        template: values,
        success(templateId) {
          history.replace(`/editor?id=${templateId}`);
          message.success('创建成功');
        }
      }));
    }
  }, [dispatch, history, id]);

  const initialValues = useMemo(() => {
    // because redux object is not extensible
    return templateData ? cloneDeep(templateData.content) : null;
  }, [templateData]);

  if (!initialValues) return null;

  return (

    <VisualEditorProvider
      data={initialValues}
      onSubmit={onSave}
      uploadHandler={services.common.uploadByQiniu}
    >
      {
        ({ handleSubmit }) => {
          return (
            <div className={styles.container}>
              <Header backUrl="/" title={initialValues.title}
                extra={(
                  <Stack>
                    <Button loading={isSubmitting} type="primary" onClick={() => handleSubmit()}>保存</Button>
                  </Stack>
                )}
              />
              <ExamplePage />

            </div>
          );
        }
      }
    </VisualEditorProvider>

  );
}

