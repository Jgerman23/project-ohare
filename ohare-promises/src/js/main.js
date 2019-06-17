import '../scss/main.scss';
import App from './App.svelte';
import 'ohare-investigation/src/js/main';

const app = new App({
  target: document.querySelector('article.main'),
  // anchor: document.querySelector('section.story'),
  props: {
    name: 'world'
  }
});

window.app = app;

export default app;
