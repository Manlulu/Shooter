var Laser = function (startPosX, startPosY, canvas) {
    this.startPosX = startPosX;
    this.startPosY = startPosY;
    this.canvas = canvas;

    this.init = function(startPosX, startPosY){
        this.desideShooter();
    };

    this.desideShooter = function(){
        console.log("Desiding shooter.. " + this.startPosY);
        this.shooter = this.startPosY > (this.canvas.height / 2) ? "Enemy" : "Player";
        console.log("Shooter: " + this.shooter);
    };

    this.init();


};