import { player, ctx } from '../app.js';

export default class Enemy {
    constructor(x, y, speed, img) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.img = new Image();
        this.img.src = img;
        this.updateDirection();
    }

    updateDirection() {
        if (player) {
            this.directionX = player.x - this.x;
            this.directionY = player.y - this.y;

            let length = Math.sqrt(this.directionX * this.directionX + this.directionY * this.directionY);
            this.directionX /= length;
            this.directionY /= length;
        }
    }

    move() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
    }

    update() {
        this.updateDirection();
        this.move();
        this.draw();
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2, 100, 60);
        ctx.restore();
    }
}