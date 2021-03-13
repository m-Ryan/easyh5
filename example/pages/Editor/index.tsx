import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import template from '@example/store/template';
import { useAppSelector } from '@example/hooks/useAppSelector';
import { useLoading } from '@example/hooks/useLoading';
import { message } from 'antd';
import { useQuery } from '@example/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { ExamplePage } from './components/ExamplePage';
import { VisualEditorProps } from '@/components/VisualEditorProvider';
import { IPage } from '@/components/core/blocks/basic/Page';

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

  const onSave = useCallback((values: VisualEditorProps) => {
    const payload = {
      content: values.pages,
      title: values.title,
      picture: values.picture,
    };
    if (id) {
      dispatch(template.actions.updateById({
        id: +id,
        template: payload,
        success() {
          message.success('更新成功');
        }
      }));
    } else {
      dispatch(template.actions.create({
        template: payload,
        success(templateId) {
          history.replace(`/editor?id=${templateId}`);
          message.success('创建成功');
        }
      }));
    }
  }, [dispatch, history, id]);

  const initialValues: { title: string; picture: string, content: IPage[]; } = useMemo(() => {
    if (!templateData) {
      return {
        title: '',
        content: [],
        picture: ''
      };
    }
    // because redux object is not extensible
    const content = templateData ? cloneDeep(templateData.content) : [];
    return {
      title: templateData.title,
      picture: templateData.picture,
      content: content,
    };
  }, [templateData]);

  if (!initialValues) return null;

  return (
    <ExamplePage initialValues={initialValues} onSave={onSave} isSubmitting={isSubmitting} />
  );
}

