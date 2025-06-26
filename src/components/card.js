import { cardLikeDeleteApi, cardLikePutApi } from "./api.js";

// @todo: Функция создания карточки
export function createCard(cardData, handleDeleteCard, handleClickImg, cardLike, userId) {
    
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;

    // @todo: DOM узлы
    const cardElement = cardTemplate.cloneNode(true).querySelector('.card');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeNumber = cardElement.querySelector('.card__like-number');//создадим переменую количества лайков
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardLikeNumber.textContent = cardData.likes.length;//присвоим значение длины массива лайков, полученное с сервера

    // показ или нет кнопки удаления и слушатель кнопки удаления
    if (cardData.owner._id !== userId) {
        cardDeleteButton.remove();
    } else {
        cardDeleteButton.addEventListener('click', () => {
            handleDeleteCard(cardData._id, cardElement);
        });
    };

    // слушатель разворачивания картинки при клике
    cardImage.addEventListener('click', () => {
        handleClickImg(cardData.link, cardData.name);
    });

    // слушатель и вызов функции лайка карточки
    cardLikeButton.addEventListener('click', () => {
        cardLike(cardLikeButton, cardData._id, cardLikeNumber);
    });

    // Проверяем, лайкнул ли текущий пользователь карточку
    const isLiked = cardData.likes.some(like => like._id === userId);
    if (isLiked) {
        cardLikeButton.classList.add('card__like-button_is-active');
    };

    return cardElement;
};

// скрипт лайка карточки
export function cardLike(cardLikeButton, cardId, cardLikeNumber) {
    const cardLikedStatus = cardLikeButton.classList.contains('card__like-button_is-active');
    if (cardLikedStatus) {
        cardLikeDeleteApi (cardId)
        .then(data => {
            // Удаляем класс лайка
            cardLikeButton.classList.remove('card__like-button_is-active');
            cardLikeNumber.textContent = data.likes.length;
        })
        .catch(err => {
            console.log(err);
        })
    } else {
        cardLikePutApi (cardId)
        .then(data => {
            // добавим класс лайка
            cardLikeButton.classList.add('card__like-button_is-active');
            cardLikeNumber.textContent = data.likes.length;
        })
        .catch(err => {
            console.log(err);
        })
    }
};
