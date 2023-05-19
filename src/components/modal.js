import {closePopup, renderLoading} from "./utils";
import {
    addCardForm, editAvatarForm,
    editProfileForm,
    editProfilePopup,
    editProfileSubmitBtn,
    editProfileSubmitValue,
    userAbout,
    userName
} from "./index";
import {updateProfile} from "./api";

export function initAddCardForm(onSubmit) {
    addCardForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        onSubmit({
            name: evt.target.elements["description"].value,
            link: evt.target.elements["url"].value
        });
        evt.target.reset();
    });
}

export function initEditProfileForm() {
    editProfileForm.elements["form-name"].value = userName.textContent;
    editProfileForm.elements["form-about"].value = userAbout.textContent;

    editProfileForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        renderLoading(true, editProfileSubmitBtn);
        updateProfile(evt.target.elements["form-name"].value, evt.target.elements["form-about"].value).finally(() => renderLoading(false, editProfileSubmitBtn, editProfileSubmitValue))
        userName.textContent = evt.target.elements["form-name"].value;
        userAbout.textContent = evt.target.elements["form-about"].value;
        closePopup(editProfilePopup);
    });
}

export function initEditAvatarForm(onSubmit) {
    editAvatarForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        onSubmit({
            link: evt.target.elements["form-avatar-url"].value
        });
        evt.target.reset();
    });
}