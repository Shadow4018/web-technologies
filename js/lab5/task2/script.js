let red = document.querySelector(".red");
let yellow = document.querySelector(".yellow");
let green = document.querySelector(".green");
let status = document.getElementById("status");

let times = {
  red: 5000,
  yellow: 3000,
  green: 7000
};

let current = "red";
let timer;

// task 1 - 5
function setLight(color) {
  red.classList.remove("on");
  yellow.classList.remove("on");
  green.classList.remove("on");

  if (color === "red") red.classList.add("on");
  if (color === "yellow") yellow.classList.add("on");
  if (color === "green") green.classList.add("on");

  status.textContent = color;
}

// task 2 - 3
function startTrafficLight() {
  setLight(current);

  timer = setTimeout(() => {
    if (current === "red") current = "yellow";
    else if (current === "yellow") current = "green";
    else if (current === "green") {
      blinkYellow(3);
      return;
    }

    startTrafficLight();
  }, times[current]);
}

function blinkYellow(timesBlink) {
  let count = 0;

  let interval = setInterval(() => {
    yellow.classList.toggle("on");

    count++;
    if (count === timesBlink * 2) {
      clearInterval(interval);
      current = "red";
      startTrafficLight();
    }
  }, 500);
}

// task 4
document.getElementById("changeTime").onclick = () => {
  let r = prompt("Червоний (сек):");
  let y = prompt("Жовтий (сек):");
  let g = prompt("Зелений (сек):");

  if (r) times.red = r * 1000;
  if (y) times.yellow = y * 1000;
  if (g) times.green = g * 1000;
};

// task 6
document.getElementById("next").onclick = () => {
  clearTimeout(timer);

  if (current === "red") current = "yellow";
  else if (current === "yellow") current = "green";
  else current = "red";

  startTrafficLight();
};

startTrafficLight();