EnemyController = {
    setEnemyPosition: function (enemy) {
        enemy.setPosX(enemy.getPosX() + 1);
    },
    isOutOfScreen: function (enemy, canvas) {
        return enemy.getPosX() > canvas.width;
    },
    removeEnemy: function (enemyList, pos) {
        enemyList[pos] = null;
        enemyList.splice(pos, 1);
    },
    spawnEnemy: function (enemyList, timer) {
        if (timer <= 0 && enemyList.length < 4) {
            enemyList.push(new Enemy(100, 30, 40, 10));
            timer = Math.floor(Math.random() * 200) + 100;
        }
        return timer;
    },
    checkEnemyHit: function (enemy, laser) {
        return ((laser.getPosX() < enemy.getPosX() &&
        laser.getPosX() + laser.getWidth() > enemy.getPosX() ||
        laser.getPosX() > enemy.getPosX() && enemy.getPosX() + enemy.getWidth() > laser.getPosX() ||
        enemy.getPosX() + enemy.getWidth() > laser.getPosX() &&
        enemy.getPosX() + enemy.getWidth() < laser.getPosX() + laser.getWidth())

        && (enemy.getPosY() + enemy.getHeight() >= laser.getPosY() &&
        enemy.getPosY() <= laser.getPosY()));
    }
};