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
            DrawController.drawText(context, "Shooter game", "30px verdana", canvas.width / 3, canvas.height / 4, this.textColor);
            DrawController.drawText(context, "Press 'n' to start new game", "20px verdana", canvas.width / 3.5, canvas.height / 3, this.textColor);
            setTimeout(this.startGame.bind(this), 1000 / 2);
        } else {
            this.gameLoop();
        }
    };

    this.gameLoop = function () {
        this.loop();
        setTimeout(this.gameLoop.bind(this), 1000 / 2);
    };

    this.loop = function () {
        this.update();
        this.draw();
    };

    this.update = function () {
        //   console.log("Enemy moving");
    };

    this.updatePlayer = function () {
        if (!PlayerMovement.isPlayerIdle(this.playerDirection)) {
            PlayerMovement.calculatePlayerPos(this.playerDirection, this.player);
            this.draw();

            setTimeout(this.updatePlayer.bind(this), 1000 / 60);
        }
    };

    this.draw = function () {
        DrawController.resetCanvas(canvas, context);
        DrawController.drawPlayer(canvas, context, this.player);
    };

    var self = this;
    document.addEventListener('keydown', function (event) {
        switch (self.gameState) {
            case State.PAUSE:
                if (event.keyCode == 78) {
                    self.gameState = State.PLAY;
                }
                break;
            case State.PLAY:
                if (PlayerMovement.isPlayerIdle(self.playerDirection)) {
                    self.setPlayerMovementDirection(event);
                }
                break;
        }
    });

    this.setPlayerMovementDirection = function (event) {
        switch (event.keyCode) {
            case 37:
                console.log("LEFT");
                self.playerDirection = MovingDirection.LEFT;
                self.updatePlayer();
                break;
            case 39:
                console.log("RIGHT");
                self.playerDirection = MovingDirection.RIGHT;
                self.updatePlayer();
                break;
        }
    };

    document.addEventListener('keyup', function (event) {
        if (event.keyCode === 37 && PlayerMovement.isMovingLeft(self.playerDirection)) {
            console.log("LEFT EXIT");
            self.playerDirection = MovingDirection.IDLE;
        }
        else if (event.keyCode === 39 && PlayerMovement.isMovingRight(self.playerDirection)) {
            console.log("RIGHT EXIT");
            self.playerDirection = MovingDirection.IDLE;
        }
    })
};