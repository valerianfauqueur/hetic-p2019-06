import Hammer from 'hammerjs';

// Handle input selection for sport profile
const navSwitch = document.querySelector('header .nav__toggle');
const navContainer = document.querySelector('header .nav__container');
const navEvent = new Hammer.Manager(navSwitch);
const body = document.querySelector('body');

const navTap = new Hammer.Tap();
navEvent.add(navTap);


navEvent.on('tap', (e) => {
  e.preventDefault();
  if (!navContainer.classList.contains('nav__container--active')) {
    navContainer.classList.add('nav__container--active');
    // Prevent from scrolling while in overlay
    body.style.height = '100vh';
    body.style.overflow = 'hidden';
  } else {
    navContainer.classList.remove('nav__container--active');
    body.style = '';
  }
});
