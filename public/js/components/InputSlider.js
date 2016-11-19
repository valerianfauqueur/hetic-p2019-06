import Hammer from 'hammerjs';

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
      this.elDisplay = elDisplay.firstElementChild;
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
              tmpDiv.innerHTML = `<div style="pointer-events: none;" data-value="${value}" class="${this.elClass} ${this.elClass}--selected">${value}</div>`;
            } else {
              tmpDiv.innerHTML = `<div style="pointer-events: none;" data-value="${value}" class="${this.elClass} ${this.elClass}--selected"></div>`;
            }
          } else if (this.selected !== index) {
            if (this.displayNumber === true) {
              tmpDiv.innerHTML = `<div style="pointer-events: none;" data-value="${value}" class="${this.elClass}">${value}</div>`;
            } else if (this.displayNumber === false) {
              tmpDiv.innerHTML = `<div style="pointer-events: none;" data-value="${value}" class="${this.elClass}"></div>`;
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
    this.scrollBinded = this.scrollEv.bind(this);

    // Fire a wheel scroll only if the mouse is on the element
    this.el.addEventListener('mouseenter', () => {
      window.addEventListener('mousewheel', this.scrollBinded);
    });

    this.el.addEventListener('mouseleave', () => {
      window.removeEventListener('mousewheel', this.scrollBinded);
    });

    // Initiliase touch ans mouse pan on container
    this.mc = new Hammer.Manager(this.el);
    const Pan = new Hammer.Pan();
    this.mc.add(Pan);
    this.mc.on('pan', this.scrollBinded, true);
  }

  // Fire the correct direction scroll depending on the event
  scrollEv(e) {
    e.preventDefault();
    // If we scroll up or down fire the correct event
    if (e.type === 'mousewheel') {
      if (e.wheelDelta > 0) {
        this.scroll('up');
      } else if (e.wheelDelta < 0) {
        this.scroll('down');
      }
    } else if (e.type === 'pan') {
      // Compare last position and current pos of mouse to trigger or not a scroll
      let mouseDif;
      const posX = e.changedPointers[0].pageX;
      const posY = e.changedPointers[0].pageY;

      // Compare the difference between last position and current depending on the choosen axis
      if (this.direction === 'x' && (e.additionalEvent === 'panleft' || e.additionalEvent === 'panright')) {
        mouseDif = posX - this.lastMousePos.x;
      } else if (this.direction === 'y' && (e.additionalEvent === 'panup' || e.additionalEvent === 'pandown')) {
        mouseDif = posY - this.lastMousePos.y;
      }
      // If the difference is high enough trigger a scroll up or down
      if (mouseDif < -20) {
        this.scroll('up');
        this.lastMousePos.y = posY;
        this.lastMousePos.x = posX;
      } else if (mouseDif > 20) {
        this.scroll('down');
        this.lastMousePos.y = posY;
        this.lastMousePos.x = posX;
      }
    }
  }

  // DOM manipulation for scroll
  scroll(direction) {
    const scrollElems = this.el.getElementsByClassName(this.elClass);
    const selectedEl = this.el.querySelector(`.${this.elClass}--selected`);

    // Select the correct element
    let nextSelectedEl;
    const lastInput = scrollElems[scrollElems.length - 1];
    const firstInput = scrollElems[0];

    if (direction === 'up') {
      nextSelectedEl = selectedEl.previousSibling;
    } else if (direction === 'down') {
      nextSelectedEl = selectedEl.nextSibling;
    }

    // Change the selected el
    selectedEl.classList.remove(`${this.elClass}--selected`);
    nextSelectedEl.classList.add(`${this.elClass}--selected`);

    // if we need to display the current value on another element
    if (this.elDisplay !== false) {
      this.elDisplay.innerHTML = nextSelectedEl.dataset.value;
    }

    // Create a new input depending on the scroll direction
    let insertedEl;
    if (direction === 'up') {
      insertedEl = this.createInputs(
        [parseFloat(firstInput.dataset.value, 10) - this.increment]
      )[0];
    } else if (direction === 'down') {
      insertedEl = this.createInputs(
        [parseFloat(lastInput.dataset.value, 10) + this.increment]
      )[0];
    }

    // Apply style that will be animated to before animation values
    Object.assign(insertedEl.style, this.animation.style);

    if (direction === 'up') {
      // Prepend the new input
      this.el.insertBefore(
        insertedEl,
        this.el.firstElementChild
      );
    } else if (direction === 'down') {
      // Append the new input in last position
      this.el.appendChild(insertedEl);
    }

    // Animate apparition of the input with css
    setTimeout(() => { insertedEl.style = ''; insertedEl.style.pointerEvents = 'none'; }, this.animation.time);

    if (direction === 'up') {
      // Remove last input animated
      Object.assign(scrollElems[scrollElems.length - 1].style, this.animation.style);
      setTimeout(() => scrollElems[scrollElems.length - 1].remove(), this.animation.time);
    } else if (direction === 'down') {
      // Remove first input animated
      Object.assign(scrollElems[0].style, this.animation.style);
      setTimeout(() => scrollElems[0].remove(), this.animation.time);
    }
  }
}
