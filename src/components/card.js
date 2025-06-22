
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
    cardLikeNumber.textContent = cardData.likes.length || 0;//присвоим значение длины массива лайков, полученное с сервера

    // Проверяем, лайкнул ли текущий пользователь карточку
    const isLiked = cardData.likes.some(like => like._id === userId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    };

    // показ или нет кнопки удаления
    if (cardData.owner._id !== userId) {
        cardDeleteButton.remove();
    } else {
        cardDeleteButton.addEventListener('click', () => {
            handleDeleteCard(cardData._id, cardElement);
        });
    };




    // // слушатель кнопки удаления
    // cardDeleteButton.addEventListener('click', () => {
    //     handleDeleteCard(cardElement);
    // });

    // слушатель разворачивания картинки при клике
    cardImage.addEventListener('click', () => {
        handleClickImg(cardData.link, cardData.name);
    });

    // слушатель и функция лайка карточки
    cardLikeButton.addEventListener('click', () => {
        cardLike(cardLikeButton, cardData._id, cardLikeNumber);
    });

    return cardElement;
};


// // @todo: Функция удаления карточки
// export function handleDeleteCard(cardElement) {
//     cardElement.remove();
// };

// // Функция удаления карточки
// export function handleDeleteCard(cardId, cardElement) {
//     idCardForDelete = cardData._id;
//     cardForDelete = cardElement;
//     openModal(popupConfirm);
// }

// скрипт лайка карточки
export function cardLike(cardLikeButton) {
    cardLikeButton.classList.toggle('card__like-button_is-active');
};