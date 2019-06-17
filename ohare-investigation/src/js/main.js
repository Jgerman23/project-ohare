import '../scss/main.scss';
import './share';
import '@fortawesome/fontawesome-free/css/solid.css';

document.addEventListener('DOMContentLoaded', function() {
  const hed = document.querySelector('.hed');
  hed.innerHTML = hed.innerHTML.replace(/\S/g, '<b>$&</b>');
});
