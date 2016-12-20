PlayerMovement = {
    isMovingRight: function (playerDirection) {
        return playerDirection === MovingDirection.RIGHT;
    },

    isMovingLeft: function (playerDirection) {
        return playerDirection === MovingDirection.LEFT;
    },

    isPlayerIdle: function (playerDirection) {
        return playerDirection === MovingDirection.IDLE;
    },

    canPlayerGoLeft: function(player){
        return player.getPosX() > 0;
    },

    canPlayerGoRight: function(player, canvas){
        return player.getPosX() < (canvas.width - player.getWidth());
    },

    movePlayer: function (playerDirection, player, speed) {
        switch (playerDirection) {
            case MovingDirection.LEFT:
                player.setPosX(player.getPosX() - speed);
                break;
            case MovingDirection.RIGHT:
                player.setPosX(player.getPosX() + speed);
                break;
        }
    }
};

var MovingDirection = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    IDLE: 4
};