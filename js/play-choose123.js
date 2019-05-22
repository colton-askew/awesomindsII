//copy original playState and then modify it to create the state for Wild Wild Guess mode
var playStateC123 = Object.create(playState);

playStateC123.timesAnswered = 0;

playStateC123.create = function(){
  console.log('state: play');
  if(game.global.isRehash){ //if in rehash round, use the array of questions that were answered incorrectly in the previous round
    game.global.questions = game.global.rehashQuestions;
  } else {
    if(game.global.roundNum == 1){
      //new game, first round
      console.log('new game');
      game.global.questionsBackup = game.global.origQuestions.slice();
      game.global.questions = game.global.shuffleArray(game.global.origQuestions);
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

playStateC123.showChoices = function(){
  this.inputEnabled = false;
  if(game.global.promptShown){
    game.global.promptText.destroy();
    game.global.promptShown = false;
  }

  function setupTimer(){
    var thisState = game.state.getCurrentState();
    thisState.startTime = new Date();
    thisState.totalTime = game.global.selectedMode.totalTime + 1;
    thisState.timeElapsed = 0;
    thisState.createTimer();
    thisState.gameTimer = game.time.events.loop(100, function(){ game.state.getCurrentState().updateTimer() });
    thisState.timerOn = true;
  }

  //Create a button for each choice, and put some data into it in case we need it
  game.global.choiceBubbles = game.add.group();
  var i = 0;
  var prevHeights = 10 *dpr;
  //array to store available letter choices for ai to choose from for this question
  var availChoices = [];
  var tweens = [];
  var question = this.question;
  var shuffChoices = [];
  var answerText = '';
  for (var c in question.choices) {
    availChoices[i] = c;
    shuffChoices[i] = question.choices[c];
    if(c == question.answer[0]) answerText = question.choices[c];
    i++;
  }
  shuffChoices = game.global.shuffleArray(shuffChoices);
  console.log(shuffChoices);
  i = 0;
  for (var c in question.choices) { //create buttons for each choice from the question
    var cbwidth = Math.min(Math.floor(game.world.width - (game.global.jinny.width)), game.global.jinny.width * 5);
    var cb = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.global.bubble.y + game.global.bubble.bubbleheight, cbwidth, shuffChoices[i], false, true, game.state.getCurrentState().btnSelect, true, c));
    cb.y += Math.floor(prevHeights);
    prevHeights += cb.bubbleheight + 10 *dpr;
    tweens[i] = game.add.tween(cb).to({x: Math.floor(game.world.centerX - cb.bubblewidth/2)}, 500, Phaser.Easing.Default, true, 250 * i);
    if(shuffChoices[i] == answerText) question.newAnswer = c;
    cb.data = {
      letter: c,
      text: c + '. ' + shuffChoices[i],
      correct: (shuffChoices[i] == answerText),
      fullQuestion: question
    };
    game.global.choiceBubbles.add(cb);
    availChoices[i] = c;
    i++;
  }
  tweens[tweens.length-1].onComplete.add(setupTimer, this);

  game.global.questionUI.add(game.global.choiceBubbles);
  game.global.questionShown = true;
  if(devmode) console.log('answer' + question.newAnswer);

  // create a button to finalize answer selection
  var b = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.height, game.width, "Finalize Answer(s)", false, true, this.btnClick));
  b.x = Math.floor(b.x - (b.bubblewidth/2));
  b.y = Math.floor(prevHeights + (b.bubbleheight + 10 * dpr) * 4);
  // animate button entrance
  var bTween = game.add.tween(b).to({x: Math.floor(game.world.centerX - b.bubblewidth/2)}, 500, Phaser.Easing.Default, true, 250 * 4);
  bTween.start();

  //determine AI answers
  for(i=1; i<game.global.chars.length; i++){
    if(game.global.chars[i].correct){
      game.global.chars[i].answerBubble = game.world.add(new game.global.SpeechBubble(game, Math.floor(game.global.chars[i].sprite.right + game.global.borderFrameSize), Math.floor(game.global.chars[i].sprite.centerY - 20), game.world.width, question.newAnswer, true, false));
    }else{
      choice = availChoices[Math.floor(Math.random() * availChoices.length)];
      answer = question.newAnswer;
      //strip any whitespace so comparisons will work
      answer = answer.replace(/(^\s+|\s+$)/g,"");
      choice = choice.replace(/(^\s+|\s+$)/g,"");

      //randomize answer so it isn't the correct one.
      while(choice == answer){
        choice = availChoices[Math.floor(Math.random() * availChoices.length)];
      }
      game.global.chars[i].answerBubble = game.world.add(new game.global.SpeechBubble(game, Math.floor(game.global.chars[i].sprite.right + game.global.borderFrameSize), Math.floor(game.global.chars[i].sprite.centerY - 20), game.world.width, choice, true, false));
    }
    //save width so we can set to 0 and tween to it later
    game.global.answerBubbleWidth = game.global.chars[i].answerBubble.width;
    game.global.chars[i].answerBubble.width = 0;
    game.global.answerBubbles.add(game.global.chars[i].answerBubble);
  }
};

