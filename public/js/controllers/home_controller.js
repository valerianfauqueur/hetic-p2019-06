import Slider from '../components/Slider';

const pathname = window.location.pathname;
if (pathname === '/home') {
  const sliders = document.querySelectorAll('.slide .slide__content .slider');
  const slider1 = new Slider(sliders[0]);
  const slider2 = new Slider(sliders[1]);
}
