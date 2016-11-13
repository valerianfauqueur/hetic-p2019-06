import InputSlider from '../components/InputSlider';

const pathname = window.location.pathname;
switch (pathname) {
  case '/survey/question-1': {
    const ageInputsContainer = document.querySelector('.survey .survey__body .survey__age');
    const initAgeInputs = new InputSlider(ageInputsContainer, 'age__input', [21, 22, 23, 24, 25], 3, 1, 'y');
    break;
  }

  case '/survey/question-2': {
    const heightInputsContainer = document.querySelector('.survey .survey__body .survey__height');
    const initHeightInputs = new InputSlider(heightInputsContainer, 'height__input', [165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175], 6, 1, 'y');
    break;
  }

  default: {
    // nothing
  }
}
