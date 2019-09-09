class Food {
  constructor(x,y,size,color,stroke) {
    this.position={"x":x*size,"y":y*size}
    this.size=size;
    this.foodColor=color;
    this.stroke=stroke;
  }
  updateColor(color){
      this.foodColor=color;
  }
  newFood(){
    let x = Math.floor(Math.random() * width/this.size)*this.size;
    let y = Math.floor(Math.random() * height/this.size)*this.size;
    if(this.isOnSnake(x,y)){
      this.newFood();
    }
    else{
      this.position={"x":x,"y":y};
    }
  }
  //proposed syntax for private functions
  isOnSnake(x,y){
    if(snake.position.x == x && snake.position.y == y)
    {
      return true;
    }
    for(let pos of snake.tail){
      if(pos.x == x && pos.y == y)
      {
        return true;
      }
    }
    return false;
  }
  show(){
    ctx.beginPath();
    ctx.fillStyle=this.foodColor;
    ctx.strokeStyle="#121212";
    ctx.shadowBlur = this.size*2;
    ctx.shadowColor = this.foodColor;
    ctx.rect(this.position.x+this.stroke/2,this.position.y+this.stroke/2,this.size-this.stroke*2,this.size-this.stroke*2);
    ctx.fill();
  }
  eat(position){
    if(this.position.x==position.x && this.position.y == position.y){
      return true;
    }
    else {
      return false;
    }
  }
}
