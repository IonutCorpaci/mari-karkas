// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


const quizInput = document.getElementById("quizFormPhone");
const phoneInput = document.getElementById("popupFormPhone");
const creditPhone = document.getElementById("credit-phone");

function inputsMask(elem) {
  elem.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 0 && value[0] !== '7') value = '7' + value;
      let formattedValue = value.length > 0 ? '+' + value[0] : '';
      if (value.length > 1) formattedValue += ' (' + value.substring(1, 4);
      if (value.length > 4) formattedValue += ') ' + value.substring(4, 7);
      if (value.length > 7) formattedValue += '-' + value.substring(7, 9);
      if (value.length > 9) formattedValue += '-' + value.substring(9, 11);
      e.target.value = formattedValue;
  });
}

inputsMask(phoneInput);
inputsMask(quizInput);
inputsMask(creditPhone);



const PRICE_PER_SQM = 55000;

const areaInput = document.getElementById('input-area');
const areaValue = document.getElementById('area-value');
const monthsInput = document.getElementById('input-months');
const monthsValue = document.getElementById('months-value');
const totalPriceElement = document.getElementById('total-price');
const initialPaymentElement = document.getElementById('initial-payment');
const monthlyPaymentElement = document.getElementById('monthly-payment');

let areaCalc = parseInt(areaInput.value);
let monthsCalc = parseInt(monthsInput.value);

function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(Math.round(price)) + ' ₽';
}

function calculateValues() {
    const totalPrice = areaCalc * PRICE_PER_SQM;
    const initialPayment = totalPrice * 0.2;
    const monthlyPayment = (totalPrice - initialPayment) / monthsCalc;

    totalPriceElement.textContent = formatPrice(totalPrice);
    initialPaymentElement.textContent = formatPrice(initialPayment);
    monthlyPaymentElement.textContent = formatPrice(monthlyPayment);
}

areaInput.addEventListener('input', function() {
    areaCalc = parseInt(this.value);
    areaValue.textContent = areaCalc;
    calculateValues();
});

monthsInput.addEventListener('input', function() {
    monthsCalc = parseInt(this.value);
    monthsValue.textContent = monthsCalc;
    calculateValues();
});




const quizObj = [
  {
    type: "image-answ",
    question: "Что будем строить?",
    options: [
      {
        imageUrl: "img/quiz/quiz-1_barnhaus.webp",
        answer: "Барнхаус",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-1_afreim.webp",
        answer: "А-фрейм",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-1_classic.webp",
        answer: "Классику",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-1_bania.webp",
        answer: "Баню",
        type: "radio"
      }
    ]
  },
  {
    type: "image-answ",
    question: "Укажите площадь будущего строения",
    options: [
      {
        imageUrl: "img/quiz/quiz-2_50.webp",
        answer: "До 50м2",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-2_100.webp",
        answer: "50-100 м2",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-2_150.webp",
        answer: "100-150 м2",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-2_200.webp",
        answer: "Более 150м2",
        type: "radio"
      }
    ]
  },
  {
    type: "image-answ",
    question: "Какие дополнительные опции вам нужны?",
    options: [
      {
        imageUrl: "img/quiz/quiz-3_besedka.webp",
        answer: "Беседка",
        type: "checkbox"
      },
      {
        imageUrl: "img/quiz/quiz-3_terrasa.webp",
        answer: "Терраса",
        type: "checkbox"
      },
      {
        imageUrl: "img/quiz/quiz-3_sauna.webp",
        answer: "Сауна",
        type: "checkbox"
      },
      {
        imageUrl: "img/quiz/quiz-3_not.webp",
        answer: "Не требуется",
        type: "checkbox"
      }
    ]
  },
  {
    type: "text-answ",
    question: "Когда планируете начать строительство?",
    options: [
      {
        answer: "В этом месяце",
        type: "radio"
      },
      {
        answer: "В течение 3-х месяцев",
        type: "radio"
      },
      {
        answer: "В течение полугода",
        type: "radio"
      },
      {
        answer: "Приступаем к проектированию и сразу строимся",
        type: "radio"
      },
      {
        answer: "Пока не определился",
        type: "radio"
      }
    ]
  },
  {
    type: "text-answ",
    question: "Каков ваш бюджет на строительство?",
    options: [
      {
        answer: "500 тыс. руб - 3 млн. руб",
        type: "radio"
      },
      {
        answer: "3 млн. руб - 5 млн. руб",
        type: "radio"
      },
      {
        answer: "5 млн. руб - 7 млн. руб",
        type: "radio"
      },
      {
        answer: "7 млн. руб - 9 млн. руб",
        type: "radio"
      },
      {
        answer: "Более 9 млн. руб",
        type: "radio"
      }
    ]
  },
  {
    type: "image-answ",
    question: "Выберите подарок, который хотите получить",
    options: [
      {
        imageUrl: "img/quiz/quiz-6_potolki.webp",
        answer: "Натяжные потолки",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-6_okna.webp",
        answer: "Мягкие окна",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-6_umniidom.webp",
        answer: "Умный дом",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-6_discount.webp",
        answer: "Скидка 1%",
        type: "radio"
      }
    ]
  },
]


