// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


const input = document.getElementById("quizFormPhone");
const mask = "+7 (___) ___-__-__";

function applyMask(digits) {
  let result = "";
  let di = 0;
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === "_") {
      result += di < digits.length ? digits[di++] : "_";
    } else {
      result += mask[i];
    }
  }
  return result;
}

function setCursorPosition(pos, el) {
  requestAnimationFrame(() => {
    el.setSelectionRange(pos, pos);
  });
}

input.value = mask;

input.addEventListener("input", e => {
  const el = e.target;
  let digits = el.value.replace(/\D/g, "");

  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (!digits.startsWith("7")) digits = "7" + digits;
  digits = digits.substring(1, 11);

  const start = el.selectionStart || 0;

  el.value = applyMask(digits);

  // ставим курсор на ближайший "_"
  let nextPos = el.value.indexOf("_");
  if (nextPos === -1) nextPos = el.value.length;
  setCursorPosition(nextPos, el);
});

input.addEventListener("focus", () => {
  // при фокусе курсор встаёт на первое "_"
  let pos = input.value.indexOf("_");
  if (pos === -1) pos = input.value.length;
  setCursorPosition(pos, input);
});



import lightGallery from 'lightgallery';
import lgVideo from 'lightgallery/plugins/video/lg-video.min.js'

// создаём динамическую галерею
const playBtn = document.querySelector('.main-mob__play-btn');

playBtn.addEventListener('click', () => {
  lightGallery(document.body, {
    dynamic: true,
    dynamicEl: [
      {
        src: 'img/marikarkasvideo.webm', // путь к видео
        thumb: 'img/main/main-text-img.svg', // миниатюра, если нужна
        poster: 'img/main/main-text-img.svg', // превью для видео
        subHtml: '<h4>Видео</h4>', // необязательно
      }
    ],
    plugins: [lgVideo],
    licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
    speed: 500,
  });
});