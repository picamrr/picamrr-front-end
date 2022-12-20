import {getToken} from "./SecureStorage";


const nextLayer = async (currentLayer, request) => await nextMap[currentLayer](request)
const nextLayerReservations = async (currentLayer, request) => await nextMapReservations[currentLayer](request)
const nextLayerCancelReservations = async (currentLayer, request) => await nextMapCancelReservations[currentLayer](request)
const nextLayerAddReservation = async (currentLayer, request) => await nextMapAddReservation[currentLayer](request)
const nextLayerGetUserByEmail = async (currentLayer, request) => await nextMapGetUserByEmail[currentLayer](request)
const nextLayerUpdateUser = async (currentLayer, request) => await nextMapUpdateUser[currentLayer](request)

const finalLayer = (request) => fetch(request.url, request.details);

const securityLayer = async (request) => {
    request.details.headers["Authorization"] = "Basic " + await getToken()
    return nextLayer("securityLayer", request)
};

export const getRestaurants = () => {
    return nextLayer("getRestaurants", {
        url: "http://localhost:8080/restaurants", details: {
            method: "GET", headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }
    }).then((response) => {
        return response.json()
    })
        .catch((error) => {
            console.error(error + "valeu")
        })
}

export const getReservations = () => {
    return nextLayerReservations("getReservations", {
        url: "http://localhost:8080/reservations", details: {
            method: "GET", headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }
    }).then((response) => {
        return response.json()
    })
        .catch((error) => {
            console.error(error + "valeu")
        })
}

export const cancelReservation = (id) => {
    return nextLayerCancelReservations("cancelReservation", {
        url: "http://localhost:8080/reservations?reservationId=" + id, details: {
            method: "DELETE", headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }
    }).catch((error) => {
        console.error(error + "valeu")
    })
}

export const addReservation = (id, dateOfReservation, noOfSeats, gap) => {
    console.log(id, dateOfReservation.toISOString().split("T")[0], noOfSeats, gap);

    return nextLayerAddReservation("addReservation", {
        url: "http://localhost:8080/reservations?restaurantId=" + id,
        details: {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(
                {
                    dateOfReservation: dateOfReservation.toISOString().split("T")[0],
                    noOfSeats: noOfSeats,
                    gap: gap
                }
            )
        }
    }).catch((error) => {
        console.error(error + "valeu")
    })
}

export const updateUser = (email, name, phoneNumber) => {
    return nextLayerUpdateUser("updateUser", {
        url: "http://localhost:8080/users/" + email,
        details: {
            method: "PUT", headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(
                {
                    name: name,
                    phoneNumber: phoneNumber
                }
            )
        }
    });
}

export const getUserByEmail = (email) => {
    return nextLayerGetUserByEmail("getUserByEmail", {
        url: "http://localhost:8080/users/" + email, details: {
            method: "GET", headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }
    }).then((response) => {
        return response.json()
    })
        .catch((error) => {
            console.error(error + "valeu")
        })
}

const nextMap = {"securityLayer": finalLayer, "getRestaurants": securityLayer}

const nextMapReservations = {"securityLayer": finalLayer, "getReservations": securityLayer}

const nextMapCancelReservations = {"securityLayer": finalLayer, "cancelReservation": securityLayer}


const nextMapAddReservation = {"securityLayer": finalLayer, "addReservation": securityLayer}
const nextMapGetUserByEmail = {"securityLayer": finalLayer, "getUserByEmail": securityLayer}
const nextMapUpdateUser = {"securityLayer": finalLayer, "updateUser": securityLayer}

