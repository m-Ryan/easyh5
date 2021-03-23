import { PageHeader, } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';
import React from 'react';
import { useHistory } from 'react-router-dom';
export interface HeaderProps extends Omit<PageHeaderProps, 'onBack'> {
  backUrl?: string;
  title: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const history = useHistory();
  const { backUrl } = props;
  return (
    <PageHeader
      {...props}
      onBack={backUrl ? () => history.replace(backUrl) : undefined}
    />
  );
};
