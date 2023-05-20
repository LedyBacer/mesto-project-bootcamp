import {checkStatus} from "./utils";

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wbf-cohort-8',
    headers: {
        authorization: '15b761dd-2148-487a-a7b8-1576e91a7d6c',
        'Content-Type': 'application/json'
    }
}

function request(endpoint, options) {
    return fetch(config.baseUrl + endpoint, options).then(checkStatus)
}

export function getCards() {
    return request('/cards', {
        headers: config.headers
    })
}

export function getProfile() {
    return request('/users/me', {
        headers: config.headers
    })
}

export function updateProfile(name, about) {
    return request('/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
}

export function pushCard(name, link) {
    return request('/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    })
}

export function delCard(cardId) {
    return request(`/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}

export function addLike(cardId) {
    return request(`/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
}

export function delLike(cardId) {
    return request(`/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
}

export function updateProfileAvatar(avatar) {
    return request('/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar
        })
    })
}