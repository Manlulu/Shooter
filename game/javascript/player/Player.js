var Player = function (width, height) {
    this.width = width;
    this.height = height;
    this.posX = 40;
    this.posY = 0;

    var privateVariable = "Er denne privat?";
    this.getPrivate = function () {
        return privateVariable;
    };

    this.getWidth = function () {
        return width;
    };

    this.getHeight = function () {
        return height;
    };

    this.setWidth = function(width){
        this.width = width;
    };

    this.setHeight = function(height){
        this.height = height;
    };

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

    this.fire = function(){
        console.log("Pew pew");
    }
};
Player.prototype.shoot = function () {
    console.log("Player: bang bang");
};

Player.prototype.move = function (direction) {
    this.direction = direction;
    this.printPosition();
    console.log("Player: Moving " + this.direction);
    this.x++;
    this.printPosition();
};

Player.prototype.printPosition = function () {
    console.log("X: " + this.x + ", Y: " + this.y);
    console.log(this.getPrivate());
};