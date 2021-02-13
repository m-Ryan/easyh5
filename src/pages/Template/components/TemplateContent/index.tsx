import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import { Header } from '@/components/Header';
import { useDispatch } from 'react-redux';
import template, { ITemplate } from '@/store/template';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useLoading } from '@/hooks/useLoading';
import { Formik, FormikHelpers } from 'formik';
import { ConfigurationPanel } from '@VisualEditor/components/ConfigurationPanel';
import { ToolPanel } from '@VisualEditor/components/ToolPanel';
import { Button, message, Radio } from 'antd';
import { Editor as VisualEditor, Renderer } from '@VisualEditor';
import { useQuery } from '@/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { useRendererContext } from '@VisualEditor/hooks/useRendererContext';

export function TemplateContent() {
  const dispatch = useDispatch();
  const { setVariable } = useRendererContext();

  useEffect(() => {
    setVariable({
      'user-nickname': 'Ryan mao'
    });
  }, [setVariable]);

  return <Renderer />;
}
