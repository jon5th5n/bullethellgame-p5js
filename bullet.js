class Bullet {
    constructor(z, color) {
        this.x = random(0, screen.width);
        this.y = random(-screen.height, -50);

        this.size = map(z, 0, 100, 15, 50);
        this.speed = map(z, 0, 100, 10, 5);

        this.color = color;
    }

    display() {
        screen.fill(this.color);
        screen.noStroke();

        this.y += this.speed * speedMultiplier;

        screen.ellipse(this.x, this.y, this.size);


        if(this.y - this.size/2 > screen.height) {
            score += 1;

            this.x = random(0, screen.width);
            this.y = random(-screen.height, -50)
        }
    }
}