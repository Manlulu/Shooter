var Enemy = function(posX, posY, width, height){
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;


    this.getPosX = function(){
        return this.posX;
    };
    this.getPosY = function(){
        return this.posY;
    };
    this.setPosX = function(posX){
        this.posX = posX;
    };
    this.setPosY = function(posY){
        this.posY = posY;
    };

    this.getWidth = function () {
        return this.width;
    };

    this.getHeight = function () {
        return this.height;
    };

    this.setWidth = function(width){
        this.width = width;
    };

    this.setHeight = function(height){
        this.height = height;
    };
};
