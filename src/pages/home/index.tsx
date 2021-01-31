import { useAppSelector } from '@/hooks/useAppSelector';
import user from '@/store/user';
import template, { TEMPLATE_FETCH_VY_ID } from '@/store/template';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoading } from '@/hooks/useLoading';
import Frame from '@/components/Frame';
import templateList from '@/store/templateList';
import { Loading } from '@/components/loading';
import { Button } from 'antd';
import { CardItem } from './components/CardItem';
import { Stack } from '@/components/Stack';

export default function Home() {
    const dispatch = useDispatch();
    const list = useAppSelector('templateList');
    const loading = useLoading(templateList.loadings.fetch);

    useEffect(() => {
        dispatch(templateList.actions.fetch(undefined));
    }, [dispatch]);


    return (
        <Frame title="数据模板" primaryAction={<Button>新建</Button>}>
            <Loading loading={loading}>
                <Stack>
                    {
                        list.map(item => <CardItem data={item} key={item.article_id} />)
                    }
                </Stack>
            </Loading>
        </Frame>
    );
}


