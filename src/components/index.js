import '../styles/index.css';
import {enableValidation} from "./validate";
import {openPopup, closePopup, renderLoading} from "./utils";
import {addCard} from "./card";
import {initAddCardForm, initEditAvatarForm, initEditProfileForm} from "./modal";
import {getCards, getProfile, pushCard, updateProfileAvatar} from "./api";

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
export const inactiveButtonClass = 'popup__form-submit_disabled';

export const editProfileSubmitBtn = editProfileForm.elements.submit;
export const editAvatarSubmitBtn = editAvatarForm.elements.submit;
export const addCardSubmitBtn = addCardForm.elements.submit;
export const editProfileSubmitValue = editProfileSubmitBtn.getAttribute('value');
export const editAvatarSubmitValue = editAvatarSubmitBtn.getAttribute('value');
export const addCardSubmitValue = addCardSubmitBtn.getAttribute('value');

//export for card.js
export const cardTemplate = document.getElementById('card-template').content;
export const fullscreenImagePopup = document.getElementById('image-popup');
export const fullscreenImagePopupImage = fullscreenImagePopup.querySelector('.popup__image');
export const fullscreenImagePopupBottomText = fullscreenImagePopup.querySelector('.popup__bottom-text');




getProfile().then(r => {
    userName.textContent = r.name;
    userAbout.textContent = r.about;
    editAvatarOpenPopupButton.setAttribute("style", `background-image:url('${r.avatar}')`);
    const myProfileId = r['_id'];
    initCards(myProfileId);
    initForm(myProfileId);
})

function initCards(myProfileId) {
    getCards().then(r => {
        r.forEach((card) => addCard(card.name, card.link, cardsContainer, 'end', card.owner['_id'], myProfileId, card['_id'], card.likes))
    })
}

function initForm(myProfileId) {
    initEditProfileForm();
    initAddCardForm((data) => {
        renderLoading(true, addCardSubmitBtn);
        pushCard(data.name, data.link)
            .then((r) => {
            addCard(data.name, data.link, cardsContainer, 'start', r.owner['_id'], myProfileId, r['_id'], r.likes)})
            .finally(() => {
            renderLoading(false, addCardSubmitBtn, addCardSubmitValue);
            closePopup(addCardPopup);
        })
    });
    initEditAvatarForm((data) => {
        renderLoading(true, editAvatarSubmitBtn);
        updateProfileAvatar(data.link)
            .then((r) => {
            editAvatarOpenPopupButton.setAttribute("style", `background-image:url('${r.avatar}')`);})
            .finally(() => {
                renderLoading(false, editAvatarSubmitBtn, editAvatarSubmitValue);
                closePopup(editAvatarPopup);
            })
    })

}

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