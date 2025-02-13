export default class TurretMenu {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

     addClickListener(callback) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            this.clicked = true;
            callback();
        }
    }
}