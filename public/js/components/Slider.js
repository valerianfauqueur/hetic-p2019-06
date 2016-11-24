import Hammer from 'hammerjs';

export default class Slider {

  constructor(container) {
    this.container = container;

    this.slides = this.container.querySelectorAll('.slider__slide');
    this.controls = this.container.querySelectorAll('.slider__controls .slider__controlPoint');
    this.initEvent();
  }

  initEvent() {
    const goToSlideBinded = this.goToSlide.bind(this);
    for (let i = 0, l = this.slides.length; i < l; i += 1) {
      const tapEvent = new Hammer.Manager(this.controls[i]);
      const Tap = new Hammer.Tap();
      tapEvent.add(Tap);
      tapEvent.on('tap', this.goToSlide);
    }
    this.swipe = new Hammer.Manager(this.container);
    const Swipe = new Hammer.Swipe();
    this.swipe.add(Swipe);
    this.swipe.on('swipeleft', goToSlideBinded);
    this.swipe.on('swiperight', goToSlideBinded);
  }


  goToSlide(e) {
    const currentlySelectedSlide = this.container.querySelector('.slider__slide--active');
    const currentControl = this.container.querySelector('.slider__controlPoint--active');
    if (e.target.parentNode !== this.container) {
      const nextSlideNum = e.target.dataset.slide;
      const nextSlide = this.container.querySelector(`.slider__slide[data-slide="${nextSlideNum}"]`);

      currentlySelectedSlide.classList.remove('slider__slide--active');
      nextSlide.classList.add('slider__slide--active');
    } else if (e.target.parentNode === this.container) {
      if (e.type === 'swipeleft') {
        let nextSelectedSlide = null;
        let nextControl = null;
        if (this.slides[this.slides.length - 1] === currentlySelectedSlide) {
          nextSelectedSlide = this.slides[0];
          nextControl = this.controls[0];
        } else {
          nextSelectedSlide = currentlySelectedSlide.nextElementSibling;
          nextControl = currentControl.nextElementSibling;
        }
        currentlySelectedSlide.classList.remove('slider__slide--active');
        nextSelectedSlide.classList.add('slider__slide--active');
        currentControl.classList.remove('slider__controlPoint--active');
        nextControl.classList.add('slider__controlPoint--active');
      } else if (e.type === 'swiperight') {
        let nextSelectedSlide = null;
        let nextControl = null;
        if (this.slides[0] === currentlySelectedSlide) {
          nextSelectedSlide = this.slides[this.slides.length - 1];
          nextControl = this.controls[this.slides.length - 1];
        } else {
          nextSelectedSlide = currentlySelectedSlide.previousElementSibling;
          nextControl = currentControl.previousElementSibling;
        }
        currentlySelectedSlide.classList.remove('slider__slide--active');
        nextSelectedSlide.classList.add('slider__slide--active');
        currentControl.classList.remove('slider__controlPoint--active');
        nextControl.classList.add('slider__controlPoint--active');
      }
    }
  }
}
