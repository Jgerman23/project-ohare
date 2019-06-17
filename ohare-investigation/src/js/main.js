import '../scss/main.scss';
import './share';
import '@fortawesome/fontawesome-free/css/solid.css';

// import App from './App.svelte';

// const app = new App({
//   target: document.querySelector('article.main'),
//   anchor: document.querySelector('section.story'),
//   props: {
//     name: 'world'
//   }
// });

// window.app = app;

// export default app;

document.addEventListener('DOMContentLoaded', function() {
  const hed = document.querySelector('.hed');

  // hed.
  // console.log(hed);
  hed.innerHTML = hed.innerHTML.replace(/\S/g, '<b>$&</b>');
});
