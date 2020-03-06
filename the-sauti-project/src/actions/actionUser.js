import { userMessages } from "../messages";

import { crud_handling } from "../CRUD_services";


import { alertInfo } from "./alertInfo";
import { history } from "../utils";



export const actionUser = {
    login, 
    logout,
    register,
    getAll,
    add,
    delete: _delete
} 

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }))

        crud_handling.login(username,password)
        .then(
            user => {
                dispatch(success(user));
                history.push('/')
            },
            error => {
                dispatch(failure(error.toString()))
                dispatch(alertInfo.error(error.toString()))
            }
        );
    };
    function request(user) { return {type: userMessages.LOGIN_REQUEST, user } }
    function success(user) { return {type: userMessages.LOGIN_SUCCESS, user } }
    function failure(error){ return {type: userMessages.LOGIN_FAILURE, error} }
} 

function logout() {

    crud_handling.logout();
    return { type: userMessages.LOGOUT }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        crud_handling.register(user) 
        .then(
            user => {
                dispatch(success());
                history.push('/login');
                dispatch(alertInfo.success("Registration successful"))
            },
            error => {
                dispatch(failure(error.toString()))
                dispatch(alertInfo.error(error.toString()))
            }
        );
    }

    function request(user) {return { type: userMessages.REGISTER_REQUEST, user} }
    function success(user) {return { type: userMessages.REGISTER_SUCCESS, user} }
    function failure(error) {return { type: userMessages.REGISTER_FAILURE, error} }

}

function getAll() {
    return dispatch => {
        dispatch(request());

        crud_handling.getAll()
        .then(
            users => dispatch(success(users)),
            error => dispatch(failure(error.toString))
        );
    };
    function request() { return { type: userMessages.GETALL_REQUEST } }
    function success(users) { return { type: userMessages.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userMessages.GETALL_FAILURE , error } }
}

function add(id) {
    return dispatch => {
        dispatch(request(id))

        crud_handling.add(id)
        .then(
            user => dispatch(success(id)),
            error => dispatch(failure(id, error.toString()))
        )
    }
    function request(id) { return { type: userMessages.ADD_REQUEST, id } }
    function success(id) { return { type: userMessages.ADD_SUCCESS, id } }
    function failure(id) { return { type: userMessages.ADD_FAILURE, id } }
}



function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        crud_handling.delete(id)
        .then(
            user => dispatch(success(id)),
            error => dispatch(failure(id, error.toString()))
        );
    };

    function request(id) { return { type: userMessages.DELETE_REQUEST, id } }
    function success(id) { return { type: userMessages.DELETE_SUCCESS, id } }
    function failure( id, error) { return { type: userMessages.DELETE_FAILURE, id, error } }
}