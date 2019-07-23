import '../scss/main.scss';
import './share';

// initialize image lazyload using lazysizes
// https://github.com/aFarkas/lazysizes
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/blur-up/ls.blur-up';

import HeadingTerminal from './heading-terminal';

let pymParents;

// Load custom tracking code lazily, so it's non-blocking
import('./analytics.js').then(analytics => analytics.init());

document.addEventListener('DOMContentLoaded', function() {
  new HeadingTerminal(document.querySelector('.heading-terminal'));
});

window.addEventListener('load', function() {
  if ('pym' in window) pymParents = window.pym.autoInitInstances;
});

window.addEventListener('beforeprint', function() {
  // send new print width for pym embeds
  pymParents.forEach(pymParent => {
    pymParent.sendWidth();
  });
});
