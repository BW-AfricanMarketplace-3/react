import { authHeader } from "../utils";

export const crud_handling = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};


function handleResponse(response){
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if(!response.ok){
            if(response.status === 401) {
                logout();
                // location.reload(true)
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data
    });
}

function login(username, password) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ username, password })
    };

    return fetch("http://africanmarketplace.ddns.net:5000/api/auth/login", requestOptions)
    .then(handleResponse)
    .then(user => {
        localStorage.setItem("user", JSON.stringify({user, password}))
        return login
    })
}

function logout() {
    localStorage.removeItem("user")
}

function getAll(){
    const requestOptions = {
        method: "GET",
        haerders: authHeader()
    };

    return fetch("http://africanmarketplace.ddns.net:5000/api/listings", requestOptions )
    .then(handleResponse)
}

function getById(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };
    return fetch(`http://africanmarketplace.ddns.net:5000/api/users/${id}`, requestOptions)
    .then(handleResponse)
    
  
}

function register(users) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(users)
    }
    return fetch("http://africanmarketplace.ddns.net:5000/api/auth/register", requestOptions, )
    .then(handleResponse)
    .then( user => {
        console.log("Registration",user)
    })
}

function add(user) {
    const requestOptions = {
        method: "POST",
        headers: {...authHeader(), "Content-Type": "application/json"},
        body: JSON.stringify(user)
    }
    return fetch(`http://africanmarketplace.ddns.net:5000/api/users/${user.Id}/listings`, requestOptions
    )
    .then(handleResponse)
}

function update(user) {
    const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }
    return fetch(`http://africanmarketplace.ddns.net:5000/api/users/${user.id}/listings/${user.id}`, requestOptions).then(handleResponse);
}

function _delete(id){
    const requestOptions ={
        method: "DELETE",
        headers: authHeader()
    };
    return fetch("http://africanmarketplace.ddns.net:5000", requestOptions).then(handleResponse)


}