//copy original playState and then modify it to create the state for One Crack mode
var playStateJD = Object.create(modeState);

playStateJD.timesAnswered = 0;

playStateJD.btnClick = function(){
  //set cursor back to default; gets stuck as 'hand' otherwise
  game.canvas.style.cursor = "default";
  //disable this button
  this.inputEnabled = false;

  //increment number of answered questions
  game.global.questionsAnswered++;


  game.state.getCurrentState().timesAnswered++;
  console.log(game.state.getCurrentState().timesAnswered);

  function btnClickShowAnswers(){
    //show AI answers if not already shown
    if(!game.global.answersShown){
      game.state.getCurrentState().showAnswers(true);
    }
  }

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
    if (devmode) console.log("choice bubbles: ", game.global.choiceBubbles);
    if (!this.data.correct) {
      var count;
      for (count = 0; count < game.global.choiceBubbles.children.length; count++) {
        if (game.global.choiceBubbles.children[count].data.correct) {      
          game.global.symbol = game.add.sprite(game.world.x - game.world.width, game.global.choiceBubbles.children[count].centerY, 'check');
          game.global.symbol.height = game.global.symbol.width = game.global.borderFrameSize * 3;
          game.global.symbol.anchor.setTo(0.5,0.5);
          game.global.questionUI.add(game.global.symbol);
          game.add.tween(game.global.symbol).to({x: Math.floor(game.global.choiceBubbles.children[count].x - game.global.symbol.width/3), y: Math.floor(game.global.choiceBubbles.children[count].y + game.global.choiceBubbles.children[count].bubbleheight/2)}, 300, Phaser.Easing.Default, true, 0);
        }
      }
    }
  }

  function btnClickHostFeedback(){
    //set host's attitude based on right or wrong answer
    var speech = this.data.correct ? 'right' : 'wrong';
    var comment = game.global.hostComments[speech][Math.floor(Math.random() * game.global.hostComments[speech].length)];
    
    game.global.jinnySpeech.destroy();
    game.global.jinnySpeech = game.world.add(new game.global.SpeechBubble(game, game.global.jinny.right + (game.global.borderFrameSize * 2), game.global.chapterText.bottom, game.world.width - (game.global.jinny.width*2), comment, true, false, null, false, null, true));

    //points graphic
    if(this.data.correct){
      //set the number of points earned here, use it to load the appropriate graphic and to update the score later
      game.global.pointsToAdd =  5 ;
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
  game.global.timer.add(100, btnClickShowAnswers, this);
  game.global.timer.add(100, btnClickSymbolFeedback, this);
  game.global.timer.add(500, btnClickHostFeedback, this);
  if(this.data.correct){
    game.global.choiceBubbles.forEach( function(item){ item.inputEnabled = false; } );
    game.global.timer.add(2500, game.state.getCurrentState().animateOut, this, false);
  }
  else {
    game.global.choiceBubbles.forEach( function(item){ item.inputEnabled = false; } );
    game.global.timer.add(2500, game.state.getCurrentState().animateOut, this, false);  
  }
  game.global.timer.start();
};

//changed to remove AI avatars
playStateJD.updateScores = function(){ 

  game.global.totalStats.numRight++;

  //update player score
  game.global.totalStats.score += game.global.pointsToAdd;
  console.log("Totalstats score:", game.global.totalStats.score);

  console.log("Points to add", game.global.pointsToAdd);

  game.state.getCurrentState().timesAnswered = 0;
  game.global.chars[0].score = game.global.totalStats.score;
}

playStateJD.createTimer = function(){}; //emptied to remove timer visuals

playStateJD.updateTimer = function(){}; //emptied; not using this timer in this mode

playStateJD.update = function(){ //animates scores and keeps score text and names positioned near their respective avatars
  var n = parseInt(game.global.chars[0].scoreText.text);
  if (n < game.global.chars[0].score){
    n++;
    game.global.chars[0].scoreText.text = n;
  }
  game.global.chars[0].scoreText.x = Math.floor(game.global.chars[0].sprite.right + game.global.borderFrameSize);
  game.global.chars[0].scoreText.y = Math.floor(game.global.chars[0].sprite.centerY + (11*dpr));
  game.global.chars[0].name.x = Math.floor(game.global.chars[0].sprite.centerX - game.global.chars[0].name.width/2);
  game.global.chars[0].name.y = Math.floor(game.global.chars[0].sprite.bottom);
};


playStateJD.showAnswers = function(fromButton) {};//show AI's selected answers
