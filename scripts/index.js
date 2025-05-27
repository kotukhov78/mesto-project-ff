// @todo: Функция создания карточки
function createCard(cardData, handleDeleteCard) {
    
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

    return cardElement;
};

// @todo: Функция удаления карточки
function handleDeleteCard(cardElement) {
    cardElement.remove();
};

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, handleDeleteCard);
    placesList.append(cardElement);
});