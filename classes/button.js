import { ctx, canvas } from '../app.js'

export default class Button {

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