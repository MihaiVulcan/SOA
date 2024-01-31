import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: "eu-central-1_K9v8LNFl7",
    ClientId: "hj488l3do22qmg6frv7i8afvg"
}

export default new CognitoUserPool(poolData)