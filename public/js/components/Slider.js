import Hammer from 'hammerjs';

export default class Slider {

  constructor(container) {
    this.container = container;
    this.initEvent();
  }

  initEvent() {
    this.slidePoints = this.container.querySelectorAll('.slide__controls .slider__controlPoint');
    const goToSlideBinded = this.goToSlide.bind(this);
    for (let i = 0, l = this.slidePoints.length; i < l; i += 1) {
      const tapEvent = new Hammer.Manager(this.slidePoints[i]);
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

    if (e.target !== this.container) {
      const nextSlideNum = e.target.dataset.slide;
      const nextSlide = this.container.querySelector(`.slider__slide[data-slide="${nextSlideNum}"]`);

      currentlySelectedSlide.classList.remove('slider__slide--active');
      nextSlide.classList.add('slider__slide--active');
    } else if (e.target === this.container) {
      if (e.type === 'swipeleft') {
        const nextSelectedSlide = currentlySelectedSlide.previousElementSibling();
        currentlySelectedSlide.classList.remove('slider__slide--active');
        nextSelectedSlide.classList.add('slider__slide--active');
      } else if (e.type === 'swiperight') {
        const nextSelectedSlide = currentlySelectedSlide.nextElementSibling();
        currentlySelectedSlide.classList.remove('slider__slide--active');
        nextSelectedSlide.classList.add('slider__slide--active');
      }
    }
  }
}
