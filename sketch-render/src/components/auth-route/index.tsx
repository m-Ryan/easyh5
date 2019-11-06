import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, Route, RouteProps } from 'react-router';
import { Location, History } from 'history';

export interface IAuthRoute extends RouteProps {
  authRoute: (location: Location, next: (path?: string)=> void) => any;
  children?: any;
}


export function AuthRoute(props: IAuthRoute) {
  const [isAuth, setIsauth] = useState(false)
  const history = useHistory();
  const location = useLocation();
  
  useEffect(() => {
    authRoute();
  }, [location])

  const authRoute = () => {
    setIsauth(false)
    props.authRoute(location, (path?: string)=> {
      if (path) {
        history.replace(path);
      } else {
        setIsauth(true);
      }
    })
  }

  return isAuth ? <Route {...props} /> : null;
}
