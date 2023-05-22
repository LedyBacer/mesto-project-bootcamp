import {checkStatus} from "./utils";

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wbf-cohort-8',
    headers: {
        authorization: '15b761dd-2148-487a-a7b8-1576e91a7d6c',
        'Content-Type': 'application/json'
    }
}

function request(endpoint, options={}) {
    const params = {
        headers: config.headers,
        ...options
    };
    return fetch(config.baseUrl + endpoint, params).then(checkStatus);
}

export const getCards = () => request('/cards');

export const getProfile = () => request('/users/me');

export function updateProfile(name, about) {
    return request('/users/me', {
        method: 'PATCH',
        body: JSON.stringify({
            name,
            about
        })
    })
}

export function pushCard(name, link) {
    return request('/cards', {
        method: 'POST',
        body: JSON.stringify({
            name,
            link
        })
    })
}

export function delCard(cardId) {
    return request(`/cards/${cardId}`, {
        method: 'DELETE'
    })
}

export function addLike(cardId) {
    return request(`/cards/likes/${cardId}`, {
        method: 'PUT'
    })
}

export function delLike(cardId) {
    return request(`/cards/likes/${cardId}`, {
        method: 'DELETE'
    })
}

export function updateProfileAvatar(avatar) {
    return request('/users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify({
            avatar
        })
    })
}