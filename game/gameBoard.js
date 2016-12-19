var MovingDirection = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    IDLE: 4
};

var State = {
    PAUSE: 0,
    PLAY: 1
};

var Game = function (canvasId, context2d) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext(context2d);
    this.textColor = "#fff";
    this.player = new Player(90, 30);
    this.playerDirection = {};
    this.gameState = State.PAUSE;

    this.init = function () {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.playerDirection = MovingDirection.IDLE;

    };

    this.startGame = function () {
        if (this.gameState === State.PAUSE) {
            this.drawText("Shooter game", "30px verdana", canvas.width / 3, canvas.height / 4);
            this.drawText("Press 'n' to start new game", "20px verdana", canvas.width / 3.5, canvas.height / 3);
            setTimeout(this.startGame.bind(this), 1000 / 2);
        } else {
            this.gameLoop();
        }
    };

    this.update = function () {
        this.calculatePlayerPos();
        this.playerDirection = MovingDirection.IDLE;
    };

    this.gameLoop = function () {
        this.loop();
        setTimeout(this.gameLoop.bind(this), 1000 / 2);
    };

    this.loop = function(){
        this.update();
        this.draw();
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

    this.draw = function () {
        this.resetCanvas();
        this.drawPlayer();
    };

    this.resetCanvas = function () {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    this.drawPlayer = function () {
        context.fillStyle = "#FFF";
        context.fillRect(this.player.getPosX(), canvas.height - (this.player.getHeight() * 2), this.player.getWidth(), this.player.getHeight());
    };

    this.drawText = function (text, font, width, height) {
        context.fillStyle = this.textColor;
        context.font = font;
        context.fillText(text, width, height);
    };

    var self = this;
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 37:
                self.playerDirection = MovingDirection.LEFT;
                self.loop();
                //checkPlayerMovement();
                //draw();
                break;
            case 39:
                self.playerDirection = MovingDirection.RIGHT;
                self.loop();
                //checkPlayerMovement();
                //draw();
                break;
            case 78:
                self.gameState = State.PLAY;
                break;
        }
    });
};