import React, { useMemo, useState, useEffect } from 'react';
import { Provider, useStore } from './reaction/Reaction';
import { useArticle } from './useArticle';
import { useDialog } from './useDialog';
import { UserStorage } from '../util/user-storage';
import { message } from 'antd';

type StoreType = {
  article: ReturnType<typeof useArticle>;
  dialog: ReturnType<typeof useDialog>;
}

export function StoreProvider( { children }: { children: React.ReactNode}) {
  const [hasLogin, setHasLogin] = useState(false);
  const article = useArticle();
  const dialog = useDialog();

  useEffect(()=> {
    UserStorage.getAccount()
        .then(()=> {
          setHasLogin(true)
        })
        .catch(err=>message.error(err.message));
  }, [])

  if (!hasLogin) return null;

  return (
    <Provider store={{
      article,
      dialog
    }} >
      { children }
    </Provider>
  )
}

export function useSelector<T extends keyof StoreType>(selector: T){
  return useStore<StoreType[T]>(selector);
}
