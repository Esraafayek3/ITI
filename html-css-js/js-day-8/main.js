// task1
let input = document.querySelector("input");

let form = document.querySelector("form");

input.addEventListener("keydown", function (event) {
  alert("Key Code: " + event.keyCode);
});
input.addEventListener("mousedown", function (event) {
  let buttonName = "";
  if (event.button === 0) {
    buttonName = "Left Button";
  } else if (event.button === 1) {
    buttonName = "Middle Button";
  } else if (event.button === 2) {
    buttonName = "Right Button";
  }
  alert("Mouse Button: " + buttonName);
});

// task 2
let clockDiv = document.getElementById("clock");
let startBtn = document.getElementById("startBtn");
let timer;

startBtn.onclick = function () {
  alert("Clock Started");
  timer = setInterval(() => {
    clockDiv.textContent = new Date().toLocaleTimeString();
  }, 1000);
};

// Alt + W
document.addEventListener("keydown", function (e) {
  if (e.altKey && e.key.toLowerCase() === "w") {
    clearInterval(timer);
    alert("Clock stopped");
  }
});
startBtn.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "w") {
    alert("Key code: " + e.key);
    e.stopPropagation();
  }
});

// task3
letterBox.addEventListener("keydown", function (e) {
  if (e.key === "Backspace") {
    return;
  }

  if (!/^[a-zA-Z]$/.test(e.key)) {
    e.preventDefault();
  }
});
// task4
let images = [
  "images/shuffle-01.jpg",
  "images/shuffle-02.jpg",
  "images/shuffle-03.jpg",
  "images/shuffle-04.jpg",
];
let index = 0;

function showImage() {
  document.getElementById("gallery").src = images[index];
}

function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage();
}
// task5
let image = document.querySelectorAll("img");

image.forEach(function (img) {
  img.addEventListener("mouseover", function () {
    img.style.opacity = "0.3";
  });

  img.addEventListener("mouseout", function () {
    img.style.opacity = "1";
  });
});

// task6
const photos = document.querySelectorAll("img");

photos.forEach((img) => {
  img.addEventListener("contextmenu", (e) => {
    e.preventDefault(); 
  });
});

