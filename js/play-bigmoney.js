//copy original playState and then modify it to create the state for Big Money mode
var playStateBM = Object.create(playState);

var ptsArr = [100, 0, -100, -100];  // set possible point rewards
var maxGuessCount = 4;
var allGuessesUsed = false;
playStateBM.timesAnswered = 0;

playStateBM.create = function(){
  console.log('state: play');
  if(game.global.isRehash){ //if in rehash round, use the array of questions that were answered incorrectly in the previous round
    game.global.questions = game.global.rehashQuestions;
  } else {
    if(game.global.roundNum == 1){
      //new game, first round
      console.log('new game');
      game.global.questionsBackup = game.global.origQuestions.slice();
      game.global.questions = game.global.shuffleArray(game.global.origQuestions);
      for (var i = 0; i < game.global.chars.length; i++) {
        game.global.chars[i].numCorrect = 0;
      }
    } else {
      //returning on round 2 or higher
      if(game.global.questions.length <= 0){
        game.global.questions = game.global.shuffleArray(game.global.questionsBackup.slice());
      }
    }
  }
  console.log('rehash: ' + game.global.isRehash);
  this.ticks = game.add.group();
  game.global.numQuestions = Math.min( (devmode ? devvars.numQ : 10), game.global.questions.length);
  game.global.questionsAnswered = 0;
  game.global.questionShown = false;
  game.global.answeredBeforeAI = false;
  if(!game.global.isRehash){
    game.global.numOrigQuestions = game.global.numQuestions;
    game.global.totalStats = {
      numRight: 0,
      numWrong: 0,
      score: 0
    };
    for (var i = 0; i < game.global.chars.length; i++) {
      game.global.chars[i].score = 0;
      game.global.chars[i].scoreText.text = 0;
    }
    if(game.global.bonus > 0){
      game.global.totalStats.score = game.global.bonus;
      game.global.chars[0].score = game.global.totalStats.score;
      game.global.bonus = 0;
    }
    game.global.answerBubbles = game.add.group();
  }

  game.global.music.stop();
  game.global.music = game.add.audio('play');
  game.global.music.loop = true;
  game.global.music.play();
  this.enterSound = game.add.audio('question');
  this.enterSound.volume = 0.2;

  //Temporary math fixers
  game.global.answersShown = false;
  game.global.numCor = 0;
  game.global.numWro = 0;
  game.global.lXOffset = 16;
  game.global.rXOffset = 16;
  game.global.winStreak = 1;
  game.global.loseStreak = 1;

  //Host
  game.global.jinny.frame = 0;
  game.global.hostComments = {
    right : ["That's correct","Well done","Good job","Nice going","Nice!","Yes!","You betcha","Good guess","Right!","You got it!","Impressive"],
    wrong : [ "Oh no"," Not quite", "Sorry", "Incorrect", "That's a miss", "Too bad", "Unfortunate", "That's not it", "Nope", "Uh-uh", "Ouch"]
  };
  game.global.jinnySpeech = game.world.add(new game.global.SpeechBubble(game, game.global.jinny.right + (game.global.borderFrameSize * 2), game.global.chapterText.bottom, game.world.width - (game.global.jinny.width*2), game.global.isRehash ? "Welcome to the rehash round!\nThis is a second chance to earn some points on the questions you answered incorrectly.\nCorrect answers are worth 5 points, and your opponents are sitting out this round." : 'Here comes your first question...', true, false, null, false, null, true));

  //animate avatars to the bottom; needed in case this state was skipped to before animation finished in pregame
  var image = game.global.imagecheck;
  for (var i = 0; i < game.global.chars.length; i++) {
    game.add.tween(game.global.chars[i].sprite).to({x: Math.floor(((game.width/game.global.chars.length)*(i+1) -game.width/game.global.chars.length)+(game.width/25))}, 250, Phaser.Easing.Default, true);
  }

  //show the rehash splash or the first question
  if(game.global.isRehash){
    function playBtnClick(){
      game.global.jinnySpeech.destroy();
      this.destroy();
      game.global.jinnySpeech = game.world.add(new game.global.SpeechBubble(game, game.global.jinny.right + (game.global.borderFrameSize * 2), game.global.chapterText.bottom, game.world.width - (game.global.jinny.width*2), 'Here comes your first question...', true, false, null, false, null, true));
      game.state.getCurrentState().showQuestion(game.global.questions.shift());
    }
    var playBtn = game.world.add(new game.global.SpeechBubble(game, game.world.centerX, game.height, game.width, "Play", false, true, playBtnClick));
    playBtn.x = Math.floor(playBtn.x - (playBtn.bubblewidth/2));
    playBtn.y = Math.floor(game.global.jinnySpeech.y + game.global.jinnySpeech.bubbleheight + (10*dpr));
  } else {
    this.showQuestion(game.global.questions.shift());
  }
};

