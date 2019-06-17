import debounce from 'debounce';

const onResize = function(selector) {
  const headings = document.querySelectorAll(selector);

  if (!headings.length) return;

  const parentWidth = headings[0].parentNode.getBoundingClientRect().width;

  const newWidth = Math.floor(parentWidth / 30) * 30;

  headings.forEach(heading => {
    heading.style.width = newWidth + 'px';

    const spaces = heading.querySelectorAll('div.space, div.spacer');

    spaces.forEach(spaceEl => {
      if (
        spaceEl.getBoundingClientRect().top !==
        spaceEl.nextElementSibling.getBoundingClientRect().top
      ) {
        spaceEl.classList.add('invisible');
      } else {
        spaceEl.classList.remove('invisible');
      }
    });
  });
};

const init = function(selector) {
  const terminalHeadings = document.querySelectorAll(selector);

  terminalHeadings.forEach(hed => {
    const titleHTML = hed.innerHTML
      .replace(/<[^>]*>?/gm, '') // strip existing html
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
