"use strict";

import {combineReducers} from "redux";
import {registerUserReducers} from "./dataUserReducers";

export default combineReducers({
	users: registerUserReducers
});
