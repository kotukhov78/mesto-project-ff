import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// Находим все модальные окна
const popupEdit = document.querySelector('.popup_type_edit');
const popupNew = document.querySelector('.popup_type_new-card');
const popupImg = document.querySelector('.popup_type_image');

// Находим элементы для вызова модальных окон
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');


// @todo: Функция удаления карточки
function handleDeleteCard(cardElement) {
    cardElement.remove();
};

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, handleDeleteCard, handleClickImg, cardLike);
    placesList.append(cardElement);
});


// Обработчики для вызова модальных окон
buttonEdit.addEventListener('click', () => openModal(popupEdit));
buttonAdd.addEventListener('click', () => openModal(popupNew));

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
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;
// Обработчик «отправки» формы
function handleFormSubmit(event) {
    event.preventDefault();
    // Вставим новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    //закроем окно принудительно
    closeModal(popupEdit);
};
formEdit.addEventListener( 'submit', handleFormSubmit );

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

function cardLike(cardLikeButton) {
    cardLikeButton.classList.toggle('card__like-button_is-active');
};
