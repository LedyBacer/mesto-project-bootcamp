import {closePopup, disableButton} from "./utils";
import {addCardForm, editProfileForm, editProfilePopup, inactiveButtonClass, userAbout, userName} from "./index";

export function initAddCardForm(onSubmit) {
    addCardForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        onSubmit({
            name: evt.target.elements["description"].value,
            link: evt.target.elements["url"].value
        });
        evt.target.reset();
        disableButton(evt.target.elements["submit"], inactiveButtonClass)
    });
}

export function initEditProfileForm() {
    editProfileForm.elements["form-name"].value = userName.textContent;
    editProfileForm.elements["form-about"].value = userAbout.textContent;

    editProfileForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        userName.textContent = evt.target.elements["form-name"].value;
        userAbout.textContent = evt.target.elements["form-about"].value;
        closePopup(editProfilePopup);
    });
}