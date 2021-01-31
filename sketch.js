//Create variables here
var dog,bg;
var happyDog;
var database;
var foodS,feed;
var foodStock,fedTime,lastFed;
var feedDog,addFood;
var foodObj,fedTime,value,FeedTime;
var gameState="";
var readState;
var BEDROOM,WASHROOM,GARDEN;
function preload()
{
  //load images 
  doggyImg=loadImage("Dog.png")
  happyDoggyImg=loadImage("happydog.png")
  milkimg=loadImage("Milk.png")
  bg=loadImage("oswald.jpg")
  bedImg=loadImage("bgImages/bedRoom.png")
  parkImg=loadImage("bgImages/garden.png")
  bathImg=loadImage("bgImages/washRoom.png")
}
function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  foodObj=new Foody();
  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
  dog=createSprite(450,250,150,150);
  dog.addImage(doggyImg);
  dog.scale=0.15;
   feed= createButton("Feed your dog");
  feed.position(650,100);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(770,100);
  addFood.mousePressed(addFoods); 
  nameBox = createInput('').attribute('placeholder','Your pet name');
  nameBox.position(450,100)
  var  milkbottle = createSprite(370,270)
  milkbottle.addImage(milkimg)
  milkbottle.visible = 2
  milkbottle.scale = 0.1
}
function draw() {  
  background(bg)
 value = nameBox.value();
 foodObj.display();
 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 })
 fill(0);
 textSize(25);
 if(lastFed>=12){
   text("Last Fed : "+ lastFed%12 + " PM", 400,30);
  }else if(lastFed==0){
    text("Last Fed : 12 PM",350,30);
  }else{
    text("Last Fed : "+ lastFed + " AM", 400,30);
  }
  fill("black")
  textFont("courier")
   textSize(35)
   text(value,400,dog.y-80)
   currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }
        if(gameState!="Hungry"){
         feed.hide();
         addFood.hide();
         dog.remove();
        }else{
         feed.show();
         addFood.show();
         }
  drawSprites();
  textSize(30)
  textFont("normal")
  fill(0)
  text("Virtual-Pet-2-by-Shah Dhruvi",10,30)
  textSize(20)
  fill("saddleBrown")
  textFont("cursive")
  text("*NOTICE:-*",0,444)
  text("*after 1 hr of feeding-gardenTime*",0,455)
  text("*after 2 hr of feeding-sleepTime*",0,469)
  text("*after 3 hr of feeding-bathTime*",0,485)
  text("*if none of the above-feedTime*",0,499)
}
function feedDog()
{
  dog.addImage(happyDoggyImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods()
{
  foodObj.updateFoodStock(foodObj.foodStock+1);
  database.ref('/').update({
    Food:foodObj.foodStock
  });
}
//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}