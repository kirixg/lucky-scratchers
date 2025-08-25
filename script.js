// Получаем элемент canvas и его 2D-контекст для рисования
const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');

// Массив с возможными результатами
const prizes = ["🎉 Ты выиграл 100 монет! 🎉", "😞 Повезёт в следующий раз. 😞"];

// Устанавливаем размер канваса (для мобильных устройств)
canvas.width = 300;
canvas.height = 200;

let isDrawing = false; // Флаг, который показывает, "стирает" ли пользователь сейчас

// Функция, которая рисует "защитный слой"
function drawCover() {
    ctx.fillStyle = '#bdc3c7'; // Серый цвет
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Рисуем защитный слой при загрузке
drawCover();

// Рисуем случайный результат под защитным слоем
function drawResult() {
    const result = prizes[Math.floor(Math.random() * prizes.length)];
    ctx.font = '24px Arial';
    ctx.fillStyle = '#27ae60';
    ctx.textAlign = 'center';
    ctx.fillText(result, canvas.width / 2, canvas.height / 2);
}

// Запускаем отрисовку результата сразу
drawResult();

// Функция для стирания
function scratch(e) {
    if (!isDrawing) return;

    // Получаем координаты курсора относительно канваса
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Устанавливаем режим "ластика"
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}

// События для мыши
canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', scratch);

// События для сенсорного экрана (мобильные устройства)
canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    e.preventDefault(); // Предотвращаем прокрутку страницы
});
canvas.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    scratch({ clientX: touch.clientX, clientY: touch.clientY });
});