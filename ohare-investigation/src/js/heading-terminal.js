// TODO: bundle styling and scripting

import debounce from 'debounce';

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

export default class TerminalHeading {
  constructor(selector) {
    this.selector = selector;
    this.elements = Array.from(document.querySelectorAll(this.selector));

    this._init();
  }

  _init() {
    this.elements.forEach(hed => {
      const titleHTML = hed.innerHTML
        .replace(/<[^>]*>?/gm, '') // strip existing html
        .replace(/&nbsp;/g, ' ') // strip existing &nbsp;
        .replace(/\S/g, '<b>$&</b>')
        .replace(
          /\s/g,
          `</div><div class="space"><b>${String.fromCharCode(
            160
          )}</b></div><div>`
        );

      // hed.innerHTML = `<div>${titleHTML}</div>`;
      const clone = hed.cloneNode();

      clone.classList.add('block-heading');
      clone.innerHTML = `<div>${titleHTML}</div>`;

      hed.classList.add('u-hidden');
      hed.parentNode.insertBefore(clone, hed);

      this.elements.pop(hed);
      this.elements.push(clone);
    });

    window.addEventListener('resize', debounce(() => this._onResize(), 100));
    setTimeout(() => this._onResize(), 500);
  }

  _onResize(clientWidth = null) {
    const headings = this.elements;

    if (!headings.length) return;

    // get width of parent to determine available space
    const parentWidth =
      clientWidth || headings[0].parentNode.getBoundingClientRect().width;

    // get cell width, including margins
    const cellWidth = getComputedWidth(headings[0].querySelector('b'));

    // round heading width to multiple of cellWidth
    const roundedWidth = Math.floor(parentWidth / cellWidth) * cellWidth;

    headings.forEach(heading => {
      // set to rounded width
      heading.style.width = roundedWidth + 'px';

      // show or hide spacing elements so that we don't have hanging blank
      // tiles
      const spaces = heading.querySelectorAll('div.space, div.spacer');

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
        }
      });
    });
  }
}
