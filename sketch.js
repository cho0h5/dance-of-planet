const G = 30000;

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  sub(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  mul(length) {
    return new Vector(this.x * length, this.y * length);
  }

  magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  unit() {
    let mag = this.magnitude();
    return new Vector(this.x / mag, this.y / mag);
  }
}

class Ball {
  constructor(mass, position, velocity) {
    this.mass = mass;
    this.r = Math.sqrt(this.mass * 100);

    this.position = position;
    this.velocity = velocity;
  }

  draw() {
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }

  update(force) {
    this.acceleration = force.mul(1 / this.mass);

    this.velocity = this.velocity.add(this.acceleration.mul(deltaTime / 1000));
    this.position = this.position.add(this.velocity.mul(deltaTime / 1000));
  }
}

let ball1 = new Ball(1, new Vector(200, 100), new Vector(200, 0));
let ball2 = new Ball(100, new Vector(200, 200), new Vector(3, 5));

let balls = [ball1, ball2];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
  noStroke();
}

function draw() {
  background(20);

  for (let i = 0; i < balls.length - 1; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      let distance = balls[j].position.sub(balls[i].position);

      let gravity = distance
        .unit()
        .mul(
          (G * balls[i].mass * balls[j].mass) /
            Math.pow(distance.magnitude(), 2)
        );

      balls[i].update(gravity);
      balls[j].update(gravity.mul(-1));
    }
  }

  balls.forEach((ball) => ball.draw());
}

let startX = 0;
let startY = 0;
let startTime = 0;

function mousePressed() {
  locked = false;

  startX = mouseX;
  startY = mouseY;
  startTime = millis()
}

function mouseReleased() {
  let velocity = new Vector(startX - mouseX, startY - mouseY).mul(0.3);
  let position = new Vector(startX, startY);
  let mass = (millis() - startTime) / 1000;

  let newBall = new Ball(mass, position, velocity);

  balls.push(newBall);
}
