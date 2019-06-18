import '../scss/main.scss';
import 'ohare-investigation/src/js/main';
// import Timeline from './Timeline.svelte';
import Timeline from './TimelineScrolly.svelte';
import ARCHIE from '../data/archie.json';

const app = new Timeline({
  target: document.querySelector('section.timeline-container'),
  props: {
    content: ARCHIE.content
  }
});

window.app = app;

export default app;
