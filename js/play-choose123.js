//copy original playState and then modify it to create the state for Choose 1, 2, or 3 game challenge
var playStateC123 = Object.create(playState);

playStateC123.timesAnswered = 0;
playStateC123.selectedAnswers = [ "", "", "" ];
playStateC123.selectedAnswerCount = 0;
playStateC123.correctAnswer = "";
playStateC123.isCorrect = false;

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
  // DEV LOG
  if (devmode) {
    console.log("question: " , question);
  }
  var shuffChoices = [];
  var answerText = '';
  for (var c in question.choices) {
    availChoices[i] = c;
    shuffChoices[i] = question.choices[c];
    if(c == question.answer[0]) answerText = question.choices[c];
    i++;
  }
  shuffChoices = game.global.shuffleArray(shuffChoices);
  // DEV LOG
  if (devmode) {
    console.log("shuffChoices: " , shuffChoices);
  }
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
  // DEV LOG
  if (devmode) {
    console.log("question.newAnswer: " , question.newAnswer);
  }
  playStateC123.correctAnswer = question.newAnswer;

  // create a button to confirm answer selection
  var bConfirm = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.height, game.width, "Confirm", false, true, game.state.getCurrentState().btnClick));
  bConfirm.x = Math.floor(bConfirm.x - (bConfirm.bubblewidth/2));
  bConfirm.y = Math.floor(prevHeights + (bConfirm.bubbleheight + 10 * dpr) * 4);
  // animate button entrance
  var bTween = game.add.tween(bConfirm).to({x: Math.floor(game.world.centerX - bConfirm.bubblewidth/2)}, 500, Phaser.Easing.Default, true, 250 * 4);
  bTween.start();
  game.global.confirmButton = bConfirm;

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
    // look for first empty selectedAnswer index and add selected answer to the array
    for (var i = 0; i < playStateC123.selectedAnswers.length; i++) {
      if (playStateC123.selectedAnswers[i] == "") {
        playStateC123.selectedAnswers[i] = this.data.letter;
        playStateC123.selectedAnswerCount++;
        this.alpha = 0.25;
        break;
      }
    }
  } else {
    // look for selected answer in selectedAnswer array and clear it
    for (var i = 0; i < playStateC123.selectedAnswers.length; i++) {
      if (playStateC123.selectedAnswers[i] == this.data.letter) {
        playStateC123.selectedAnswers[i] = "";
        playStateC123.selectedAnswerCount--;
        this.alpha = 1;
        break;
      }
    }
  }
  // DEV LOG
  if (devmode) {
    console.log("Selected Answers: " , playStateC123.selectedAnswers);
  }
};

