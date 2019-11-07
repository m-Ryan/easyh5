import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from '@/page/home';
import { configureAppStore } from '@/store';
import { Provider } from 'react-redux'
export const router = (
	<Provider store={configureAppStore()}>
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home}></Route>
			</Switch>
		</BrowserRouter>
	</Provider>

);
