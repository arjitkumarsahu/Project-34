var dog,happyDog,sadDog,foodObj,foodS,foodStock;
var feedPet,addFood;
var fedTimde,lastFed;
var foodObj;
function preload(){

sadDog = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");


}

function setup() {
  database=firebase.database();

	createCanvas(600,600);

  //foodObj = new Food();

  //foodStock = dataBase.ref('Food');
  //foodStock.on("value",readStock);

  dog=createSprite(400,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15; 

  feed = createButton("Feed the dog");
  feed.position(200,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(400,95);
  addFood.mousePressed(addFoods);
  
  foodObj=new Food()
}


function draw() {  
  background("46, 139, 87");

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",   function (data){
  lastFed = data.val();
  })
  
  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed: "+lastFed %12 + "PM",350,30);
      }
      else if(lastFed ==0){
        text("Last Feed: 12AM",350,30);
      }
      else {
        text("Last Feed:"+lastFed +"AM",350,30);
      }

  drawSprites();

}

function readStock (data){

  foodS = data.val();
  foodObj.updateFoodStock(food5);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    foodTime : hour() 


  })

}




function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })

}