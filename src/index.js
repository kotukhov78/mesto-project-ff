import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, handleDeleteCard, cardLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// Находим все модальные окна
const popupEdit = document.querySelector('.popup_type_edit');
const popupNew = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');

// Находим элементы для вызова модальных окон
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

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
});
// Обработчик для вызова модального окна добавления карточки
buttonAdd.addEventListener('click', () => {
    formAddNewCard.reset();
    openModal(popupNew);
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
};
formAddNewCard.addEventListener( 'submit', handleNewCard );

//напишем функцию показа кастомного сообщения об ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.add('popup__input_type_error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('popup__input-error_active');
    }
};

//Напишем функцию удаления кастомного сообщения об ошибке
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.remove('popup__input_type_error');
        errorElement.textContent = '';
        errorElement.classList.remove('popup__input-error_active');
    }
};

//напишем функцию проверки полей на валидность
const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity("только буквы, пробелы и дефис");
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid;
//     });
// };

// const toogleButtonState = (inputList, buttonElement) => {
//     if (hasInvalidInput(inputList)) {
//         buttonElement.disabled = true;
//         buttonElement.classList.add('popup__button_inactive');
//     } else {
//         buttonElement.disabled = false;
//         buttonElement.classList.remove('popup__button_inactive');
//     }
// };

//добавим обработчики всем полям формы
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toogleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
        });
    });
};

//добавим обработчики на все формы
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

//вызовем функцию
enableValidation();