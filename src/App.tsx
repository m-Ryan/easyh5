import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Page from '@/components/Page';
import Home from '@/pages/home';
import store from '@/store';
import 'antd/dist/antd.css';
import '@/styles/common.scss';

export default function App() {
  return (
    <Provider store={store}>
      <Page>
        <BrowserRouter>
          <Switch>
            <Route exact component={Home}></Route>
          </Switch>
        </BrowserRouter>
      </Page>
    </Provider>
  )
}
