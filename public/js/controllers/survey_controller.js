import InputSlider from '../components/InputSlider';

const pathname = window.location.pathname;
switch (pathname) {
  case '/survey/question-1': {
    const ageInputsContainer = document.querySelector('.survey .survey__body .survey__age');
    const initAgeInputs = new InputSlider(
      ageInputsContainer,
      'age__input',
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
    break;
  }

  case '/survey/question-2': {
    const heightInputsContainer = document.querySelector('.survey .survey__body .survey__height');
    const initHeightInputs = new InputSlider(
      heightInputsContainer,
      'height__input',
      [165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175],
      5,
      1,
      'y',
      {
        style: {
          fontSize: '0px',
        },
        time: 100,
      },
    );
    break;
  }

  case '/survey/question-3': {
    const weightInputsContainer = document.querySelector('.survey .survey__body .survey__weight');
    const weightDisplay = document.querySelector('.survey .survey__body .survey__weight__display');
    const initWeightInputs = new InputSlider(
      weightInputsContainer,
      'weight__input',
      [49.5, 50, 50.5, 51, 51.5, 52, 52.5, 53.5, 54, 54.5, 55,
        55.5, 56, 56.5, 57, 57.5, 58, 58.5, 59, 59.5, 60],
      10,
      0.5,
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
    break;
  }

  default: {
    // nothing
  }
}
