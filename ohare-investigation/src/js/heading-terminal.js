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

export const onResize = function(selector) {
  const headings = document.querySelectorAll(selector);

  if (!headings.length) return;

  const parentWidth = headings[0].parentNode.getBoundingClientRect().width;

  const newWidth = Math.floor(parentWidth / 30) * 30;

  headings.forEach(heading => {
    heading.style.width = newWidth + 'px';

    const spaces = heading.querySelectorAll('div.space, div.spacer');

    spaces.forEach(spaceEl => {
      if (
        spaceEl.getBoundingClientRect().top ===
          getNextSibling(spaceEl, 'div').getBoundingClientRect().top &&
        spaceEl.getBoundingClientRect().top ===
          getPrevSibling(spaceEl, 'div').getBoundingClientRect().top
      ) {
        spaceEl.classList.remove('u-invisible');
      } else {
        spaceEl.classList.add('u-invisible');
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

  window.addEventListener('resize', debounce(() => onResize(selector), 200));
  setTimeout(() => onResize(selector), 500);
};

export default function TerminalHeading(selector) {
  init(selector);
}
