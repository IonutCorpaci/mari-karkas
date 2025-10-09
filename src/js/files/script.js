// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


function phoneMask(input) {
    input.addEventListener('input', function(e) {
        let value = input.value.replace(/\D/g, ''); // оставляем только цифры

        // всегда начинаем с 7
        if (!value.startsWith('7')) value = '7' + value;

        // первая цифра после кода
        if (value.length > 1) {
            const allowed = ['0','1','3','4','5','6','7','9'];
            if (!allowed.includes(value[1])) {
                value = value[0]; // удаляем запрещённую цифру
            }
        }

        // форматируем с базой +7 (
        let formatted = '+7 (';
        if (value.length > 1) formatted += value.substring(1,4);
        if (value.length > 4) formatted += ') ' + value.substring(4,7);
        if (value.length > 7) formatted += '-' + value.substring(7,9);
        if (value.length > 9) formatted += '-' + value.substring(9,11);

        input.value = formatted;
    });

    // блокировка клавиш на запрещённых позициях
    input.addEventListener('keydown', function(e) {
        const pos = input.selectionStart;

        // запрещаем backspace/удаление +7 (
        if ((pos <= 3) && (e.key === 'Backspace' || e.key === 'Delete')) {
            e.preventDefault();
        }

        // запрещаем ввод 8 как первой цифры после +7
        if (pos === 4 && e.key >= '0' && e.key <= '9') {
            const allowed = ['0','1','3','4','5','6','7','9'];
            if (!allowed.includes(e.key)) e.preventDefault();
        }

        // запрещаем ввод любых букв/символов
        if (!((e.key >= '0' && e.key <= '9') || ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(e.key))) {
            e.preventDefault();
        }
    });
}

// Применяем маску к нужным инпутам
const quizInput = document.getElementById("quizFormPhone");
const phoneInput = document.getElementById("popupFormPhone");
const creditPhone = document.getElementById("credit-phone");

phoneMask(quizInput);
phoneMask(phoneInput);
phoneMask(creditPhone);


// -------------------- Calculator credit --------------------

const PRICE_PER_SQM = 55000; // 💡 поставь нужную цену за м²

const areaInput = document.getElementById('input-area');
const areaValue = document.getElementById('area-value');
const monthsInput = document.getElementById('input-months');
const monthsValue = document.getElementById('months-value');
const totalPriceElement = document.getElementById('total-price');
const initialPaymentElement = document.getElementById('initial-payment');
const monthlyPaymentElement = document.getElementById('monthly-payment');

// форма
const sendFormCalc = document.getElementById('calc-form'); // <form id="calc-form">
const calcErrMessage = document.querySelector('.form-error-calc'); // <div class="calc-phone-error"></div>
const calcFormBtn = document.querySelector('.results-credit__send');
let succeseCalcMessage = document.querySelector('.form-calc-succes');

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

// первая отрисовка
calculateValues();

// обработка формы
sendFormCalc.addEventListener('submit', function(e) {
    e.preventDefault();

    const phone = creditPhone.value.trim();
    const phoneDigits = phone.replace(/\D/g, '');

    if (phoneDigits.length < 11) {
        calcErrMessage.textContent = 'Введите корректный номер телефона';
        creditPhone.classList.add('error');
        return;
    } else {
        calcErrMessage.textContent = '';
        creditPhone.classList.remove('error');
    }

    calcFormBtn.textContent = 'Отправка...';
    calcFormBtn.disabled = true;

    const totalPrice = areaCalc * PRICE_PER_SQM;
    const initialPayment = totalPrice * 0.2;
    const monthlyPayment = (totalPrice - initialPayment) / monthsCalc;

    const data = {
        phone,
        area: areaCalc,
        months: monthsCalc,
        totalPrice,
        initialPayment,
        monthlyPayment
    };

    fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error('Ошибка сервера: ' + response.status);
        return response.json();
    })
    .then(data => {
        if (data.success) {
          calcFormBtn.textContent = 'Оставить заявку';
            succeseCalcMessage.innerHTML = 'Спасибо, всё прошло успешно, в скором времени с вами свяжутся.'
        } else {
            throw new Error(data.error || 'Неизвестная ошибка');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        calcErrMessage.textContent = 'Ошибка при отправке. Попробуйте позже.';
        calcFormBtn.disabled = false;
        calcFormBtn.textContent = 'Отправить заявку';
    });
});




// -------------------- QUIZ APP --------------------

