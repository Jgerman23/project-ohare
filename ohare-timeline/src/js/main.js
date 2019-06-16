import '../scss/main.scss';
import './share';
import Timeline from './Timeline.svelte';
import ARCHIE from '../data/archie.json';

const app = new Timeline({
  target: document.querySelector('section.timeline-container'),
  props: {
    events: ARCHIE.events
  }
});

window.app = app;

export default app;
