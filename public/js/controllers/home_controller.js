import Slider from '../components/Slider';

const pathname = window.location.pathname;
if (pathname === '/home') {
  const sliders = document.querySelectorAll('.slide_slider .slider__slide');
  const slider1 = new Slider(sliders[0]);
  const slider2 = new Slider(sliders[1]);
}
