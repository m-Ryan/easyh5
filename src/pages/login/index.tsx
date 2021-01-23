import React, { useState } from 'react';
import styles from './index.module.scss';
import { Form, Icon, Input, Button, message } from 'antd';
import services from '@/services';
import { RouterProps } from 'react-router';
import { UserStorage } from '@/util/user-storage';

export function Login(props: RouterProps) {

  const onLogin = async (phone: string, password: string) => {
    try {
      const data = await services.user.login(phone, password);
      UserStorage.setToken(data.token);
      props.history.push('/');
    } catch (error) {
      message.error(error.message);
    }
  };


  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src="http://assets.maocanhua.cn/FmPapNmWRyJf-C6kVimZGVLZx5Mi" alt="" />
        </div>
        {/* <div className={styles.slogan}>h5快速营销系统</div> */}
        <div className={styles.title}>h5快速营销系统</div>
        <div className={styles.form}>
          <Form className={styles.loginForm}>
            <Form.Item>
              <Input
                onChange={e => setPhone(e.target.value)}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入管理员账号"
              />
            </Form.Item>
            <Form.Item>
              <Input
                onChange={e => setPassword(e.target.value)}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button size="large" type="primary" onClick={() => onLogin(phone, password)} className={styles.loginBtn}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
