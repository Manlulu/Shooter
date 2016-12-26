var LaserState = {
    MOVING: 0,
    HIT: 1,
    OUT_OF_SCREEN: 2
};

var Laser = function (startPosX, startPosY, canvas) {
    this.posY = startPosY;
    this.posX = startPosX;
    this.canvas = canvas;
    this.state = LaserState.MOVING;
    this.width = 3;
    this.height = 15;

    this.init = function(){
        this.desideShooter();
    };

    this.desideShooter = function(){
        this.shooter = this.posY > (this.canvas.height / 2) ? "Enemy" : "Player";
    };

    this.init();

    this.isOutOfScreen = function(){
        return this.state == LaserState.OUT_OF_SCREEN;
    }

    this.stateIsMoving = function(){
        return this.state == LaserState.MOVING;
    };
    this.getState = function(){
        return this.state;
    };
    this.outOfScreen = function(){
        this.state = LaserState.OUT_OF_SCREEN;
    };
    this.hit = function(){
        this.state = LaserState.HIT;
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
    this.getWidth = function(){
        return this.width;
    }
    this.getHeight = function(){
        return this.height;
    }
};