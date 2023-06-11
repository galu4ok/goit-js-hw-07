import { galleryItems } from './gallery-items.js';
// Change code below this line

// 1) Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// 2) Реалізація делегування на ul.gallery і отримання url великого зображення.
// 3) Підключення скрипту і стилів бібліотеки модального вікна basicLightbox.
// Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані(.min) файли бібліотеки.
// 4) Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// 5) Заміна значення атрибута src елемента < img > в модальному вікні перед відкриттям.
// Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.
// 6) Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури
// було тільки доти, доки відкрите модальне вікно.

const galleryContainer = document.querySelector('.gallery');

const makeGalleryItemMarkup = ({ preview, original, description }) =>
  `<li class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;

const galleryMarkup = galleryItems.map(makeGalleryItemMarkup).join('');

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(evt) {
  evt.preventDefault();
  const { target } = evt;
  if (!target.classList.contains('gallery__image')) {
    return;
  }
  // if (target.nodeName !== 'IMG') {return;}

  const instance = basicLightbox.create(
    `<img
      src="${target.dataset.source}" width ="${window.innerWidth}" height="${window.innerHeight}"
      />`,
    {
      onShow: () => window.addEventListener('keydown', onEscKeyPress),
      onClose: () => window.removeEventListener('keydown', onEscKeyPress),
    }
  );
  instance.show();

  function onEscKeyPress(evt) {
    if (evt.code === 'Escape') {
      instance.close();
    }
  }
}
