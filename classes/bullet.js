import { ctx, bullets } from '../app.js';

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

        this.angle = Math.atan2(directionY - y, directionX - x);
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = 'red';
        ctx.fillRect(-5, -5, 10, 10);
        ctx.restore();
    }

    update() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
        this.distanceTraveled += this.speed;

        if (this.distanceTraveled < this.range) {
            this.draw();
        }
        if (this.distanceTraveled > this.range) {
            bullets.shift();
        }
    }
}