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
  defaultDate: new Date(),
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
          iconUrl: icon,
        });
        button.disabled = true;
        return;
      }
      userSelectedDate = selectedDate;
      button.disabled = false;
    }
  },
  dateFormat: 'Y-m-d H:i',
  
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

button.addEventListener('click', startTimer);

function startTimer() {
  input.disabled = true;
  button.disabled = true;
  interval = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();
    if (timeLeft <= 0) {
      clearInterval(interval);
      input.disabled = false;
      return;
    }
    const { days: d, hours: h, minutes: m, seconds: s } = convertMs(timeLeft);
    days.textContent = addLeadingZero(d);
    hours.textContent = addLeadingZero(h);
    minutes.textContent = addLeadingZero(m);
    seconds.textContent = addLeadingZero(s);
  }, 1000);
}
