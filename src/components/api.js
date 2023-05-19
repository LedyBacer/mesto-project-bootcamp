import {checkStatus, showErr} from "./utils";

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wbf-cohort-8',
    headers: {
        authorization: '15b761dd-2148-487a-a7b8-1576e91a7d6c',
        'Content-Type': 'application/json'
    }
}


export function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(checkStatus)
        .catch(showErr)
}

export function getProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(checkStatus)
        .catch(showErr)
}

export function updateProfile(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
        .then(checkStatus)
        .catch(showErr)
}

export function pushCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    })
        .then(checkStatus)
        .catch(showErr)
}

export function delCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(checkStatus)
        .catch(showErr)
}

export function addLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(checkStatus)
        .catch(showErr)
}

export function delLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(checkStatus)
        .catch(showErr)
}

export function updateProfileAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar
        })
    })
        .then(checkStatus)
        .catch(showErr)
}