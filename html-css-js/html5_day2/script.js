const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

context.beginPath();


context.moveTo(50, 50);
context.lineTo(120, 50); 
context.lineTo(120, 70);
context.lineTo(70, 70); 
context.lineTo(70, 90);
context.lineTo(110, 90); 
context.lineTo(110, 110);
context.lineTo(70, 110);
context.lineTo(70, 130);
context.lineTo(120, 130);
context.lineTo(120, 150);
context.lineTo(50, 150);
context.closePath(); 

context.fillStyle = "white";
context.fill();

context.strokeStyle = "black";
context.lineWidth = 4;
context.stroke();
