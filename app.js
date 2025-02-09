import Player from './classes/player.js';
import Button from './classes/button.js';
import Enemy from './classes/enemy.js';
import Bullet from './classes/bullet.js';
export { keysPressed, ctx, canvas, player };

let player;
let button;
let bullet;

let keysPressed = [];

let canvas = document.getElementById("game")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d')

function getMousePositionX(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;

    return x;
}

function getMousePositionY(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    let y = e.clientY - rect.left;

    return y;
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

    if (bullets) {
        bullets.forEach(bullet => {
            bullet.update();
        });
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

window.addEventListener("click", (e) => {
    let bulletX = player.x;
    if (player.image.src.includes('PlayerFaceRight.png')) {
        bulletX += 75;
    } else if (player.image.src.includes('PlayerFaceLeft.png')) {
        bulletX += 25;
    }
    bullets.push(new Bullet(bulletX, player.y + 20, getMousePositionX(canvas, e), getMousePositionY(canvas, e), 10, 200));
    console.log(bullets);
});