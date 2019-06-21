import '../scss/main.scss';
import './share';

// initialize image lazyload using lazysizes
// https://github.com/aFarkas/lazysizes
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/blur-up/ls.blur-up';

import HeadingTerminal from './heading-terminal';

document.addEventListener('DOMContentLoaded', function() {
  new HeadingTerminal('.heading-terminal');
});
