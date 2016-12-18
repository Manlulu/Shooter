var MovingDirection = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    IDLE: 4
};

var Game = function (canvasId, context2d) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext(context2d);
    this.textColor = "#fff";
    this.player = new Player(90, 30);
    this.playerDirection = {};


    this.init = function () {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.playerDirection = MovingDirection.IDLE;
    };

    this.update = function () {
        this.calculatePlayerPos();
        this.playerDirection = MovingDirection.IDLE;
    };

    this.gameLoop = function () {
        this.update();
        this.draw();
        setTimeout(this.gameLoop, 1000 / 2);
    };

    this.startGame = function () {
        context.fillStyle = this.textColor;
        this.drawText("Shooter game", "30px verdana", canvas.width / 3, canvas.height / 4)
        this.drawText("Press 'n' to start new game", "20px verdana", canvas.width / 3.5, canvas.height / 3)
    };

    this.draw = function () {
        this.drawPlayer();
    };

    this.calculatePlayerPos = function () {
        switch (this.playerDirection) {
            case MovingDirection.LEFT:
                this.player.setPosX(this.player.getPosX() - 10);
                break;
            case MovingDirection.RIGHT:
                this.player.setPosX(this.player.getPosX() + 10);
                break;
        }
    };

    this.drawPlayer = function () {
        context.fillStyle = "#FFF";
        context.fillRect(canvas.width / 2 - this.player.getWidth() / 2, canvas.height - (this.player.getHeight() * 2), this.player.getWidth(), this.player.getHeight());
    };

    this.drawText = function (text, font, width, height) {
        context.font = font;
        context.fillText(text, width, height);
    };

    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 37:
                this.playerDirection = MovingDirection.LEFT;
                //checkPlayerMovement();
                //draw();
                break;
            case 39:
                this.playerDirection = MovingDirection.RIGHT;
                //checkPlayerMovement();
                //draw();
                break;
        }
    });

};