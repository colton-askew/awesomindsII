//copy original end of game state and modify it
var endOfGameStateJD = Object.create(endOfModeState);


endOfGameStateJD.isGameOver = function(mindStateGameOver){
  return mindStateGameOver; //only condition for gameover is if the mindstate says so in this mode
};

endOfGameStateJD.getStatLines = function(gameOver){
    var statLines = [
      game.global.session.play_name,
      "Percentage: " + Math.floor((game.global.questionsAnswered / game.global.timesAnswered) * 100) + "%",
      "Score This Round: " + game.global.totalStats.score,
      "Your Highest Score: " + game.global.scoreData["high_score"],
      "Total Points Earned: " + game.global.scoreData["total_score"],
    ];
    return statLines;
};