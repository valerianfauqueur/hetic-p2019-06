import InputSlider from '../components/InputSlider';

const ageInputsContainer = document.querySelector('.survey .survey__body .survey__age');
const initAgeInputs = new InputSlider(ageInputsContainer, 'age__input', [21, 22, 23, 24, 25], 3, 1, 'y');
