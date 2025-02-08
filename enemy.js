import { player } from './app.js';

export default class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image = new Image();
        this.image.src = img;
        this.updateDirection();
    }

    updateDirection() {
        if (player) {
            this.directionx = player.x - this.x;
            this.directiony = player.y - this.y;
        }
    }

    move() {
        this.x += this.directionx * this.speed;
        this.y += this.directiony * this.speed;
    }
}