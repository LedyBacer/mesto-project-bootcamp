const page = document.querySelector('.page');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const cardsContainer = page.querySelector('.card-elements__item-grid');
const cardTemplate = document.getElementById('card-template').content;

const profileContainer = page.querySelector('.profile')
const userName = profileContainer.querySelector('.profile__name');
const userAbout = profileContainer.querySelector('.profile__description');
const addCardOpenPopupButton = profileContainer.querySelector('.profile__add-button');
const editProfileOpenPopupButton = profileContainer.querySelector('.profile__edit-button');

const addCardPopup = document.getElementById('add-popup');
const addCardForm = document.forms["mesto-form"];

const editProfilePopup = document.getElementById('edit-popup');
const editProfileForm = document.forms["profile-form"];

const fullscreenImagePopup = document.getElementById('image-popup');
const fullscreenImagePopupImage = fullscreenImagePopup.querySelector('.popup__image');
const fullscreenImagePopupBottomText = fullscreenImagePopup.querySelector('.popup__bottom-text');

const closeButtons = page.querySelectorAll('.popup__close-button');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function initEditProfileForm() {
    editProfileForm.elements["form-name"].value = userName.textContent;
    editProfileForm.elements["form-about"].value = userAbout.textContent;

    editProfileForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        userName.textContent = evt.target.elements["form-name"].value;
        userAbout.textContent = evt.target.elements["form-about"].value;
        closePopup(editProfilePopup);
    });
}

function initAddCardForm(onSubmit) {
    addCardForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        onSubmit({
            name: evt.target.elements["description"].value,
            link: evt.target.elements["url"].value
        });
        evt.target.reset();
    });
}

function handleFullscreenImagePopup(imgUrl, imgBottomText) {
    fullscreenImagePopupBottomText.textContent = imgBottomText;
    fullscreenImagePopupImage.setAttribute("alt", `Фото: ${imgBottomText}`);
    fullscreenImagePopupImage.setAttribute("src", `${imgUrl}`);
}

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

function addCard(descriptionValue, imageUrlValue, cardsContainer, position) {
    const cardElement = createCard(descriptionValue, imageUrlValue);
    position === "end"
        ? cardsContainer.append(cardElement)
        : cardsContainer.prepend(cardElement);
}

function initAll() {
    initialCards.forEach((card) => addCard(card.name, card.link, cardsContainer, 'end'));
    initEditProfileForm();
    initAddCardForm((data) => {
        addCard(data.name, data.link, cardsContainer);
        closePopup(addCardPopup);
    })

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
}

initAll();