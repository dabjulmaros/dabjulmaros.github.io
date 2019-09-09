class Snake {
  constructor(x,y,size,color,stroke) {
    this.position={"x":x*size,"y":y*size};
    this.size = size;
    this.tail=[];
    this.snakeColor=color;
    this.velocity={"x":0,"y":0};
    this.stroke=stroke;
    this.holdUpdate=false;
    this.updateBuffer=[];
  }
  updateColor(color){
      this.snakeColor=color;
  }
  show(){
    ctx.fillStyle=this.snakeColor;
    ctx.lineWidth = this.stroke;
    ctx.strokeStyle="#121212";
    this._drawRect(this.position.x,this.position.y,this.size-this.stroke,this.size-this.stroke);
    for(var i in this.tail){
      this._drawRect(this.tail[i].x,this.tail[i].y,this.size-this.stroke,this.size-this.stroke);
    }
  }
  _drawRect(x,y,w,h){
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fill();
    ctx.stroke();
  }
  grow(){
    if(this.tail.length>0){
      this.tail.push({"x":this.tail[this.tail.length-1].x,"y":this.tail[this.tail.length-1].y});
    }
    else {
      this.tail.push({"x":this.position.x-this.velocity.x,"y":this.position.y-this.velocity.y});
    }
  }
  updateVelocity(x,y){
    if(this.velocity.x==0&&this.velocity.y==0)
    {
      this.velocity={"x":x,"y":y};
    }
    if(x != -this.velocity.x && y != -this.velocity.y && !this.holdUpdate)
    {
      this.velocity={"x":x,"y":y};
      this.holdUpdate=true;
    }
    if(this.holdUpdate){
      if(x != -this.velocity.x && y != -this.velocity.y){
        this.updateBuffer=[x,y];
      }
    }
  }
  move(){
    this.holdUpdate=false;
    let lastPosition = [this.position.x,this.position.y];
    this.position={"x":this.position.x+this.velocity.x*this.size,"y":this.position.y+this.velocity.y*this.size}
    for(var tailPos of this.tail)
    {
      //is this retarded or am i afraid of copy/reference issues? yes
      let temp =[tailPos.x,tailPos.y] ;
      tailPos.x = lastPosition[0];
      tailPos.y=lastPosition[1];
      lastPosition = [temp[0],temp[1]];
    }
    if(this.updateBuffer.length){
      this.velocity={"x":this.updateBuffer[0],"y":this.updateBuffer[1]};
      this.updateBuffer=[];
    }
  }
  checkDeath(wrap){
    if(this.position.x<0||this.position.x+this.size>width||this.position.y<0||this.position.y+this.size>height){
      if(!wrap){
        return true;
      }
      else{
        if(this.position.x<=0){
          this.position.x=width-this.size;
        }else if(this.position.x>=width){
          this.position.x=0;
        }
        if(this.position.y<=0){
          this.position.y=height-this.size;
        }else if(this.position.y>=height){
          this.position.y=0;
        }
      }
    }
    if(this.tail.length>1){
      for(var ele of this.tail){
        if(this.position.x == ele.x && this.position.y == ele.y){
          return true;
        }
      }
    }
    return false;
  }
}