// selects answers to use, but does not actually submit the answers
playStateC123.btnSelect = function() {
  // set cursor back to default; gets stuck as 'hand' otherwise
  game.canvas.style.cursor = "default";
  // update selected options
  if (this.alpha == 1) {
    this.alpha = 0.25;
    game.global.choices.selected
  } else {
    this.alpha = 1;
  }
};

// submits the previously selected answers
playStateC123.btnClick = function(){
  //set cursor back to default; gets stuck as 'hand' otherwise
  game.canvas.style.cursor = "default";
  //disable this button
  this.inputEnabled = false;

  if(this.data.correct){
    //increment number of answered questions
    game.global.questionsAnswered++;
  }

  game.state.getCurrentState().timesAnswered++;
  console.log(game.state.getCurrentState().timesAnswered);

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
      game.global.pointsToAdd = Math.max(0, 20 - (5 * game.state.getCurrentState().timesAnswered));
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

playStateC123.updateScores = function(answerCorrect, didntAnswer){
  for(i = 1 ; i < game.global.chars.length; i++){
    if(game.global.chars[i].correct){
      game.global.chars[i].score += 15;
    }
  }

  game.global.totalStats.numRight++;

  //update player score
  game.global.totalStats.score += game.global.pointsToAdd;

  game.state.getCurrentState().timesAnswered = 0;
  game.global.chars[0].score = game.global.totalStats.score;
}

playStateC123.createTimer = function(){}; //emptied to remove timer visuals

playStateC123.updateTimer = function(){}; //emptied; not using this timer in this mode

playStateC123.update = function(){ //animates scores and keeps score text and names positioned near their respective avatars
  for (var i = 0; i < game.global.chars.length; i++) {
    var n = parseInt(game.global.chars[i].scoreText.text);
    if (n < game.global.chars[i].score){
      n++;
      game.global.chars[i].scoreText.text = n;
    }
    game.global.chars[i].scoreText.x = Math.floor(game.global.chars[i].sprite.right + game.global.borderFrameSize);
    game.global.chars[i].scoreText.y = Math.floor(game.global.chars[i].sprite.centerY + (11*dpr));
    game.global.chars[i].name.x = Math.floor(game.global.chars[i].sprite.centerX - game.global.chars[i].name.width/2);
    game.global.chars[i].name.y = Math.floor(game.global.chars[i].sprite.bottom);
  }
};

playStateC123.showAnswers = function(fromButton) { //show AI's selected answers
  if((!game.global.answersShown) && game.global.questionShown){
    for(i=1;i<game.global.chars.length;i++){
      game.add.tween(game.global.chars[i].answerBubble).to({width: game.global.answerBubbleWidth }, 100, Phaser.Easing.Default, true, 250 * i);
    }
    game.global.answersShown = true;
  }
}
