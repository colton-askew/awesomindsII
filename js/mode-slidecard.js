//copy original playState and then modify it to create the state for Rate Questions
var modeStateSC = Object.create(modeState);

modeStateSC.timesAnswered = 0;


modeStateSC.btnClick = function(){
  //set cursor back to default; gets stuck as 'hand' otherwise
  game.canvas.style.cursor = "default";
  //disable this button
  this.inputEnabled = false;
  rateSelected = false;
  

  game.state.getCurrentState().timesAnswered++;
  console.log(game.state.getCurrentState().timesAnswered);

  function btnClickShowAnswers(){
    console.log("AI asleep");
  }

  function btnClickSymbolFeedback(){
    console.log('unused buttonclick symbol');
  }

  function btnClickHostFeedback(){
    console.log('no host');
  }
  
  
  console.log('timer');
  game.global.timer.stop();
  game.global.timer.add(100, btnClickShowAnswers, this);
  game.global.timer.add(100, btnClickSymbolFeedback, this);
  game.global.timer.add(500, btnClickHostFeedback, this);
  
  game.global.timer.start();
};

modeStateSC.showQuestion = function(question){
  if(devmode) console.log('questions left: ' + game.global.questions.length );
    if (game.global.questionShown){
      game.state.getCurrentState().removeQuestion();
    }
    game.global.questionUI = game.add.group();

    game.global.questionShown = false;
    game.global.answeredBeforeAI = false;
    game.global.answersShown = false;

    //AI win %
    if(game.global.winStreak % 4 == 0){
      for(i = 1; i < game.global.chars.length; i++){
        if(game.global.chars[i].chance >= 80){
          game.global.chars[i].chance = 80;
        }
        else{game.global.chars[i].chance += 5;}
      }
    }else if(game.global.loseStreak % 4 == 0){
      for(i = 1; i < game.global.chars.length; i++){
        if(game.global.chars[i].chance <= 25){
          game.global.chars[i].chance = 25;
        }
        else{game.global.chars[i].chance -= 5;}
      }
    }

    //new question
    var prefix = game.global.isRehash ? 'REHASH ' : '';
    var questionNumText = game.add.text(game.world.width, Math.floor(game.global.logoText.bottom + 5), prefix + 'Q#: ' + (game.global.questionsAnswered + 1) + '\nScore: ' + game.global.totalStats.score, game.global.smallerWhiteFont);
    questionNumText.x = Math.round(questionNumText.x - questionNumText.width - game.global.borderFrameSize);
    questionNumText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    questionNumText.padding.x = 5;
    game.global.questionUI.add(questionNumText);

    
    
    game.global.question = question;

    //console.log(question.answer[0]);
    //Create a button for each choice, and put some data into it in case we need it
    var i = 0;
    //array to store available letter choices for ai to choose from for this question
    var availChoices = [];

    
    console.log('question retrieved');
    var shuffChoices = [];
    var answerText = '';

    for (var c in question.choices) {
      availChoices[i] = c;
      shuffChoices[i] = question.choices[c];
      console.log(question.choices[c]);
      if(c == question.answer[0]){
        answerText = question.choices[c];

        console.log("answer is " + answerText);
        //game.global.answerText = answerText;
      }
      i++
    }
    //load images to place sprites properly in game world
    var TmpImg = game.cache.getImage('yellow');
    

    // set up for answer text ('yellow' is an asset and can be switched out as needed)
    sprite2 = game.add.sprite(game.world.centerX - TmpImg.width/2.0,game.world.centerY - TmpImg.height/2.0 - 100, 'yellow');
    
    var style2 = { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: sprite2.width, align: "center" };
    answerCard = game.add.text(game.world.centerX - TmpImg.width/2.0,game.world.centerY - TmpImg.height/2.0 - 100, answerText, style2);
    answerCard.anchor.set(0.5);
    
    
    //set up for question card text ('yellow' is an asset and can be switched out as needed)
    

    sprite = game.add.sprite(game.world.centerX - TmpImg.width/2.0,game.world.centerY - TmpImg.height/2.0 - 100, 'yellowSlider');
    sprite.inputEnabled = true;
    sprite.input.enableDrag();
    sprite.input.allowVerticalDrag = false;
    
    var style = { font: "16px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: sprite.width, align: "center" };

    questionCard = game.add.text(game.world.centerX - TmpImg.width/2.0,game.world.centerY - TmpImg.height/2.0 - 100, question.question, style);
    questionCard.anchor.set(0.5);
    

    //animation
    
    this.enterSound.play();

    //ai
    game.global.winThreshold = Math.floor(Math.random() * 100) + 1;
    //console.log('ai wins if over ' + game.global.winThreshold);
    for(i = 1; i < game.global.chars.length; i++){
      //console.log('ai loses');
      //game.global.chars[i].correct = (game.global.winThreshold <= game.global.chars[i].chance);
    }

    
    game.global.questionShown = true;
    createButtons();
    game.state.getCurrentState().showChoices;
    
    function createButtons(){
      var TmpImg = game.cache.getImage('yellow');
      var prevHeights = 300 *dpr;   //Fix this later
      //console.log('create rate buttons')
      // create no idea
      var bNoIdea = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.height, game.width, " Had No Idea", false, true, noIdeaClicked));
      bNoIdea.x = Math.floor(bNoIdea.x - (bNoIdea.bubblewidth/2 - 200 ));
      bNoIdea.y = Math.floor(prevHeights + (bNoIdea.bubbleheight + 10 * dpr) * 4);
      // animate button entrance
      var bTween = game.add.tween(bNoIdea).to({x: Math.floor(game.world.centerX - bNoIdea.bubblewidth/2 - 200)}, 500, Phaser.Easing.Default, true, 250 * 4);
      bTween.start();
      game.global.noIdeaButton = bNoIdea;

      // create wrong
      var bWrong = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.height, game.width, "Got It Wrong", false, true, wrongClicked));
      bWrong.x = Math.floor(bWrong.x - (bWrong.bubblewidth/2) + 150 );
      bWrong.y = Math.floor((prevHeights + 50 + (bWrong.bubbleheight + 10 * dpr) * 4) );
      // animate button entrance
      var bTween = game.add.tween(bWrong).to({x: Math.floor(game.world.centerX - bWrong.bubblewidth/2 - 150)}, 500, Phaser.Easing.Default, true, 250 * 4);
      bTween.start();
      game.global.wrongButton = bWrong;

      // create partial right
      var bPratial = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.height, game.width, "Partially Right", false, true, partialClicked));
      bPratial.x = Math.floor(bPratial.x - (bPratial.bubblewidth/2) - 30);
      bPratial.y = Math.floor(prevHeights + (bPratial.bubbleheight + 10 * dpr) * 4);
      // animate button entrance
      var bTween = game.add.tween(bPratial).to({x: Math.floor(game.world.centerX - bPratial.bubblewidth/2 - 30)}, 500, Phaser.Easing.Default, true, 250 * 4);
      bTween.start();
      game.global.partialButton = bPratial;

      // create Lucky guess
      var bLucky = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.height, game.width, "Lucky Guess", false, true, luckyClicked));
      bLucky.x = Math.floor(bLucky.x - (bLucky.bubblewidth/2) + 9 );
      bLucky.y = Math.floor(prevHeights + 50 + (bLucky.bubbleheight + 10 * dpr) * 4);
      // animate button entrance
      var bTween = game.add.tween(bLucky).to({x: Math.floor(game.world.centerX - bLucky.bubblewidth/2 + 9)}, 500, Phaser.Easing.Default, true, 250 * 4);
      bTween.start();
      game.global.luckyButton = bLucky;

       // create got it button
       var bGotIt = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.height, game.width, "Got It", false, true, gotItClicked));
       bGotIt.x = Math.floor(bGotIt.x - (bGotIt.bubblewidth/2) + 105 );
       bGotIt.y = Math.floor(prevHeights + (bGotIt.bubbleheight + 10 * dpr) * 4);
       // animate button entrance
       var bTween = game.add.tween(bGotIt).to({x: Math.floor(game.world.centerX - bGotIt.bubblewidth/2 + 105)}, 500, Phaser.Easing.Default, true, 250 * 4);
       bTween.start();
       game.global.gotItButton = bGotIt;

      // create tooEasy button
      var bTooEasy = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.height, game.width, "Too Easy", false, true, tooEasyClicked));
      bTooEasy.x = Math.floor(bTooEasy.x - (bTooEasy.bubblewidth/2) + 150);
      bTooEasy.y = Math.floor(prevHeights + 50 + (bTooEasy.bubbleheight + 10 * dpr) * 4);
      // animate button entrance
      var bTween = game.add.tween(bTooEasy).to({x: Math.floor(game.world.centerX - bTooEasy.bubblewidth/2 + 150)}, 500, Phaser.Easing.Default, true, 250 * 4);
      bTween.start();
      game.global.tooEasyButton = bTooEasy;
  

      // create Doesn't Work
      var bDoesntWork = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.height, game.width, "Doesnt work", false, true, doesntWorkClicked));
      bDoesntWork.x = Math.floor(bDoesntWork.x - (bDoesntWork.bubblewidth/2 - 600));
      bDoesntWork.y = Math.floor(prevHeights + 180 + (bDoesntWork.bubbleheight + 10 * dpr) * 4);
      // animate button entrance
      var bTween = game.add.tween(bDoesntWork).to({x: Math.floor(game.world.centerX - bDoesntWork.bubblewidth/2 - 600)}, 500, Phaser.Easing.Default, true, 250 * 4);
      bTween.start();
      game.global.doesntWorkButton = bDoesntWork;

      // create Stop
      var bStop = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, game.height, game.width, "STOP", false, true, stopClicked));
      bStop.x = Math.floor(bStop.x - (bStop.bubblewidth/2));
      bStop.y = Math.floor(prevHeights + 180 + (bStop.bubbleheight + 10 * dpr) * 4);
      // animate button entrance
      var bTween = game.add.tween(bStop).to({x: Math.floor(game.world.centerX - bStop.bubblewidth/2)}, 500, Phaser.Easing.Default, true, 250 * 4);
      bTween.start();
      game.global.stopButton = bStop;
  
  
    }
    // create buttons
    function stopClicked(){
      game.state.getCurrentState().animateOut(0);
      
    }
    function tooEasyClicked(){
      
      
      game.state.getCurrentState().animateOut(1);
    }
    //number based on number of questions the current question is reshuffled into
    function gotItClicked(){
      
      game.state.getCurrentState().animateOut(15);
    }
  
    function partialClicked(){
      
      
      game.state.getCurrentState().animateOut(9);
    }

    function luckyClicked(){
      
      
      game.state.getCurrentState().animateOut(12);
    }
  
    function wrongClicked(){
     
      
      game.state.getCurrentState().animateOut(6);
    }
  
    function noIdeaClicked(){
      
      
      game.state.getCurrentState().animateOut(3);
    }
  
    function doesntWorkClicked(){
      
      game.state.getCurrentState().animateOut(1);
    }
};
modeStateSC.showChoices = function(){
  console.log('inside mode-ratequestion show choices, nothing happens here')
};
modeStateSC.updateScores = function(){
  console.log('in updatescores')
  game.global.pointsToAdd = 2;
  game.global.totalStats.score += game.global.pointsToAdd;
  console.log("Points to add", game.global.pointsToAdd);

  game.state.getCurrentState().timesAnswered = 0;
  game.global.chars[0].score = game.global.totalStats.score;
  game.state.getCurrentState().update();
  game.global.totalStats.numRight++;
}

