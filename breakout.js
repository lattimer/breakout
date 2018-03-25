var canvas = document.getElementById("boCanvas");
var ctx = canvas.getContext("2d");

var xVel; 
var yVel; 
var xPos; 
var yPos; 
var boxArr = [];
var xPad = 100;
var yPad = 440;
var xPadSize = 100;
var yPadSize = 10;
var rightPressed = false;
var leftPressed = false;

// ctx.beginPath();
// ctx.rect(40,40, 40, 40);
// ctx.fillStyle ="#FFFFFF";
// ctx.fill();
// ctx.closePath();

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(xPos, yPos, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();

    xPos += xVel;
    yPos += yVel;

    if (xPos < 0 || xPos > 640 ) {
        xVel = -xVel;
    }
    if (yPos < 0) {
        yVel = -yVel;
    }
    if (yPos > 480) {
        initBall();
    }
    drawBox();  
    drawPaddle();      
}

function drawBox() {
    ctx.beginPath();
    for (i = 0; i < boxArr.length; i++) {
        if (boxArr[i].isActive) {
            ctx.rect(boxArr[i].xl, boxArr[i].yl, 40, 20);
        }
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
    }
    ctx.closePath();
    
    for (i = 0; i < boxArr.length; i++) {
        if ((((xPos + 5) > boxArr[i].xl) && ((xPos - 5) < (boxArr[i].xl + 40)) && (yPos > boxArr[i].yl) && (yPos < (boxArr[i].yl + 20))) && boxArr[i].isActive) {
            xVel = -xVel;
            boxArr[i].isActive = false;
        }
        if (((xPos > boxArr[i].xl) && (xPos < (boxArr[i].xl + 40)) && ((yPos + 5) > boxArr[i].yl) && ((yPos - 5) < (boxArr[i].yl + 20))) && boxArr[i].isActive) {
            yVel = -yVel;
            boxArr[i].isActive = false;
        }

    }
    
}

function drawPaddle() {
    if (rightPressed && xPad + xPadSize < 640) {
        xPad += 5;
    }
    if (leftPressed && xPad > 0) {
        xPad -= 5;
    }
    if ((xPos > xPad) && (xPos < (xPad + xPadSize)) && ((yPos + 5) > yPad) && ((yPos - 5) < (yPad + yPadSize))) {
        yVel = -yVel;
        if (rightPressed) {
            xVel += 2;
        }
        if (leftPressed) {
            xVel -= 2;
        }
    }
    ctx.beginPath();
    ctx.rect(xPad, yPad, xPadSize, yPadSize);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function initBoxes(n) {

    for (i = 0; i < n; i++) {
        var box = {
            xl: (Math.floor(Math.random() * 600)),
            yl: (Math.floor(Math.random() * 460)),
            isActive: true
        }
        boxArr.push(box);
    }
}

function keyDownHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = true;
    }
    else if (event.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = false;
    }
    else if (event.keyCode == 37) {
        leftPressed = false;
    }
}

function initBall() {
    xVel = (Math.floor(Math.random() * 12)) - 6;
    yVel = (Math.floor(Math.random() * 12)) - 6;
    xPos = 40;
    yPos = 40;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
initBall();
initBoxes(30);
var drawID = setInterval(draw, 17);

