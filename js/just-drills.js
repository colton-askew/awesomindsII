//copy original playState and then modify it to create the state for One Crack mode
var playStateJD = Object.create(modeState);

playStateJD.timesAnswered = 0;


playStateJD.btnClick = function(){
  //set cursor back to default; gets stuck as 'hand' otherwise
  game.canvas.style.cursor = "default";
  //disable this button
  this.inputEnabled = false;

  //increment number of answered questions
  if (this.data.correct) {
    game.global.questionsAnswered++;
  }

  game.state.getCurrentState().timesAnswered++;
  game.global.timesAnswered++;
  console.log(game.state.getCurrentState().timesAnswered);

  // removed as AI is gone in modes
  /*
  function btnClickShowAnswers(){
    if(!game.global.answersShown){
      game.state.getCurrentState().showAnswers(true);
    }
  }
  */

  function btnClickSymbolFeedback(){
    //bring in a symbol of right or wrong
    game.global.symbol = game.add.sprite(game.world.x - game.world.width, this.centerY, this.data.correct ? 'check' : 'x');
    game.global.symbol.height = game.global.symbol.width = game.global.borderFrameSize * 3;
    game.global.symbol.anchor.setTo(0.5,0.5);
    game.global.questionUI.add(game.global.symbol);
    game.add.tween(game.global.symbol).to({x: Math.floor(this.x - game.global.symbol.width/3), y: Math.floor(this.y + this.bubbleheight/2)}, 300, Phaser.Easing.Default, true, 0);
    var sounds = this.data.correct ? game.global.rightsounds : game.global.wrongsounds;
    //play sound
    sounds[0].play();
  }

  function btnClickHostFeedback(){
    //points graphic
    if(this.data.correct){
      //set the number of points earned here, use it to load the appropriate graphic and to update the score later
      game.global.pointsToAdd = Math.max(0, 7 - (2 * game.state.getCurrentState().timesAnswered));
      if(game.global.pointsToAdd > 0){
        // var ptsImage = game.add.sprite(game.world.centerX, game.world.height, game.global.pointsToAdd + 'pts');
        var ptsImage = game.add.text(game.world.centerX, game.world.height, game.global.pointsToAdd + ' pts!');
        ptsImage.font = 'Arial';
        ptsImage.fontWeight = 'bold';
        ptsImage.fill = '#ffffff';
        ptsImage.stroke = '#000000';
        ptsImage.strokeThickness = Math.max(game.global.pointsToAdd / 2, 10) * dpr;
        ptsImage.fontSize = Math.max(game.global.pointsToAdd * 4, 40) * dpr;
        var tweenA = game.add.tween(ptsImage).to({x: Math.floor(game.world.centerX - ptsImage.width/2), y: Math.floor(game.world.centerY - ptsImage.height/2)}, 300, Phaser.Easing.Default, false, 0);
        var tweenB = game.add.tween(ptsImage).to({alpha: 0}, 300, Phaser.Easing.Default, false, 300);
        tweenA.chain(tweenB);
        tweenA.start();
        game.global.questionUI.add(ptsImage);
      }
    }
    else {
      game.global.pointsToAdd = 0;
    }
  }

  game.global.timer.stop();
  //game.global.timer.add(100, btnClickShowAnswers, this);
  game.global.timer.add(100, btnClickSymbolFeedback, this);
  game.global.timer.add(500, btnClickHostFeedback, this);
  if(this.data.correct){
    game.global.choiceBubbles.forEach( function(item){ item.inputEnabled = false; } );
    game.global.timer.add(2500, game.state.getCurrentState().animateOut, this, false);
  }
  game.global.timer.start();
};

//changed to remove AI avatars
playStateJD.updateScores = function(){ 
  //update player score

  game.global.totalStats.score += game.global.pointsToAdd;
  console.log("Points to add", game.global.pointsToAdd);

  game.state.getCurrentState().timesAnswered = 0;
  game.global.chars[0].score = game.global.totalStats.score;
  game.state.getCurrentState().update();
}

playStateJD.createTimer = function(){}; //emptied to remove timer visuals

playStateJD.updateTimer = function(){}; //emptied; not using this timer in this mode

playStateJD.update = function(){ //updates points on screen
  var n = parseInt(game.global.chars[0].onScreenScore);
  if (n < game.global.chars[0].score){
      n++;
      game.global.chars[0].onScreenScore = n;
      game.global.chars[0].scoreText.setText("Points: " + game.global.chars[0].onScreenScore);
      if (devmode) console.log("current points: ", game.global.chars[0].onScreenScore); 
    }
};


playStateJD.showAnswers = function(fromButton) {};//show AI's selected answers // overloaded as no AI in modess
playStateJD.getStatLines = function(){
  var percentage;
  if (game.global.questionsAnswered == 0 || game.global.timesAnswered == 0){
    percentage = 0;
  } else {
    percentage = Math.floor((game.global.questionsAnswered / game.global.timesAnswered) * 100);
  }
  //temp numbers to show user, not added to total in database
  game.global.tempTotalScore = game.global.tempTotalScore + game.global.totalStats.score;
  game.global.tempHighScore =  Math.max(game.global.tempHighScore, game.global.totalStats.score);
  console.log('new total is: ' + game.global.tempTotalScore);
  var statLines = [
    game.global.session.play_name,
    "Percentage: " + percentage + "%",
    "Score This Round: " + game.global.totalStats.score,
    "Your Highest Score: " + game.global.tempHighScore,
    "Total Points Earned: " + game.global.tempTotalScore,
  ];
  game.global.tempTotalScore = game.global.tempTotalScore - game.global.totalStats.score;
  return statLines;
};



