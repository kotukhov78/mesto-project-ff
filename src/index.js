import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, handleDeleteCard, cardLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from "./components/validation.js";

// Находим все модальные окна
const popupEdit = document.querySelector('.popup_type_edit');
const popupNew = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');

// Находим элементы для вызова модальных окон
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

//находим кнопку отправки данных модального окна создания новой карточки
const buttonCloseAdd = popupNew.querySelector('.popup__button');

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, handleDeleteCard, handleClickImg, cardLike);
    placesList.append(cardElement);
});


// Обработчик для вызова модального окна редактирования профиля
buttonEdit.addEventListener('click', () => {
    openModal(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formEdit, validationSettings);
});
// Обработчик для вызова модального окна добавления карточки
buttonAdd.addEventListener('click', () => {
    formAddNewCard.reset();
    openModal(popupNew);
    clearValidation(formAddNewCard, validationSettings);
});

// Находим все модальные окна
// Для каждого модального окна вешаем обработчики закрытия на оверлей и крестик
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.addEventListener('click', function (event) {
        if (event.target.classList.contains('popup__close') || event.target === popup) {
        closeModal(popup);
        }
    });
});

//Функция вывода popup-картинки на страницу при клике
function handleClickImg(link, name) {
    const modalImage = popupImg.querySelector('.popup__image');
    const modalCaption = popupImg.querySelector('.popup__caption');
    modalImage.src = link;
    modalImage.alt = name;
    modalCaption.textContent = name;
    openModal(popupImg);
};

// скрипт редактирования данных профиля
// Находим форму в DOM
const formEdit = document.querySelector('form[name="edit-profile"]');
// Находим поля формы в DOM
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_description');
// Получим значение полей jobInput и nameInput из свойства value
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// Обработчик «отправки» формы
function handleFormEdit(event) {
    event.preventDefault();
    // Вставим новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    //закроем окно принудительно
    closeModal(popupEdit);
};
formEdit.addEventListener( 'submit', handleFormEdit );

// скрипт добавления новой карточки
// Находим форму в DOM
const formAddNewCard = document.querySelector('form[name="new-place"]');
// Обработчик «отправки» формы новой карточки
function handleNewCard(event) {
    event.preventDefault();
    // Получаем данные из формы
    let cardData = {
        name: formAddNewCard.querySelector('.popup__input_type_card-name').value,
        link: formAddNewCard.querySelector('.popup__input_type_url').value
    };
    // Создаем карточку
    const cardNew = createCard(cardData, handleDeleteCard, handleClickImg, cardLike);
    // Добавляем карточку в начало контейнера
    placesList.prepend(cardNew);
    // Закрываем попап и очищаем форму
    closeModal(popupNew);
    formAddNewCard.reset();
    //уберем активность кнопки при открытии окна
    buttonCloseAdd.disabled = true;
    buttonCloseAdd.classList.add('popup__button_disabled');

};
formAddNewCard.addEventListener( 'submit', handleNewCard );

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disaibled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

//вызовем функцию
enableValidation(validationSettings);