const editProfile = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_value_edit');
const closeEditProfile = document.querySelector('section.popup_value_edit button.popup__close');
const formEditElement = document.querySelector('section.popup_value_edit div.popup__container')
const addElement = document.querySelector('.profile__add')
const popupAdd = document.querySelector('.popup_value_add');
const closeAddElement = document.querySelector('section.popup_value_add button.popup__close')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__profession')
const nameInput = document.querySelector('.popup__text_value_name');
const jobInput = document.querySelector('.popup__text_value_profession');
const placeInput = document.querySelector('.popup__text_value_name-place')
const linkInput = document.querySelector('.popup__text_value_link')
const formAddPlace = document.querySelector('section.popup_value_add div.popup__container')
const addPlaceButton = document.querySelector('.popup__button_add');
const gallery = document.querySelector('.gallery');
const popupZoom = document.querySelector('.popup_value_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');
const closeButtonZoom = document.querySelector('section.popup_value_image button.popup__close');
const articleTemplate = document.querySelector('#gallery__element').content;


function createGallery(items){
    items.forEach((item) => {
        const card = createCard(item.link, item.name);
        gallery.append(card);
    });
}

function createCard (image,name){
  const articleElement = articleTemplate.querySelector('.gallery__element').cloneNode(true);
  const articleImage = articleElement.querySelector('.gallery__image');
  articleImage.src = image;
  articleElement.querySelector('.gallery__caption').textContent = name;
  articleImage.alt = name;
  articleElement.querySelector('.gallery__like').addEventListener('click', (evt) => evt.currentTarget.classList.toggle('gallery__like_active'));
  articleElement.querySelector('.gallery__delete').addEventListener('click', () => articleElement.remove());
  articleImage.addEventListener('click', () => {
    popupImage.src = image;
    popupImageCaption.textContent = name;
    popupImage.alt = name;
    openPopup(popupZoom)}
    );

  return articleElement;
}

function addPlace(evt){
  evt.preventDefault(); 

  let newCard = createCard(linkInput.value, placeInput.value);

  gallery.prepend(newCard);

  closePopup(popupAdd);
}

function handleForm(evt){
    evt.preventDefault(); 
    

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupEdit);
}

function openPopup(popup){
   popup.classList.add('popup_opened');
}

function closePopup(popup){
  popup.classList.remove('popup_opened')
}

createGallery(arrGallery);
editProfile.addEventListener('click', () => {
   nameInput.value = profileName.textContent;
   jobInput.value = profileJob.textContent;  
   openPopup(popupEdit);
  });
closeEditProfile.addEventListener('click', () => closePopup(popupEdit));
addElement.addEventListener('click',() => openPopup(popupAdd));
closeAddElement.addEventListener('click',() => closePopup(popupAdd));
closeButtonZoom.addEventListener('click', () => closePopup(popupZoom))
formEditElement.addEventListener('submit', handleForm);
formAddPlace.addEventListener('submit',addPlace)