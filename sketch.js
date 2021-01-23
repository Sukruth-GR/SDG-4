var fruitsGroup, animalsGroup;
var banana,bananaImg;
var avacado,avacadoImg;
var apple,appleImg;
var cherry,cherryImg;
var mango,mangoImg;
var carrot,carrotImg;
var dog , dogImg;
var boy, boy_running;
var ground;
var cheetah, cheetahImg;
var bear, bearImg;
var jaguar, jaguarImg;
var kick, kickImg;
var strength = 100;
var HP, HPImg;
var boyKick, boyKickImg;
var stone, stoneImg;
var hundred, hundredImg;
var eighty, eightyImg
var sixty, sixtyImg;
var forty, fortyImg;
var ten, tenImg;
var zero, zeroImg;

function preload(){
  jungleImg = loadImage('jungl.jpg');
  mangoImg = loadImage('mango.png');
  bananaImg = loadImage('banana.png');
  dogImg = loadImage("dog1.png");
  appleImg = loadImage("apple.png");
  avacadoImg = loadImage('avacado.png');
  cherryImg = loadImage('cherry.png');
  carrotImg = loadImage('carrot.png');
  boy_running = loadAnimation("boy3.png","boy2.png","boy1.png");
  cheetahImg = loadImage("cheetah.png");
  bearImg = loadImage("bear.png");
  jaguarImg = loadImage("jaguar.png");
  kickImg = loadImage("kick.PNG");
  HPImg = loadImage("life.PNG");
  boyKickImg = loadAnimation("boykick.PNG");
  stoneImg = loadImage("stone.png");
  hundredImg = loadImage("100.png");
  eightyImg = loadImage("80.png");
  sixtyImg = loadImage("60.png");
  twentyImg = loadImage("20.png");
  tenImg = loadImage("10.png");
  zeroImg = loadImage("0.png");
}

function setup(){
  createCanvas(displayWidth, displayHeight-300);
  background = createSprite(0,displayHeight/2-300, displayWidth/2*5, displayHeight);
  background.addImage('set',jungleImg);
       background.x = background.width/2;
  background.scale = 1;
     background.velocityX = -3;
  boy = createSprite(displayWidth-1300,displayHeight/2-170,100,100);
  boy.addAnimation("running",boy_running);
  boy.scale = 0.3;
  ground = createSprite(displayWidth-1300,displayHeight/2-170,displayWidth,5);
  ground.visible = false;
  kick = createSprite(displayWidth-50,displayHeight-850,100,100);
  kick.addImage(kickImg);
  HP = createSprite(displayWidth-190,displayHeight-850,100,100);
  HP.addImage(hundredImg);
  HP.scale = 0.5;
  stone = createSprite(displayWidth-1270,displayHeight/2-200,10,10);
  stone.addImage(stoneImg);
  stone.scale = 0.3;
  stone.visible = false;

  fruitsGroup = new Group()
  animalsGroup = new Group()
}

function draw(){
  
    if (background.x < 30){
      background.x=background.width/2
    }
    animals();
    fruits();

    if(fruitsGroup.isTouching(boy)){
        strength = strength+11;
        fruitsGroup.destroyEach()
    }

    if(animalsGroup.isTouching(boy)){
        strength = strength-Math.round(getFrameRate()/60)
    }

    if(keyDown("space")&& boy.y > displayHeight-750){
        boy.velocityY = -13;
    }

    if(keyDown("t")||keyDown("T")&&frameCount%700===0){
        for(i=0;i<20;i++){
            stone = createSprite(displayWidth-1270,displayHeight/2-200,10,10);
            stone.addImage(stoneImg);
            stone.scale = 0.3;
            stone.visible = true;
        }
        stone.velocityX = +4;
        stone.visible = true;
    }

    if(animalsGroup.isTouching(stone)){
        stone.destroy();
        animalsGroup.destroyEach();
    }

    //stone.velocityY = stone.velocityY+0.5;

    boy.velocityY = boy.velocityY+0.8;
    boy.collide(ground);

    //console.log(dog.x);
    strength = strength-0.05;
    if(strength>100){
        strength = 100
    }

    if(keyIsDown("k")&& animalsGroup.x < displayWidth-1100){
        boy.changeAnimation("running",boyKickImg);
    }
    //else{
    //    boy.changeAnimation("running",boy_running);
    //}

    if(strength ===100){
        HP.addImage(hundredImg)
      }
      else if (strength<100 && strength>79){
        HP.changeImage(eightyImg)
      }
      else if (strength<80 && strength>59){
        HP.changeImage(sixtyImg)
      }
      else if (strength<60 && strength>39){
        HP.changeImage(fortyImg)
      }
      else if (strength<40 && strength>19){
        HP.changeImage(tenImg)
      }
      else{
        HP.changeImage(zeroImg)
        //gameState==2
      }
  
  drawSprites();

  strokeWeight(10);
  textSize(20);
  fill("limegreen");
  text(" "+Math.round(strength)+"%",displayWidth-170,displayHeight-845);
}

function animals(){
    if(frameCount%750 === 0){
        dog = createSprite(1000,displayHeight/2-210,10,10);
        dog.velocityX = -3;
        dog.scale = 0.2;

        var rand = Math.round(random(1,6))
        switch(rand){
            case 1:dog.addImage(dogImg);
            break;

            case 2:dog.addImage(cheetahImg);
            dog.scale = 1;
            break;

            case 3:dog.addImage(bearImg);
            dog.scale = 1;
            break;

            case 4:dog.addImage(jaguarImg);
            dog.scale = 1;
            break;

            case 5:dog.addImage(dogImg);
            //dog.scale = 1;
            break;

            case 6:dog.addImage(dogImg);
            //dog.scale = 1;
            break;
            
            default: break;
        }
            animalsGroup.add(dog);
    }
}

function fruits(){
  if(frameCount%200 === 0){
      fruit = createSprite(1000,displayHeight/2-350,10,10);
      fruit.velocityX = -8;
      fruit.scale = 0.025;

      var rand = Math.round(random(1,6))
      switch(rand){
          case 1:fruit.addImage(bananaImg);
          break;

          case 2:fruit.addImage(appleImg);
          fruit.scale = 0.4;
          break;

          case 3:fruit.addImage(cherryImg);
          fruit.scale = 0.4;
          break;

          case 4:fruit.addImage(avacadoImg);
          fruit.scale = 0.4;
          break;

          case 5:fruit.addImage(mangoImg);
          fruit.scale = 0.4;
          break;

          case 6:fruit.addImage(carrotImg);
          fruit.scale = 0.4;
          break;
          
          default: break;
      }
          fruitsGroup.add(fruit);
          fruitsGroup.setLifetimeEach(300);
        }
}