export const popupScale = document.querySelector(".popup_value_image");
export const popupImage = document.querySelector(".popup__image");
export const popupImageCaption = document.querySelector(
  ".popup__image-caption"
);
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}
export function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
