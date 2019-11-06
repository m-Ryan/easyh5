import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from '@/page/home';

export const router = (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={Home}></Route>
		</Switch>
	</BrowserRouter>
);
