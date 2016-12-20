var State = {
    PAUSE: 0,
    PLAY: 1
};

var Game = function () {
    var canvas, context;
    var textColor;
    var player, playerDirection, playerSpeed;
    var gameState;

    var fpsInterval, startTime, now, then, timeSinceLastLoop;

    const keyLeft = 37;
    const keyRight = 39;
    const keyN = 78;
    const txtGameName = "Shooter game";
    const txtNewGame = "Press 'n' to start new game";

    this.init = function (canvasId, context2d) {
        canvas = document.getElementById(canvasId);
        context = canvas.getContext(context2d);
        DrawController.resetCanvas(canvas, context);
        textColor = "#fff";
        playerSpeed = 10;
        player = new Player(90, 30);
        playerDirection = MovingDirection.IDLE;
        gameState = State.PAUSE;
    };

    this.startGame = function () {
        if (gameState === State.PAUSE) {
            DrawController.drawText(context, txtGameName, "30px verdana", canvas.width / 3, canvas.height / 4, textColor);
            DrawController.drawText(context, txtNewGame, "20px verdana", canvas.width / 3.5, canvas.height / 3, textColor);
            setTimeout(this.startGame.bind(this), 1000 / 2);
        } else {
            initGameLoop(60);
        }
    };

    function initGameLoop(fps) {
        fpsInterval = 1000 / fps;
        then = Date.now();
        startTime = then;
        gameLoop();
    }

    var gameLoop = function () {
        requestAnimationFrame(gameLoop);

        now = Date.now();
        timeSinceLastLoop = now - then;

        if (timeSinceLastLoop > fpsInterval) {
            then = now - timeSinceLastLoop;
            loop();
        }
    };

    var loop = function () {
        update();
        draw();
    };

    var update = function () {
        updatePlayer();
    };

    var updatePlayer = function () {
        if (!PlayerMovement.canPlayerGoLeft(player) && PlayerMovement.isMovingLeft(playerDirection)) {
        } else if (!PlayerMovement.canPlayerGoRight(player, canvas) && PlayerMovement.isMovingRight(playerDirection)) {
        } else {
            PlayerMovement.movePlayer(playerDirection, player, playerSpeed);
        }
    };

    var draw = function () {
        DrawController.resetCanvas(canvas, context);
        DrawController.drawPlayer(canvas, context, player);
    };

    document.addEventListener('keydown', function (event) {
        switch (gameState) {
            case State.PAUSE:
                if (event.keyCode == keyN) {
                    gameState = State.PLAY;
                }
                break;
            case State.PLAY:
                setPlayerMovementDirection(event);
                break;
        }
    });

    var setPlayerMovementDirection = function (event) {
        switch (event.keyCode) {
            case keyLeft:
                playerDirection = MovingDirection.LEFT;
                break;
            case keyRight:
                playerDirection = MovingDirection.RIGHT;
                break;
        }
    };

    document.addEventListener('keyup', function (event) {
        if (event.keyCode === keyLeft && PlayerMovement.isMovingLeft(playerDirection)) {
            playerDirection = MovingDirection.IDLE;
        }
        else if (event.keyCode === keyRight && PlayerMovement.isMovingRight(playerDirection)) {
            playerDirection = MovingDirection.IDLE;
        }
    })
};