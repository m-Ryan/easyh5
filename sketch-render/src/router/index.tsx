import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from '@/pages/home';
import { Editor } from '@/pages/editor';
import { StoreProvider } from '@/modal';
import { Login } from '@/pages/login';
import { Preview } from '@/pages/preview';
import { BASE_NAME } from '@/constants';
export const router = (
  <StoreProvider>
    <BrowserRouter basename={BASE_NAME}>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/editor" exact component={Editor}></Route>
        <Route path="/preview" exact component={Preview}></Route>
        <Route path="/login" exact component={Login}></Route>
      </Switch>
    </BrowserRouter>
  </StoreProvider>

);
