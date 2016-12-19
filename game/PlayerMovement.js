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

    calculatePlayerPos: function (playerDirection, player) {
        switch (playerDirection) {
            case MovingDirection.LEFT:
                player.setPosX(player.getPosX() - 10);
                break;
            case MovingDirection.RIGHT:
                player.setPosX(player.getPosX() + 10);
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