// submits the previously selected answers
playStateC123.btnClick = function(){
  //set cursor back to default; gets stuck as 'hand' otherwise
  game.canvas.style.cursor = "default";

  // ensure user has selected at least one answer
  if (playStateC123.selectedAnswerCount == 0) {
    var comment = "Please select at least one answer.";
    game.global.jinnySpeech.destroy();
    game.global.jinnySpeech = game.world.add(new game.global.SpeechBubble(game, game.global.jinny.right + (game.global.borderFrameSize * 2), game.global.chapterText.bottom, game.world.width - (game.global.jinny.width*2), comment, true, false, null, false, null, true));
  } else {
    //disable this button (Confirm button)
    this.inputEnabled = false;
    // DEV LOG
    if (devmode) {
      console.log("Correct Answer: " , (playStateC123.correctAnswer));
    }

    for (var i = 0; i < playStateC123.selectedAnswers.length; i++) {
      // DEV LOG
      if (devmode) {
        console.log("Selected Answer #" , i , ": " , playStateC123.selectedAnswers[i]);
      }
      // check if any of the selected answers are correct
      if (playStateC123.selectedAnswers[i] === (playStateC123.correctAnswer)) {
        // increment number of answered questions
        playStateC123.isCorrect = true;
        break;
      }
    }
      
    game.global.questionsAnswered++;
    game.state.getCurrentState().timesAnswered++;
    // DEV LOG
    if (devmode) {
      console.log("isCorrect: " , playStateC123.isCorrect);
      console.log("Times answered: " , game.state.getCurrentState().timesAnswered);
      console.log("Questions answered: " ,  game.global.questionsAnswered);
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
      // check if user selected the correct answer or not
      if (playStateC123.isCorrect) {
        // loop through answers (text bubble objects)
        game.global.choiceBubbles.forEach( function(item){
          // check for selected buttons
          if (item.alpha < 1) {
            if(item.data.correct){
              // animate a check symbol
              var check = game.add.sprite(game.world.x - game.world.width, item.centerY, 'check');
              check.height = check.width = game.global.borderFrameSize * 3;
              check.anchor.setTo(0.5,0.5);
              game.global.questionUI.add(check);
              game.add.tween(check).to({x: Math.floor(item.x - check.width/3), y: Math.floor(item.y + item.bubbleheight/2)}, 300, Phaser.Easing.Default, true, 0);
            } else {
              // animate an X symbol
              var arrow = game.add.sprite(game.world.x - game.world.width, item.centerY, 'x');
              arrow.height = arrow.width = game.global.borderFrameSize * 3;
              arrow.anchor.setTo(0.5,0.5);
              game.global.questionUI.add(arrow);
              game.add.tween(arrow).to({x: Math.floor(item.x - arrow.width/3), y: Math.floor(item.y + item.bubbleheight/2)}, 300, Phaser.Easing.Default, true, 0);
            }
          }
        });
      } else {
        // check if user has selected at least one answer
        if (playStateC123.selectedAnswerCount > 0) {
          // loop through answers (text bubble objects)
          game.global.choiceBubbles.forEach( function(item){
            if(!item.data.correct){
              // check for selected buttons
              if (item.alpha < 1) {
                // animate an X symbol
                var xMark = game.add.sprite(game.world.x - game.world.width, item.centerY, 'x');
                xMark.height = xMark.width = game.global.borderFrameSize * 3;
                xMark.anchor.setTo(0.5,0.5);
                game.global.questionUI.add(xMark);
                game.add.tween(xMark).to({x: Math.floor(item.x - xMark.width/3), y: Math.floor(item.y + item.bubbleheight/2)}, 300, Phaser.Easing.Default, true, 0);
              }
            } else {
              var arrow = game.add.sprite(game.world.x - game.world.width, item.centerY, 'arrow');
              arrow.height = arrow.width = game.global.borderFrameSize * 3;
              arrow.anchor.setTo(0.5,0.5);
              game.global.questionUI.add(arrow);
              game.add.tween(arrow).to({x: Math.floor(item.x - arrow.width/3), y: Math.floor(item.y + item.bubbleheight/2)}, 300, Phaser.Easing.Default, true, 0);
            }
          });
        }
      }
      var sounds = playStateC123.isCorrect ? game.global.rightsounds : game.global.wrongsounds;
      //play sound
      sounds[0].play();
    }

    function btnClickHostFeedback(){
      //set host's attitude based on right or wrong answer
      var speech = playStateC123.isCorrect ? 'right' : 'wrong';
      var comment = game.global.hostComments[speech][Math.floor(Math.random() * game.global.hostComments[speech].length)];

      game.global.jinnySpeech.destroy();
      game.global.jinnySpeech = game.world.add(new game.global.SpeechBubble(game, game.global.jinny.right + (game.global.borderFrameSize * 2), game.global.chapterText.bottom, game.world.width - (game.global.jinny.width*2), comment, true, false, null, false, null, true));

      //points graphic
      if(playStateC123.isCorrect){
        //set the number of points earned here, use it to load the appropriate graphic and to update the score later
        game.global.pointsToAdd = Math.max(0, 20 - (5 * playStateC123.selectedAnswerCount));
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
      } else {
        game.global.pointsToAdd = 0;
      }
    }

    game.global.timer.stop();
    game.global.timer.add(100, btnClickShowAnswers, this);
    game.global.timer.add(100, btnClickSymbolFeedback, this);
    game.global.timer.add(500, btnClickHostFeedback, this);
    game.global.choiceBubbles.forEach( function(item){ item.inputEnabled = false; } );
    game.global.timer.add(2500, game.state.getCurrentState().animateOut, this, false);
    game.global.timer.start();
  }
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
};

