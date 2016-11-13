export default class InputSlider {

  constructor(el, elClass, initValues, selected, increment, direction) {
    this.el = el;
    this.elClass = elClass;
    this.increment = increment;
    this.lastMousePos = {};
    this.lastMousePos.y = 0;
    this.lastMousePos.x = 0;
    this.direction = direction;
    // Initialise default inputs
    const initElems = this.createElems(initValues, (selected - 1));
    for (let i = 0, l = initElems.length; i < l; i += 1) {
      this.el.appendChild(initElems[i]);
    }
    this.initEvent();
  }

  createElems(values, selected = null) {
    if (typeof values === 'object' && values.length > 0) {
      const elems = values.map(
        (value, index) => {
          // Parse string into DOM nodes
          const tmpDiv = document.createElement('div');
          if (selected === index) {
            tmpDiv.innerHTML = `<div data-value="${value}" class="${this.elClass} ${this.elClass}--selected">${value}</div>`;
          } else {
            tmpDiv.innerHTML = `<div data-value="${value}" class="${this.elClass}">${value}</div>`;
          }
          // return a DOM element corresponding to an input line
          return tmpDiv.firstChild;
        }
      );
      return elems;
    }
    return false;
  }

  initEvent() {
    this.scrollBinded = this.scroll.bind(this);

    this.el.addEventListener('mouseenter', () => {
      window.addEventListener('mousewheel', this.scrollBinded);
    });

    this.el.addEventListener('mouseleave', () => {
      window.removeEventListener('mousewheel', this.scrollBinded);
    });

    this.el.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.lastMousePos.y = e.pageY;
      this.lastMousePos.x = e.pageX;
      window.addEventListener('mousemove', this.scrollBinded);
    });

    window.addEventListener('mouseup', () => {
      this.lastMousePos.y = 0;
      this.lastMousePos.x = 0;
      window.removeEventListener('mousemove', this.scrollBinded);
    });

    document.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.lastMousePos.y = e.changedTouches[0].pageY;
      this.lastMousePos.x = e.changedTouches[0].pageX;
      window.addEventListener('touchmove', this.scrollBinded);
    });

    window.addEventListener('touchend', () => {
      this.lastMousePos.y = 0;
      this.lastMousePos.x = 0;
      window.removeEventListener('touchmove', this.scrollBinded);
    });
  }

  scroll(e) {
    e.preventDefault();

    if (e.type === 'mousewheel') {
      if (e.wheelDelta > 0) {
        this.scrollUp();
      } else if (e.wheelDelta < 0) {
        this.scrollDown();
      }
    } else if (e.type === 'mousemove' || e.type === 'touchmove') {
      // Compare last position and current pos of mouse to trigger or not a scroll
      let mouseDif;
      let posX;
      let posY;
      if (e.type === 'mousemove') {
        posX = e.pageX;
        posY = e.pageY;
      } else if (e.type === 'touchmove') {
        posX = e.changedTouches[0].pageX;
        posY = e.changedTouches[0].pageY;
      }
      if (this.direction === 'x') {
        mouseDif = posX - this.lastMousePos.x;
      } else if (this.direction === 'y') {
        mouseDif = posY - this.lastMousePos.y;
      }

      if (mouseDif < -20) {
        this.scrollUp();
        this.lastMousePos.y = posY;
        this.lastMousePos.x = posX;
      } else if (mouseDif > 20) {
        this.scrollDown();
        this.lastMousePos.y = posY;
        this.lastMousePos.x = posX;
      }
    }
  }

  scrollUp() {
    const scrollElems = this.el.getElementsByClassName(this.elClass);
    const selectedEl = this.el.querySelector(`.${this.elClass}--selected`);
    const nextSelectedEl = selectedEl.previousSibling;
    // Change the selected el
    selectedEl.classList.remove(`${this.elClass}--selected`);
    nextSelectedEl.classList.add(`${this.elClass}--selected`);

    // Create a new input in 1st position
    const insertedEl = this.el.insertBefore(
      this.createElems(
      [parseFloat(scrollElems[0].dataset.value, 10) - this.increment])[0],
      this.el.firstElementChild
    );

    // Animate apparition of the input
    insertedEl.style.fontSize = '0px';
    setTimeout(() => {
      insertedEl.style.fontSize = '';
    }, 100);

    // Remove last input animated
    scrollElems[scrollElems.length - 1].style.fontSize = '0px';
    scrollElems[scrollElems.length - 1].style.marginTop = '5px';
    setTimeout(() => scrollElems[scrollElems.length - 1].remove(), 100);
  }

  scrollDown() {
    const scrollElems = this.el.getElementsByClassName(this.elClass);
    const selectedEl = this.el.querySelector(`.${this.elClass}--selected`);
    const nextSelectedEl = selectedEl.nextSibling;
    // Change the selected el
    selectedEl.classList.remove(`${this.elClass}--selected`);
    nextSelectedEl.classList.add(`${this.elClass}--selected`);

    // Create a new input in last position
    const insertedEl = this.el.appendChild(
      this.createElems(
        [parseFloat(scrollElems[scrollElems.length - 1].dataset.value, 10) + this.increment]
      )[0]
    );

    // Animate apparition of the input
    insertedEl.style.fontSize = '0px';
    setTimeout(() => {
      insertedEl.style.fontSize = '';
    }, 100);

    // Remove first input
    scrollElems[0].style.fontSize = '0px';
    scrollElems[0].style.marginBottom = '5px';
    setTimeout(() => scrollElems[0].remove(), 100);
  }
}
