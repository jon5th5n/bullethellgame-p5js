class Player {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }

    display() {
        screen.fill(20, 120, 200)
        screen.stroke(20, 120, 200)

        screen.ellipse(this.x, this.y, this.size)
    }

    move() {
        if(keys['a'] || keys['ArrowLeft']) {
            this.x -= this.speed;
        }
        if(keys['d'] || keys['ArrowRight']) {
            this.x += this.speed;
        }

        if(mouseIsPressed) {
            if(map(mouseX, 0, width, 0, screen.width) < screen.width/2) this.x -= this.speed;
            else this.x += this.speed;
        }

        if(this.x - this.size/2 < 0) this.x = this.size/2;
        if(this.x + this.size/2 > screen.width) this.x = screen.width - this.size/2;
    }
}