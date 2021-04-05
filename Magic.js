//Saving the reference of the Canvas element.
var canvas = document.querySelector("canvas");

//Definition of the Canvas size.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

//Creates the mouse object.
var mouse = {
  x: undefined,
  y: undefined,
};

//Adds the mousemove event.
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

var squareArray = [];
var colorArray = ["#F2E96B", "#A67C2E", "#593E1C", "#A68D6F", "#F2A25C"];

//Keeps the parameters for drawing the squares.
function Square(x, y, speedX, speedY, size, color) {

  this.x = x; 
  this.y = y; 
  this.size = size; 
  this.speedX = speedX; 
  this.speedY = speedY; 
  this.color = color; 

  //Draws the square on the Canvas.
  this.draw = function () {

    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.size, this.size);
  }; 
  //Updates the square's position.
  this.move = function () {
    
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;

    //Checks if the object reach the canvas's limits.
    if (this.x + 80 >= canvas.width || this.x <= 0) {
      this.speedX = -this.speedX;
    }

    if (this.y + 80 >= canvas.height || this.y <= 0) {
      this.speedY = -this.speedY;
    }

    //Checks if some element is near to the mouse cursor.
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {

      //The square's size increases if it's in a 15 pixel range from the mouse cursor. 
      while (this.size < 15) this.size++;
    }

      //The square's size decreases if the distance between it and the mouse cursor increase.
    if (this.size > 0) this.size -= 0.5;

    this.draw();
  };
}
function createSquares() {
  for (j = 0; j < 2000; j++) {
    squareArray.push(
      new Square(
        Math.random() * 80, //positionX
        Math.random() * 80, //positionY
        Math.random() * 5, //square's size
        Math.random() * 5, //vertical movement speed
        Math.random() * 5, //horizontal movement speed
        colorArray[Math.floor(Math.random() * 5)] //colors to be used -> refers to the colorArray.
      )
    );
  }
}

//Starts the animation.
function animate() {
  requestAnimationFrame(animate);

  //Clears the square inside the Canvas.
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  //Assign elements for the squareArray.
  for (b = 0; b < squareArray.length; b++) {
    squareArray[b].move();
  }
}

createSquares();
animate();
