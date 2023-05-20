import '../styles/index.css';
import {enableValidation} from "./validate";
import {openPopup, closePopup, handleSubmit} from "./utils";
import {addCard} from "./card";
import {initAddCardForm, initEditAvatarForm, initEditProfileForm} from "./modal";
import {getCards, getProfile, pushCard, updateProfile, updateProfileAvatar} from "./api";

const page = document.querySelector('.page');
const profileContainer = page.querySelector('.profile')
const addCardOpenPopupButton = profileContainer.querySelector('.profile__add-button');
const editProfileOpenPopupButton = profileContainer.querySelector('.profile__edit-button');
const editAvatarOpenPopupButton = profileContainer.querySelector('.profile__avatar');
const addCardPopup = document.getElementById('add-popup');
const editAvatarPopup = document.getElementById('avatar-popup');
const closeButtons = page.querySelectorAll('.popup__close-button');

//export for api.js
export const cardsContainer = page.querySelector('.card-elements__item-grid');

//export for modal.js
export const userName = profileContainer.querySelector('.profile__name');
export const userAbout = profileContainer.querySelector('.profile__description');
export const addCardForm = document.forms["mesto-form"];
export const editProfileForm = document.forms["profile-form"];
export const editAvatarForm = document.forms["avatar-form"];
export const editProfilePopup = document.getElementById('edit-popup');

//export for card.js
export const cardTemplate = document.getElementById('card-template').content;
export const fullscreenImagePopup = document.getElementById('image-popup');
export const fullscreenImagePopupImage = fullscreenImagePopup.querySelector('.popup__image');
export const fullscreenImagePopupBottomText = fullscreenImagePopup.querySelector('.popup__bottom-text');

function initProfile(userData) {
    userName.textContent = userData.name;
    userAbout.textContent = userData.about;
    editAvatarOpenPopupButton.setAttribute("style", `background-image:url('${userData.avatar}')`);
    return userData['_id'];
}

function initCards(myProfileId, cards) {
    cards.forEach((card) => {
        addCard(card.name, card.link, cardsContainer, 'end', card.owner['_id'], myProfileId, card['_id'], card.likes)
    });
}

function initForm(myProfileId) {

    initEditProfileForm((evt) => {
        function makeRequest(evt) {
            return updateProfile(evt.target.elements["form-name"].value, evt.target.elements["form-about"].value)
                .then((userData) => {
                    userName.textContent = userData.name;
                    userAbout.textContent = userData.about;

                    closePopup(editProfilePopup);
                })
        }

        handleSubmit(makeRequest, evt);
    });

    initAddCardForm((evt) => {
        function makeRequest(evt) {
           return pushCard(evt.target.elements["description"].value, evt.target.elements["url"].value)
                .then((card) => {
                    addCard(card.name, card.link, cardsContainer, 'start', card.owner['_id'], myProfileId, card['_id'], card.likes);

                    closePopup(addCardPopup);
                    evt.target.reset();
                })
        }

        handleSubmit(makeRequest, evt);
    });

    initEditAvatarForm((evt) => {
        function makeRequest(evt) {
            return updateProfileAvatar(evt.target.elements["form-avatar-url"].value)
                .then((userData) => {
                    editAvatarOpenPopupButton.setAttribute("style", `background-image:url('${userData.avatar}')`);

                    closePopup(editAvatarPopup);
                    evt.target.reset();
                })
        }

        handleSubmit(makeRequest, evt);
    })
}



Promise.all([getProfile(), getCards()])
    .then(([userData, cards]) => {
        const myProfileId = initProfile(userData);
        initCards(myProfileId, cards);
        initForm(myProfileId);
    })
    .catch(err => {
        console.log(err);
    });

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__form-submit',
    inactiveButtonClass: 'popup__form-submit_disabled',
    inputErrorClass: 'popup__form-input_type_error',
    errorClass: 'popup__input-error_visible'
});

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
    popup.addEventListener("mousedown", (evt) => {if (evt.target === popup) closePopup(popup)});
});

addCardOpenPopupButton.addEventListener('click', () => {
    openPopup(addCardPopup);
});
editProfileOpenPopupButton.addEventListener('click', () => {
    openPopup(editProfilePopup);
});
editAvatarOpenPopupButton.addEventListener('click', () => {
    openPopup(editAvatarPopup);
});