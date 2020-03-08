import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.module.scss';
import { Dropdown, Icon, Menu } from 'antd';
import { IUser } from '@/services/user';
import { Link } from 'react-router-dom';
import { UserStorage } from '@/util/user-storage';

export function AppHeader() {
  const [ account, setAccount ] = useState<IUser | null>(null);

  const logout = () => {
    UserStorage.logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>营销H5</div>
      <div className={styles.rightSide}>
        {account && (
          <div className={styles.userpannel}>
            <div className={styles.avatar}>
              <img src={account.avatar} alt="" />
            </div>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <Link target="_blank" to={'/'}>
											我的主页
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <div onClick={logout}>退出</div>
                  </Menu.Item>
                </Menu>
              }
            >
              <a className={styles.userProfile}>
                <span>
                  <span className={styles.userName}>{account.nickname}</span>
                  <br />
                  <span>用户</span>
                </span>
								&nbsp;
                <Icon type="caret-down" />
              </a>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
}
