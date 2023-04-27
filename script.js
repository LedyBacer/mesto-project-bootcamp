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
const userName = page.querySelector('.profile__name');
const userAbout = page.querySelector('.profile__description');
const openAddButton = page.querySelector('.profile__add-button');
const openEditButton = page.querySelector('.profile__edit-button');

function initPopup(id) {
    const targetPopup = document.getElementById(id);
    const close = targetPopup.querySelectorAll('.popup__close-button');

    function openPopup(imgUrl, imgBottomText) {
        if (id === 'edit-popup') {
            const form = targetPopup.querySelector('#profile-form');
            const editNameInput = form.elements["form-name"];
            const editAboutInput = form.elements["form-about"];

            editNameInput.value = userName.textContent;
            editAboutInput.value = userAbout.textContent;
            targetPopup.classList.add('popup_opened');
        } else if (id === 'add-popup') {
            const form = targetPopup.querySelector('#mesto-form');
            const editNameInput = form.elements["form-mesto-description"];
            const editAboutInput = form.elements["form-mesto-url"];

            editNameInput.value = '';
            editAboutInput.value = '';
            targetPopup.classList.add('popup_opened')
        } else if (id === 'image-popup') {
            const imgPopup = targetPopup.querySelector('.popup__container');
            imgPopup.querySelector('.popup__bottom-text').textContent = imgBottomText;
            imgPopup.querySelector('.popup__image').setAttribute("alt", `Фото: ${imgBottomText}`);
            imgPopup.querySelector('.popup__image').setAttribute("src", `${imgUrl}`);

            targetPopup.classList.add('popup_opened');
        } else {
            targetPopup.classList.add('popup_opened');
        }
    }
    function closePopup() {targetPopup.classList.remove('popup_opened')}

    close.forEach(closeBtn => closeBtn.addEventListener('click', closePopup));
    targetPopup.addEventListener("mousedown", (e) => {if (e.target === targetPopup) closePopup()})

    return { openPopup, closePopup };
}

function initEditForm(id, onSubmit) {
    const form = document.getElementById(id);
    const editNameInput = form.elements["form-name"];
    const editAboutInput = form.elements["form-about"];

    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        onSubmit(editNameInput, editAboutInput);
    });
}
function initAddForm(id, onSubmit) {
    const form = document.getElementById(id);
    const imageInput = form.elements["url"];
    const textInput = form.elements["description"];

    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        onSubmit({
            name: textInput.value,
            link: imageInput.value
        });
    });
}

function addCard (descriptionValue, imageUrlValue, containerCards, end) {
    const cardTemplate = document.querySelector('#card-template').content;
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
        openFullscreenImage(evt.target.getAttribute("style").slice(22, -2), evt.target.nextElementSibling.textContent);
    });

    end === 'end' ? containerCards.append(cardElement) : containerCards.prepend(cardElement);
}



const openAddForm = initPopup("add-popup").openPopup;
const openEditForm = initPopup("edit-popup").openPopup;
const openFullscreenImage = initPopup("image-popup").openPopup;
const closeAddForm = initPopup("add-popup").closePopup;
const closeEditForm = initPopup("edit-popup").closePopup;
// const closeFullscreenImage = initPopup("image-popup").closePopup;

initialCards.forEach((card) => addCard(card.name, card.link, containerCards, 'end'));
initEditForm("profile-form", (name, about) => {
    userName.textContent = name.value;
    userAbout.textContent = about.value;
    closeEditForm();
});
initAddForm("mesto-form", (data) => {
    addCard(data.name, data.link, containerCards);
    closeAddForm();
})

openAddButton.addEventListener('click', () => openAddForm());
openEditButton.addEventListener('click', () => openEditForm());