playStateC123.animateOut = function(didntAnswer){
  game.state.getCurrentState().timerOn = false;
  game.add.tween(game.global.questionUI).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
  game.add.tween(game.global.confirmButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);

  makeBars = function(correct, didntAnswer){
    /*
     * create horizontal progress bars for each player
     * and animate them
     */
    game.state.getCurrentState().updateScores(correct, didntAnswer);
    for (var i = 0; i < game.global.chars.length; i++) {
      if(game.global.questionsAnswered <= 1 && !game.global.isRehash){
        game.global.chars[i].gfx = game.add.graphics(0,0);
        game.global.chars[i].gfx.visible = false;
        game.global.chars[i].gfx.beginFill(0x02C487, 1);
        game.global.chars[i].gfx.drawRect(game.global.chars[i].sprite.x, (game.global.selectedMode.id == 0) ? game.global.chars[i].crown.y : game.global.chars[i].sprite.y, game.global.chars[i].sprite.width, 1);
        game.global.chars[i].barSprite = game.add.sprite(game.global.chars[i].sprite.x, (game.global.selectedMode.id == 0) ? game.global.chars[i].crown.y : game.global.chars[i].sprite.y, game.global.chars[i].gfx.generateTexture());
        game.global.chars[i].barSprite.anchor.y = 1;
      }
      game.add.tween(game.global.chars[i].barSprite).to({height: Math.max(game.global.chars[i].score, 1)}, 1000, Phaser.Easing.Default, true, 0);
    }
  };
  // makeBars();

  /*
   * remove answers from screen
   */
  removeAnswers = function(){
    game.global.answersShown = false;
    game.global.answerBubbles.destroy();
    game.global.answerBubbles = game.add.group();
  };

  game.global.timer.stop();
  game.global.timer.add(200, removeAnswers, game.state.getCurrentState());
  //game.global.timer.add(200, game.global.confirmButton.destroy(), game.state.getCurrentState());
  game.global.timer.add(600, makeBars, game.state.getCurrentState(), playStateC123.isCorrect, !playStateC123.isCorrect);
  game.global.timer.add(2000, game.state.getCurrentState().nextQuestion, game.state.getCurrentState());
  game.global.timer.start();
};

/*
 * Reveal next question
 * if max number of questions reached
 * switch state to endOfGame state
 */
playStateC123.nextQuestion = function(){
  // reset state variables for next question
  for (var i = 0; i < playStateC123.selectedAnswers.length; i++) {
   playStateC123.selectedAnswers[i] = "";
  }
  playStateC123.selectedAnswerCount = 0;
  playStateC123.correctAnswer = "";
  playStateC123.isCorrect = false;
  game.state.getCurrentState().removeQuestion();
  //set jin's face to default state
  game.global.jinny.frame = 0;
  if (game.global.questionsAnswered < game.global.numQuestions){
    //still questions left, show the next one
    game.global.jinnySpeech.destroy();
    game.global.jinnySpeech = game.world.add(new game.global.SpeechBubble(game, game.global.jinny.right + (game.global.borderFrameSize * 2), game.global.chapterText.bottom, game.world.width - (game.global.jinny.width*2), "Next question...", true, false, null, false, null, true));
    game.state.getCurrentState().showQuestion(game.global.questions.shift());
  } else if (game.global.rehashQuestions.length > 0 && !game.global.isRehash) {
    //if out of questions and any were answered wrong, and this isn't a rehash round, go to rehash round
    game.global.isRehash = true;
    game.global.jinnySpeech.destroy();
    game.state.getCurrentState().ticks.destroy();
    game.state.start('play', false, false);
  } else {
    //out of questions, and everything was right OR this was a rehash round? end the game
    game.global.jinnySpeech.destroy();
    game.state.getCurrentState().ticks.destroy();
    endGame = game.add.audio('endGame');
    endGame.play();
    game.state.start(game.global.selectedMode.endstate, false, false);
  }
};

playStateC123.removeQuestion = function(){
  game.global.questionUI.destroy();
  game.global.questionShown = false;
};

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
};
