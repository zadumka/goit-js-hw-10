import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
    console.log(selectedDates[0]);
  },
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
});

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let selectedDate = null;

const setTime = date => {
  const nowTime =
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0') +
    ' ' +
    String(date.getHours()).padStart(2, '0') +
    ':' +
    String(date.getMinutes()).padStart(2, '0');

  input.value = nowTime;
};

setInterval(() => {
  if (!selectedDate) {
    const currentTime = new Date();
    setTime(currentTime);
  }
}, 1000);

input.addEventListener('change', () => {
  const newSelectedDate = new Date(input.value);
  if (newSelectedDate < new Date()) {
    iziToast.show({
      title: 'Error',
      message: 'You selected a valid future date.',
      position: 'topRight',
      color: '#EF4040',
      timeout: 3000,
    });
  } else {
    selectedDate = newSelectedDate;
    setTime(selectedDate);
  }
});

input.addEventListener('change', () => {
  const currentDate = new Date();
  const selectedDate = new Date(input.value);

  if (selectedDate > currentDate) {
    button.style.backgroundColor = '#4E75FF';
    button.style.color = '#FFFFFF';
  } else {
    button.style.backgroundColor = '';
    button.style.color = '';
  }
});

button.addEventListener('mouseenter', mouseEnter);
button.addEventListener('mouseleave', mouseLeave);

function mouseEnter() {
  const currentDate = new Date();
  const selectedDate = new Date(input.value);
  if (selectedDate > currentDate) {
    button.style.backgroundColor = '#6C8CFF';
  }
}

function mouseLeave() {
  const currentDate = new Date();
  const selectedDate = new Date(input.value);

  if (selectedDate > currentDate) {
    button.style.backgroundColor = '#4E75FF';
  }
}

button.addEventListener('click', () => {
  const selectedDate = new Date(input.value);
  startTimer(selectedDate);
  deactivate();
});

function startTimer(targetDate) {
  const interval = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = targetDate - currentTime;

    if (timeLeft <= 0) {
      clearInterval(interval);
      reset();
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

function deactivate() {
  input.disabled = true;
  button.disabled = true;
  button.style.backgroundColor = '';
  button.style.color = '';
  input.style.borderColor = '#808080';
  input.style.backgroundColor = '#FAFAFA';
  input.style.color = '#808080';
  button.removeEventListener('mouseenter', mouseEnter);
  button.removeEventListener('mouseleave', mouseLeave);
}

function reset() {
  input.disabled = false;
  button.disabled = false;
  input.style.borderColor = '';
  input.style.backgroundColor = '';
  input.style.color = '';
}
