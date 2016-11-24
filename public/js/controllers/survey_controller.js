import Hammer from 'hammerjs';
import InputSlider from '../components/InputSlider';


function switchQuestion(e) {
  if (e.target.classList.contains('survey__introductionCTA')) {
    const surveyIntroEl = e.target.parentNode;
    const nextQuestionEl = document.querySelector('.survey .survey__question[data-question="1"]');
    surveyIntroEl.classList.add('survey__introduction--over');
    nextQuestionEl.classList.add('survey__question--current');
  } else if (e.target.dataset.next === 'result') {
    const resultEl = document.querySelector('.survey .survey__result');
    const currentQuestionNumber = parseInt(e.target.parentNode.dataset.question, 10);
    const currentQuestionEl = document.querySelector(`.survey .survey__question[data-question="${currentQuestionNumber}"]`);
    currentQuestionEl.classList.remove('survey__question--current');
    resultEl.classList.add('survey__result--current');
  } else {
    const nextQuestionNumber = parseInt(e.target.dataset.next, 10);
    const currentQuestionNumber = parseInt(e.target.parentNode.dataset.question, 10);
    const currentQuestionEl = document.querySelector(`.survey .survey__question[data-question="${currentQuestionNumber}"]`);
    const nextQuestionEl = document.querySelector(`.survey .survey__question[data-question="${nextQuestionNumber}"]`);
    // Change the current question
    currentQuestionEl.classList.remove('survey__question--current');
    nextQuestionEl.classList.add('survey__question--current');
  }
}

const pathname = window.location.pathname;
if (pathname === '/') {
  // Create input slider for age question
  const ageInputsContainer = document.querySelector('.survey .survey__question--age .survey__questionAnswerInputs');
  const ageEventContainer = document.querySelector('.survey .survey__question--age .survey__questionAnswer');
  const initAgeInputs = new InputSlider(
    ageInputsContainer,
    'survey__questionAnswerInput',
    ageEventContainer,
    [21, 22, 23, 24, 25],
    2,
    1,
    'y',
    {
      style: {
        fontSize: '0px',
        marginBottom: '5px',
      },
      time: 100,
    },
  );

  // Create input slider for height question
  const heightInputsContainer = document.querySelector('.survey .survey__question--height .survey__questionAnswerInputs');
  const heightEventContainer = document.querySelector('.survey .survey__question--height .survey__questionAnswer');
  const initHeightInputs = new InputSlider(
    heightInputsContainer,
    'survey__questionAnswerInput',
    heightEventContainer,
    [166, 167, 168, 169, 170, 171, 172, 173, 174],
    4,
    1,
    'y',
    {
      style: {
        fontSize: '0px',
      },
      time: 100,
    },
  );

  // Create input slider for weight question
  const weightInputsContainer = document.querySelector('.survey .survey__question--weight .survey__questionAnswerInputs');
  const weightDisplay = document.querySelector('.survey .survey__question--weight .survey__questionAnswerDisplay');
  const weightEventContainer = document.querySelector('.survey .survey__question--weight .survey__questionAnswer');
  const initWeightInputs = new InputSlider(
    weightInputsContainer,
    'survey__questionAnswerInput',
    weightEventContainer,
    [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    10,
    1,
    'x',
    {
      style: {
        width: '0px',
        height: '0px',
      },
      time: 100,
    },
    false,
    weightDisplay
  );

  // Handle input selection for sport profile
  const profileInputsContainer = document.querySelector('.survey .survey__question--profile .survey__questionAnswerInputs');
  const profileEvent = new Hammer.Manager(profileInputsContainer);

  const profileTap = new Hammer.Tap();
  profileEvent.add(profileTap);
  // switch selected el
  profileEvent.on('tap', (e) => {
    if (!e.target.classList.contains('.survey__questionAnswerInput--selected')) {
      profileInputsContainer.querySelector('.survey__questionAnswerInput--selected').classList.remove('survey__questionAnswerInput--selected');
      e.target.classList.add('survey__questionAnswerInput--selected');
    }
  }, true);

  // Handle input selection for smoking
  const smokeInputsContainer = document.querySelector('.survey .survey__question--profile .survey__questionAnswerInputs--smoke');
  const smokeEvent = new Hammer.Manager(smokeInputsContainer);
  const smokeTap = new Hammer.Tap();

  smokeEvent.add(smokeTap);
  // switch selected el
  smokeEvent.on('tap', (e) => {
    if (!e.target.classList.contains('.survey__questionAnswerInput--selected')) {
      smokeInputsContainer.querySelector('.survey__questionAnswerInput--selected').classList.remove('survey__questionAnswerInput--selected');
      e.target.classList.add('survey__questionAnswerInput--selected');
    }
  }, true);


  // Handle question transition
  const nextContainers = document.querySelectorAll('.survey .survey__question .survey__questionValidation');

  for (let i = 0, c = nextContainers.length; i < c; i += 1) {
    const nextContainer = new Hammer.Manager(nextContainers[i]);
    const nextTap = new Hammer.Tap();
    nextContainer.add(nextTap);
    nextContainer.on('tap', switchQuestion);
  }

  // Handle begin CTA
  const ctaEl = document.querySelector('.survey .survey__introduction .survey__introductionCTA');
  const ctaEvent = new Hammer.Manager(ctaEl);
  const nextTap = new Hammer.Tap();
  ctaEvent.add(nextTap);
  ctaEvent.on('tap', switchQuestion);
}
