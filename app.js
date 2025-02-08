import Player from './classes/player.js';
import Button from './classes/button.js';
import Enemy from './enemy.js';
export { keysPressed, ctx, canvas, player };

let player;
let button;

let keysPressed = [];

let canvas = document.getElementById("game")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d')

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
    ctx.fillRect(0, 0, 2000, 2000)

    let buttonWidth = 500;
    let buttonHeight = 50;
    let startButton = new Button((canvas.width - buttonWidth) / 2, (canvas.height - buttonHeight) / 2, buttonWidth, buttonHeight, 'gray', 'Start Game');

    startButton.draw();

    startButton.addClickListener(() => {
        player = new Player(canvas.width / 2, canvas.height / 2, 'PlayerFaceLeft.png');
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