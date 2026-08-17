let totalSeconds = 0;
let initialSeconds = 0;
let timerInterval = null;
let isRunning = false;

// DOM елементи
const display = document.getElementById('time-display');
const statusBadge = document.getElementById('status-badge');
const inputMinutes = document.getElementById('input-minutes');
const inputSeconds = document.getElementById('input-seconds');
const notificationText = document.getElementById('notification-text');
const repeatMode = document.getElementById('repeat-mode');

const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');
const btnReset = document.getElementById('btn-reset');

// Форматування секунд у MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Оновлення таймера на сторінці та у title вікна
function updateDisplay() {
    const formatted = formatTime(totalSeconds);
    display.textContent = formatted;
    document.title = `${formatted} — Онлайн-таймер`;
}

// Запит дозволу на сповіщення
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
}

// Надсилання браузерного повідомлення
function triggerNotification() {
    const text = notificationText.value.trim() || 'Час вийшов!';
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Таймер сповіщення', {
            body: text,
            icon: 'https://cdn-icons-png.flaticon.com/512/850/850960.png'
        });
    } else {
        alert(text);
    }
}

// Старт / Продовження
function startTimer() {
    requestNotificationPermission();

    if (!isRunning) {
        if (totalSeconds <= 0) {
            const mins = parseInt(inputMinutes.value, 10) || 0;
            const secs = parseInt(inputSeconds.value, 10) || 0;
            totalSeconds = (mins * 60) + secs;
            initialSeconds = totalSeconds;
        }

        if (totalSeconds <= 0) return;

        isRunning = true;
        btnStart.disabled = true;
        btnPause.disabled = false;
        statusBadge.textContent = 'Працює';
        statusBadge.className = 'badge running';

        timerInterval = setInterval(() => {
            totalSeconds--;
            updateDisplay();

            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                triggerNotification();

                if (repeatMode.checked) {
                    totalSeconds = initialSeconds;
                    updateDisplay();
                    startTimer();
                } else {
                    resetTimerUI();
                }
            }
        }, 1000);
    }
}

// Пауза
function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        btnStart.disabled = false;
        btnPause.disabled = true;
        statusBadge.textContent = 'Пауза';
        statusBadge.className = 'badge paused';
    }
}

// Скидання інтерфейсу
function resetTimerUI() {
    clearInterval(timerInterval);
    isRunning = false;
    totalSeconds = 0;
    btnStart.disabled = false;
    btnPause.disabled = true;
    statusBadge.textContent = 'Очікування';
    statusBadge.className = 'badge';
    updateDisplay();
}

// Скидання до значень з інпутів
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    const mins = parseInt(inputMinutes.value, 10) || 0;
    const secs = parseInt(inputSeconds.value, 10) || 0;
    totalSeconds = (mins * 60) + secs;
    initialSeconds = totalSeconds;
    
    btnStart.disabled = false;
    btnPause.disabled = true;
    statusBadge.textContent = 'Очікування';
    statusBadge.className = 'badge';
    updateDisplay();
}

// Обробка GET-параметрів URL (?time=..., ?repeat=..., ?autostart=..., ?msg=...)
function parseQueryParams() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('time')) {
        const timeParam = parseInt(params.get('time'), 10) || 0;
        inputMinutes.value = Math.floor(timeParam / 60);
        inputSeconds.value = timeParam % 60;
    }
    if (params.has('msg')) {
        notificationText.value = params.get('msg');
    }
    if (params.has('repeat')) {
        repeatMode.checked = params.get('repeat') === '1' || params.get('repeat') === 'true';
    }

    resetTimer();

    if (params.has('autostart') && (params.get('autostart') === '1' || params.get('autostart') === 'true')) {
        startTimer();
    }
}

// Слухачі подій
btnStart.addEventListener('click', startTimer);
btnPause.addEventListener('click', pauseTimer);
btnReset.addEventListener('click', resetTimer);

[inputMinutes, inputSeconds].forEach(input => {
    input.addEventListener('input', () => {
        if (!isRunning) resetTimer();
    });
});

// Ініціалізація
parseQueryParams();