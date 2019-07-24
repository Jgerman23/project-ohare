import '../scss/main.scss';
import 'ohare-investigation/src/js/main';
import Timeline from './Timeline.svelte';
import ARCHIE from '../data/archie.json';

// initialize image lazyload using lazysizes
// https://github.com/aFarkas/lazysizes
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/blur-up/ls.blur-up';

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const app = new Timeline({
  target: document.querySelector('#timeline-app'),
  hydrate: prod ? true : false,
  props: {
    events: ARCHIE.events
  }
});

window.app = app;

export default app;
