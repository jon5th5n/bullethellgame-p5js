class Player {
    constructor(x, y, size, speed, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.color = color;

        this.isMoving = false;
    }

    display() {
        screen.fill(this.color);
        screen.noStroke();

        screen.ellipse(this.x, this.y, this.size);
    }

    move() {
        this.isMoving = false;

        if(keys['a'] || keys['ArrowLeft']) {
            this.x -= this.speed;
            this.isMoving = true;
        }
        if(keys['d'] || keys['ArrowRight']) {
            this.x += this.speed;
            this.isMoving = true;
        }

        if(mouseIsPressed) {
            if(map(mouseX, 0, width, 0, screen.width) < screen.width/2) this.x -= this.speed;
            else this.x += this.speed;
            this.isMoving = true;
        }

        if(this.x - this.size/2 < 0) this.x = this.size/2;
        if(this.x + this.size/2 > screen.width) this.x = screen.width - this.size/2;
    }
}