class Bullet {
    constructor(z) {
        this.x = random(0, width);
        this.y = random(-height, -50);

        this.size = map(z, 0, 100, 15, 50);
        this.speed = map(z, 0, 100, 10, 5);
    }

    display() {
        fill(230, 170, 30);
        stroke(230, 170, 30);

        this.y += this.speed;

        ellipse(this.x, this.y, this.size);


        if(this.y - this.size/2 > height) {
            score += 1;
            print(score); // <----------- just for testing purpose

            this.x = random(0, width);
            this.y = random(-height, -50)
        }
    }
}