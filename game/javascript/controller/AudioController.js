var AudioController = {

    playSound: function (sound) {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }
}