var canvas;
var gc;
var OxRight;
var OxLeft;
var Boss;
var sl;
var plat;
var OxX = 0;
var OxY = 650;
var OxWidth = 25;
var goingRight = false;
var goingLeft = false;
var left = false;
var right = true;
var jumping = false;
var grav = 10;
var OxWalkRight;
var OxWalkLeft;
var sHeight = 50;
var sWidth = 50;
var cFrame = 0;
var tFrame = 8;
var collide = false;
var falling = true;
var platformArrey = [];
var platform;
var soulArrey = [];
var soul;
var collect = false;
var fallSpeed;
var numberOfSouls = 0;
var spikesArrey = [];
var spike;
var activeSpike = false;
var n;
var fallingSpikes = [];
var gameOver = false;
var numberOfSoulsNeeded;
var theEnd = false;
var spikeImg;
var brokenSpikeImg;


$( document ).ready(function() {


    canvas = $("#myCanvas")[0];
    OxRight = $("#OxImgRight")[0];
    OxLeft = $("#OxImgLeft")[0];
    OxWalkRight = $("#OxWalkRightImg")[0];
    OxWalkLeft = $("#OxWalkLeftImg")[0];
    Boss = $("#bossImg")[0];
    plat = $("#Platform")[0];
    sl = $("#Soul")[0];
    spikeImg = $("#Spike")[0];
    brokenSpikeImg = $("#brokenSpike")[0];
    gc = canvas.getContext("2d");
    $(document).keydown(keyDownHandler);
    $(document).keyup(keyUpHandler);
    gc.drawImage(Boss, canvas.width - Boss.width, canvas.height-Boss.height);
    stopRight();
    window.setInterval(render,10);

    platformArrey.push({x: 250, y: 625, width: 250, height: 35, color: "#000"});
    platformArrey.push({x: 450, y: 550, width: 250, height: 35, color:"#000"});
    platformArrey.push({ x: 300, y: 450, width: 250, height: 35, color:"#000"});
    platformArrey.push({ x: 700, y: 450, width: 250, height: 35, color:"#000"});
    platformArrey.push({ x: 1050, y: 450, width: 250, height: 35, color:"#000"});
    platformArrey.push({x: 200, y: 350, width: 250, height: 35, color:"#000"});
    platformArrey.push({x: 1300, y: 350, width: 250, height: 35, color:"#000"});
    platformArrey.push({x: 1330, y: 250, width: 250, height: 35, color:"#000"});
    platformArrey.push({x: -40, y: 350, width: 250, height: 35, color:"#000"});
    platformArrey.push({x: 1000, y: 230, width: 250, height: 35, color:"#000"});
    platformArrey.push({x: 800, y: 180, width: 250, height: 35, color:"#000"});
    platformArrey.push({x: 710, y: 180, width: 20, height: 35, color:"#000"});
    platformArrey.push({x: 400, y: 180, width: 250, height: 35, color:"#000"});

    soulArrey.push({x: 265, y: 600, width: 5, height: 5, color: "#199"});
    soulArrey.push({x: 370, y: 600, width: 5, height: 5, color: "#199"});
    soulArrey.push({x: 470, y: 525, width: 5, height: 5, color: "#199"});
    soulArrey.push({x: 650, y: 525, width: 5, height: 5, color: "#199"});
    soulArrey.push({x: 400, y: 425, width: 5, height: 5, color: "#199"});
    soulArrey.push({x: 20, y: 325, width: 5, height: 5, color: "#199"});
    soulArrey.push({x: 0, y: 325, width: 5, height: 5, color: "#199"});
    soulArrey.push({x: 300, y: 325, width: 5, height: 5, color: "#199"});
    soulArrey.push({x: 405, y: 155, width: 5, height: 5, color: "#199"});
    soulArrey.push({x: 425, y: 155, width: 5, height: 5, color: "#199"});
    soulArrey.push({x: 445, y: 155, width: 5, height: 5, color: "#199"});
    soulArrey.push({x: 740, y: 105, width: 5, height: 5, color: "#199"});


    numberOfSoulsNeeded = soulArrey.length;

    //0 - ground level
    //1 - platform.y = 625
    //2 - platform.y = 550
    //3 - platform.y = 450
    //4 - platform.y = 350
    //5 - platform.y = 250 - 230
    //6 - platform.y = 180

    //0 - ground level
    spikesArrey.push({x: 750, y: 0, width: 30, height: 35, color: "#900", level: 0, imgUsed: spikeImg, spikeSpeed: 18});
    spikesArrey.push({x: 675, y: 0, width: 30, height: 35, color: "#900", level: 0, imgUsed: spikeImg, spikeSpeed: 18});
    spikesArrey.push({x: 560, y: 0, width: 30, height: 35, color: "#900", level: 0, imgUsed: spikeImg, spikeSpeed: 18});
    spikesArrey.push({x: 1025, y: 0, width: 30, height: 35, color: "#900", level: 0, imgUsed: spikeImg, spikeSpeed: 18});
    spikesArrey.push({x: 975, y: 0, width: 30, height: 35, color: "#900", level: 0, imgUsed: spikeImg, spikeSpeed: 18});
    spikesArrey.push({x: 1230, y: 0, width: 30, height: 35, color: "#900", level: 0, imgUsed: spikeImg, spikeSpeed: 18});
    //4 - platform.y = 350
    spikesArrey.push({x: 100, y: 0, width: 30, height: 35, level: 4, imgUsed: spikeImg, spikeSpeed: 9});
    spikesArrey.push({x: 120, y: 0, width: 30, height: 35, level: 4, imgUsed: spikeImg, spikeSpeed: 9});
    spikesArrey.push({x: 140, y: 0, width: 30, height: 35, level: 4, imgUsed: spikeImg, spikeSpeed: 9});
    spikesArrey.push({x: 160, y: 0, width: 30, height: 35, level: 4, imgUsed: spikeImg, spikeSpeed: 9});
    spikesArrey.push({x: 180, y: 0, width: 30, height: 35, level: 4, imgUsed: spikeImg, spikeSpeed: 9});
    spikesArrey.push({x: 200, y: 0, width: 30, height: 35, level: 4, imgUsed: spikeImg, spikeSpeed: 9});
    spikesArrey.push({x: 220, y: 0, width: 30, height: 35, level: 4, imgUsed: spikeImg, spikeSpeed: 9});
    spikesArrey.push({x: 240, y: 0, width: 30, height: 35, level: 4, imgUsed: spikeImg, spikeSpeed: 9});
    spikesArrey.push({x: 260, y: 0, width: 30, height: 35, level: 4, imgUsed: spikeImg, spikeSpeed: 9});
    spikesArrey.push({x: 1330, y: 0, width: 30, height: 35, level: 4, imgUsed: spikeImg, spikeSpeed: 7});
    //5 - platform.y = 250 - 230
    spikesArrey.push({x: 1330, y: 0, width: 30, height: 35, level: 5, imgUsed: spikeImg, spikeSpeed: 5});

    $.confirm({
        title: 'Welcome to Ox\'s Adventure!',
        content: 'Use arrows to move and collect all the souls. Good luck!!! \n Press Ok or Enter to continue.',
        type: 'dark',
        columnClass: 'medium',
        typeAnimated: true,
        theme: 'dark',
        boxWidth: '50%',
        useBootstrap: false,
        font: "40px Arial",
        smoothContent: true,
        buttons: {
            ok: {
                text: "OK!",
                keys: ['enter']
            }
        }
    });


});

