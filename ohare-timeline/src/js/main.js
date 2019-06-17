// import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/js/solid.js';

import '../scss/main.scss';
import './share';
import Timeline from './Timeline.svelte';
import ARCHIE from '../data/archie.json';

const app = new Timeline({
  target: document.querySelector('section.timeline-container'),
  props: {
    content: ARCHIE.content
  }
});

window.app = app;

export default app;

document.addEventListener('DOMContentLoaded', function() {
  const hed = document.querySelector('.hed');
  hed.innerHTML = hed.innerHTML.replace(/\S/g, '<b>$&</b>');
});
