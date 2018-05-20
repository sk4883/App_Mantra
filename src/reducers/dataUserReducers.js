import {createStore} from "redux";


export function registerUserReducers (state = { users:[] } , action) {
	switch(action.type) {

	case "GET_USER":
		return Object.assign({}, {users: [...state.users]} );
		break;


	case "POST_USER" : 
	 	let users = state.users.concat(action.payload);
	 	return {users};
		break;
	}

	return state;   
}