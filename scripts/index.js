let editProfile = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closeEditProfile = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__profession')
let nameInput = document.querySelector('.popup__text_value_name');
let jobInput = document.querySelector('.popup__text_value_profession');
let formElemnt = document.querySelector('.popup__container')


nameInput.value = profileName.textContent
jobInput.value = profileJob.textContent

function openPopup() {
    popup.classList.add('popup_opened');
    
}

function closePopup() {
    popup.classList.remove('popup_opened')
}

function handleForm(evt){
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup();
}

editProfile.addEventListener('click', openPopup)
closeEditProfile.addEventListener('click', closePopup)
formElemnt.addEventListener('submit', handleForm)
/*

--Активное состояние кнопки like--

let gallery = document.querySelectorAll('section.gallery article.gallery__element button.gallery__like');   
for (let i=0; i<gallery.length; i++) {
    gallery[i].addEventListener('click', function(){
        gallery[i].classList.toggle('gallery__like_active')
    })
}*/