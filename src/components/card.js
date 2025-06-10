

// @todo: Функция создания карточки
export function createCard(cardData, handleDeleteCard, handleClickImg) {
    
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;

    // @todo: DOM узлы
    const cardElement = cardTemplate.cloneNode(true).querySelector('.card');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // слушатель кнопки удаления
    cardDeleteButton.addEventListener('click', () => {
        handleDeleteCard(cardElement);
    });

    // слушатель разворачивания картинки при клике
    cardImage.addEventListener('click', () => {
        handleClickImg(cardData.link, cardData.name);
    });

    // слушатель и функция лайка карточки
    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
    });

    return cardElement;
};

