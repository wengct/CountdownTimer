const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start');
const fullscreenButton = document.getElementById('fullscreen');
const minutesInput = document.getElementById('minutes');
const colorSelect = document.getElementById('color');

let countdown;
let remainingTime;
let isFullscreen = false;

function drawClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, 0, 2 * Math.PI);
    ctx.stroke();

    for (let i = 0; i < 60; i++) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((i * 6) * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(0, -canvas.width / 2 + 10);
        ctx.lineTo(0, -canvas.width / 2 + 20);
        ctx.stroke();
        ctx.restore();
    }

    for (let i = 0; i < 12; i++) {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((i * 30) * Math.PI / 180);
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(i * 5, 0, -canvas.width / 2 + 30);
        ctx.restore();
    }
}

function startCountdown() {
    const minutes = parseInt(minutesInput.value);
    const color = colorSelect.value;
    remainingTime = minutes * 60;

    countdown = setInterval(() => {
        remainingTime--;
        if (remainingTime <= 0) {
            clearInterval(countdown);
        }
        updateClock(color);
    }, 1000);
}

function updateClock(color) {
    drawClock();
    const angle = (remainingTime / (parseInt(minutesInput.value) * 60)) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, -Math.PI / 2, -Math.PI / 2 + angle, true);
    ctx.fillStyle = color;
    ctx.fill();
}

function toggleFullscreen() {
    if (!isFullscreen) {
        document.documentElement.requestFullscreen();
        document.body.classList.add('fullscreen');
    } else {
        document.exitFullscreen();
        document.body.classList.remove('fullscreen');
    }
    isFullscreen = !isFullscreen;
}

startButton.addEventListener('click', startCountdown);
fullscreenButton.addEventListener('click', toggleFullscreen);

drawClock();
