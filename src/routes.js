import React from "react";
import {
	BrowserRouter,
	Switch,
	Route,
	Redirect,
	HashRouter
} from "react-router-dom";

import App from "./Components/app.js";
import Srcdes from "./Components/srcdes.js";
import Outstation from "./Components/outstation.js";
import Rental from "./Components/rental.js";

const appRoutes = [
	{
		path: "/",
		isExactPath: true,
		component: <App />
	
	},

	{
		path: "/srcdes",
		isExactPath: true,
		component: <Srcdes />
	},

	{
		path:"/outstation",
		isExactPath: true,
		component: <Outstation />
	},

	{
		path:"/rental",
		isExactPath: true,
		component: <Rental />
	},
];


const routes = (
	<HashRouter>
		<Switch>
			{appRoutes.map((routeItem, idx) => {
				return <Route
					key={routeItem.path}
					path={routeItem.path}
					exact={routeItem.isExactPath}
					render={(params) => {
						return routeItem.component;
					}}
				/>;
			})}
		</Switch>
	</HashRouter>
);

export default routes;