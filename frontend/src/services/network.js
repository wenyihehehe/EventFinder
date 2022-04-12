import { Domain } from "../config/domain"
import Cookie from "js-cookie"

async function get({ path = null, url = null }){
	try{
		url = url || Domain + path;
		let response = await new Promise((res,rej)=>{
			fetch(url)
			.then((response) => {
				if (response.ok) {
					return response;
				} else {
					throw new Error('Something went wrong');
				}
			})
			.then((responseJson) => {
				res(responseJson)
			})
			.catch((error) => {
				rej(error)
			});
		})
		let data = await response.json();
		return data
	} catch(err){
		console.log(err)
		throw err;
	}
};

async function post({ path = null, url = null, body }){
	try{
		url = url || Domain + path;
		let response = await new Promise((res,rej)=>{
			fetch(url, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			})
			.then((response) => {
				if (response.ok) {
					return response
				} else {
					console.error('Something went wrong')
					return response
				}
			})
			.then((responseJson) => {
				res(responseJson)
			})
			.catch((error) => {
				rej(error)
			});
		})
		let data = await response.json();
		return data
	} catch(err){
		throw err;
	}
};

async function authGet({ path = null, url = null }) {
	try{
		url = url || Domain + path;
		let response = await new Promise((res,rej)=>{
			fetch(url, {
				headers: {
					Authorization: `Token ${Cookie.get("token")}`,
				}
			})
			.then((response) => {
				if (response.ok) {
					return response;
				} else {
					throw new Error('Something went wrong');
				}
			})
			.then((responseJson) => {
				res(responseJson)
			})
			.catch((error) => {
				rej(error)
			});
		})
		let data = await response.json();
		return data
	} catch(err){
		console.log(err)
		throw err;
	}
};

async function authPost({ path = null, url = null, body }) {
	try{
		url = url || Domain + path;
		let response = await new Promise((res,rej)=>{
			fetch(url, {
				method: "POST",
				headers: {
					Authorization: `Token ${Cookie.get("token")}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			})
			.then((response) => {
				if (response.ok) {
					return response;
				} else {
					throw new Error('Something went wrong');
				}
			})
			.then((responseJson) => {
				res(responseJson)
			})
			.catch((error) => {
				rej(error)
			});
		})
		let data = await response.json();
		return data
	} catch(err){
		console.log(err)
		throw err;
	}
};

async function authPatch({ path = null, url = null, body }) {
	try{
		url = url || Domain + path;
		let response = await new Promise((res,rej)=>{
			fetch(url, {
				method: "PATCH",
				headers: {
					Authorization: `Token ${Cookie.get("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body)
			})
			.then((response) => {
				if (response.ok) {
					return response;
				} else {
					throw new Error('Something went wrong');
				}
			})
			.then((responseJson) => {
				res(responseJson)
			})
			.catch((error) => {
				rej(error)
			});
		})
		let data = await response.json();
		return data
	} catch(err){
		console.log(err)
		throw err;
	}
};

async function authPatchWithFormData({ path = null, url = null, formData }) {
	url = url || Domain + path;
	let response = await fetch(url, {
		method: "PATCH",
		headers: {
			Authorization: `Token ${Cookie.get("token")}`,
		},
		body: formData,
	});
	let data = await response.json();
	return { data, response };
};

async function authPut({ path = null, url = null, body }) {
	try{
		url = url || Domain + path;
		let response = await new Promise((res,rej)=>{
			fetch(url, {
				method: "PUT",
				headers: {
					Authorization: `Token ${Cookie.get("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			})
			.then((response) => {
				if (response.ok) {
					return response;
				}
				else {
					throw new Error('Something went wrong');
				}
			})
			.then((responseJson) => {
				res(responseJson)
			})
			.catch((error) => {
				rej(error)
			});
		})
		let data = await response.json();
		return data
	} catch(err){
		console.log(err)
		throw err;
	}
};

async function authPutWithFormData({ path = null, url = null, formData }) {
	url = url || Domain + path;
	let response = await fetch(url, {
		method: "PUT",
		headers: {
			Authorization: `Token ${Cookie.get("token")}`,
		},
		body: formData,
	});
	let data = await response.json();
	return { data, response };
};

async function authPostWithFormData({ path = null, url = null, formData }) {
	url = url || Domain + path;
	let response = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Token ${Cookie.get("token")}`,
		},
		body: formData,
	});
	let data = await response.json();
	return { data, response };
};

async function authDelete({ path = null, url = null }) {
	url = url || Domain + path;
	let response = await fetch(url, {
		method: "DELETE",
		headers: {
			Authorization: `Token ${Cookie.get("token")}`,
		},
	});
	let data = await response.text();
	return { data, response };
};

async function authDeleteWithFormData({ path = null, url = null, formData }) {
	url = url || Domain + path;
	let response = await fetch(url, {
		method: "DELETE",
		headers: {
			Authorization: `Token ${Cookie.get("token")}`,
		},
		body: formData,
	});
	let data = await response.json();
	return { data, response };
};

export {get, post, 
	authGet, authPost, 
	authPatch, authPatchWithFormData, 
	authPut, authPutWithFormData, authPostWithFormData, 
	authDelete, authDeleteWithFormData};


