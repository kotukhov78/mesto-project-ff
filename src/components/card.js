

// @todo: Функция создания карточки
export function createCard(cardData, handleDeleteCard, handleClickImg) {
    
    // @todo: Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;

    // @todo: DOM узлы
    const cardElement = cardTemplate.cloneNode(true).querySelector('.card');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    cardDeleteButton.addEventListener('click', () => {
        handleDeleteCard(cardElement);
    });

    cardImage.addEventListener('click', () => {
        handleClickImg(cardData.link, cardData.name);
    });

    return cardElement;
};

