import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Page from '@example/components/Page';
import Home from '@example/pages/Home';
import store from '@example/store';
import 'antd/dist/antd.css';
import '@example/styles/common.scss';
import Editor from '@example/pages/Editor';
import Template from '@example/pages/Template';
import { history } from './util/history';

export default function App() {
  return (
    <Provider store={store}>
      <Page>
        <Router history={history}>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/editor' component={Editor} />
            <Route path='/template' component={Template} />
          </Switch>
        </Router>
      </Page>
    </Provider>
  );
}
