DrawController = {
    resetCanvas: function (canvas, context) {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
    },
    drawPlayer: function (canvas, context, player) {
        context.fillStyle = "#FFF";
        context.fillRect(player.getPosX(), player.getPosY(), player.getWidth(), player.getHeight());
    },
    drawText: function (context, text, font, width, height, textColor) {
        context.fillStyle = textColor;
        context.font = font;
        context.fillText(text, width, height);
    },
    drawLaser: function(canvas, context, laser){
        context.fillStyle = "#FFF";
        context.fillRect(laser.getPosX(), laser.getPosY(), laser.getWidth(), laser.getHeight());
    },
    drawEnemy: function(canvas, context, enemy){
        context.beginPath();
        context.fillStyle = "#FFF";
        context.fillRect(enemy.getPosX(), enemy.getPosY(), enemy.getWidth(), enemy.getHeight());
    },
    drawMenuLine: function(context){
        context.beginPath();
        context.strokeStyle = "#FFF";
        context.moveTo(0, 40);
        context.lineTo(800,40);
        context.stroke();
    },
    drawScore: function(context, score, highScore){
        context.fillStyle = "#FFF";
        context.font = "20px Verdana";
        context.fillText("Score: " + score + "         HighScore: " + highScore, 20, 30);
    }
};