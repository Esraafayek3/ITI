const text =
  `Welcome to the new tab! This message is typing character by character...`;
const msgDiv = document.getElementById("message");
let i = 0;

const typing = setInterval(() => {
  msgDiv.textContent += text[i];
  i++;
  if (i === text.length) 

    clearInterval(typing);
    setTimeout(() => {
         window.close();
    }, 4000);

}, 50);
