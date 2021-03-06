//copy original playState and then modify it to create the state for Rate Questions
var modeStateRQ = Object.create(modeState);

modeStateRQ.timesAnswered = 0;


modeStateRQ.btnClick = function(){
  //set cursor back to default; gets stuck as 'hand' otherwise
  game.canvas.style.cursor = "default";
  //disable this button
  this.inputEnabled = false;
  rateSelected = false;
  

  game.state.getCurrentState().timesAnswered++;
  console.log(game.state.getCurrentState().timesAnswered);

  /*
  function btnClickShowAnswers(){
    console.log("AI asleep");
  }
  */
  
  function btnClickSymbolFeedback(){
    //Show answer is pressed, revealing the answer
    if (game.global.answerPressed){
      console.log('show answer pressed');
      game.global.answersShown = true;
      game.global.choiceBubbles.forEach( function(item){
        if(item.data.correct){
          item.inputEnabled = true;
          var check = game.add.sprite(game.world.x - game.world.width, item.centerY, 'check');
          check.height = check.width = game.global.borderFrameSize * 3;
          check.anchor.setTo(0.5,0.5);
          game.global.questionUI.add(check);
          game.add.tween(check).to({x: Math.floor(item.x - check.width/3), y: Math.floor(item.y + item.bubbleheight/2)}, 300, Phaser.Easing.Default, true, 0);
        }
      });
      game.add.tween(game.global.answerButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
      game.global.answerPressed = false;
    }
    else if (!game.global.answersShown){
      console.log('this should never happen');
      game.global.answerPressed = true;
    }
    else {
      console.log('answer selected');
      createRateButtons();

    }
  }
  function createRateButtons(){

    //Create easy and medium button, as they serve the same purpose
    var prevHeights = game.global.prevHeights;
    //easy
    // create Easy
    
    var bEasy = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.global.bubble.y + game.global.bubble.bubbleheight, game.width, "Easy", false, true, easyClicked));
    bEasy.x = Math.floor(bEasy.x - (bEasy.bubblewidth/2) - 150);
    bEasy.y += Math.floor(prevHeights);
    
    // animate button entrance
    var bTween = game.add.tween(bEasy).to({x: Math.floor(game.world.centerX - bEasy.bubblewidth/2 - 150)}, 500, Phaser.Easing.Default, true, 250 * 4);
    bTween.start();
    game.global.easyButton = bEasy;

    // create Medium
    var bMedium = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.global.bubble.y + game.global.bubble.bubbleheight, game.width, "Medium", false, true, mediumClicked));
    bMedium.x = Math.floor(bMedium.x - (bMedium.bubblewidth/2));
    bMedium.y += Math.floor(prevHeights);
    // animate button entrance
    var bTween = game.add.tween(bMedium).to({x: Math.floor(game.world.centerX - bMedium.bubblewidth/2)}, 500, Phaser.Easing.Default, true, 250 * 4);
    bTween.start();
    game.global.mediumButton = bMedium;

    // create Hard
    var bHard = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.global.bubble.y + game.global.bubble.bubbleheight, game.width, "Hard", false, true, hardClicked));
    bHard.x = Math.floor(bHard.x - (bHard.bubblewidth/2) + 150);
    bHard.y += Math.floor(prevHeights);
    // animate button entrance
    var bTween = game.add.tween(bHard).to({x: Math.floor(game.world.centerX - bHard.bubblewidth/2 + 150)}, 500, Phaser.Easing.Default, true, 250 * 4);
    bTween.start();
    game.global.hardButton = bHard;

    

  }
  
  function easyClicked(){
    console.log('easy clicked');
    rateSelected = true;
    game.global.choiceBubbles.forEach( function(item){ item.inputEnabled = false; } );
    game.global.timer.add(2500, game.state.getCurrentState().animateOut, this, false);
    game.global.questionsAnswered++;
  }
  function mediumClicked(){
    console.log('medium clicked');
    
    game.global.choiceBubbles.forEach( function(item){ item.inputEnabled = false; } );
    game.global.timer.add(2500, game.state.getCurrentState().animateOut, this, false);
    game.global.questionsAnswered++;
  }
  function hardClicked(){
    console.log('hard clicked');
    game.state.getCurrentState().hardButton();
    
    game.global.choiceBubbles.forEach( function(item){ item.inputEnabled = false; } );
    game.global.timer.add(2500, game.state.getCurrentState().animateOut, this, false);
    game.global.questionsAnswered++;
  }
  function btnClickHostFeedback(){
    console.log('Annabelle cant talk');
  }
  
  
  console.log('timer');
  game.global.timer.stop();
