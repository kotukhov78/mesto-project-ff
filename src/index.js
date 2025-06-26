import './pages/index.css';
import { createCard, cardLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from "./components/validation.js";
import { deleteCardApi, formEditApi, newCardApi, getUserData, getAllCards, editAvatarApi } from "./components/api.js";

// создадим контейнер для вывода карточек на страницу
const placesList = document.querySelector('.places__list');

// Находим все модальные окна
const popupEdit = document.querySelector('.popup_type_edit');
const popupNew = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');

// Находим элементы для вызова модальных окон
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

//находим кнопку отправки данных модального окна создания новой карточки
const buttonCloseAdd = popupNew.querySelector('.popup__button');

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





// Находим попап подтверждения удаления
const popupConfirm = document.querySelector('.popup_type_confirm');
const formConfirm = popupConfirm.querySelector('.popup__form');
const buttonCloseDelete = formConfirm.querySelector('.popup__button');

// Переменные для хранения данных об удаляемой карточке
let idCardForDelete;
let cardForDelete;

// Функция удаления карточки
function handleDeleteCard(id, cardElement) {
    idCardForDelete = id;
    cardForDelete = cardElement;
    openModal(popupConfirm);
}

// Обработчик подтверждения удаления
function handleConfirmDelete(event) {
    event.preventDefault();
    
    deleteCardApi(idCardForDelete)
    .then(() => {
        // Удаляем карточку из DOM
        cardForDelete.remove();
        closeModal(popupConfirm);
    })
    .catch(err => {
        console.log(err);
    })
}
buttonCloseDelete.addEventListener('click', handleConfirmDelete);




// скрипт редактирования данных профиля
// Находим форму в DOM
const formEdit = document.querySelector('form[name="edit-profile"]');
// Находим поля формы в DOM
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_description');
// Получим значение полей jobInput и nameInput из свойства value
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Обработчик «отправки» формы на редактирование профиля
function handleFormEdit(event) {
    event.preventDefault();
    // Вставим новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    const submitButtonEdit = formEdit.querySelector('.popup__button');
    const initialTextEdit = submitButtonEdit.textContent;
    // Меняем текст кнопки на "Сохранение..."
    submitButtonEdit.textContent = 'Сохранение...';

    formEditApi (profileTitle.textContent, profileDescription.textContent)
    .then(() => {
        //закроем окно принудительно
        closeModal(popupEdit);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
    // Возвращаем исходный текст кнопки
    submitButtonEdit.textContent = initialTextEdit;
    })
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
    const submitButtonAddCard = formAddNewCard.querySelector('.popup__button');
    const initialTextAddCard = submitButtonAddCard.textContent;
    // Меняем текст кнопки на "Сохранение..."
    submitButtonAddCard.textContent = 'Сохранение...';
    //отправим карточку на сервер после добавления в DOM
    newCardApi (cardData.name, cardData.link)
    .then(newCard => {
        // Создаем карточку
        const cardNew = createCard(newCard, handleDeleteCard, handleClickImg, cardLike, userId);
        // Добавляем карточку в начало контейнера
        placesList.prepend(cardNew);
        // Закрываем попап и очищаем форму
        closeModal(popupNew);
        formAddNewCard.reset();
        //уберем активность кнопки при открытии окна
        buttonCloseAdd.disabled = true;
        buttonCloseAdd.classList.add('popup__button_disabled');
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
    // Возвращаем исходный текст кнопки
    submitButtonAddCard.textContent = initialTextAddCard;
    })
};
formAddNewCard.addEventListener( 'submit', handleNewCard );




//скрипт общей проверки на валидность
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




//скрипт загрузки данных профиля и карточек с сервера
let userId = null;

Promise.all([getUserData(), getAllCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileAvatar.src = userData.avatar;
        cards.forEach((cardData) => {
            const cardElement = createCard(
                cardData, 
                handleDeleteCard, 
                handleClickImg, 
                cardLike,
                userId
            );
            placesList.append(cardElement);
        })
    })
    .catch((err) => {
        console.log(err);
    });






//смена аватарки при клике на нее
const avatarEdit = document.querySelector('.profile__image-edit');
const popupAvatar = document.querySelector('.popup__avatar-edit');
const formEditAvatar = popupAvatar.querySelector('.popup__form');
const avatarLinkInput = formEditAvatar.querySelector('.popup__input_avatar_url');
const profileAvatar = document.querySelector('.profile__image');


function handleEditAvatar(event) {
    event.preventDefault();

    const submitButtonAva = formEditAvatar.querySelector('.popup__button');
    const initialTextAva = submitButtonAva.textContent;
    // Меняем текст кнопки на "Сохранение..."
    submitButtonAva.textContent = 'Сохранение...';

    //отправим на сервер
    editAvatarApi (avatarLinkInput.value)
    .then(data => {
        // Обновляем аватар на странице
        profileAvatar.src = data.avatar;
        closeModal(popupAvatar);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
    // Возвращаем исходный текст кнопки
    submitButtonAva.textContent = initialTextAva;
    })
};
formEditAvatar.addEventListener( 'submit', handleEditAvatar );



// слушатель для вызова модального окна изменения аватарки
avatarEdit.addEventListener('click', () => {
    openModal(popupAvatar);
    avatarLinkInput.value = profileAvatar.textContent;
    clearValidation(formEditAvatar, validationSettings);
});
