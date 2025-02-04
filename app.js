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

//niedokonca wiem co sie tu dzieje ale buja
class button {
    constructor(x, y, width, height, color, text) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.text = text
    }

    draw() {
        //wyglad
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        //ramka
        ctx.strokeRect(this.x, this.y, this.width, this.height)
        //napis
        ctx.fillStyle = 'black'
        ctx.textAlign = 'center'
        ctx.font = '20px Arial'
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2 + 5)
    }

    addClickListener(callback) {
        addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
                callback();
            }
        });
    }
}

let keysPressed = [];

class Player {
    constructor(x, y, img) {
        this.x = x
        this.y = y
        this.image = new Image();
        this.image.src = img;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, 200, 200);
    }

    move() {
        const speed = 5;
        if (keysPressed['w']) {
            this.y -= speed;
        }
        if (keysPressed['s']) {
            this.y += speed;
        }
        if (keysPressed['a']) {
            this.x -= speed;
        }
        if (keysPressed['d']) {
            this.x += speed;
        }
    }
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
    let startButton = new button((canvas.width - buttonWidth) / 2, 250, buttonWidth, buttonHeight, 'gray', 'Start Game');

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

    bullets.forEach(element => {
        element.update();
    });
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