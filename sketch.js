var balloon, balloonAnimation;
var bgImage;
var database;
var height = 0;

function preload(){

balloonAnimation = 
loadAnimation("images/image3.png", "images/image1.png", "images/image2.png");

bgImage = loadImage("images/bg.png");

}

function setup() {
  createCanvas(800,650);
  balloon = createSprite(150, 460, 50, 50);
  balloon.scale = 0.6;
  balloon.addAnimation("colors", balloonAnimation);
  database = firebase.database();
  console.log("Connected properly");

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(bgImage); 
  
  textSize(15);
  fill("black");
  text("Use arrow keys to move hot air balloon!", 15, 25);

  if(keyDown(LEFT_ARROW)){
    updatePosition(-10, 0);
    balloon.x = balloon.x-8;
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10, 0);
    balloon.x = balloon.x+8;
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0, -10);
    balloon.y = balloon.y-8;
    balloon.scale = balloon.scale-0.006;
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0, 10);
    balloon.y = balloon.y+8;
    balloon.scale = balloon.scale+0.006;
  }

  drawSprites();
}

function updatePosition(x,y){

  database.ref('balloon/height').update({

    'x': height.x + x,
    'y': height.y + y

  })

}

function readPosition(data){

  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;

}

function showError(){

  console.log("Error in writing to database");

}