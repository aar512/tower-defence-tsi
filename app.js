import Player from './classes/player.js';
import Button from './classes/oneTimeUseButton.js';
import Enemy from './classes/enemy.js';
import Bullet from './classes/bullet.js';
export { keysPressed, ctx, canvas, player, bullets };

let player;
let keysPressed = [];

let canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

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
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 2000, 2000);

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

    if (enemies) {
        enemies.forEach(enemy => {
            enemy.update();
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
    let bulletY = player.y;
    if (player.image.src.includes('PlayerFaceRight.png')) {
        bulletX += 75;
        bulletY += 20;
    } else if (player.image.src.includes('PlayerFaceLeft.png')) {
        bulletX += 25;
        bulletY += 20;
    }

    bullets.push(new Bullet(bulletX, bulletY + 20, getMousePositionX(canvas, e), getMousePositionY(canvas, e), 10, 200));
    console.log(bullets);
});

let enemies = [];
setInterval(() => {
    enemies.push(new Enemy(100, 100, 1, 'enemy1.png'));
    console.log(enemies);
}, 1000);

