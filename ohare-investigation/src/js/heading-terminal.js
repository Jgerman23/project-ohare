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

export const onResize = function(selector) {
  const headings = document.querySelectorAll(selector);

  if (!headings.length) return;

  // get width of parent to determine available space
  const parentWidth = headings[0].parentNode.getBoundingClientRect().width;

  // round heading width to multiple of tiles
  // TODO: use tile style attributes instead of hard-coding
  const roundedWidth = Math.floor(parentWidth / 30) * 30;

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
        spaceEl.classList.remove('u-invisible');
      } else if (prev) {
        spaceEl.classList.add('u-invisible');
      } else if (next) {
        spaceEl.classList.add('u-invisible', 'u-w0');
      }
    });
  });
};

const init = function(selector) {
  const terminalHeadings = document.querySelectorAll(selector);

  terminalHeadings.forEach(hed => {
    const titleHTML = hed.innerHTML
      .replace(/<[^>]*>?/gm, '') // strip existing html
      .replace(/&nbsp;/g, ' ') // strip existing &nbsp;
      .replace(/\S/g, '<b>$&</b>')
      .replace(
        /\s/g,
        `</div><div class="space"><b>${String.fromCharCode(160)}</b></div><div>`
      );

    hed.innerHTML = `<div>${titleHTML}</div>`;
  });

  window.addEventListener('resize', debounce(() => onResize(selector), 100));
  setTimeout(() => onResize(selector), 500);
};

export default function TerminalHeading(selector) {
  init(selector);
}
