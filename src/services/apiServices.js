import axios from 'axios'
import * as urls from './urls'
import * as mutationTypes from '@/store/mutationTypes'
import store from '@/store/index'

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
    // .then((response) => {
    //     store.commit(mutationTypes.SAVE_SEGMENTS, response.data)
    // })
}
export const fetchSegments = () => {
    return axios ({
        method: 'get',
        url: `${urls.fetchSegments}`,
    })
    .then((response) => {
        store.commit(mutationTypes.SAVE_SEGMENTS, response.data.segments)
        store.commit(mutationTypes.SAVE_ADDRESSES, response.data.addresses)
        store.commit(mutationTypes.SAVE_ROUTES, response.data.routes)
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
    .then((response) => {
        store.commit(mutationTypes.SAVE_ROUTES, response.data)
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