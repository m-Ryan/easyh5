import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Menu, Icon, message } from 'antd';
import services from '@/services';
import { withRouter, RouterProps } from 'react-router';
import { IAppMenuItem } from '@/services/common';
const SubMenu = Menu.SubMenu;

export const AppMenu = withRouter(function(props: RouterProps) {
  const [ state, setstate ] = useState<IAppMenuItem[]>([]);

  useEffect(() => {
    services.common.getMenu().then((data) => {
      setstate(data);
    });
  }, []);

  const goMenuUrl = (url: string)=> {
    props.history.push(url);
  }

  const renderMenu = () => {
    return state.map((menuItem, index) => {
      const hasChlildren = menuItem.children.length > 0;
      if (!hasChlildren && !menuItem.url) {
        return message.error('菜单配置错误，没有子项的顶级菜单栏必须要有url')
      }

      if (menuItem.url) {
        return (
          <Menu.Item key={index} onClick={()=>goMenuUrl(menuItem.url!)}>
            <Icon type={menuItem.icon} />
            <span>{menuItem.name}</span>
          </Menu.Item>
        )
      }

      return (
        <SubMenu
          key={index}
          popupClassName = {styles.subMenuItem}
          title={
            <span>
              <Icon type={menuItem.icon} />
              <span>{menuItem.name}</span>
            </span>
          }
        >
          {menuItem.children.map((item, cIndex) => (
            <Menu.Item className = {styles.subMenuItem}  onClick={()=>goMenuUrl(item.url)} key={index + '-' + cIndex}>{item.name}</Menu.Item>
          ))}
        </SubMenu>
      )
    });
  };


  if (!state.length) return null;
  const openKeys = state.filter((item=> item.isOpen)).map((item, index)=>index.toString());

  return (
    <div className={styles.container}>
      <Menu defaultOpenKeys={openKeys} mode="inline">
        {renderMenu()}
      </Menu>
    </div>
  );
}
)
