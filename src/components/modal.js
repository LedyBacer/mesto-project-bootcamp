import {
    addCardForm, editAvatarForm,
    editProfileForm,
    userAbout,
    userName
} from "./index";

export function initAddCardForm(onSubmit) {
    addCardForm.addEventListener("submit", (evt) => {
        onSubmit(evt);
    });
}

export function initEditProfileForm(onSubmit) {
    editProfileForm.elements["form-name"].value = userName.textContent;
    editProfileForm.elements["form-about"].value = userAbout.textContent;

    editProfileForm.addEventListener("submit", (evt) => {
        onSubmit(evt);
    });
}

export function initEditAvatarForm(onSubmit) {
    editAvatarForm.addEventListener("submit", (evt) => {
        onSubmit(evt);
    });
}