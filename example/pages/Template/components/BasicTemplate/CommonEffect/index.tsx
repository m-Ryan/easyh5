import { useRendererContext } from '@/index';
import { useAppSelector } from '@example/hooks/useAppSelector';
import { useLoading } from '@example/hooks/useLoading';
import user from '@example/store/user';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function CommonEffect() {
  const dispatch = useDispatch();
  const userData = useAppSelector('user');
  const loading = useLoading(['user']);

  const { setVariable } = useRendererContext();

  useEffect(() => {
    dispatch(user.actions.fetch(undefined));
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {

      setVariable({
        user: userData
      });
    }
  }, [loading, setVariable, userData]);

  return <></>;
}