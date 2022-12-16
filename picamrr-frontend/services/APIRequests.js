import {getToken} from "./SecureStorage";


const nextLayer = async (currentLayer, request) => await nextMap[currentLayer](request)

const finalLayer = (request) => fetch(request.url, request.details);

const securityLayer = async (request) => {
    request.details.headers["Authorization"] = "Basic " + await getToken()
    return nextLayer("securityLayer", request)
};

export const getRestaurants = () => {
    return nextLayer("getRestaurants", {url: "http://localhost:8080/restaurants", details: {method: "GET", headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }}}).then((response) => {return response.json()})
        .catch((error) => {console.error(error + "valeu")})
}

const nextMap = {"securityLayer": finalLayer, "getRestaurants": securityLayer}