var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,playerImg;
var score = 0;
var spellImg,villanImg;
var bgImg;
var hogwats;
var villansGroup,spellsGroup;
var lives=3;
var life1,life2,life3,lifeImg;
var sound;
var restart,restartImg;
var sand_timer;

function preload() {
  
  spellImg=loadImage("sparks.png");
  bgImg = loadImage("BG3.jpg");
  villanImg=loadImage("villan.png");
  lifeImg=loadImage("life.png");
  //sound=loadSound("sound.mp3");
  playerImg=loadImage("harry.png");
  restartImg=loadImage("restart1.png");
  sand_timer=loadImage("image.png");

}

function setup() {
  createCanvas(1700, 900);

 
 // sound.play();
  //sound.setVolume(0.5);
  //hogwats=createSprite(850,450,800,400);
  //hogwats.addImage("bg",bgImg);
  //hogwats.scale=1;
 // console.log(hogwats.height);         
  


  life1=createSprite(40,50,10,10);
  life1.addImage("life1Img",lifeImg);
  life1.scale=0.3;

  life2=createSprite(120,50,10,10);
  life2.addImage("life2Img",lifeImg);
  life2.scale=0.3;

  life3=createSprite(200,50,10,10);
  life3.addImage("life3Img",lifeImg);
  life3.scale=0.3;

  restart=createSprite(850,650);
  //restart.addImage(restartImg);
  restart.scale=0.5;
  restart.addImage(sand_timer);
  
  restart.visible = false;

  player = createSprite(200, 200, 20, 50);
  player.addImage("HP",playerImg);
  player.scale=0.5;

  villansGroup = new Group();
  spellsGroup = new Group();
  sound=loadSound("sound.mp3",loaded);
}

function draw() {
  background(bgImg);
  
  console.log(gameState);
 
  
  console.log("lives --->   "+lives);
  edges = createEdgeSprites();

  if (gameState == PLAY) 
  {

    spawnVillans();
      player.collide(edges[2]);
      player.collide(edges[3]);

    if (keyDown(UP_ARROW)) 
      {
        player.y = player.y - 20;
      }

    if (keyDown(DOWN_ARROW)) 
      {
        player.y = player.y + 20;
      }

    if (keyDown("space")) 
      {
        createSpells();
      }

    if (spellsGroup.isTouching(villansGroup)) 
      {
        score = score + 1;
        spellsGroup.destroyEach();
        villansGroup.destroyEach();
      
      }

    if (villansGroup.isTouching(player))
     {
      villansGroup.destroyEach();
      lives=lives-1;
    }

    if (lives==2) 
      {
        life3.visible=false;
      }
    
   if (lives==1) 
    {
        life3.visible=false;
        life2.visible=false;
      }

    if (lives==0) 
      {
        life3.visible=false;
        life2.visible=false;
        life1.visible=false;
        gameState=END;
      }


} 
  
  else if (gameState === END) {
    

    textSize(40);
    text("HARRY POTTER HAS BEEN CAUGHT BY LORD VOLDEMORT",100,400);
    sound.stop();
    player.visible=false;
    restart.visible = true;
    
    //spellsGroup.destroyEach();
    //villansGroup.destroyEach();
    
    spellsGroup.setVelocityXEach(0);
    villansGroup.setVelocityXEach(0);
    
    spellsGroup.setLifetimeEach(-1);
    villansGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      console.log("inside mouse pressed over function");
      reset();
      
    }
    
    
  }

  
  
  
  drawSprites();
  
  textSize(50);
  text("Score: " + score, 1400, 50);
    
  // if (gameState==END){
  //   textSize(60);
  //   text("HARRY POTTER HAS BEEN CAUGHT BY LORD VOLDEMORT",100,400);
  // }
  
  
} // end of draw


function loaded(){

  sound.play();
}

function reset()
{
  console.log("Reset Called");
  gameState = PLAY;
  restart.visible=false;
  score=0;
  lives=3;
  spellsGroup.destroyEach();
  villansGroup.destroyEach();
  player.visible="true";
  life3.visible=true;
  life2.visible=true;
  life1.visible=true;
  sound.play();
}


function spawnVillans() {
  if (frameCount % 100 == 0) {
    var villan = createSprite(1700, 450, 20, 20);
    villan.addImage("demantors",villanImg);
    villan.scale=0.5;
    villan.setCollider("circle",0,0,150);
    villan.velocityX = -20;
    villan.y = random(100, 800);
    
//villan.debug=true;
    villansGroup.add(villan);
  }
}

function createSpells() {
  var spell = createSprite(30, 100, 60, 10);
  spell.velocityX = 4;
  spell.y = player.y;
  spell.addImage("Spell",spellImg);
  spell.setCollider("circle",0,0,20);
//spell.debug=true;
  spellsGroup.add(spell);
}

