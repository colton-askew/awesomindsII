//copy original end of game state and modify it
var endOfGameStateBM = Object.create(endOfGameState);

endOfGameStateBM.hostMindStates = [
    { min: 70, max: 100, mind: "You have an awesomind!", label: "Awesomind", gameOver: false, bonus: 0},
    { min: 50, max: 69, mind: "You have an averagemind!", label: "Averagemind", gameOver: false, bonus: 0},
    { min: 0, max: 49, mind: "You should nevermind!", label: "Nevermind", gameOver: true, bonus: 0}
  ];
  
  endOfGameStateBM.isGameOver = function(mindStateGameOver){
    return mindStateGameOver; //only condition for gameover is if the mindstate says so in this mode
  };