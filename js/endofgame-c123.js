//copy original end of game state and modify it
var endOfGameStateC123 = Object.create(endOfGameState);

endOfGameStateC123.hostMindStates = [
  { min: 70, max: 100, mind: "You have thrived on the frontier!", label: "Thrive", gameOver: false, bonus: 50},
  { min: 50, max: 69, mind: "You have survived on the frontier!", label: "Survive", gameOver: false, bonus: 0},
  { min: 0, max: 49, mind: "You have died on the frontier!", label: "Die", gameOver: true, bonus: 0}
];

endOfGameStateC123.isGameOver = function(mindStateGameOver){
  return mindStateGameOver; //only condition for gameover is if the mindstate says so in this mode
};