modeStateSC.animateOut = function(number){
  console.log('animate out');
  
  game.add.tween(game.global.questionUI).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
  //destory sprites
  //console.log('destroying sprites');
  questionCard.destroy();
  answerCard.destroy();
  sprite2.destroy();
  sprite.destroy();
  

  //destroy buttons
 // console.log('destroying buttons');
  // game.add.tween(game.global.stopButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
  // game.add.tween(game.global.luckyButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
  // game.add.tween(game.global.wrongButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
  // game.add.tween(game.global.partialButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
  // game.add.tween(game.global.gotItButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
  // game.add.tween(game.global.noIdeaButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0);
  // game.add.tween(game.global.doesntWorkButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0)
  // game.add.tween(game.global.tooEasyButton).to({x: game.world.x - game.world.width}, 300, Phaser.Easing.Default, true, 0)
  
  game.global.stopButton.destroy();
  game.global.luckyButton.destroy();
  game.global.wrongButton.destroy();
  game.global.partialButton.destroy();
  game.global.gotItButton.destroy();
  game.global.noIdeaButton.destroy();
  game.global.doesntWorkButton.destroy();
  game.global.tooEasyButton.destroy();
  console.log('finished destroying');
  game.state.getCurrentState().updateScores();

  
  
  removeAnswers = function(){
    game.global.answersShown = false;
    game.global.answerBubbles.destroy();
    game.global.answerBubbles = game.add.group();
  };

  game.state.getCurrentState().nextQuestion(number);
  
};

