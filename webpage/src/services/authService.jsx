import Cookies from 'universal-cookie';
import UserPool from "../UserPool.jsx"
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

const logInUsernameAndPassword = async (username, password) => {
  console.log(username, password)

  const cookies = new Cookies(null, { path: '/' });
  const user = new CognitoUser({
    Username: username,
    Pool: UserPool
  });

  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password
  });

  user.authenticateUser(authDetails, {
    onSuccess: (data) => {
      console.log("success ", data)
      console.log(data.getAccessToken().getJwtToken())
      cookies.set("accessToken", data.getAccessToken().getJwtToken())
      cookies.set("idToken", data.getIdToken().getJwtToken())
    },
    onFailure: (err) => {
      console.log("fail ", err)
      throw new Error("fail")
    },
    newPasswordRequired: (data) => {
      console.log("new pass required", data)
      throw new Error("new pass required")
    }
  });
};

export {logInUsernameAndPassword}