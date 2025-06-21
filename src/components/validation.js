//напишем функцию показа сообщения об ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.add('popup__input_type_error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('popup__input-error_active');
    }
};

//Напишем функцию удаления сообщения об ошибке
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
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

//функция проверки полей формы на валидность и возврата результата проверки
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

//функция стилизации кнопки (активна или нет)
const toogleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_disabled');
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled');
    }
};

//добавим обработчики всем полям формы
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button'); //выберем кнопку сабмита
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toogleButtonState(inputList, buttonElement); //вызовем функцию смены статуса кнопки сабмита
        });
    });
};

//добавим обработчики на все формы
export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};



//функция очистки ошибок валидации в формах
export function clearValidation(formElement, settings) {
    // Находим все поля ввода в форме
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    
    // Очищаем ошибки для каждого поля ввода
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });
};

