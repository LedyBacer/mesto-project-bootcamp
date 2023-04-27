const page = document.querySelector('.page');

const containerCards = page.querySelector('.card-elements__item-grid');
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
const profileContainer = page.querySelector('.profile')
const userName = profileContainer.querySelector('.profile__name');
const userAbout = profileContainer.querySelector('.profile__description');
const openAddCardButton = profileContainer.querySelector('.profile__add-button');
const openEditProfileButton = profileContainer.querySelector('.profile__edit-button');
const addCardPopup = document.getElementById('add-popup');
const editProfilePopup = document.getElementById('edit-popup');
const fullscreenImagePopup = document.getElementById('image-popup');
const closeButtons = page.querySelectorAll('.popup__close-button');
const editProfileForm = document.forms["profile-form"];
const addCardForm = document.forms["mesto-form"];
const fullscreenImagePopupBottomText = fullscreenImagePopup.querySelector('.popup__bottom-text');
const fullscreenImagePopupImage = fullscreenImagePopup.querySelector('.popup__image');
const cardTemplate = document.getElementById('card-template').content;

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
        userName.textContent = editProfileForm.elements["form-name"].value;
        userAbout.textContent = editProfileForm.elements["form-about"].value;
        closePopup(editProfilePopup);
    });
}

function initAddCardForm(onSubmit) {
    addCardForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        onSubmit({
            name: addCardForm.elements["description"].value,
            link: addCardForm.elements["url"].value
        });
        addCardForm.reset();
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

    const buttonLike = cardElement.querySelector('.card-elements__item-like');
    buttonLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('card-elements__item-like_active');
    });

    const buttonTrash = cardElement.querySelector('.card-elements__item-trash');
    buttonTrash.addEventListener('click', function (evt) {
        const card = evt.target.closest('.card-elements__item')
        card.remove();
    });

    const imageFullscreen = cardElement.querySelector('.card-elements__item-image');
    imageFullscreen.addEventListener('click', function (evt) {
        handleFullscreenImagePopup(evt.target.getAttribute("style").slice(22, -2), evt.target.nextElementSibling.textContent);
        openPopup(fullscreenImagePopup);
    });

    return cardElement
}

function addCard(descriptionValue, imageUrlValue, containerCards, end) {
    const cardElement = createCard(descriptionValue, imageUrlValue);
    end === "end"
        ? containerCards.append(cardElement)
        : containerCards.prepend(cardElement);
}

initialCards.forEach((card) => addCard(card.name, card.link, containerCards, 'end'));
initEditProfileForm();
initAddCardForm((data) => {
    addCard(data.name, data.link, containerCards);
    closePopup(addCardPopup);
})

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
    popup.addEventListener("mousedown", (evt) => {if (evt.target === popup) closePopup(popup)});
});

openAddCardButton.addEventListener('click', () => {
    openPopup(addCardPopup);
});
openEditProfileButton.addEventListener('click', () => {
    openPopup(editProfilePopup);
});

