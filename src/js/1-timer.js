import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
btn.disabled = true;
let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if (userSelectedDate < new Date()) {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      btn.disabled = true;
    } else {
          btn.disabled = false;
          input.disabled = true;
     }   
  },
};

flatpickr(input, options);

btn.addEventListener('click', () => {
    timer.start();
});

const timer = {
    intervalId: null,
    start() {
        btn.disabled = true;
        input.disabled = true;

        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = userSelectedDate - currentTime;
            const timeComponents = convertMs(deltaTime);

            if (deltaTime <= 0) {
                clearInterval(this.intervalId);
                input.disabled = false;
                return;
            }
            updateTimer(timeComponents);

        }, 1000);

    },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
function updateTimer({ days, hours, minutes, seconds }) {
  timerDays.textContent = days;
  timerHours.textContent = hours;
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;
}