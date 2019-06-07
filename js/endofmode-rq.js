var endOfModeStateRQ = Object.create(endOfGameState);

endOfModeStateRQ.isGameOver = function(mindStateGameOver){
    var winnerFound = false;
    for (var i = 0; i < game.global.chars.length; i++) {
      if(game.global.chars[i].numJewels >= 5){
        winnerFound = true;
        break;
      }
    }
    mindStateGameOver = false;
    return (mindStateGameOver || winnerFound);
  }