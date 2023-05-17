import {openPopup} from "./utils";
import {cardTemplate, fullscreenImagePopup, fullscreenImagePopupBottomText, fullscreenImagePopupImage} from "./index";

function createCard(descriptionValue, imageUrlValue) {
    const cardElement = cardTemplate.querySelector('.card-elements__item').cloneNode(true);

    cardElement.querySelector('.card-elements__item-text').textContent = descriptionValue;
    cardElement.querySelector('.card-elements__item-image').setAttribute("style", `background-image:url('${imageUrlValue}')`);

    cardElement.querySelector('.card-elements__item-like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('card-elements__item-like_active');
    });

    cardElement.querySelector('.card-elements__item-trash').addEventListener('click', (evt) => {
        evt.target.closest('.card-elements__item').remove();
    });

    cardElement.querySelector('.card-elements__item-image').addEventListener('click', (evt) => {
        handleFullscreenImagePopup(evt.target.getAttribute("style").slice(22, -2), evt.target.nextElementSibling.textContent);
        openPopup(fullscreenImagePopup);
    });

    return cardElement
}

export function addCard(descriptionValue, imageUrlValue, cardsContainer, position) {
    const cardElement = createCard(descriptionValue, imageUrlValue);
    position === "end"
        ? cardsContainer.append(cardElement)
        : cardsContainer.prepend(cardElement);
}

function handleFullscreenImagePopup(imgUrl, imgBottomText) {
    fullscreenImagePopupBottomText.textContent = imgBottomText;
    fullscreenImagePopupImage.setAttribute("alt", `Фото: ${imgBottomText}`);
    fullscreenImagePopupImage.setAttribute("src", `${imgUrl}`);
}