modeStateSC.nextQuestion = function(number){
  game.state.getCurrentState().removeQuestion();
  //switch case for different buttons pressed splice is number - 1
  console.log('number pressed' + number);
  switch (number){
    case 0:
      console.log('stop clicked');
      endGame = game.add.audio('endGame');
      endGame.play();
      game.state.start(game.global.selectedMode.endstate, false, false);
      break;
    case 1:
      console.log('doesnt work, mark for removal');
      break;
    case 3:
      if ((game.global.numQuestions - game.global.questionsAnswered) > 3){
        console.log('no idea, resuffle to 3');
        game.global.questions.splice(2,0, game.global.question);
      }
      else {
        console.log('end of question array reached');
        game.global.questions.push(game.global.question);
      }
      break;

    case 6:
        if ((game.global.numQuestions - game.global.questionsAnswered) > 6){
          console.log('wrong, reshuffle 6');
          game.global.questions.splice(5,0, game.global.question);
        }
        else {
          console.log('end of question array reached');
          game.global.questions.push(game.global.question);
        }
        break;
    case 9:
        
      if ((game.global.numQuestions - game.global.questionsAnswered) > 9){
        console.log('partial correct, move 9');
        game.global.questions.splice(8,0, game.global.question);
      }
      else {
        console.log('end of question array reached');
        game.global.questions.push(game.global.question);
      }
      break;
    case 12:
      if ((game.global.numQuestions - game.global.questionsAnswered) > 12){
        console.log('lucky guess, move 12');
        game.global.questions.splice(11,0, game.global.question);
      }
      else {
        console.log('end of question array reached');
        game.global.questions.push(game.global.question);
      }
      break;
    case 15:
      if ((game.global.numQuestions - game.global.questionsAnswered) > 15){
        console.log('right, move 15');
        game.global.questions.splice(14,0, game.global.question);
      }
      else {
        console.log('end of question array reached');
        game.global.questions.push(game.global.question);
      }
      break;
  }
  if (number != 0){
    game.global.questionsAnswered++;
    game.global.numQuestions = Math.min( (devmode ? devvars.numQ : 10), game.global.questions.length);
    game.state.getCurrentState().showQuestion(game.global.questions.shift());
  }
  

  
};
modeStateSC.createTimer = function(){}; //emptied to remove timer visuals

modeStateSC.updateTimer = function(){}; //emptied; not using this timer in this mode

modeStateSC.update = function(){ //animates scores and keeps score text and names positioned near their respective avatars
  var n = parseInt(game.global.chars[0].onScreenScore);
  if (n < game.global.chars[0].score){
      n++;
      game.global.chars[0].onScreenScore = n;
      game.global.chars[0].scoreText.setText("Points: " + game.global.chars[0].onScreenScore);
      if (devmode) console.log("current points: ", game.global.chars[0].onScreenScore); 
  }
  questionCard.x = Math.floor(sprite.x + sprite.width / 2);
  questionCard.y = Math.floor(sprite.y + sprite.height / 2);
  answerCard.x = Math.floor(sprite2.x + sprite2.width / 2);
  answerCard.y = Math.floor(sprite2.y + sprite2.height / 2); 
};

modeStateSC.showAnswers = function(fromButton) { //show AI's selected answers
  if((!game.global.answersShown) && game.global.questionShown){
    for(i=1;i<game.global.chars.length;i++){
      game.add.tween(game.global.chars[i].answerBubble).to({width: game.global.answerBubbleWidth }, 100, Phaser.Easing.Default, true, 250 * i);
    }
    game.global.answersShown = true;
  }
}


