var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count = 0;
var ground, trex, trex_running, trex_collided;
var invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6,obstacle7, obstacle8,  obstacle9,  obstacle10;;

var score = 0;

var gameOver, restart;
function preload(){
  Runer_running =  loadImage("images/Run1.png");
  Runer_running2 =  loadImage("images/Run1c.png");
  Runer_collided = loadImage("images/collide2.png");
  
  groundImage = loadImage("images/ground2.png");
  
  cloudImage = loadImage("images/cloud.png");
  
  tree1 = loadImage("images/tree1.png")
  tree2 = loadImage("images/Tree2.png")
  tree3 = loadImage("images/tree3.png")

  obstacle1 = loadImage("images/Obstacle1.png");
  obstacle2 = loadImage("images/Obstacle2.png");
  obstacle3 = loadImage("images/Obstacle3.png");
  obstacle4 = loadImage("images/Obstacle4.png");
  obstacle5 = loadImage("images/Obstacle5.png");
  obstacle6 = loadImage("images/Obstacle6.png");
  obstacle7 = loadImage("images/Obstacle7.png");
  obstacle8 = loadImage("images/Obstacle8.png");
  obstacle9 = loadImage("images/Obstacle9.png");
  obstacle10 = loadImage("images/Obstacle10.png");
  
  gameOverImg = loadImage("images/Game Over.jpg");
  restartImg = loadImage("images/restart.jpg");
}

function setup() {
  createCanvas(700, 300);
  
  trex = createSprite(50,200,20,50);
  
  trex.addImage("running", Runer_running);
  trex.addImage("collided", Runer_collided);
  trex.scale = 0.5;
  
  ground = createSprite(100,40,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(100,150);
  gameOver.addImage(gameOverImg);
  gameOverImg.resize(100,100);
  restart = createSprite(550,150);
  restart.addImage(restartImg);
  restartImg.resize(75,75);
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(100,290,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  
  
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  trex.collide(invisibleGround)
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //camera.position.x = trex.x
    camera.position.y = trex.y;

    if(keyDown("space") && trex.y >= 200) {
      trex.velocityY = -12;
    }
    
    console.log(trex.y);
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
   
    //change the trex animation
    trex.y = trex.y + 10
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
    reset();
  }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(120,180));
    cloud.addImage(cloudImage);
    cloudImage.resize(50,50);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(700,260,10,40);
    
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(tree1);
              tree1.resize(100,100);
              break;       
      case 2: obstacle.addImage(tree2);
              tree2.resize(100,100);
              break;
      case 3: obstacle.addImage(tree3);
              tree3.resize(100,100);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
  function reset(){
    gameState = PLAY ;
    gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
   cloudsGroup.destroyEach();
   trex.changeAnimation("running",Runer_running);
  score = 0;
  }
  
