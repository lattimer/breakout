var canvas = document.getElementById("boCanvas");
var ctx = canvas.getContext("2d");

var xVel; 
var yVel; 
var xPos; 
var yPos; 
var boxArr = [];
var ballArr = [];
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
    drawBall();

    for (i = 0; i < ballArr.length; i++) {
        ballArr[i].xPos += ballArr[i].xVel;
        ballArr[i].yPos += ballArr[i].yVel;

        if (ballArr[i].xPos < 0 || ballArr[i].xPos > 640 ) {
            ballArr[i].xVel = -ballArr[i].xVel;
        }
        if (ballArr[i].yPos < 0) {
            ballArr[i].yVel = -ballArr[i].yVel;
        }
        if (ballArr[i].yPos > 480) {
            ballArr[i].xVel = (Math.floor(Math.random() * 12)) - 6,
            ballArr[i].yVel = (Math.floor(Math.random() * 12)) - 6,
            ballArr[i].xPos = (Math.floor(Math.random() * 630)) + 1,
            ballArr[i].yPos = 40
        }
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
    
    for (j = 0; j < ballArr.length; j++) {
        for (i = 0; i < boxArr.length; i++) {
            if ((((ballArr[j].xPos + 5) > boxArr[i].xl) && ((ballArr[j].xPos - 5) < (boxArr[i].xl + 40)) && (ballArr[j].yPos > boxArr[i].yl) && (ballArr[j].yPos < (boxArr[i].yl + 20))) && boxArr[i].isActive) {
                ballArr[j].xVel = -ballArr[j].xVel;
                boxArr[i].isActive = false;
            } else if (((ballArr[j].xPos > boxArr[i].xl) && (ballArr[j].xPos < (boxArr[i].xl + 40)) && ((ballArr[j].yPos + 5) > boxArr[i].yl) && ((ballArr[j].yPos - 5) < (boxArr[i].yl + 20))) && boxArr[i].isActive) {
                ballArr[j].yVel = -ballArr[j].yVel;
                boxArr[i].isActive = false;
            }
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
    for (var i = 0; i < ballArr.length; i++) {
        if ((ballArr[i].xPos > xPad) && (ballArr[i].xPos < (xPad + xPadSize)) && ((ballArr[i].yPos + 5) > yPad) && ((ballArr[i].yPos - 5) < (yPad + yPadSize))) {
            ballArr[i].yVel = -ballArr[i].yVel;
            if (rightPressed) {
                ballArr[i].xVel += 2;
            }
            if (leftPressed) {
                ballArr[i].xVel -= 2;
            }
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

function initBall(n) {
    for (i = 0; i < n; i ++) {
        ball = {
            xVel: (Math.floor(Math.random() * 12)) - 6,
            yVel: (Math.floor(Math.random() * 12)) - 6,
            xPos: (Math.floor(Math.random() * 630)) + 1,
            yPos: 40
        }
        ballArr.push(ball);
    }
}

function drawBall() {
    for (i = 0; i < ballArr.length; i++) {
        ctx.beginPath();
        ctx.arc(ballArr[i].xPos, ballArr[i].yPos, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
initBall(5);
initBoxes(30);
var drawID = setInterval(draw, 17);

