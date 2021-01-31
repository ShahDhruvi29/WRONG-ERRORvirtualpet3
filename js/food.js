class Foody{
    constructor(){
        this.foodStock = 20;
        this.lastFed = 0;
        this.x=0;
        this.image = loadImage("Milk.png");
    }
    updateFoodStock(food){
        this.foodStock = food;
        database.ref('/').update({
            Food: food
        });
    }
    getFoodStock(){
        return this.foodStock;
    }
    deductFood(){
        this.foodStock--;
        updateFoodStock(this.foodStock);
    }
        display(){
        var x = 80, y = 100;
        imageMode(CENTER);

        if(this.foodStock != 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 10 === 0){
                   x = 80;
                   y=y+50;
                }
                image(this.image, x, y, 70, 70);
                x=x+30
            }
         }
       }
               bedroom(){
               background(bedImg, 550,500);  
               }     
             garden(){
             background(parkImg,550,500);  
             } 
               washroom(){
               background(bathImg,550,500); 
               }
  }