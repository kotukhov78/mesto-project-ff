const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
    headers: {
        authorization: '7bcddfbe-b09d-482c-b0c1-bf3d57a4e0cf',
        'Content-Type': 'application/json'
    }
};

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const deleteCardApi = (idCardForDelete) => {
    return fetch(`${config.baseUrl}/cards/${idCardForDelete}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse)
};

export const formEditApi = (profileTitle, profileDescription) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileTitle,
            about: profileDescription
        })
    })
    .then(checkResponse)
};

export const newCardApi = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
    .then(checkResponse)
};

export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
    .then(checkResponse)
    .catch((err) => {
        console.log(err);
    })
};

export const getAllCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
    .then(checkResponse)
    .catch((err) => {
        console.log(err);
    })
};

export const editAvatarApi = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
    .then(checkResponse)
};

export const cardLikeDeleteApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse)
};

export const cardLikePutApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(checkResponse)
}