function render() {
    if (theEnd == false) {
        gc.clearRect(0, 0, canvas.width, canvas.height);

        gc.drawImage(sl, 1294, -11, 25*2.5, 37*2.5);
        gc.font = "20px Berkshire Swash";
        gc.fillStyle = "#000";
        gc.fillText("Souls:  " + numberOfSouls, 1260, 50);


        console.log("Ox X is " + OxX);
        console.log("Ox Y is " + OxY);

        testPlatform();
        drawSoul();
        checkSpikes();


        if (right) {
            if (goingRight) {
                GoRight();
            } else if (goingRight === false) {
                stopRight();
            }
        } else if (left) {
            if (goingLeft) {
                GoLeft();
            } else if (goingLeft === false) {
                stopLeft();
            }
        }

        if (jumping) {
            Jump();
            fallSpeed = 0;
        }
        if (falling) {
            Fall();
        }

        if (activeSpike) {
            spikeFall();
        }

        gc.drawImage(Boss, canvas.width - Boss.width, canvas.height - Boss.height);

        checkCollision();

        if (gameOver) {
            gc.beginPath();
            gc.rect(0, 0, canvas.width, canvas.height);
            gc.fillStyle = "#000";
            gc.fill();
            gc.closePath();
            gc.font = "200px Black And White Picture, sans serif"; //font-family: 'Black And White Picture', sans-serif;
            gc.fillStyle = "#089999";
            gc.fillText("Game Over", 300, 350);
            gc.font = "40px Black And White Picture, sans serif";
            gc.fillText("If you want to start over press the 'Try Again' button", 300, 440);
        }
    }
        TheEnd();

}

