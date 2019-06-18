import '../scss/main.scss';
import 'ohare-investigation/src/js/main';
// import Timeline from './Timeline.svelte';
import Timeline from './TimelineScrolly.svelte';
import ARCHIE from '../data/archie.json';

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const app = new Timeline({
  target: document.querySelector('#timeline-app'),
  hydrate: prod ? true : false,
  props: {
    content: ARCHIE.content
  }
});

window.app = app;

export default app;
