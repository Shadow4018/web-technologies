let lamp = document.getElementById("lamp");
let toggleBtn = document.getElementById("toggle");
let typeBtn = document.getElementById("type");
let brightnessBtn = document.getElementById("brightness");

let isOn = false;
let timer;

// task 1
toggleBtn.onclick = () => {
  isOn = !isOn;

  lamp.classList.toggle("on", isOn);
  toggleBtn.textContent = isOn ? "Виключити" : "Включити";

  resetTimer();
};

// task 2
typeBtn.onclick = () => {
  let type = prompt("Введіть тип: normal / eco / led");

  lamp.classList.remove("eco", "led");

  if (type === "eco") lamp.classList.add("eco");
  if (type === "led") lamp.classList.add("led");

  resetTimer();
};

// task 3
brightnessBtn.onclick = () => {
  let value = prompt("Введіть яскравість (0-100)");

  if (value >= 0 && value <= 100 && isOn) {
    lamp.style.opacity = value / 100;
  }

  resetTimer();
};

// task 4
function resetTimer() {
  clearTimeout(timer);

  timer = setTimeout(() => {
    isOn = false;
    lamp.classList.remove("on");
    toggleBtn.textContent = "Включити";
  }, 5000); // 300'000
}