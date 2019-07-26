import '../scss/main.scss';
import App from './App.svelte';
import 'ohare-investigation/src/js/main';

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const app = new App({
  target: document.querySelector('#svelte-app'),
  hydrate: prod ? true : false,
  props: {
    name: 'world'
  }
});

window.app = app;

export default app;
