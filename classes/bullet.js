import { ctx } from '../app.js';

export default class Bullet {
    constructor(x, y, directionX, directionY, speed, range) {
        this.x = x;
        this.y = y;
        this.directionX = directionX - x;
        this.directionY = directionY - y;
        this.speed = speed;
        this.range = range;
        this.distanceTraveled = 0;

        const length = Math.sqrt(this.directionX ** 2 + this.directionY ** 2); //copilot
        this.directionX /= length; //copilot
        this.directionY /= length; //copilot
    }

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, 10, 10);
    }

    update() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
        this.distanceTraveled += this.speed;

        if (this.distanceTraveled < this.range) {
            this.draw();
        }
    }
}