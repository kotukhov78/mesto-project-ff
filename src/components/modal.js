// Функция открытия модального окна
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    
    //добавим обработчик закрытия окна по кнопке
    const handleCloseEsc = (event) => {
        if (event.key === 'Escape') {
            closeModal(popup);
        }
    };

    document.addEventListener('keydown', handleCloseEsc);
    popup.handleCloseEsc = handleCloseEsc;
};

// Функция закрытия модального окна
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    
    //удалим обработчик закрытия окна
    document.removeEventListener('keydown', popup.handleCloseEsc);
    delete popup.handleCloseEsc;
};