function GoRight() {
    if (OxY == canvas.height-sHeight || collide){
        gc.drawImage(OxWalkRight, cFrame * sWidth, 0, sWidth, sHeight, OxX, OxY, sWidth, sHeight);
        cFrame = (cFrame + 1) % tFrame;
    } else {
        gc.drawImage(OxWalkRight, 0, 0, sWidth, sHeight, OxX, OxY, sWidth, sHeight);
    }

    if (OxX < canvas.width-30) {
        OxX += 3;
    }
}

function GoLeft() {
    if (OxY == canvas.height - sHeight || collide){
        gc.drawImage(OxWalkLeft, cFrame*sWidth, 0, sWidth, sHeight, OxX, OxY, sWidth, sHeight);
        cFrame = (cFrame + 1) % tFrame
    } else {
        gc.drawImage(OxWalkLeft, 0, 0, sWidth, sHeight, OxX, OxY, sWidth, sHeight);
    }

    if (OxX > -30){
        OxX -= 3;
    }
}

function Jump() {
    if (right) {
        if (grav >= 0) {
            OxY -= grav;
            grav--;
            stopRight();
            falling = false;
        } else {
            jumping = false;
            falling = true;
        }
    } else if (left) {
        if (grav >= 0){
            OxY -= grav;
            grav--;
            stopLeft();
        } else {
            jumping = false;
            falling = true;
        }
    }
}

function Fall() {
    if (right){
        if (OxY < canvas.height - sHeight){
            OxY += fallSpeed * 0.5;
            fallSpeed++;
            stopRight();
        } else {
            OxY = canvas.height - sHeight;
        }
    }
    if (left){
        if (OxY < canvas.height - sHeight){
            OxY += fallSpeed * 0.5;
            fallSpeed++;
            stopLeft();
        } else {
            OxY = canvas.height - sHeight;
        }
    }
}

function stopRight() {
    gc.drawImage(OxWalkRight, 0, 0, sWidth, sHeight, OxX, OxY, sWidth, sHeight);

}

function stopLeft() {
    gc.drawImage(OxWalkLeft, 350, 0, sWidth, sHeight, OxX, OxY, sWidth, sHeight);
}

function keyDownHandler(event) {
    var key = event.which;

    switch (key){
        case 39:
            goingRight = true;
            right = true;
            left = false;
            break;
        case 37:
            goingLeft = true;
            right = false;
            left = true;
            break;
        case 38:
            if( collide == true || OxY == canvas.height - sHeight) {
                jumping = true;
                grav = 15;
            }
            break;
    }


}

function keyUpHandler(event) {
    var key = event.which;

    switch (key) {
        case 37:
            goingLeft = false;
            left = true;
            right = false;
            break;
        case 39:
            goingRight = false;
            right = true;
            left = false;
            break;
    }


}

function testPlatform() {

    for (var i = 0; i < platformArrey.length; i++) {
        platform = platformArrey[i];
        gc.drawImage(plat, platform.x, platform.y, platform.width, platform.height);
    }

}

function drawSoul(){

for (var z = 0; z < soulArrey.length; z++){
    soul = soulArrey[z];

    gc.drawImage(sl, soul.x, soul.y, sl.width, sl.height);


}
}

function drawSpikes(){

    gc.drawImage(spike.imgUsed, spike.x, spike.y, spike.width, spike.height);
}

