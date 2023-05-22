import {openPopup} from "./utils";
import {cardTemplate, fullscreenImagePopup, fullscreenImagePopupBottomText, fullscreenImagePopupImage} from "./index";
import {addLike, delCard, delLike} from "./api";

function getLikes(cardElement, myId, likes, cardElementLike) {
    cardElement.querySelector('.card-elements__item-like-count').textContent = likes.length;

    likes.find((el) => el['_id'] === myId)
        ? cardElementLike.classList.add('card-elements__item-like_active')
        : cardElementLike.classList.remove('card-elements__item-like_active');
}

function handleLike(cardElement, myId, likes, cardId, cardElementLike) {
    cardElementLike.addEventListener('click', (evt) => {
        evt.target.classList.contains('card-elements__item-like_active')
            ? delLike(cardId)
                .then((r) => getLikes(cardElement, myId, r.likes, cardElementLike))
                .catch((err) => console.error(`Ошибка: ${err}`))
            : addLike(cardId)
                .then((r) => getLikes(cardElement, myId, r.likes, cardElementLike))
                .catch((err) => console.error(`Ошибка: ${err}`));
    });
}

function handleDelete(cardElement, cardOwnerId, myId, cardId) {
    const cardElementDelBtn = cardElement.querySelector('.card-elements__item-trash');

    cardOwnerId === myId
        ? cardElementDelBtn.addEventListener('click', (evt) => {
            delCard(cardId)
                .then(() => evt.target.closest('.card-elements__item').remove())
                .catch((err) => console.error(`Ошибка: ${err}`))
        })
        : cardElementDelBtn.setAttribute("style", 'display:none');
}

function handleImgPopup(cardElementImage, descriptionValue, imageUrlValue) {
    cardElementImage.addEventListener('click', () => {
        fullscreenImagePopupBottomText.textContent = descriptionValue;
        fullscreenImagePopupImage.setAttribute("alt", `Фото: ${descriptionValue}`);
        fullscreenImagePopupImage.setAttribute("src", `${imageUrlValue}`);
        openPopup(fullscreenImagePopup);
    });
}

function createCard(descriptionValue, imageUrlValue, cardOwnerId, myId, cardId, likes) {
    const cardElement = cardTemplate.querySelector('.card-elements__item').cloneNode(true);
    const cardElementImage = cardElement.querySelector('.card-elements__item-image');
    const cardElementLike = cardElement.querySelector('.card-elements__item-like');

    cardElement.querySelector('.card-elements__item-text').textContent = descriptionValue;
    cardElementImage.setAttribute("style", `background-image:url('${imageUrlValue}')`);

    getLikes(cardElement, myId, likes, cardElementLike);
    handleLike(cardElement, myId, likes, cardId, cardElementLike);
    handleDelete(cardElement, cardOwnerId, myId, cardId);
    handleImgPopup(cardElementImage, descriptionValue, imageUrlValue);

    return cardElement
}

export function addCard(descriptionValue, imageUrlValue, cardsContainer, position, cardOwnerId, myId, cardId, likes) {
    const cardElement = createCard(descriptionValue, imageUrlValue, cardOwnerId, myId, cardId, likes);
    position === "end"
        ? cardsContainer.append(cardElement)
        : cardsContainer.prepend(cardElement);
}