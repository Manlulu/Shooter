var WeaponsMovement = {
    moveWeapon: function(lasers, speed) {
        for (var i = 0; i < lasers.length; i++) {
            lasers[i].setPosY(lasers[i].getPosY() - speed);
        }
    }
};