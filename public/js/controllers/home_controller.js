import Slider from '../components/Slider';

function random(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function tick(el, inf, sup, string) {
  const rand = random(inf, sup);
  const elem = el;
  elem.innerHTML = `${rand} ${string}`;
}

const pathname = window.location.pathname;
if (pathname === '/home') {
  const sliders = document.querySelectorAll('.slide .slide__content .slider');
  const slider1 = new Slider(sliders[0]);
  const slider2 = new Slider(sliders[1]);

  const liveNumbers = document.querySelectorAll('.exemple__point .exemple__pointTextContainer .exemple__liveChart');
  console.log(liveNumbers);

  setInterval(() => { tick(liveNumbers[0], 20, 30, 'mg'); }, 500);
  setInterval(() => { tick(liveNumbers[1], 120, 130, 'bpm'); }, 500);
  setInterval(() => { tick(liveNumbers[2], 20, 30, 'mg'); }, 500);
}
