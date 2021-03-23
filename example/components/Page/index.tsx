import React, { useState, useEffect } from 'react';
import { UserStorage } from '@example/util/user-storage';
import { message } from 'antd';
import { useAppSelector } from '@example/hooks/useAppSelector';
import toast from '@example/store/common/toast';

export default function Page({ children }: { children: React.ReactNode; }) {
  const [hasLogin, setHasLogin] = useState(false);
  const errToast = useAppSelector('toast');

  useEffect(() => {
    UserStorage.getAccount()
      .then(() => {
        setHasLogin(true);
      })
      .catch(err => message.error(err.message));
  }, []);

  useEffect(() => {
    const current = errToast[0];
    if (current) {
      message.error(current.message, current.duration, () => {
        toast.actions.remove(current);
      });
    }

  }, [errToast]);

  if (!hasLogin) return null;

  return (
    <>{children}</>
  );
}
