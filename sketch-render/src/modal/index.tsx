import React, { useMemo, useState, useEffect } from 'react';
import { useArticle } from './useArticle';
import { useDialog } from './useDialog';
import { UserStorage } from '../util/user-storage';
import { message } from 'antd';
import { createReactionStore } from './reaction/Reaction';

type StoreType = {
  article: ReturnType<typeof useArticle>;
  dialog: ReturnType<typeof useDialog>;
}
export const { Provider, useStore, useSelector, useImmerState } = createReactionStore({
  article: useArticle
}, {
  debug: false
});

export function StoreProvider( { children }: { children: React.ReactNode}) {
  const [hasLogin, setHasLogin] = useState(false);

  useEffect(()=> {
    console.log('login')
    UserStorage.getAccount()
        .then(()=> {
          setHasLogin(true)
        })
        .catch(err=>message.error(err.message));
  }, [])

  if (!hasLogin) return null;

  return (
    <Provider >
      { children }
    </Provider>
  )
}
