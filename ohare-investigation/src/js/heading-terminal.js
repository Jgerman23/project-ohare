// TODO: bundle styling and scripting

import debounce from 'debounce';

export default class TerminalHeading {
  constructor(element, init = true) {
    this.element = element;

    if (init) this._init();

    this._addListeners();
  }

  _init() {
    const titleHTML = this.element.innerHTML
      .replace(/<[^>]*>?/gm, '') // strip existing html
      .replace(/&nbsp;/g, ' ') // strip existing &nbsp;
      .replace(/\S/g, '<b>$&</b>')
      .replace(
        /\s/g,
        `</div><div class="space"><b>${String.fromCharCode(160)}</b></div><div>`
      );

    const clone = this.element.cloneNode();

    clone.classList.add('block-heading');
    clone.innerHTML = `<div>${titleHTML}</div>`;

    this.element.classList.add('u-hidden');
    this.element.parentNode.insertBefore(clone, this.element);

    this.element = clone;
  }

  _addListeners() {
    window.addEventListener('resize', debounce(() => this._onResize(), 100));
    setTimeout(() => this._onResize(), 500);
  }

  _onResize(clientWidth = null) {
    // get width of parent to determine available space
    const parentWidth =
      clientWidth || this.element.parentNode.getBoundingClientRect().width;

    // get cell width, including margins
    const cellWidth = getComputedWidth(this.element.querySelector('b'));

    // round heading width to multiple of cellWidth
    const roundedWidth = Math.floor(parentWidth / cellWidth) * cellWidth;

    // set to rounded width
    this.element.style.width = roundedWidth + 'px';

    // show or hide spacing elements so that we don't have hanging blank
    // tiles
    const spaces = this.element.querySelectorAll('div.space, div.spacer');

    spaces.forEach(spaceEl => {
      const prev = matchesPrev(spaceEl);
      const next = matchesNext(spaceEl);

      // if aligned with prev and next, show the tile;
      // -- else if aligned with prev only, make the tile invisible;
      // -- else if aligned with next only, make the tile invisible *and* set
      //    its width to 0
      if (prev && next) {
        spaceEl.classList.remove('u-invisible', 'u-w0');
      } else if (prev) {
        spaceEl.classList.add('u-invisible');
      } else if (next) {
        spaceEl.classList.add('u-invisible', 'u-w0');
      } else {
        spaceEl.classList.add('u-invisible', 'u-w0');
      }
    });
  }
}

const getNextSibling = function(elem, selector) {
  // Get the next sibling element
  var sibling = elem.nextElementSibling;

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
};

const getPrevSibling = function(elem, selector) {
  // Get the next sibling element
  var sibling = elem.previousElementSibling;

  // If the sibling matches our selector, use it
  // If not, jump to the next sibling and continue the loop
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
};

const matchesPrev = spaceEl =>
  spaceEl.getBoundingClientRect().top ===
  getPrevSibling(spaceEl, 'div').getBoundingClientRect().top;

const matchesNext = spaceEl =>
  spaceEl.getBoundingClientRect().top ===
  getNextSibling(spaceEl, 'div').getBoundingClientRect().top;

const getComputedWidth = element => {
  // we're assuming a reference to your element in a variable called 'element'
  var style = element.currentStyle || window.getComputedStyle(element),
    width = element.offsetWidth, // or use style.width
    margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
    padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
    border =
      parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

  return width + margin - padding + border;
};
