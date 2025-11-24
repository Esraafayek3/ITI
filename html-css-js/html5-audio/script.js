var audio = document.querySelector("audio");
var volumeRange = document.getElementById("volume");
var seekRange = document.querySelector("#seek");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var stop = document.getElementById("stop");
var muted = document.getElementById("muted");
var next = document.getElementById("next");
var prev = document.getElementById("prev");

let currentIndex = 0;
const imgElement = document.querySelector(".image img");
const textElement = document.querySelector(".seek p");

var array = [
  {
    image: "images/WhatsApp Image 2025-08-12 at 2.37.19 PM.jpeg",
    sound: "audio/Amir Eid Metkatef Karaoke _ أمير عيد متكتف كاريوكي.mp4",
    text: "metkatef",
  },
  {
    image: "images/WhatsApp Image 2025-08-12 at 2.37.20 PM (1).jpeg",
    sound: "audio/Cairokee - Basrah w Atoh كايروكي - بسرح واتوه.mp4",
    text: "Basrah w Atoh",
  },
  {
    image: "images/WhatsApp Image 2025-08-12 at 2.37.20 PM.jpeg",
    sound:
      "audio/Iframe Cairokee - Ana Negm كايروكي - أنا نجم [sP7us95DFxE].mp3",
    text: "Ana Negm",
  },
];

window.addEventListener("load", function () {
  console.dir(audio);
  seekRange.setAttribute("max", audio.duration);
});

play.addEventListener("click", function () {
  audio.play();
});

pause.addEventListener("click", function () {
  audio.pause();
});

stop.addEventListener("click", function () {
  audio.currentTime = 0;
  seekRange.value = 0;
  audio.pause();
});

muted.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muted.innerHTML = audio.muted
    ? '<i class="fa-solid fa-volume-xmark"></i>'
    : '<i class="fa-solid fa-volume-high"></i>';
});

volumeRange.addEventListener("input", function () {
  audio.volume = volumeRange.value;

  if (audio.volume === 0) {
    muted.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else {
    muted.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }
});

seekRange.addEventListener("change", function () {
  audio.currentTime = seekRange.value;
});

next.addEventListener("click", function () {
  currentIndex++;

  if (currentIndex >= array.length) {
    currentIndex = 0;
  }

  imgElement.src = array[currentIndex].image;

  textElement.textContent = array[currentIndex].text;

  audio.src = array[currentIndex].sound;
  audio.play();
});

prev.addEventListener("click", function () {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = array.length - 1;
  }

  imgElement.src = array[currentIndex].image;
  textElement.textContent = array[currentIndex].text;

  audio.src = array[currentIndex].sound;
  audio.play();
});
