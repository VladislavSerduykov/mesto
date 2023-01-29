let gallery = document.querySelectorAll('section.gallery article.gallery__element button.gallery__like');   
let editProfile = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closeEditProfile = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__profession')
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let formElemnt = document.querySelector('.popup__container')

nameInput.value = profileName.textContent
jobInput.value = profileJob.textContent

console.log(nameInput.value)

editProfile.addEventListener('click', function() {
    popup.classList.add('popup-active');
})


closeEditProfile.addEventListener('click', function(){
    popup.classList.remove('popup-active')
})

function handleForm(evt){
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popup.classList.remove('popup-active')
}


formElemnt.addEventListener('submit', handleForm)

for (let i=0; i<gallery.length; i++) {
    gallery[i].addEventListener('click', function(){
        gallery[i].classList.toggle('gallery__like-active')
    })
}




