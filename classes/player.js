import { keysPressed } from '../app.js';

export default class Player {
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