import React from "react";
import ReactDOM from "react-dom";
import {render} from "react-dom";
import {Provider} from "react-redux";
import reducers from "./reducers/index";
import logger from "redux-logger";
import routes from "./routes.js";

//actions 

import {applyMiddleware,  createStore} from "redux";

const middleware = applyMiddleware(logger);

//const store = createStore(reducers, middleware);localStorage.getItem("myItem") === "null"

//const persistedState = localStorage.getItem("reduxState")  ? JSON.parse(localStorage.getItem("reduxState")) : {};
const store = createStore(reducers, middleware);

// store.subscribe(()=>{
// 	localStorage.setItem("reduxState", JSON.stringify(store.getState()));
// });
// store.subscribe(()=>{
// 	localStorage.setItem("reduxState", JSON.stringify(store.getState()));
// });
// localStorage.removeItem("tip");
render(
	<Provider store={store}>
		{routes}
	</Provider>, document.getElementById("container"));