const quizObj = [
  {
    type: "image-answ",
    question: "Что будем строить?",
    options: [
      {
        imageUrl: "img/quiz/quiz-1_barnhaus.webp",
        answer: "Барнхаус",
        type: "radio",
        name: 'Тип'
      },
      {
        imageUrl: "img/quiz/quiz-1_afreim.webp",
        answer: "А-фрейм",
        type: "radio",
        name: 'Тип'
      },
      {
        imageUrl: "img/quiz/quiz-1_classic.webp",
        answer: "Классику",
        type: "radio",
        name: 'Тип'
      },
      {
        imageUrl: "img/quiz/quiz-1_bania.webp",
        answer: "Баню",
        type: "radio",
        name: 'Тип'
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
        type: "radio",
        name: 'Площадь'
      },
      {
        imageUrl: "img/quiz/quiz-2_100.webp",
        answer: "50-100 м2",
        type: "radio",
        name: 'Площадь'
      },
      {
        imageUrl: "img/quiz/quiz-2_150.webp",
        answer: "100-150 м2",
        type: "radio",
        name: 'Площадь'
      },
      {
        imageUrl: "img/quiz/quiz-2_200.webp",
        answer: "Более 150м2",
        type: "radio",
        name: 'Площадь'
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
        type: "checkbox",
        name: 'Допы'
      },
      {
        imageUrl: "img/quiz/quiz-3_terrasa.webp",
        answer: "Терраса",
        type: "checkbox",
        name: 'Допы'
      },
      {
        imageUrl: "img/quiz/quiz-3_sauna.webp",
        answer: "Сауна",
        type: "checkbox",
        name: 'Допы'
      },
      {
        imageUrl: "img/quiz/quiz-3_not.webp",
        answer: "Не требуется",
        type: "checkbox",
        name: 'Допы'
      }
    ]
  },
  {
    type: "text-answ",
    question: "Когда планируете начать строительство?",
    options: [
      {
        answer: "В этом месяце",
        type: "radio",
        name: 'Когда'
      },
      {
        answer: "В течение 3-х месяцев",
        type: "radio",
        name: 'Когда'
      },
      {
        answer: "В течение полугода",
        type: "radio",
        name: 'Когда'
      },
      {
        answer: "Приступаем к проектированию и сразу строимся",
        type: "radio",
        name: 'Когда'
      },
      {
        answer: "Пока не определился",
        type: "radio",
        name: 'Когда'
      }
    ]
  },
  {
    type: "text-answ",
    question: "Каков ваш бюджет на строительство?",
    options: [
      {
        answer: "500 тыс. руб - 3 млн. руб",
        type: "radio",
        name: 'Бюджет'
      },
      {
        answer: "3 млн. руб - 5 млн. руб",
        type: "radio",
        name: 'Бюджет'
      },
      {
        answer: "5 млн. руб - 7 млн. руб",
        type: "radio",
        name: 'Бюджет'
      },
      {
        answer: "7 млн. руб - 9 млн. руб",
        type: "radio",
        name: 'Бюджет'
      },
      {
        answer: "Более 9 млн. руб",
        type: "radio",
        name: 'Бюджет'
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
        type: "radio",
        name: 'Подарок'
      },
      {
        imageUrl: "img/quiz/quiz-6_okna.webp",
        answer: "Мягкие окна",
        type: "radio",
        name: 'Подарок'
      },
      {
        imageUrl: "img/quiz/quiz-6_umniidom.webp",
        answer: "Умный дом",
        type: "radio",
        name: 'Подарок'
      },
      {
        imageUrl: "img/quiz/quiz-6_discount.webp",
        answer: "Скидка 1%",
        type: "radio",
        name: 'Подарок'
      }
    ]
  },
]

const quizApp = document.querySelector(".quiz__app");
const questionEl = quizApp.querySelector(".quiz__question");
const prevBtn = quizApp.querySelector(".quiz__prev");
const nextBtn = quizApp.querySelector(".quiz__next");
const quizContainer = document.querySelector(".quiz__container");
const mobQuizClose = document.querySelector(".mob-quiz-close");
const quizBarSuccess = document.querySelector(".quiz__bar-success");
const quizBarText = document.querySelector(".quiz__bar-text span");

let currentStep = 0;
let answers = {};
let mobQuizActivated = false;
let progressPercent = 0;

