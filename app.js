let canvas = document.getElementById("game")
canvas.width = 1200
canvas.height = 800

let ctx = canvas.getContext('2d')

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

function startMenu() {
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, 1200, 800)

    let buttonWidth = 500;
    let buttonHeight = 50;
    let startButton = new button((canvas.width - buttonWidth) / 2, 250, buttonWidth, buttonHeight, 'gray', 'Start Game');

    startButton.draw();

    startButton.addClickListener(() => {
        console.log('123');
    });
}

startMenu();