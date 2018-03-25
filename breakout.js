var canvas = document.getElementById("boCanvas");
var ctx = canvas.getContext("2d");

var xVel = (Math.floor(Math.random() * 12)) - 6;
var yVel = (Math.floor(Math.random() * 12)) - 6;
var xPos = 40;
var yPos = 40;
var boxArr = [];

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
    if (yPos < 0 || yPos > 480) {
        yVel = -yVel;
    }
    drawBox();        
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

initBoxes(100);
setInterval(draw, 17);

