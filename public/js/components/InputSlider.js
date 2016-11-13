export default class InputSlider {

  constructor(el, elClass, initValues, selected, increment = 1, direction = 'y', animation = { style: {}, time: 0 }, display = true, elDisplay = false) {
    // The element that will contain our inputs
    this.el = el;

    // The class we want on our inputs
    this.elClass = elClass;

    // Value of incrementation when scrolling
    this.increment = increment;

    // The index of the input selected
    this.selected = selected;

    // Register the last touch or mouse position to check for update
    this.lastMousePos = {};
    this.lastMousePos.y = 0;
    this.lastMousePos.x = 0;

    // Scroll direction on x axis or y axis default y
    this.direction = direction;

    // Set the dissapearing or appearing style of an inputs
    this.animation = {};
    this.animation.style = animation.style;
    // Set the duration of the animation
    this.animation.time = animation.time;

    // Either we will display nothing or the number default true
    this.displayNumber = display;

    // Display the number on another element
    if (elDisplay !== false) {
      this.elDisplay = elDisplay.firstChild;
    } else {
      this.elDisplay = false;
    }
    // Initialise default inputs
    const initElems = this.createInputs(initValues, (selected - 1));
    for (let i = 0, l = initElems.length; i < l; i += 1) {
      this.el.appendChild(initElems[i]);
    }

    if (elDisplay !== false) {
      this.elDisplay.innerHTML = initValues[selected];
    }

    // Initialise events
    this.initEvent();
  }

  /**
    @param values : array of number
    return an array of DOM elements corresponding to the array of values passed
  */
  createInputs(values) {
    if (typeof values === 'object' && values.length > 0) {
      const elems = values.map(
        (value, index) => {
          // Parse string into DOM nodes
          const tmpDiv = document.createElement('div');
          // Apply template of an input depeding on  initialization params
          if (this.selected === index) {
            if (this.displayNumber === true) {
              tmpDiv.innerHTML = `<div data-value="${value}" class="${this.elClass} ${this.elClass}--selected">${value}</div>`;
            } else {
              tmpDiv.innerHTML = `<div data-value="${value}" class="${this.elClass} ${this.elClass}--selected"></div>`;
            }
          } else if (this.selected !== index) {
            if (this.displayNumber === true) {
              tmpDiv.innerHTML = `<div data-value="${value}" class="${this.elClass}">${value}</div>`;
            } else if (this.displayNumber === false) {
              tmpDiv.innerHTML = `<div data-value="${value}" class="${this.elClass}"></div>`;
            }
          }
          // return a DOM element corresponding to an input line
          return tmpDiv.firstChild;
        }
      );
      return elems;
    }
    return false;
  }

  /**
    Initialize event for drag touch and mouse wheel on y or x axis
    depending on the direction initialization param
  */
  initEvent() {
    // Bind the correct context to the event
    this.scrollBinded = this.scroll.bind(this);

    // Fire a wheel scroll only if the mouse is on the element
    this.el.addEventListener('mouseenter', () => {
      window.addEventListener('mousewheel', this.scrollBinded);
    });

    this.el.addEventListener('mouseleave', () => {
      window.removeEventListener('mousewheel', this.scrollBinded);
    });

    // Drag mouse event
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

    // Drag touch event
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

  // Fire the correct direction scroll depending on the event
  scroll(e) {
    e.preventDefault();
    // If we scroll up or down fire the correct event
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

      // Choose the correct value depending on mobile or desktop event
      if (e.type === 'mousemove') {
        posX = e.pageX;
        posY = e.pageY;
      } else if (e.type === 'touchmove') {
        posX = e.changedTouches[0].pageX;
        posY = e.changedTouches[0].pageY;
      }

      // Compare the difference between last position and current depending on the choosen axis
      if (this.direction === 'x') {
        mouseDif = posX - this.lastMousePos.x;
      } else if (this.direction === 'y') {
        mouseDif = posY - this.lastMousePos.y;
      }
      // If the difference is high enough trigger a scroll up or down
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

  // DOM manipulation for scrollUp
  scrollUp() {
    const scrollElems = this.el.getElementsByClassName(this.elClass);
    const selectedEl = this.el.querySelector(`.${this.elClass}--selected`);
    const nextSelectedEl = selectedEl.previousSibling;
    // Change the selected el
    selectedEl.classList.remove(`${this.elClass}--selected`);
    nextSelectedEl.classList.add(`${this.elClass}--selected`);

    // if we need to display the current value on another element
    if (this.elDisplay !== false) {
      this.elDisplay.innerHTML = nextSelectedEl.dataset.value;
    }

    // Create a new input
    const insertedEl = this.createInputs(
      [parseFloat(scrollElems[0].dataset.value, 10) - this.increment]
    )[0];

    // Apply style that will be animated to before animation values
    Object.assign(insertedEl.style, this.animation.style);

    // Prepend the new input
    this.el.insertBefore(
      insertedEl,
      this.el.firstElementChild
    );

    // Animate apparition of the input with css
    setTimeout(() => { insertedEl.style = ''; }, this.animation.time);

    // Remove last input animated
    Object.assign(scrollElems[scrollElems.length - 1].style, this.animation.style);
    setTimeout(() => scrollElems[scrollElems.length - 1].remove(), this.animation.time);
  }

  // DOM manipulation for scrollDown
  scrollDown() {
    const scrollElems = this.el.getElementsByClassName(this.elClass);
    const selectedEl = this.el.querySelector(`.${this.elClass}--selected`);
    const nextSelectedEl = selectedEl.nextSibling;

    // Change the selected el
    selectedEl.classList.remove(`${this.elClass}--selected`);
    nextSelectedEl.classList.add(`${this.elClass}--selected`);

    // if we need to display the current value on another element
    if (this.elDisplay !== false) {
      this.elDisplay.innerText = nextSelectedEl.dataset.value;
    }

    // Create a new input
    const insertedEl = this.createInputs(
      [parseFloat(scrollElems[scrollElems.length - 1].dataset.value, 10) + this.increment]
    )[0];

    // Apply style that will be animated to before animation values
    Object.assign(insertedEl.style, this.animation.style);

    // Append the new input in last position
    this.el.appendChild(insertedEl);

    // Animate apparition of the input with css
    setTimeout(() => { insertedEl.style = ''; }, this.animation.time);

    // Remove first input
    Object.assign(scrollElems[0].style, this.animation.style);
    setTimeout(() => scrollElems[0].remove(), this.animation.time);
  }
}
