function handleEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    window.addEventListener("keydown", handleEsc);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    window.removeEventListener("keydown", handleEsc);
}

export function disableButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
}

export function enableButton(buttonElement, inactiveButtonClass) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
}

export function checkStatus(res) {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

export function showErr(err) {
    console.log(err);
}

export function renderLoading(isLoading, btn, def) {
    if (isLoading) {
        btn.setAttribute("value", 'Сохранение...');
    } else {
        btn.setAttribute("value", `${def}`);
    }
}