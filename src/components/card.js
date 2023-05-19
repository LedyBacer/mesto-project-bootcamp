import {openPopup} from "./utils";
import {cardTemplate, fullscreenImagePopup, fullscreenImagePopupBottomText, fullscreenImagePopupImage} from "./index";
import {addLike, delCard, delLike} from "./api";

function handleLike(cardElement, myId, likes, cardId) {
    cardElement.querySelector('.card-elements__item-like').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card-elements__item-like_active')) {
            delLike(cardId).then((r) => getLikes(cardElement, myId, r.likes))
        } else {
            addLike(cardId).then((r) => getLikes(cardElement, myId, r.likes))
        }
    });
}

function getLikes(cardElement, myId, likes) {
    const cardElementLike = cardElement.querySelector('.card-elements__item-like');

    cardElement.querySelector('.card-elements__item-like-count').textContent = likes.length;

    if (likes.length === 0) {
        cardElementLike.classList.remove('card-elements__item-like_active');
    } else {
        likes.forEach(el => {
            if (el['_id'] === myId) {
                cardElementLike.classList.add('card-elements__item-like_active');
            } else {
                cardElementLike.classList.remove('card-elements__item-like_active');
            }
        });
    }
}

function createCard(descriptionValue, imageUrlValue, cardOwnerId, myId, cardId, likes) {
    const cardElement = cardTemplate.querySelector('.card-elements__item').cloneNode(true);
    const cardElementImage = cardElement.querySelector('.card-elements__item-image');
    const cardElementDelBtn = cardElement.querySelector('.card-elements__item-trash');

    cardElement.querySelector('.card-elements__item-text').textContent = descriptionValue;
    cardElementImage.setAttribute("style", `background-image:url('${imageUrlValue}')`);

    getLikes(cardElement, myId, likes);
    handleLike(cardElement, myId, likes, cardId);

    // cardElement.querySelector('.card-elements__item-like-count').textContent = likes.length;

    // cardElement.querySelector('.card-elements__item-like').addEventListener('click', (evt) => {
    //     evt.target.classList.toggle('card-elements__item-like_active');
    // });

    if (cardOwnerId === myId) {
        cardElementDelBtn.addEventListener('click', (evt) => {
            delCard(cardId).finally(evt.target.closest('.card-elements__item').remove());
        });
    } else {
        cardElementDelBtn.setAttribute("style", 'display:none');
    }

    cardElementImage.addEventListener('click', () => {
        handleFullscreenImagePopup(imageUrlValue, descriptionValue);
        openPopup(fullscreenImagePopup);
    });

    return cardElement
}

export function addCard(descriptionValue, imageUrlValue, cardsContainer, position, cardOwnerId, myId, cardId, likes) {
    const cardElement = createCard(descriptionValue, imageUrlValue, cardOwnerId, myId, cardId, likes);
    position === "end"
        ? cardsContainer.append(cardElement)
        : cardsContainer.prepend(cardElement);
}

function handleFullscreenImagePopup(imgUrl, imgBottomText) {
    fullscreenImagePopupBottomText.textContent = imgBottomText;
    fullscreenImagePopupImage.setAttribute("alt", `Фото: ${imgBottomText}`);
    fullscreenImagePopupImage.setAttribute("src", `${imgUrl}`);
}