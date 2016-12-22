DrawController = {
    resetCanvas: function (canvas, context) {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
    },
    drawPlayer: function (canvas, context, player) {
        context.fillStyle = "#FFF";
        context.fillRect(player.getPosX(), canvas.height - (player.getHeight() * 2), player.getWidth(), player.getHeight());
    },
    drawText: function (context, text, font, width, height, textColor) {
        context.fillStyle = textColor;
        context.font = font;
        context.fillText(text, width, height);
    },
    drawLaser: function(canvas, context, laser, player){
        context.fillStyle = "#FFF";
        context.fillRect(laser.getPosX(), (canvas.height - (player.getHeight() * 2)) + laser.getPosY(), 3, 15);
    }
};