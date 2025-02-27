import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from '../img/octagon.svg';
import iconOk from '../img/ok.svg';

const form = document.querySelector('.form');

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(delay => {
      iziToast.show({
        title: 'OK',
        titleColor: '#FFFFFF',
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        position: 'topRight',
        color: '#59a10d',
        iconUrl: iconOk,
      });
    })
    .catch(delay => {
      iziToast.show({
        title: 'Error',
        titleColor: '#FFFFFF',
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#FFFFFF',
        position: 'topRight',
        color: '#ef4040',
        iconUrl: iconError,
      });
    });

  form.reset();
});
