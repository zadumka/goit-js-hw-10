import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import icon from '../img/octagon.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
let interval;
const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
button.disabled = true;
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1,
    weekdays: {
      shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      longhand: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
    },
  },
  onClose(selectedDates) {
    if (selectedDates.length > 0) {
      const selectedDate = selectedDates[0];

      if (selectedDate.getTime() < Date.now()) {
        iziToast.show({
          title: 'Error',
          titleColor: '#FFFFFF',
          message: 'Please choose a date in the future',
          messageColor: '#FFFFFF',
          position: 'topRight',
          color: '#EF4040',
          timeout: 3000,
          iconColor: '#fff',
          iconUrl: icon,
        });
        button.disabled = true;
        return;
      }

      userSelectedDate = selectedDate;
      button.disabled = false;

      // localStorage.setItem('userSelectedDate', selectedDate.getTime());
      // localStorage.removeItem('timeLeft');
    }
  },
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
});

// const savedDate = localStorage.getItem('userSelectedDate');
// if (savedDate) {
//   userSelectedDate = new Date(Number(savedDate));
//   button.disabled = true;
//   input.disabled = true;
// }

button.addEventListener('click', () => {
  startTimer(userSelectedDate);
  input.disabled = true;
  button.disabled = true;
});

function startTimer(targetDate) {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = targetDate - currentTime;

    // localStorage.setItem('timeLeft', timeLeft);

    if (timeLeft <= 0) {
      clearInterval(interval);
      input.disabled = false;
      button.disabled = true;

      // localStorage.removeItem('userSelectedDate');
      // localStorage.removeItem('timeLeft');
    } else {
      const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesLeft = Math.floor(
        (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

      days.textContent = String(daysLeft).padStart(2, '0');
      hours.textContent = String(hoursLeft).padStart(2, '0');
      minutes.textContent = String(minutesLeft).padStart(2, '0');
      seconds.textContent = String(secondsLeft).padStart(2, '0');
    }
  }, 1000);
}

// const savedTimeLeft = localStorage.getItem('timeLeft');
// if (savedTimeLeft && userSelectedDate) {
//   const remainingTime = Number(savedTimeLeft);
//   if (remainingTime > 0) {
//     startTimer(userSelectedDate);
//   } else {
//     button.disabled = true;
//     input.disabled = false;
//   }
// }
// localStorage.removeItem('userSelectedDate');
// localStorage.removeItem('timeLeft');
