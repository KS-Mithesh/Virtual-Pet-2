var puppy, puppyImage, puppyStanding, puppySitting;
var food, stock;
var database;
var milk, visible=0;
var feedDogButton, addFoodButton;
var lastFed = "Loading...", time = "", timing, lastFeed;

function preload()
{
  puppyStanding = loadAnimation("images/dogimg.png");
  puppySitting  = loadAnimation("images/dogimg1.png");
 
  milk = loadImage("images/milk.png");

}

function setup() {
  database = firebase.database();

  createCanvas(850, 600);
  
  puppy = createSprite(750,300,10,10);
  puppy.addAnimation("standing puppy", puppyStanding);
  puppy.addAnimation("sitting puppy", puppySitting);
  puppy.scale=0.3;

  feedDogButton = new Button("Feed The Dog",800,70,function(){
    if(food>0 && visible<=0) {
      database.ref("food").set(food-1);
      visible = 255;
      puppy.changeAnimation("sitting puppy",puppySitting);
      puppy.x = 745;
      puppy.y = 320;
    }
  });
  addFoodButton = new Button("Add Food",905,70,function(){
    if(food<20 && visible<=0) {
      database.ref("food").set(food+1);
    }
  });

  var foodStock=database.ref('food');
  foodStock.on("value",readStock);

  var timeCheck=database.ref('time');
  timeCheck.on("value",function(data){timing  = data.val();lastFeed = timing;});
}

function draw() {  
  background(46,139,87);

  visible-=3;

  milkBottles(food);

  if(visible<0) {
    puppy.changeAnimation("standing puppy",puppyStanding);
    puppy.x = 750;
    puppy.y = 300;
  }

  if(lastFeed) {
    if(lastFeed <12 && lastFeed>=0) {
      time = "AM";
      if(lastFeed===00 || lastFeed===0 || lastFeed==="00" || lastFeed==="0") {
        lastFed = 12;
      }
      else {
        lastFed = lastFeed;
      }
    }
    else if(lastFeed >=12 && lastFeed<=24) {
      time = "PM";
      if(lastFeed===12) {
        lastFed = lastFeed;
      }
      else {
        lastFed = lastFeed-12;
      }
    }
  }

  feedDogButton.display();
  addFoodButton.display();

  drawSprites();

  tint(255,visible);imageMode(CENTER);
  image(milk,600,320,210,210);

  textSize(30);fill(255,255,255);text("Last Fed: "+lastFed+" "+time,100,60);
}

function readStock(data) {
  stock = data.val();
  food = stock;
}
