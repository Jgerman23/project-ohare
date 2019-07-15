import '../scss/main.scss';
import './share';

// initialize image lazyload using lazysizes
// https://github.com/aFarkas/lazysizes
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/blur-up/ls.blur-up';

import HeadingTerminal from './heading-terminal';

let pymParents;
let heading;

document.addEventListener('DOMContentLoaded', function() {
  heading = new HeadingTerminal('.heading-terminal');
});

window.addEventListener('load', function() {
  pymParents = window.pym.autoInitInstances;
});

window.addEventListener('beforeprint', function() {
  // send new print width for pym embeds
  pymParents.forEach(pymParent => {
    pymParent.sendWidth();
  });
});
