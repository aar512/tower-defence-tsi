import Player from './classes/player.js';
import Button from './classes/button.js';
export { keysPressed, ctx, canvas };


let player;
let button;

let keysPressed = [];

let canvas = document.getElementById("game")
canvas.width = 1200
canvas.height = 800

let ctx = canvas.getContext('2d')

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

class bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.direction = 90;
        this.speed = 10;
        this.limit = 200; //kiedys dodam wybor broni i zamieni sie to na range
    }

    draw() {
        ctx.rect(this.x, this.y, 100, 100);
        ctx.fillStyle = 'black';
    }

    update() {
        this.x += this.speed

        if (this.x >= this.limit) {
            this.draw()
        }
    }
}
function startMenu() {
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, 1200, 800)

    let buttonWidth = 500;
    let buttonHeight = 50;
    let startButton = new Button((canvas.width - buttonWidth) / 2, 250, buttonWidth, buttonHeight, 'gray', 'Start Game');

    startButton.draw();

    startButton.addClickListener(() => {
        player = new Player(400, 200, 'PlayerFaceLeft.png');
        gameLoop();
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (player) {
        player.move();
        player.draw(ctx);
    }

    requestAnimationFrame(gameLoop);
}

startMenu();

window.addEventListener("keydown", (e) => {
    keysPressed[e.key] = true;

    if (e.key === 'd') {
        player.image.src = 'PlayerFaceRight.png';
    }

    if (e.key === 'a') {
        player.image.src = 'PlayerFaceLeft.png';
    }
});

window.addEventListener("keyup", (e) => {
    keysPressed[e.key] = false;
});

let bullets = [];

window.addEventListener("keypress", (e) => {
    if (e.key === 'q') {
        bullets.push(new bullet(10, 10));
        console.log(bullets);
    }
});