playStateBM.btnClick = function(){
  //set cursor back to default; gets stuck as 'hand' otherwise
  game.canvas.style.cursor = "default";
  //disable this button
  this.inputEnabled = false;

  game.state.getCurrentState().timesAnswered++;
  console.log(game.state.getCurrentState().timesAnswered);

  if(this.data.correct){
    //increment number of answered questions
    game.global.questionsAnswered++;
    if (game.state.getCurrentState().timesAnswered < maxGuessCount) {
      game.global.chars[0].numCorrect++;
    }
  }

  function btnClickShowAnswers(){
    //show AI answers if not already shown
    if(!game.global.answersShown){
      game.state.getCurrentState().showAnswers(true);
      game.global.answeredBeforeAI = true;
    }else{
      game.global.answeredBeforeAI = false;
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
  }

  function btnClickHostFeedback(){
    //set host's attitude based on right or wrong answer
    var speech = this.data.correct ? 'right' : 'wrong';
    var comment = game.global.hostComments[speech][Math.floor(Math.random() * game.global.hostComments[speech].length)];
    if(!this.data.correct) comment += '. Keep guessing!';

    game.global.jinnySpeech.destroy();
    game.global.jinnySpeech = game.world.add(new game.global.SpeechBubble(game, game.global.jinny.right + (game.global.borderFrameSize * 2), game.global.chapterText.bottom, game.world.width - (game.global.jinny.width*2), comment, true, false, null, false, null, true));

    //points graphic
    if(this.data.correct){
      //set the number of points earned here, use it to load the appropriate graphic and to update the score later
      game.global.pointsToAdd = ptsArr[game.state.getCurrentState().timesAnswered - 1];
      console.log("Points to add: " + game.global.pointsToAdd);
      // if game is not over
      if(game.global.pointsToAdd != ptsArr[ptsArr.length - 1]){
        // var ptsImage = game.add.sprite(game.world.centerX, game.world.height, game.global.pointsToAdd + 'pts');
        var ptsImage = game.add.text(game.world.centerX, game.world.height, game.global.pointsToAdd + ' pts!');
        ptsImage.font = 'Arial';
        ptsImage.fontWeight = 'bold';
        ptsImage.fill = '#ffffff';
        ptsImage.stroke = '#000000';
        ptsImage.strokeThickness = 10 * dpr;
        ptsImage.fontSize = 40 * dpr;
        var tweenA = game.add.tween(ptsImage).to({x: Math.floor(game.world.centerX - ptsImage.width/2), y: Math.floor(game.world.centerY - ptsImage.height/2)}, 300, Phaser.Easing.Default, false, 0);
        var tweenB = game.add.tween(ptsImage).to({alpha: 0}, 300, Phaser.Easing.Default, false, 300);
        tweenA.chain(tweenB);
        tweenA.start();
        game.global.questionUI.add(ptsImage);
      }
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
  game.global.timer.start();
};

playStateBM.updateScores = function(answerCorrect, didntAnswer){
  for(i = 1 ; i < game.global.chars.length; i++){
    if(game.global.chars[i].correct){
      game.global.chars[i].numCorrect++;
      game.global.chars[i].score += ptsArr[0];
    }
    else {
      game.global.chars[i].score += ptsArr[2];
    }
  }

  game.global.totalStats.numRight++;

  //update player score
  game.global.totalStats.score += game.global.pointsToAdd;

  // if the user has made the maximum number of guesses to answer a question, set flag
  if (game.state.getCurrentState().timesAnswered >= maxGuessCount) {
    allGuessesUsed = true;
    console.log("All Guesses Used? " + allGuessesUsed);
  }
  
  // if game is not over
  if (!allGuessesUsed) {
    game.state.getCurrentState().timesAnswered = 0;
  }

  game.global.chars[0].score = game.global.totalStats.score;
};

playStateBM.createTimer = function(){}; //emptied to remove timer viBMals

playStateBM.updateTimer = function(){}; //emptied; not using this timer in this mode

playStateBM.update = function(){ //animates scores and keeps score text and names positioned near their respective avatars
  for (var i = 0; i < game.global.chars.length; i++) {
    var n = parseInt(game.global.chars[i].scoreText.text);
    if (n < game.global.chars[i].score){
      n += 5;
      game.global.chars[i].scoreText.text = n;
    }
    else if (n > game.global.chars[i].score){
      n -= 5;
      game.global.chars[i].scoreText.text = n;
    }
    game.global.chars[i].scoreText.x = Math.floor(game.global.chars[i].sprite.right + game.global.borderFrameSize);
    game.global.chars[i].scoreText.y = Math.floor(game.global.chars[i].sprite.centerY + (11*dpr));
    game.global.chars[i].name.x = Math.floor(game.global.chars[i].sprite.centerX - game.global.chars[i].name.width/2);
    game.global.chars[i].name.y = Math.floor(game.global.chars[i].sprite.bottom);
  }
};

playStateBM.showAnswers = function(fromButton) { //show AI's selected answers
  if((!game.global.answersShown) && game.global.questionShown){
    for(i=1;i<game.global.chars.length;i++){
      game.add.tween(game.global.chars[i].answerBubble).to({width: game.global.answerBubbleWidth }, 100, Phaser.Easing.Default, true, 250 * i);
    }
    game.global.answersShown = true;
  }
};

playStateBM.nextQuestion = function(){
  game.state.getCurrentState().removeQuestion();
    //set jin's face to default state
    game.global.jinny.frame = 0;
    if (!allGuessesUsed) {
      if (game.global.questionsAnswered < game.global.numQuestions){
        //console.log("NextQ Option 1 Activated.");
        //still questions left, show the next one
        game.global.jinnySpeech.destroy();
        game.global.jinnySpeech = game.world.add(new game.global.SpeechBubble(game, game.global.jinny.right + (game.global.borderFrameSize * 2), game.global.chapterText.bottom, game.world.width - (game.global.jinny.width*2), "Next question...", true, false, null, false, null, true));
  
        game.state.getCurrentState().showQuestion(game.global.questions.shift());
      } else if (game.global.rehashQuestions.length > 0 && !game.global.isRehash) {
        //console.log("NextQ Option 2 Activated.");
        //if out of questions and any were answered wrong, and this isn't a rehash round, go to rehash round
        game.global.isRehash = true;
        game.global.jinnySpeech.destroy();
        game.state.getCurrentState().ticks.destroy();
        game.state.start('play', false, false);
      } else {
        //console.log("NextQ Option 3 Activated.");
        //out of questions, and everything was right OR this was a rehash round? end the game
        game.global.jinnySpeech.destroy();
        game.state.getCurrentState().ticks.destroy();
        endGame = game.add.audio('endGame');
        endGame.play();
        game.state.start(game.global.selectedMode.endstate, false, false);
      }
    }
    else {
      //console.log("NextQ Option 4 Activated.");
      game.global.jinnySpeech.destroy();
      game.state.getCurrentState().ticks.destroy();
      endGame = game.add.audio('endGame');
      endGame.play();
      game.state.start(game.global.selectedMode.endstate, false, false);
    }
};
