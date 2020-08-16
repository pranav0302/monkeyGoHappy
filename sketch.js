//Global Variables

var jungle,jungle_background
var monkey,monkey_running,monkey_dizzy
var ground
var stoneImage,stoneGroup
var bananaImage,bananaGroup
var score
var gameover,gameoverImage
var restart,restartImage

var PLAY;
var END;
var gameState = PLAY;

var hitCount

function preload(){
  jungle_background = loadImage("jungle.jpg")

   monkey_running =loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png", "Monkey_06.png",  "Monkey_07.png","Monkey_08.png","Monkey_09.png", "Monkey_10.png")
 
stoneImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
  
  gameoverImage = loadImage("gameover3.png")
  
  monkey_dizzy = loadImage("dizzymonkey.png");
  
  restartImage = loadImage("restart.png");
}


function setup() {
  createCanvas(600,300);
  jungle = createSprite(400,150,800,400);
  jungle . addImage(jungle_background);
  jungle.velocityX = -7;
  jungle.x = jungle.width/2;
  
 monkey = createSprite(60,270);
  monkey.scale = 0.05;
  monkey.addAnimation("running",monkey_running)
  monkey.addAnimation("dizzy" , monkey_dizzy)
  //monkey.debug = true;
  
  ground = createSprite(300,295,600,5)
  ground.visible = false;
  
  stoneGroup = createGroup();
  bananaGroup = createGroup();
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImage);
  gameover.visible = false;
  
   restart = createSprite(540,250);
  restart.addImage(restartImage);
  restart.visible = false;
  restart.scale = 0.2;
  
  score = 0;
  hitCount = 0;
}


function draw(){
 background(150);
  
if(gameState === PLAY){
  if(jungle.x<0){
     jungle.x = jungle.width/2;
     }
  if(monkey.isTouching(ground)){
     monkey.collide(ground);
     }
  
  if(keyDown("space") && monkey.y > 260){
    monkey.velocityY = -13.5;
  }
  monkey.velocityY = monkey.velocityY+1;
  spawnStones();
  spawnBananas();
  
  if(bananaGroup.isTouching(monkey)){
     score = score + 2;
    bananaGroup.destroyEach();
     }
  
  switch(score){
    case 10 : monkey.scale = 0.07;
      break;
      case 20 : monkey.sale = 0.09;
     break;
     case 30 : monkey.scale = 0.11;
      break;
    default:break;
  }
  if(stoneGroup.isTouching(monkey)){
     monkey.scale = 0.05;
    score = 0;
    stoneGroup.destroyEach();
    hitCount = hitCount+1;
     }
  
  if(hitCount === 2){
     gameState = END;
     }
}
  
  if(gameState === END && hitCount === 2){
     gameover.visible = true;
    restart.visible = true;
     monkey.changeAnimation("dizzy" , monkey_dizzy);
    monkey.scale = 0.3;
    jungle.velocityX = 0;
    stoneGroup.destroyEach();
    bananaGroup.destroyEach();
     monkey.velocityY = 0;
     }
  if(mousePressedOver(restart)) {
    reset();
  }


  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white")
  text("score:"+score,450,30);
}

function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  
  monkey.changeAnimation("running",monkey_running);
  
  jungle.velocityX = -7;
  
  monkey.scale = 0.05;
   hitCount = 0;
  
}

function spawnStones(){
  if(frameCount % 75 === 0){
     var stone = createSprite(610,280)
     stone.addImage(stoneImage);
     stone.velocityX = -7;
    stone.scale = 0.2;
    stone.debug = true;
    stone.setCollider("circle",0,0,190)
    stoneGroup.add(stone);
    stone.lifetime = 100;
     }
}
function spawnBananas(){
  if(frameCount % 70 === 0){
     var banana = createSprite(610,280)
     var r = random(160,220);
     banana.addImage(bananaImage);
    banana.y = r
     banana.velocityX = -7;
    banana.scale = 0.03
    banana.debug = true;
    banana.setCollider("circle",0,0,190)
    bananaGroup.add(banana);
    banana.lifetime = 100;
     }
}