// ====== РЕНДЕР ВОПРОСОВ ======
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
          <input type="${opt.type}" name="${opt.name}" value="${opt.answer}" class="answer-image__input">
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
          <input type="${opt.type}" name="${opt.name}" value="${opt.answer}" class="answer-text__input" />
          <button type="button" class="answer-text__text"><span class="_icon-checked"></span> ${opt.answer}</button>
        </label>
      `;
    }
    answersWrapper.appendChild(optionDiv);
  });

  questionEl.after(answersWrapper);

  const inputs = answersWrapper.querySelectorAll("input");
  const fieldName = step.options[0]?.name;

  // Восстановление выбранных значений
  if (answers[fieldName]) {
    if (inputs[0].type === "radio") {
      inputs.forEach(i => {
        if (answers[fieldName] === i.value) {
          i.checked = true;
          i.closest(".quiz__answer-image, .quiz__answer-text")?.classList.add("selected-answer");
        }
      });
    } else if (inputs[0].type === "checkbox") {
      inputs.forEach(i => {
        if (answers[fieldName].includes(i.value)) {
          i.checked = true;
          i.closest(".quiz__answer-image, .quiz__answer-text")?.classList.add("selected-answer");
        }
      });
    }
  }

  if (inputs[0]) {
    if (inputs[0].type === "radio") {
      nextBtn.disabled = !Array.from(inputs).some(i => i.checked);
    } else {
      nextBtn.disabled = !(answers[fieldName] && answers[fieldName].length > 0);
    }
  } else {
    nextBtn.disabled = true;
  }

  function updateAfterRadioChange(changedInput) {
    answers[fieldName] = changedInput.value;

    inputs.forEach(i => {
      const parent = i.closest(".quiz__answer-image, .quiz__answer-text");
      if (i.checked) parent?.classList.add("selected-answer");
      else parent?.classList.remove("selected-answer");
    });

    nextBtn.disabled = !Array.from(inputs).some(i => i.checked);

    if (!mobQuizActivated) {
      quizContainer.classList.add("mob-quiz-active");
      if (window.innerWidth <= 768) document.documentElement.classList.add("lock");
      mobQuizActivated = true;
    }

    // Авто-переход с прогрессом
    setTimeout(() => goNextStep(), 300);
  }

  function updateAfterCheckboxChange(changedInput) {
    const parent = changedInput.closest(".quiz__answer-image, .quiz__answer-text");

    if (changedInput.checked) parent?.classList.add("selected-answer");
    else parent?.classList.remove("selected-answer");

    const checkedInputs = Array.from(parent.closest(".quiz__answers-text, .quiz__answers-image").querySelectorAll("input[type=checkbox]:checked"));
    const values = checkedInputs.map(i => i.value);
    answers[fieldName] = values.join(", ");

    nextBtn.disabled = values.length === 0;

    if (!mobQuizActivated && values.length > 0) {
      quizContainer.classList.add("mob-quiz-active");
      if (window.innerWidth <= 768) document.documentElement.classList.add("lock");
      mobQuizActivated = true;
    }
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
      if (e.target.tagName.toLowerCase() === "button") e.preventDefault();
      if (!input) return;

      if (input.type === "radio") {
        if (!input.checked) {
          input.checked = true;
          input.dispatchEvent(new Event("change", { bubbles: true }));
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

// ====== ПРОГРЕСС ======
function goNextStep() {
  if (progressPercent < 100) {
    progressPercent += 20;
    progressPercent = Math.min(progressPercent, 100);
  }

  quizBarSuccess.style.width = `${progressPercent}%`;
  quizBarText.textContent = `пройден на ${progressPercent}%`;

  if (currentStep < quizObj.length - 1) {
    currentStep++;
    renderStep();
  } else {
    quizApp.style.display = "none";
    document.querySelector(".quiz__manager").style.display = "none";
    document.querySelector(".quiz__form.form-quiz").style.display = "block";
  }
}

function goPrevStep() {
  if (progressPercent > 0) {
    progressPercent -= 20;
    progressPercent = Math.max(progressPercent, 0);
  }
  quizBarSuccess.style.width = `${progressPercent}%`;
  quizBarText.textContent = `пройден на ${progressPercent}%`;

  if (currentStep > 0) {
    currentStep--;
    renderStep();
  }
}

// ====== КНОПКИ ======
nextBtn.addEventListener("click", goNextStep);
prevBtn.addEventListener("click", goPrevStep);

// ====== ЗАКРЫТИЕ МОБИЛЬНОГО ПОПАПА ======
mobQuizClose.addEventListener("click", () => {
  quizContainer.classList.remove("mob-quiz-active");
  document.documentElement.classList.remove("lock");

  // Сброс
  currentStep = 0;
  progressPercent = 0;
  quizBarSuccess.style.width = "0%";
  quizBarText.textContent = `пройден на 0%`;
  answers = {};
  mobQuizActivated = false;
  renderStep();
});

renderStep();







// ====== ОБРАБОТКА ФОРМЫ КВИЗА ======
const quizForm = document.querySelector(".form-quiz__form");
if (quizForm) {
  quizForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedSocial = quizForm.querySelector('input[name="Куда"]:checked');
    const phoneInput = quizForm.querySelector('#quizFormPhone');
    const phoneValue = phoneInput.value.replace(/\D/g, '');
    const formErrMessage = quizForm.querySelector('.form-error-message')
    const formBtnQuiz = quizForm.querySelector('.form-quiz__btn');
    const formSuccesMessage = quizForm.querySelector('.form-succes-message');

    if (!selectedSocial || !phoneInput.value.trim()) {
      formErrMessage.innerHTML = 'Пожалуйста, выберите соцсеть и введите номер телефона.'
      return;
    }

    if (phoneValue.length < 11) {
      formErrMessage.innerHTML = 'Введите корректный номер телефона.'
      return;
    }

    formBtnQuiz.innerHTML = 'Отправка...'


    // записываем ответы в объект
    answers["Куда"] = selectedSocial.value;
    answers["Номер"] = phoneInput.value.trim();

    // формируем сообщение
    let message = "Заявка из квиза:\n";
    for (let key in answers) {
      message += `${key}: ${answers[key]}\n`;
    }

    console.log(message);

    // отправляем запрос
    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 0, message })
      });

      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

      const data = await response.json();
      if (data.success) {
        formBtnQuiz.innerHTML = `Получить каталог проектов <span>+бонус</span>`;
        formErrMessage.innerHTML = '';
        formSuccesMessage.innerHTML = 'Спасибо, всё прошло успешно, скоро с вами свяжутся.'
      } else {
        formBtnQuiz.innerHTML = `Получить каталог проектов <span>+бонус</span>`;
        formErrMessage.innerHTML = 'Произошла ошибка при отправке данных. Попробуйте снова.';
      }
    } catch (err) {
      formBtnQuiz.innerHTML = `Получить каталог проектов <span>+бонус</span>`;
      formErrMessage.innerHTML = 'Произошла ошибка при отправке данных. Попробуйте снова.';
      console.error("Ошибка при отправке:", err);
    }
  });

  // визуальное выделение выбранной соцсети
  quizForm.querySelectorAll('.contacts-form__tg, .contacts-form__whatsapp, .contacts-form__max').forEach(label => {
    const input = label.querySelector('input');
    label.addEventListener('click', () => {
      quizForm.querySelectorAll('.contacts-form__tg, .contacts-form__whatsapp, .contacts-form__max').forEach(l => l.classList.remove('selected-social'));
      label.classList.add('selected-social');
      input.checked = true;
    });
  });
}




// -------------------- Reels --------------------

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


// -------------------- Phone call popup --------------------

const popupFormCall = document.getElementById("popup-phone-form");
const popupErrorCall = popupFormCall.querySelector(".form-error-message");
const popupSuccessCall = popupFormCall.querySelector(".form-succes-call");
const submitBtnCall = popupFormCall.querySelector(".form-popup__form-btn");

popupFormCall.addEventListener("submit", function (e) {
    e.preventDefault();

    const phone = phoneInput.value.trim();
    const phoneDigits = phone.replace(/\D/g, "");

    // Проверка номера
    if (phoneDigits.length < 11) {
        popupErrorCall.textContent = "Введите корректный номер телефона";
        phoneInput.classList.add("error");
        return;
    } else {
        popupErrorCall.textContent = "";
        phoneInput.classList.remove("error");
    }

    submitBtnCall.textContent = "Отправка...";
    submitBtnCall.disabled = true;

    // Формируем сообщение для Telegram
    const message = `Заявка с попап-формы:\nНомер телефона: ${phone}`;

    fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: 0, message })
    })
        .then((response) => {
            if (!response.ok) throw new Error("Ошибка сервера: " + response.status);
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                popupSuccessCall.textContent = "Спасибо! Мы скоро свяжемся с вами.";
                popupSuccessCall.style.display = "block";

                // Очистка формы
                phoneInput.value = "";
                submitBtnCall.textContent = "Оставить заявку";
            } else {
                throw new Error(data.error || "Неизвестная ошибка");
            }
        })
        .catch((error) => {
            console.error("Ошибка:", error);
            popupErrorCall.textContent = "Ошибка при отправке. Попробуйте позже.";
            submitBtnCall.textContent = "Оставить заявку";
        })
        .finally(() => {
            submitBtnCall.disabled = false;
        });
});




const triggersBuild = document.querySelectorAll('[data-we-build]');
const bodiesBuild = document.querySelectorAll('.we-build-popup__body');

triggersBuild.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const target = trigger.dataset.weBuild;

    // скрываем все
    bodiesBuild.forEach(body => {
      body.style.display = 'none';
    });

    // показываем нужный
    const activeBody = document.querySelector(`[we-build-item="${target}"]`);
    if (activeBody) {
      activeBody.style.display = 'block';
    }

    // здесь можешь вызвать свою функцию открытия модалки
    // openModal();  // пример, если тебе нужно
  });
});
