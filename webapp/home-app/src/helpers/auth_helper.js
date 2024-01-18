import {UserManager} from 'oidc-client'

const settings ={
    authority: "http://localhost:8078/realms/carapp/account/",
    client_id: "react_auth",
    redirect_uri: "http://localhost:3000/",
    response_type: "code",
    scope: "openid profile"
};

const userManager = new UserManager(settings);

const getUser = () => {
    return userManager.getUser();
}

const login = () => {
    return userManager.signinRedirect();
}

const logout = () => {
    return userManager.signoutRedirect();
}

export {getUser, login, logout};