
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    // if (e.keyCode == '38') {
    //     // up arrow
    //     moveup();
    // }

    if (e.keyCode == '40') {
        // down arrow
        movedown();
    }
    else if (e.keyCode == '37') {
        // left arrow
        moveleft();
    }
    else if (e.keyCode == '39') {
        // right arrow
        moveright();
    }

}

var myGamePiece;

function startGame() {
    myGamePiece = new component(40, 40, "darkorange", 200, 0, 1);
    myGameArea.start();
}

function addNextPiece() {
    myGamePiece = new component(40, 40, "blue", 200, 0, 1);
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 400;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        document.getElementById("playarea").appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 40);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, state) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 1;
    this.x = x;
    this.y = y;
    this.state = state;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        if (this.y + this.speedY !== 760) {
            this.y += this.speedY;
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

// function moveup() {
//     if (myGamePiece.y !== 0) {
//         myGamePiece.y -= 30;
//     }
// }

function movedown() {
    if (myGamePiece.y + myGamePiece.height < 760 && myGamePiece.state) {
        myGamePiece.y += 40;
    }
    else {
        myGamePiece.y = 760;
        myGamePiece.state = 0;
        myGamePiece.speedY = 0;
        addNextPiece();
    }
}

function moveleft() {
    if (myGamePiece.x - myGamePiece.width >= 0 && myGamePiece.state) {
        myGamePiece.x -= 40;
    }
}

function moveright() {
    if (myGamePiece.x + myGamePiece.width <= 360 && myGamePiece.state) {
        myGamePiece.x += 40;
    }
}
startGame();
