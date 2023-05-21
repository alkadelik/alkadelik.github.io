import axios from 'axios'
import * as urls from './urls'

// try {var auth = store.getters.getSettlement.keys.paystack_secret_key}
// catch {null}
// const auth = 'AIzaSyD-mKszUKKRlSBlc8u9Tb8zj7UslWpDxB4'


export const bulkUpload = (data) => {
    return axios ({
        method: 'post',
        url: `${urls.bulkUpload}`,
        data
    })
}
export const getStringDetails = (data) => {
    return axios ({
        method: 'post',
        url: `${urls.getStringDetails}`,
        data
    })
}
export const fetchSegments = () => {
    return axios ({
        method: 'get',
        url: `${urls.fetchSegments}`,
    })
}
export const fetchRoadStatus = (data) => {
    return axios ({
        method: 'post',
        url: `${urls.fetchRoadStatus}`,
        data
    })
}
export const fetchRoutes = () => {
    return axios ({
        method: 'get',
        url: `${urls.fetchRoutes}`,
    })
}
export const updateAddresses = (data) => {
    return axios ({
        method: 'post',
        url: `${urls.updateAddresses}`,
        data
    })
    .then((response) => {
        console.log(response.data)
    })
}
export const updateCode = (data) => {
    return axios ({
        method: 'post',
        url: `${urls.updateCode}`,
        data
    })
    .then((response) => {
        console.log(response.data)
    })
}
export const updateCoordinates = (data) => {
    return axios ({
        method: 'post',
        url: `${urls.updateCoordinates}`,
        data
    })
}
export const updateName = (data) => {
    return axios ({
        method: 'post',
        url: `${urls.updateName}`,
        data
    })
    .then((response) => {
        console.log(response.data)
    })
}
export const updateMotorability = (data) => {
    return axios ({
        method: 'post',
        url: `${urls.updateMotorability}`,
        data
    })
    .then((response) => {
        console.log(response.data)
    })
}
export const updateState = (data) => {
    return axios ({
        method: 'post',
        url: `${urls.updateState}`,
        data
    })
    .then((response) => {
        console.log(response.data)
    })
}