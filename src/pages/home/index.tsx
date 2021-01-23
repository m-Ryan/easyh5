import { useAppSelector } from '@/selectors/useAppSelector';
import user from '@/store/user';
import template, { fetchTemplateById, TEMPLATE_FETCH_VY_ID } from '@/store/template';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import { useLoading } from '@/selectors/useLoading';
import Frame from '@/components/Frame';
import templateList from '@/store/templateList';
import { Loading } from '@/components/loading';

export default function Home() {
    const dispatch = useDispatch()
    const userState = useAppSelector('template');
    const allLoadins = useAppSelector('loading');
    const loading = useLoading(templateList.loadings.fetch)

    useEffect(() => {
        dispatch(templateList.actions.fetch(undefined))
    }, [])


    return (
        <Frame breadcrumb={{ link: '/', title: "数据模板" }}>
            <Loading loading={loading}>
                1111
            </Loading>
        </Frame>
    )
}


