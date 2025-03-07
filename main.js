// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }
  Ball.prototype.gravity = function() {
    if(this.velY<8){
      this.velY += 0.05;
    }
  }
  Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const velX2 = balls[j].velX;
        const velY2 = balls[j].velY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          this.velX = this.velX - (2.0)*(Math.sqrt((this.velX-velX2)^2*(distance))/(distance*distance))/Math.sqrt(distance);
          this.velY = this.velY - (2.0)*(Math.sqrt((this.velY-velY2)^2*(distance))/(distance*distance))/Math.sqrt(distance);
          // balls[j].velX = balls[j].velX - (2.0)*(Math.sqrt((velX2-this.velX)^2*(distance))^2/(distance*distance))/-Math.sqrt(distance);
          // balls[j].velY = balls[j].velY - (2.0)*(Math.sqrt((velY2-this.velY)^2*(distance))^2/(distance*distance))/-Math.sqrt(distance);
          // balls[j].velX = balls[j].velX - (2.0)*(Math.sqrt(velX2-this.velX)^2*(-distance)^2/(distance*distance))/-distance;
          // balls[j].velY = balls[j].velY - (2.0)*(Math.sqrt(velX2-this.velY)^2*(-distance)^2/(distance*distance))/-distance;
        }
      }
    }
  }
}

let balls = [];

while (balls.length < 25) {
  let size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].gravity();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();