// task 1
function updateDigitalClock() {
    let now = new Date();
    let hh = String(now.getHours()).padStart(2, '0');
    let mm = String(now.getMinutes()).padStart(2, '0');
    let ss = String(now.getSeconds()).padStart(2, '0');
    let blink = now.getSeconds() % 2 === 0 ? ':' : ' ';
    document.getElementById('clock').innerText = `${hh}${blink}${mm}${blink}${ss}`;
}
setInterval(updateDigitalClock, 500);

// task 2
let customCountdownTimer;
function startCustomCountdown() {
    clearInterval(customCountdownTimer);
    let targetVal = document.getElementById('timer-target').value;
    if (!targetVal) return alert("Введіть дату!");
    let targetDate = new Date(targetVal).getTime();

    customCountdownTimer = setInterval(() => {
        let now = new Date().getTime();
        let distance = targetDate - now;

        if (distance < 0) {
            clearInterval(customCountdownTimer);
            document.getElementById('timer-output').innerText = "Час вийшов!";
            return;
        }
        let d = Math.floor(distance / (1000 * 60 * 60 * 24));
        let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let s = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById('timer-output').innerText = `Залишилося: ${d}д ${h}г ${m}хв ${s}с`;
    }, 1000);
}

// task 3-4
function calculateBirthday() {
    let bdayVal = document.getElementById('bday-input').value;
    if (!bdayVal) return alert("Введіть дату народження!");
    
    let target = new Date(bdayVal);
    let now = new Date();
    
    // Встановлюємо поточний рік для дня народження
    target.setFullYear(now.getFullYear());
    if (now > target) {
        target.setFullYear(now.getFullYear() + 1); // Якщо вже пройшло цього року, беремо наступний
    }

    let diffMs = target.getTime() - now.getTime();
    
    let totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    let months = Math.floor(totalDays / 30);
    let days = totalDays % 30;
    let hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((diffMs % (1000 * 60)) / 1000);

    document.getElementById('bday-output').innerText = 
        `До дня народження: ${months} міс, ${days} днів, ${hours} год, ${mins} хв, ${secs} сек.`;
}