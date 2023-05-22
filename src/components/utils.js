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

function renderLoading(isLoading, btn, buttonText='Сохранить', loadingText='Сохранение...') {
    isLoading
        ? btn.setAttribute("value", `${loadingText}`)
        : btn.setAttribute("value", `${buttonText}`);
}

export function handleSubmit(request, evt, loadingText = "Сохранение...") {
    evt.preventDefault();

    const submitButton = evt.submitter;
    const initialText = submitButton.getAttribute('value');
    renderLoading(true, submitButton, initialText, loadingText);
    request(evt)
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            renderLoading(false, submitButton, initialText);
        });
}