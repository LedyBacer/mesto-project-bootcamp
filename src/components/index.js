import '../styles/index.css';
import {enableValidation} from "./validate";
import {openPopup, closePopup} from "./utils";
import {addCard} from "./card";
import {initAddCardForm, initEditProfileForm} from "./modal";
import {initialCards} from "./data";

const page = document.querySelector('.page');
const cardsContainer = page.querySelector('.card-elements__item-grid');
const profileContainer = page.querySelector('.profile')
const addCardOpenPopupButton = profileContainer.querySelector('.profile__add-button');
const editProfileOpenPopupButton = profileContainer.querySelector('.profile__edit-button');
const addCardPopup = document.getElementById('add-popup');
const closeButtons = page.querySelectorAll('.popup__close-button');
const allPopup = page.querySelectorAll('.popup');

//export for modal.js
export const userName = profileContainer.querySelector('.profile__name');
export const userAbout = profileContainer.querySelector('.profile__description');
export const addCardForm = document.forms["mesto-form"];
export const editProfileForm = document.forms["profile-form"];
export const editProfilePopup = document.getElementById('edit-popup');
export const inactiveButtonClass = 'popup__form-submit_disabled';

//export for card.js
export const cardTemplate = document.getElementById('card-template').content;
export const fullscreenImagePopup = document.getElementById('image-popup');
export const fullscreenImagePopupImage = fullscreenImagePopup.querySelector('.popup__image');
export const fullscreenImagePopupBottomText = fullscreenImagePopup.querySelector('.popup__bottom-text');

initialCards.forEach((card) => addCard(card.name, card.link, cardsContainer, 'end'));
initEditProfileForm();
initAddCardForm((data) => {
    addCard(data.name, data.link, cardsContainer);
    closePopup(addCardPopup);
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

// window.addEventListener("keydown", evt => {
//     if (evt.key === 'Escape') {
//         allPopup.forEach( (el) => closePopup(el));
//     }
// });

addCardOpenPopupButton.addEventListener('click', () => {
    openPopup(addCardPopup);
});
editProfileOpenPopupButton.addEventListener('click', () => {
    openPopup(editProfilePopup);
});