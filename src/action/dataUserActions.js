"use strict";

export function postUser(getUserValue) {
	console.log("~~~~~~~~~~~~~~~~~");
	return {type: "POST_USER", payload: getUserValue};
}


export function getUser() {
	return {type: "GET_USER"};
}
