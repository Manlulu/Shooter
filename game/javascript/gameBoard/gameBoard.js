var Game = function () {
    var canvas, context;
    var textColor;
    var player, playerDirection, playerSpeed;
    var gameState;
    var playerState;
    var autoFireTimer = 0;
    var enemySpawnTimer = Math.floor(Math.random() * 200) + 100;
    var score = 0;
    var lastHighscore = 0;
    var highScore = 0;

    var laserList = [];
    var enemyList = [];
    var enemyLaserList = [];

    var playerLaserSound = new Audio("laser.mp3")
    var explosionSound = new Audio("explosion.mp3");
    var enemyLaserSound = new Audio("laser2.mp3");

    var fpsInterval, startTime, now, then, timeSinceLastLoop;

    const KEY_LEFT = 37;
    const KEY_RIGHT = 39;
    const KEY_N = 78;
    const KEY_SPACE = 32;
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
        playerState = PlayerState.IDLE;

        // Highscore
        lastHighscore = localStorage.getItem("shooter_score") || 0;

        // Finn ut mer om denne.
        // Sånn at den ikke fortsetter på det den dreiv å tegner på forrige loop.
        context.beginPath();
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
            then = now - (timeSinceLastLoop % fpsInterval);
            loop();
        }
    };

    var loop = function () {
        update();
        draw();
    };

    var update = function () {
        updatePlayerPosition();
        updatePlayerFire();
        checkLaserPosition(laserList);
        updateLaserPosition(laserList, 4);

        updateEnemy();
        checkLaserPosition(enemyLaserList);
        updateLaserPosition(enemyLaserList, -4);
    };

    var updateEnemy = function () {
        spawnEnemy();
        setEnemyPosition();
        checkEnemyHitByLaser();
        enemyFire();
    };

    var enemyFire = function () {
        for (var i = 0; i < enemyList.length; i++) {
            enemyList[i].incrementLoadTimer();
            if (enemyList[i].loadTimer == 0) {
                console.log("Enemy: Pew pew");
                enemyList[i].resetLoadTimer();
                loadLaser(enemyLaserList, enemyList[i]);
                AudioController.playSound(enemyLaserSound);

            }
        }
    };

    var spawnEnemy = function () {
        enemySpawnTimer--;
        enemySpawnTimer = EnemyController.spawnEnemy(enemyList, enemySpawnTimer);
    };

    var checkEnemyHitByLaser = function () {
        for (var i = 0; i < enemyList.length; i++) {
            for (var y = 0; y < laserList.length; y++) {
                if (EnemyController.checkEnemyHit(enemyList[i], laserList[y])) {
                    EnemyController.removeEnemy(enemyList, i);
                    WeaponsMovement.removeLaser(laserList, y);

                    AudioController.playSound(explosionSound);

                    updateScore();
                    break;
                }
            }
        }
    };

    function updateScore() {
        score++;
        checkHighScore();
    }

    function checkHighScore() {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("shooter_score", highScore);
        }
    }

    var setEnemyPosition = function () {
        for (var i = 0; i < enemyList.length; i++) {
            EnemyController.setEnemyPosition(enemyList[i]);
            if (EnemyController.isOutOfScreen(enemyList[i], canvas)) {
                EnemyController.removeEnemy(enemyList, i);
            }
        }
    };

    var updateLaserPosition = function (list, speed) {
        WeaponsMovement.moveWeapon(list, speed);
    };

    var updatePlayerFire = function () {
        if (playerState == PlayerState.FIRE && player.getAutoFireReady()) {
            player.fire();
            AudioController.playSound(playerLaserSound);

            player.setAutoFireReady(false);
            resetAutoFireTimer();

            loadLaser(laserList, player);
        }

        if (autoFireTimer >= 50) {
            resetAutoFireTimer();
            player.setAutoFireReady(true);
        }
        incrementAutoFireTimer();
    };

    var loadLaser = function (list, firedFrom) {
        list.push(new Laser((firedFrom.getPosX() + (firedFrom.getWidth() / 2)), firedFrom.getPosY(), canvas));
    };


    var resetAutoFireTimer = function () {
        autoFireTimer = 0;
    };

    var incrementAutoFireTimer = function () {
        autoFireTimer++;
    };

    var checkLaserPosition = function (list) {
        for (var i = 0; i < list.length; i++) {
            if (isOutOfScreen(list, i)) {
                WeaponsMovement.removeLaser(list, i);
            }
        }
    };

    var isOutOfScreen = function (list, pos) {
        return list[pos].getPosY() <= 0 || list[pos].getPosY() >= canvas.height;
    };

    var updatePlayerPosition = function () {
        if (!PlayerMovement.canPlayerGoLeft(player) && PlayerMovement.isMovingLeft(playerDirection)) {
        } else if (!PlayerMovement.canPlayerGoRight(player, canvas) && PlayerMovement.isMovingRight(playerDirection)) {
        } else {
            PlayerMovement.movePlayer(playerDirection, player, playerSpeed);
        }
    };

    var draw = function () {
        DrawController.resetCanvas(canvas, context);
        DrawController.drawPlayer(canvas, context, player);
        for (var a = 0; a < laserList.length; a++) {
            if (laserList[a] != null && laserList[a].stateIsMoving())
                DrawController.drawLaser(canvas, context, laserList[a]);
        }
        for (var a = 0; a < enemyLaserList.length; a++) {
            if (enemyLaserList[a] != null && enemyLaserList[a].stateIsMoving())
                DrawController.drawLaser(canvas, context, enemyLaserList[a]);
        }

        for (var i = 0; i < enemyList.length; i++) {
            DrawController.drawEnemy(canvas, context, enemyList[i]);
        }


        DrawController.drawScore(context, score, lastHighscore);
        DrawController.drawMenuLine(context);
    };

    document.addEventListener('keydown', function (event) {
        switch (gameState) {
            case State.PAUSE:
                if (event.keyCode == KEY_N) {
                    gameState = State.PLAY;
                }
                break;
            case State.PLAY:
                if (setPlayerMovementDirection(event)) {
                    break;
                }
                if (playerIsFireing(event)) {
                    break;
                }
                break;
        }
    });

    var playerIsFireing = function (event) {
        if (event.keyCode == KEY_SPACE && playerState != PlayerState.FIRE) {
            playerState = PlayerState.FIRE;

            return true;
        }
        return false;
    };

    var setPlayerMovementDirection = function (event) {
        switch (event.keyCode) {
            case KEY_LEFT:
                playerDirection = MovingDirection.LEFT;
                return true;
            case KEY_RIGHT:
                playerDirection = MovingDirection.RIGHT;
                return true;
        }
        return false;
    };

    document.addEventListener('keyup', function (event) {
        if (event.keyCode === KEY_LEFT && PlayerMovement.isMovingLeft(playerDirection)) {
            playerDirection = MovingDirection.IDLE;
        }
        else if (event.keyCode === KEY_RIGHT && PlayerMovement.isMovingRight(playerDirection)) {
            playerDirection = MovingDirection.IDLE;
        } else if (event.keyCode == KEY_SPACE) {
            playerState = PlayerState.IDLE;
            player.setAutoFireReady(true);
            resetAutoFireTimer();
        }
    })
};