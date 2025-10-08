
/*
Документація по роботі у шаблоні: https://www.lightgalleryjs.com/docs/
Документація плагіна: https://www.lightgalleryjs.com/docs/
Сніппет(HTML):
*/

// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, FLS } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// Підключення базового набору функціоналу
import lightGallery from 'lightgallery';

// Плагіни
// lgZoom, lgAutoplay, lgComment, lgFullscreen, lgHash, lgPager, lgRotate, lgShare, lgThumbnail, lgVideo, lgMediumZoom
// import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
//import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.min.js'
import lgVideo from 'lightgallery/plugins/video/lg-video.min.js'

// Базові стилі
import '@scss/libs/gallery/lightgallery.scss';
// Стилі доповнень
import '@scss/libs/gallery/lg-thumbnail.scss';
import '@scss/libs/gallery/lg-video.scss';
// import '@scss/libs/gallery/lg-autoplay.scss';
// import '@scss/libs/gallery/lg-zoom.scss';
// import '@scss/libs/gallery/lg-pager.scss';
// import '@scss/libs/gallery/lg-fullscreen.scss';
// import '@scss/libs/gallery/lg-share.scss';
// import '@scss/libs/gallery/lg-comments.scss';s
// import '@scss/libs/gallery/lg-rotate.scss';
// import '@scss/libs/gallery/lg-medium-zoom.scss';
// import '@scss/libs/gallery/lg-relative-caption.scss';

// Усі стилі
// import '@scss/libs/gallery/lightgallery-bundle.scss';

// Запуск
const galleries = document.querySelectorAll('[data-gallery]');
if (galleries.length) {
	let galleyItems = [];
	galleries.forEach(gallery => {
		// проверяем, есть ли у галереи нужный класс
		const isMainVideoGallery = gallery.classList.contains('main-mob-video-gallery');

		galleyItems.push({
			gallery,
			galleryClass: lightGallery(gallery, {
				plugins: [lgVideo],
				licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
				speed: 500,
				download: false,
				// 👇 применяем только для конкретной галереи
				counter: !isMainVideoGallery,
				share: !isMainVideoGallery,
				mobileSettings: {
					showCloseIcon: true,
				},
			})
		});
	});
	flsModules.gallery = galleyItems;
}





