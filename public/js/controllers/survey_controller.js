import Hammer from 'hammerjs';
import InputSlider from '../components/InputSlider';

const pathname = window.location.pathname;
if (pathname === '/') {
  // Create input slider for age question
  const ageInputsContainer = document.querySelector('.survey .survey__question--age .survey__questionAnswerInputs');
  const initAgeInputs = new InputSlider(
    ageInputsContainer,
    'survey__questionAnswerInput',
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
  const initHeightInputs = new InputSlider(
    heightInputsContainer,
    'survey__questionAnswerInput',
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

  // Create input slider for weight question
  const weightInputsContainer = document.querySelector('.survey .survey__question--weight .survey__questionAnswerInputs');
  const weightDisplay = document.querySelector('.survey .survey__question--weight .survey__questionAnswerDisplay');
  const initWeightInputs = new InputSlider(
    weightInputsContainer,
    'survey__questionAnswerInput',
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

  // Handle input selection for sport profile
  const profileInputsContainer = document.querySelector('.survey .survey__question--profile .survey__questionAnswerInputs');
  const profileEvent = new Hammer.Manager(profileInputsContainer);

  const Tap = new Hammer.Tap();
  profileEvent.add(Tap);
  // switch selected el
  profileEvent.on('tap', (e) => {
    if (!e.target.classList.contains('.survey__questionAnswerInput--selected')) {
      profileInputsContainer.querySelector('.survey__questionAnswerInput--selected').classList.remove('survey__questionAnswerInput--selected');
      e.target.classList.add('survey__questionAnswerInput--selected');
    }
  }, true);
}