function checkSpikes(){
    for (n = 0; n < spikesArrey.length; n++){
        spike = spikesArrey[n];

        if (spike.y + spike.height >= OxY
            && spike.x + 5 <= OxX + sWidth && spike.x + spike.width - 5 >= OxX && spike.y <= OxY + sHeight){
            gameOver = true;

        }
            if (spike.y == 0 && OxX + OxWidth > spike.x && OxX + OxWidth < spike.x + spike.width) {

                if (spike.level == 0 && OxY > 635){
                    activeSpike = true;
                    spike.imgUsed = brokenSpikeImg;
                    fallingSpikes.push(n);

                } else if (spike.level == 1 && OxY + sHeight <= 635 && OxY + sHeight > 560 ){
                    activeSpike = true;
                    spike.imgUsed = brokenSpikeImg;
                    fallingSpikes.push(n);
                } else if (spike.level == 2 && OxY + sHeight <= 560 && OxY + sHeight > 460){
                    activeSpike = true;
                    spike.imgUsed = brokenSpikeImg;
                    fallingSpikes.push(n);
                } else if (spike.level == 3 && OxY + sHeight <= 460 && OxY + sHeight > 360){
                    activeSpike = true;
                    spike.imgUsed = brokenSpikeImg;
                    fallingSpikes.push(n);
                } else if (spike.level == 4 && OxY + sHeight <= 360 && OxY + sHeight > 260){
                    activeSpike = true;
                    spike.imgUsed = brokenSpikeImg;
                    fallingSpikes.push(n);
                } else if (spike.level == 5 && OxY + sHeight <= 260 && OxY + sHeight > 190){
                    activeSpike = true;
                    spike.imgUsed = brokenSpikeImg;
                    fallingSpikes.push(n);
                } else if (spike.level == 6 && OxY + sHeight <= 190){
                    activeSpike = true;
                    spike.imgUsed = brokenSpikeImg;
                    fallingSpikes.push(n);
                }
            }
        drawSpikes();
    }



}

function spikeFall() {
    for (var l = 0; l < fallingSpikes.length; l++){
        var fallingSpikeN = spikesArrey[fallingSpikes[l]];
            if (fallingSpikeN.y <= canvas.height + 10) {
                fallingSpikeN.y += fallingSpikeN.spikeSpeed;
            }
        }
        }

function checkCollision() {

    for (var k = 0; k < platformArrey.length; k++){
        platform = platformArrey[k];
        if (OxX + OxWidth >= platform.x && OxX + OxWidth <= platform.x + platform.width
            && OxY + sHeight > platform.y + 5 && OxY + sHeight < platform.y + 10 + fallSpeed) {
            collide = true;
            falling = false;
            OxY = platform.y - sHeight + 10;
            break;
        } else {
            falling = true;
            collide = false;
        }
    }

    for(var s = 0; s < soulArrey.length; s++){

    soul = soulArrey[s];
    if (OxX + sWidth > soul.x + soul.width && OxX < soul.x && OxY < soul.y && OxY + sHeight > soul.y + soul.height) {
        collect = true;
        var pom = s;
        numberOfSouls++;
        break;
    } else {
        collect = false;
    }
    }
    if(collect){
        soulArrey.splice(pom, 1);
    }

}

function TheEnd() {
    //canvas.width - Boss.width, canvas.height-Boss.height
    if (numberOfSouls == numberOfSoulsNeeded && OxX + sWidth >= canvas.width - Boss.width && OxY >= canvas.height-Boss.height){
        theEnd = true;
        gc.beginPath();
        gc.rect(0, 0, canvas.width, canvas.height);
        gc.fillStyle = "#000";
        gc.fill();
        gc.font = "100px Black And White Picture, sans serif"; //font-family: 'Black And White Picture', sans-serif;
        gc.fillStyle = "#089999";
        gc.fillText("Congratulations!!!", 350, 300);
        gc.font = "50px Black And White Picture, sans serif";
        gc.fillText("You finished the game", 470, 400);
        gc.font = "30px Black And White Picture, sans serif";
        gc.fillText("Thank you for playing ^^", 530, 450);
    }
}

function tryAgain (){
    location.reload();
}