//  game.global.timer.add(100, btnClickShowAnswers, this);
  game.global.timer.add(100, btnClickSymbolFeedback, this);
  game.global.timer.add(500, btnClickHostFeedback, this);
  
  game.global.timer.start();
};
modeStateRQ.hardButton = function(){
  //console.log(game.global.selectedChapter);
  //console.log(game.global.selectedCourse);
  //sets hard to 1 in database, marked as hard question
  var id = game.global.questionIDs.shift();
  
  
  
    game.global.questionData = {
      courseid: game.global.selectedCourse,
      questionid: id,
      hard: 1
    };
    

    game.global.questionData["questionid"] = id;
    game.global.questionData["hard"] = 1;
    console.log('ID is : ' + game.global.questionData["questionid"]);
    $(function (){
      $.ajax({
        type: 'POST',
        url: 'updatedifficulty.php',
        data: { 'questionid': game.global.questionData["questionid"], 'hard': game.global.questionData["hard"] },
        success: function(data){
          console.log('Success, set to hard');
          console.log(game.global.questionData["hard"]);
          console.log(game.global.questionData["questionid"]);
        }
      });
    });

}
modeStateRQ.showChoices = function(){
  console.log('inside mode-ratequestion show choices')
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
      if(c == question.answer[0]){
        answerText = question.choices[c];
        game.global.answerText = answerText;
      } 
      i++;
    }
    shuffChoices = game.global.shuffleArray(shuffChoices);
    console.log(shuffChoices);
    i = 0;
    for (var c in question.choices) { //create buttons for each choice from the question
      var cbwidth = Math.min(Math.floor(game.world.width - (game.global.jinny.width)), game.global.jinny.width * 5);
      var cb = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.global.bubble.y + game.global.bubble.bubbleheight, cbwidth, shuffChoices[i], false, true, game.state.getCurrentState().btnClick, true, c));
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
      console.log("Button heights: " + prevHeights);
    }
    tweens[tweens.length-1].onComplete.add(setupTimer, this);
    console.log("After choices: " + prevHeights);
    game.global.prevHeights = prevHeights;
    game.global.questionUI.add(game.global.choiceBubbles);
    
    
    game.global.questionShown = true;
    if(devmode) console.log('answer' + question.newAnswer);
    game.global.choiceBubbles.forEach( function(item){ item.inputEnabled = false; } );
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
  //show answer button
    console.log('show answer here, prevHeight is: ' + prevHeights);
    // create a button to show answer selection
    
    
    var bAnswer = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.global.bubble.y + game.global.bubble.bubbleheight, game.width, "Show Answer", false, true, game.state.getCurrentState().btnClick));
    bAnswer.x = Math.floor(bAnswer.x - (bAnswer.bubblewidth/2));
    bAnswer.y += Math.floor(prevHeights);
    
    // animate button entrance
    var bTween = game.add.tween(bAnswer).to({x: Math.floor(game.world.centerX - bAnswer.bubblewidth/2)}, 500, Phaser.Easing.Default, true, 250 * 4);
    bTween.start();
    game.global.answerButton = bAnswer;
    game.global.answerPressed = true;
    game.global.prevHeights = prevHeights;
        
};

modeStateRQ.updateScores = function(answerCorrect, didntAnswer){
  //update player score

  game.global.pointsToAdd = 1;
  game.global.totalStats.score += game.global.pointsToAdd;
  console.log("Points to add", game.global.pointsToAdd);

  game.state.getCurrentState().timesAnswered = 0;
  game.global.chars[0].score = game.global.totalStats.score;
  game.state.getCurrentState().update();
},

modeStateRQ.animateOut = function(didntAnswer){
  console.log('animate out');
  game.state.getCurrentState().timerOn = false;
  game.add.tween(game.global.questionUI).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
  game.add.tween(game.global.easyButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
  game.add.tween(game.global.mediumButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
  game.add.tween(game.global.hardButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
 
  
  //game.global.questionUI.destroy();
  //game.global.easyButton.destroy();
  //game.global.mediumButton.destroy();
  //game.global.hardButton.destroy();
  

  makeBars = function(correct, didntAnswer){
    
    // * create horizontal progress bars for each player
    // * and animate them
     
    game.state.getCurrentState().updateScores(correct, didntAnswer);
  }
    /*
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
  }
  // makeBars();
*/

  /*
   * remove answers from screen
   */
  removeAnswers = function(){
    game.global.answersShown = false;
    game.global.answerBubbles.destroy();
    game.global.answerBubbles = game.add.group();
  };
  removeElse = function(){
    game.global.questionUI.destroy();
    game.global.easyButton.destroy();
    game.global.mediumButton.destroy();
    game.global.hardButton.destroy();
  };

  game.global.timer.stop();
  game.global.timer.add(200, removeAnswers, game.state.getCurrentState());
  game.global.timer.add(200, removeElse, game.state.getCurrentState());
  game.global.timer.add(600, makeBars, game.state.getCurrentState(), this.data.correct, didntAnswer);
  game.global.timer.add(2000, game.state.getCurrentState().nextQuestion, game.state.getCurrentState());
  game.global.timer.start();
};
modeStateRQ.createTimer = function(){}; //emptied to remove timer visuals

modeStateRQ.updateTimer = function(){}; //emptied; not using this timer in this mode

modeStateRQ.update = function(){ //animates scores and keeps score text and names positioned near their respective avatars
  var n = parseInt(game.global.chars[0].onScreenScore);
  if (n < game.global.chars[0].score){
      n++;
      game.global.chars[0].onScreenScore = n;
      game.global.chars[0].scoreText.setText("Points: " + game.global.chars[0].onScreenScore);
      if (devmode) console.log("current points: ", game.global.chars[0].onScreenScore); 
    }
};

modeStateRQ.showAnswers = function(fromButton) { //show AI's selected answers
  if((!game.global.answersShown) && game.global.questionShown){
    for(i=1;i<game.global.chars.length;i++){
      game.add.tween(game.global.chars[i].answerBubble).to({width: game.global.answerBubbleWidth }, 100, Phaser.Easing.Default, true, 250 * i);
    }
    game.global.answersShown = true;
  }
}

modeStateRQ.nextQuestion = function(){
  game.state.getCurrentState().removeQuestion();
  //set jin's face to default state
  game.global.jinny.frame = 0;
  if (game.global.questionsAnswered < game.global.numQuestions){
    //still questions left, show the next one
    game.global.jinnySpeech.destroy();
    game.global.jinnySpeech = game.world.add(new game.global.SpeechBubble(game, game.global.jinny.right + (game.global.borderFrameSize * 2), game.global.chapterText.bottom, game.world.width - (game.global.jinny.width*2), "Next question...", true, false, null, false, null, true));
    game.global.jinny.alpha = 0;
    game.global.jinnySpeech.alpha = 0;

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