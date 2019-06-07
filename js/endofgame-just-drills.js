//copy original end of game state and modify it
var endOfGameStateJD = Object.create(endOfModeState);

endOfGameStateJD.hostMindStates = [
  { min: 70, max: 100, mind: "You have thrived on the frontier!", label: "Thrive", gameOver: false, bonus: 0},
  { min: 50, max: 69, mind: "You have survived on the frontier!", label: "Survive", gameOver: false, bonus: 0},
  { min: 0, max: 49, mind: "You have died on the frontier!", label: "Die", gameOver: true, bonus: 0}
];

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