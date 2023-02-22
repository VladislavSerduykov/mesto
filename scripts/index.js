let editProfile = document.querySelector('.profile__edit');
let popupEdit = document.querySelector('.popup_value_edit');
let closeEditProfile = document.querySelector('section.popup_value_edit button.popup__close');
let formEditElement = document.querySelector('section.popup_value_edit div.popup__container')
let addElement = document.querySelector('.profile__add')
let popupAdd = document.querySelector('.popup_value_add');
let closeAddElement = document.querySelector('section.popup_value_add button.popup__close')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__profession')
let nameInput = document.querySelector('.popup__text_value_name');
let jobInput = document.querySelector('.popup__text_value_profession');
let imgClick = document.querySelectorAll('.gallery__image');
let galleryLike = document.querySelectorAll('.gallery__like');
const placeInput = document.querySelector('.popup__text_value_name_place')
const linkInput = document.querySelector('.popup__text_value_link')
const formAddPlace = document.querySelector('section.popup_value_add div.popup__container')
const addPlaceButton = document.querySelector('.popup__button_add');
const gallery = document.querySelector('.gallery');
let articleTemplate = document.querySelector('#gallery__element').content;
let arrGallery = [
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

function createGallery() {
    arrGallery.forEach(function(item){
        const articleElement = articleTemplate.querySelector('.gallery__element').cloneNode(true);

        articleElement.querySelector('.gallery__image').src = item.link;
        articleElement.querySelector('.gallery__caption').textContent = item.name;
    
        gallery.append(articleElement);
    })  
}

function addPlace(evt){
    evt.preventDefault(); 

    const articleElement = articleTemplate.querySelector('.gallery__element').cloneNode(true);

    articleElement.querySelector('.gallery__image').src = linkInput.value;
    articleElement.querySelector('.gallery__caption').textContent = placeInput.value;

    gallery.append(articleElement);

    popupAdd.classList.remove('popup_opened');
}

function deletePlace(){

}

function likeClick(button){
    const likeButton = articleTemplate.querySelectorAll('.gallery__like');

    let arrLikeButton = Array.from(likeButton);

    arrLikeButton.forEach(function(item){
        item.addEventListener('click',() => item.classList.toggle('gallery__like_active'));
    })
}

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function handleForm(evt){
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupEdit.classList.remove('popup_opened');
}

function zoomImage(){
    let popupGallery = document.querySelector('.popup__zoom');
    let arrImg = Array.from(imgClick);
    arrImg.forEach((item) => item.addEventListener('click',function(){
        popupGallery.classList.add('popup_opened');
    }))
}



createGallery();

editProfile.addEventListener('click', () => popupEdit.classList.add('popup_opened'));
closeEditProfile.addEventListener('click', () => popupEdit.classList.remove('popup_opened'))

addElement.addEventListener('click',() => popupAdd.classList.add('popup_opened'))
closeAddElement.addEventListener('click',() => popupAdd.classList.remove('popup_opened'));


formEditElement.addEventListener('submit', handleForm)

formAddPlace.addEventListener('submit',addPlace)
likeClick(galleryLike);
zoomImage();
deletePlace();