const quizApp = document.querySelector(".quiz__app");
const questionEl = quizApp.querySelector(".quiz__question");
const prevBtn = quizApp.querySelector(".quiz__prev");
const nextBtn = quizApp.querySelector(".quiz__next");

let currentStep = 0;
let answers = {};

function renderStep() {
  const step = quizObj[currentStep];

  questionEl.textContent = step.question;

  quizApp.querySelector(".quiz__answers-image")?.remove();
  quizApp.querySelector(".quiz__answers-text")?.remove();

  const answersWrapper = document.createElement("div");
  answersWrapper.className = step.type === "image-answ" ? "quiz__answers-image" : "quiz__answers-text";

  step.options?.forEach(opt => {
    const optionDiv = document.createElement("div");
    if (step.type === "image-answ") {
      optionDiv.className = "quiz__answer-image answer-image";
      optionDiv.innerHTML = `
        <label class="answer-image__label">
          <input type="${opt.type}" name="q${currentStep}" value="${opt.answer}" class="answer-image__input">
          <div class="answer-image__item">
            <div class="answer-image__image">
              <img src="${opt.imageUrl}" alt="">
              <span class="_icon-checked"></span>
            </div>
            <div class="answer-image__text">${opt.answer}</div>
          </div>
        </label>
      `;
    } else {
      optionDiv.className = "quiz__answer-text answer-text";
      optionDiv.innerHTML = `
        <label class="answer-text__label">
          <input type="${opt.type}" name="q${currentStep}" value="${opt.answer}" class="answer-text__input" />
          <button type="button" class="answer-text__text"><span class="_icon-checked"></span> ${opt.answer}</button>
        </label>
      `;
    }

    answersWrapper.appendChild(optionDiv);
  });

  questionEl.after(answersWrapper);

  const inputs = answersWrapper.querySelectorAll("input");
  if (answers[`q${currentStep}`]) {
    if (inputs.length) {
      if (inputs[0].type === "radio") {
        inputs.forEach(i => {
          if (answers[`q${currentStep}`] === i.value) {
            i.checked = true;
            i.closest(".quiz__answer-image, .quiz__answer-text")?.classList.add("selected-answer");
          }
        });
      } else if (inputs[0].type === "checkbox") {
        inputs.forEach(i => {
          if (Array.isArray(answers[`q${currentStep}`]) && answers[`q${currentStep}`].includes(i.value)) {
            i.checked = true;
            i.closest(".quiz__answer-image, .quiz__answer-text")?.classList.add("selected-answer");
          }
        });
      }
    }
  }

  if (inputs.length) {
    if (inputs[0].type === "radio") {
      nextBtn.disabled = !Array.from(inputs).some(i => i.checked);
    } else {
      nextBtn.disabled = !(answers[`q${currentStep}`] && answers[`q${currentStep}`].length > 0);
    }
  } else {
    nextBtn.disabled = true;
  }

  function updateAfterRadioChange(changedInput) {
    answers[`q${currentStep}`] = changedInput.value;

    inputs.forEach(i => {
      const parent = i.closest(".quiz__answer-image, .quiz__answer-text");
      if (i.checked) parent?.classList.add("selected-answer");
      else parent?.classList.remove("selected-answer");
    });

    nextBtn.disabled = !Array.from(inputs).some(i => i.checked);
  }

function updateAfterCheckboxChange(changedInput) {
  const parent = changedInput.closest(".quiz__answer-image, .quiz__answer-text");

  if (changedInput.checked) parent?.classList.add("selected-answer");
  else parent?.classList.remove("selected-answer");

  const checkedInputs = Array.from(parent.closest(".quiz__answers-text, .quiz__answers-image").querySelectorAll("input[type=checkbox]:checked"));
  const values = checkedInputs.map(i => i.value);
  answers[`q${currentStep}`] = values.join(", ");

  nextBtn.disabled = values.length === 0;
}

  inputs.forEach(i => {
    i.addEventListener("change", () => {
      if (i.type === "radio") updateAfterRadioChange(i);
      else updateAfterCheckboxChange(i);
    });
  });

  const optionDivs = answersWrapper.querySelectorAll(".quiz__answer-image, .quiz__answer-text");
  optionDivs.forEach(div => {
    const input = div.querySelector("input");
    div.addEventListener("click", (e) => {
      if (e.target && e.target.tagName && e.target.tagName.toLowerCase() === "button") {
        e.preventDefault();
      }

      if (!input) return;

      if (input.type === "radio") {
        if (!input.checked) {
          input.checked = true;
          input.dispatchEvent(new Event("change", { bubbles: true }));
        } else {
          input.checked = true;
        }
      } else if (input.type === "checkbox") {

        input.checked = !input.checked;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });

  prevBtn.style.display = currentStep === 0 ? "none" : "inline-flex";
  nextBtn.textContent = "Далее";
}

nextBtn.addEventListener("click", () => {
  if (currentStep < quizObj.length - 1) {
    currentStep++;
    console.log(answers);
    renderStep();
  } else if (currentStep === quizObj.length - 1) {

    quizApp.style.display = "none";
    document.querySelector(".quiz__manager").style.display = "none";

    const formEl = document.querySelector(".quiz__form.form-quiz");
    if (formEl) formEl.style.display = "block";
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    renderStep();
  }
});

renderStep();



const reelsObj = [
  { url: 'img/reels/reels-1.mp4', name: 'Классический каркасный дом'},
  { url: 'img/reels/reels-2.mp4', name: 'Карскасный дом А-фрейм' },
  { url: 'img/reels/reels-3.mp4', name: 'Каркасный дом Барнхаус' },
  { url: 'img/reels/reels-4.mp4', name: 'Каркасная баня от «Мари Каркас»' },
];

const reelsItems = document.querySelectorAll('.reels__item');
const reelsBody = document.querySelector('.reels-popup__body');
const prevReelsBtn = document.querySelector('.reels-popup__prev');
const nextReelsBtn = document.querySelector('.reels-popup__next');
let progressBarReels = document.querySelector('.reels-popup__progress-bar')
const reelsPopap = document.querySelector('#reels-popup')
const closeReelsBtn = reelsPopap.querySelector('#reels-popup-close')

let currentIndex = 0;

function showReel(index) {
  if (index < 0) index = reelsObj.length - 1;
  if (index >= reelsObj.length) index = 0;
  currentIndex = index;

  reelsBody.innerHTML = '';

  const video = document.createElement('video');
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.muted = false;

  video.ontimeupdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      progressBarReels.style.width = `${progress}%`;
    };

  const source = document.createElement('source');
  source.src = reelsObj[index].url;
  source.type = 'video/mp4';
  video.appendChild(source);

  const info = document.createElement('div');
  info.className = 'reels-popup__info';
  info.innerHTML = `
    <div class="reels-popup__image">
      <img src="img/reels/reel-${index + 1}.webp" alt="">
    </div>
    <div class="reels-popup__name">${reelsObj[index].name}</div>
  `;

  reelsBody.appendChild(video);
  reelsBody.appendChild(info);

  video.play();
}

prevReelsBtn.addEventListener('click', () => {
  showReel(currentIndex - 1);
});

nextReelsBtn.addEventListener('click', () => {
  showReel(currentIndex + 1);
});

reelsItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    showReel(i);
  });
});

closeReelsBtn.addEventListener('click', () => {
  stopVideo();
});

reelsPopap.addEventListener('click', (e) => {
  if (e.target === reelsPopap) {
    stopVideo();
  }
});

function stopVideo() {
  const video = reelsBody.querySelector('video');
  if (video) {
    video.pause();
    video.muted = true;
    video.src = '';
    video.load();
  }
  reelsBody.innerHTML = '';
}


