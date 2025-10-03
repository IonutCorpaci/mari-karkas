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
        imageUrl: "img/quiz/quiz-1_barnhaus.png",
        answer: "Барнхаус",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-1_afreim.png",
        answer: "А-фрейм",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-1_classic.png",
        answer: "Классику",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-1_bania.png",
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
        imageUrl: "img/quiz/quiz-2_50.jpg",
        answer: "До 50м2",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-2_100.jpg",
        answer: "50-100 м2",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-2_150.jpg",
        answer: "100-150 м2",
        type: "radio"
      },
      {
        imageUrl: "img/quiz/quiz-2_200.jpg",
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
        imageUrl: "img/quiz/quiz-3_besedka.jpg",
        answer: "Беседка",
        type: "checkbox"
      },
      {
        imageUrl: "img/quiz/quiz-3_terrasa.jpeg",
        answer: "Терраса",
        type: "checkbox"
      },
      {
        imageUrl: "img/quiz/quiz-3_sauna.webp",
        answer: "Сауна",
        type: "checkbox"
      },
      {
        imageUrl: "img/quiz/quiz-3_not.png",
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
        imageUrl: "img/quiz/quiz-6_potolki.jpg",
        answer: "Натяжные потолки",
        type: "checkbox"
      },
      {
        imageUrl: "img/quiz/quiz-6_okna.jpg",
        answer: "Мягкие окна",
        type: "checkbox"
      },
      {
        imageUrl: "img/quiz/quiz-6_umniidom.png",
        answer: "Умный дом",
        type: "checkbox"
      },
      {
        imageUrl: "img/quiz/quiz-6_discount.jpg",
        answer: "Скидка 1%",
        type: "checkbox"
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

  // Вопрос
  questionEl.textContent = step.question;

  // Удаляем старые ответы
  quizApp.querySelector(".quiz__answers-image")?.remove();
  quizApp.querySelector(".quiz__answers-text")?.remove();

  // Создаём блок с ответами
  let answersWrapper;
  if (step.type === "image-answ") {
    answersWrapper = document.createElement("div");
    answersWrapper.className = "quiz__answers-image";
  } else {
    answersWrapper = document.createElement("div");
    answersWrapper.className = "quiz__answers-text";
  }

  // Генерация вариантов
  step.options?.forEach(opt => {
    const optionDiv = document.createElement("div");

    if(step.type === "image-answ") {
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
          <input type="${opt.type}" name="q${currentStep}" value="${opt.answer}" class="answer-text__input">
          <button class="answer-text__text"><span class="_icon-checked"></span> ${opt.answer}</button>
        </label>
      `;
    }

    answersWrapper.appendChild(optionDiv);
  });

  // Вставляем сразу после вопроса
  questionEl.after(answersWrapper);

  // Кнопка Далее пока отключена
  nextBtn.disabled = true;

  // Слушатели на выбор
  const inputs = answersWrapper.querySelectorAll("input");
  inputs.forEach(input => {
    input.addEventListener("change", () => {
      if(input.type === "radio") {
        answers[`q${currentStep}`] = input.value;

        // selected-answer для радио
        inputs.forEach(i => {
          const parent = i.closest(".quiz__answer-image, .quiz__answer-text");
          if(i.checked) parent.classList.add("selected-answer");
          else parent.classList.remove("selected-answer");
        });

        // Активируем кнопку Далее
        nextBtn.disabled = !Array.from(inputs).some(i => i.checked);

      } else if(input.type === "checkbox") {
        if(!answers[`q${currentStep}`]) answers[`q${currentStep}`] = [];
        if(input.checked) {
          answers[`q${currentStep}`].push(input.value);
        } else {
          answers[`q${currentStep}`] = answers[`q${currentStep}`].filter(v => v !== input.value);
        }

        // selected-answer для чекбоксов
        const parent = input.closest(".quiz__answer-image, .quiz__answer-text");
        if(input.checked) parent.classList.add("selected-answer");
        else parent.classList.remove("selected-answer");

        // Активируем кнопку Далее, если выбран хотя бы один checkbox
        nextBtn.disabled = !answers[`q${currentStep}`] || answers[`q${currentStep}`].length === 0;
      }
    });
  });

  // Кнопки
  prevBtn.style.display = currentStep === 0 ? "none" : "inline-flex";
  nextBtn.textContent = currentStep === quizObj.length - 1 ? "Далее" : "Далее";
}

// Далее
nextBtn.addEventListener("click", () => {
  if(currentStep < quizObj.length - 1) {
    currentStep++;
    renderStep();
  } else if(currentStep === quizObj.length - 1) {
    // последний шаг пройден
    quizApp.style.display = "none";
    document.querySelector(".quiz__manager").style.display = "none";

    // показываем готовую форму
    const formEl = document.querySelector(".quiz__form.form-quiz");
    if(formEl) formEl.style.display = "block";
  }
});

// Назад
prevBtn.addEventListener("click", () => {
  if(currentStep > 0) {
    currentStep--;
    renderStep();
  }
});

// Старт
renderStep();
