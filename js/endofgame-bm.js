//copy original end of game state and modify it
var endOfGameStateBM = Object.create(endOfGameState);

endOfGameStateBM.hostMindStates = [
  { min: 70, max: 100, mind: "You hit the jackpot - big money!", label: "Big Money", gameOver: false, bonus: 0},
  { min: 50, max: 69, mind: "You won some spare change!", label: "Little Money", gameOver: false, bonus: 0},
  { min: 0, max: 49, mind: "You're broke!", label: "No Money", gameOver: true, bonus: 0}
  ];
  
  endOfGameStateBM.isGameOver = function(mindStateGameOver){
    return mindStateGameOver; //only condition for gameover is if the mindstate says so in this mode
  };

  endOfGameStateBM.makeStatUI = function(){
    var mindStates = game.state.getCurrentState().hostMindStates.slice();
    // calculate score based off of number of questions answered
    var score = Math.min(100, Math.floor(((game.global.totalStats.score) / (game.global.questionsAnswered * game.global.selectedMode.maxPtsPerQ)) * 100));

    if(score > mindStates[0].min){
      //if awesomind, be happy
      game.global.jinny.frame = 2;
    }

    // DEV LOG
    if (devmode) {
      console.log("Total questions answered: " + game.global.questionsAnswered);
      console.log("Score: " , score);
    }

    var mindStateToUse = mindStates[mindStates.length];
    // set up visual areas for score ranges
    for (var i = 0; i < mindStates.length; i++) {
      // check if score is negative (if so, use lowest scoring mindstate)
      if (score < 0) {
        mindStateToUse = mindStates[mindStates.length - 1];
        break;
      } else {
        if(score >= mindStates[i].min && score <= mindStates[i].max){
          mindStateToUse = mindStates[i];
          break;
        }
      }
    }

    var winningScore = 0;
    for (var i = 0; i < game.global.chars.length; i++) { // calculate top score first for tie purposes
      winningScore = Math.max(winningScore, game.global.chars[i].score);
    }

    var gameOver = game.state.getCurrentState().isGameOver(mindStateToUse.gameOver);
    game.state.getCurrentState().buttons = game.state.getCurrentState().optionButtons(gameOver);
    game.state.getCurrentState().statLines = game.state.getCurrentState().getStatLines(gameOver);
    game.global.bonus = mindStateToUse.bonus;

    var btns = [ {text: 'Stats', clickFunction: game.state.getCurrentState().viewStatsClick} ];
    if(!gameOver) btns.push({text: 'Play Next Round', clickFunction: game.state.getCurrentState().playAgainClick});
    btns.push({text: 'Quit', clickFunction: game.state.getCurrentState().chooseCourseClick});

    var prevHeightsBtns = game.global.chapterText.bottom;
    var maxBtnWidth = 0;
    for (var b in btns) {
      var btn = game.world.add(new game.global.SpeechBubble(game, game.world.width, prevHeightsBtns, Math.floor(game.world.width - (game.global.jinny.width*2)), btns[b].text, false, true, btns[b].clickFunction));
      btn.x = Math.floor(game.world.width - (btn.bubblewidth + game.global.borderFrameSize));
      game.state.getCurrentState().endGameUI.add(btn);
      prevHeightsBtns += btn.bubbleheight + 5;
      maxBtnWidth = Math.max(maxBtnWidth, btn.bubblewidth);
    }

    game.global.jinnySpeech.destroy();
    game.global.jinnySpeech = game.world.add(new game.global.SpeechBubble(game, game.global.jinny.right + (game.global.borderFrameSize * 2), game.global.chapterText.bottom, game.world.width - (game.global.jinny.width + maxBtnWidth + 10), mindStateToUse.mind, true, false, null, false, null, true));
    this.endGameUI.add(game.global.jinnySpeech);

    // ## Leaving the follow code in case the game challenge results chart is to be restored at a later point ##
    // // convert score + progress bars to percentage
    // for (var i = 0; i < game.global.chars.length; i++) {
    //   this.endGameUI.add(game.global.chars[i].gfx);
    //   this.endGameUI.add(game.global.chars[i].barSprite);
    //   var topBar = Math.min(game.global.chars[i].score, game.global.questionsAnswered * game.global.selectedMode.maxPtsPerQ);
    //   // calculate correct answer percentage (between 0 and 100, even if score is negative)
    //   var scorePercent = Math.max(Math.floor(((topBar) / (game.global.questionsAnswered * game.global.selectedMode.maxPtsPerQ)) * 100), 0);
    //   var y = game.global.mapNum(scorePercent, 0, 100, (game.global.selectedMode.id == 0) ? game.global.chars[i].crown.y : game.global.chars[i].sprite.y, prevHeightsBtns + 5);
    //   scorePercentLabel = game.add.bitmapText(game.global.chars[i].sprite.centerX, (game.global.selectedMode.id == 0) ? game.global.chars[i].crown.y : game.global.chars[i].sprite.y, '8bitoperator', scorePercent + '%', 11 * dpr);
    //   scorePercentLabel.x = Math.floor(game.global.chars[i].sprite.centerX - scorePercentLabel.width/2);
    //   scorePercentLabel.y = Math.floor(((game.global.selectedMode.id == 0) ? game.global.chars[i].crown.y : game.global.chars[i].sprite.y) - (scorePercentLabel.height*2));
    //   scorePercentLabel.tint = 0x000044;
    //   this.endGameUI.add(scorePercentLabel);
    //   // game.add.tween(scorePercentLabel).to({y: y}, 500, Phaser.Easing.Default, true, 250); game.global.chars[i].numJewels
    //   game.add.tween(game.global.chars[i].barSprite).to({height: Math.max(((game.global.selectedMode.id == 0) ? game.global.chars[i].crown.y : game.global.chars[i].sprite.y) - y, 1)}, 500, Phaser.Easing.Default, true, 250);
    //   this.endGameUI.add(game.global.chars[i].barSprite);
    //   if(game.global.chars[i].score == winningScore){
    //     var medal = game.add.sprite(game.global.chars[i].sprite.x, (game.global.selectedMode.id == 0) ? game.global.chars[i].crown.y : game.global.chars[i].sprite.y, 'medal');
    //     medal.width = game.global.chars[i].sprite.width;
    //     medal.height = game.global.chars[i].sprite.height;
    //     this.endGameUI.add(medal);
    //     game.add.tween(medal).to({y: y + (scorePercentLabel.height*2)}, 500, Phaser.Easing.Default, true, 250);
    //   }
    // }

    // var lineGfx = game.add.graphics(0,0);
    // this.endGameUI.add(lineGfx);
    // lineGfx.lineStyle(1, 0x333333, 1);

    // //loop mindstates again to add the labels on top of the progress bars
    // for (var i = 0; i < mindStates.length; i++) {
    //   var lineYposition = game.global.mapNum(mindStates[i].max, 0, 100, (game.global.selectedMode.id == 0) ? game.global.chars[0].crown.y : game.global.chars[0].sprite.y, prevHeightsBtns + 5);
    //   lineGfx.moveTo(0, lineYposition);
    //   lineGfx.lineTo(game.world.width, lineYposition);
    //   var label = game.add.text(game.world.centerX, lineYposition, mindStates[i].label, game.global.whiteFont);
    //   label.x -= label.width/2;
    //   label.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    //   label.padding.x = 5;
    //   label.z++;
    //   this.endGameUI.add(label);
    // }

    game.state.getCurrentState().statsUI = game.add.group();
    game.state.getCurrentState().statsUI.visible = false;
    var statBG = game.add.graphics(0, 0);
    statBG.lineStyle(2, 0x000000, 1);
    statBG.beginFill(0x078EB7, 1);
    var rect = statBG.drawRoundedRect(game.world.x + 10, game.global.jinnySpeech.y + game.global.jinnySpeech.bubbleheight + 5, game.world.width - 20, game.world.height - game.global.jinny.height - 10, 10);
    game.state.getCurrentState().statsUI.add(statBG);

    var statLines = game.state.getCurrentState().statLines;

    var prevHeights = game.global.jinnySpeech.y + game.global.jinnySpeech.bubbleheight + 5;
    for (var i = 0; i < statLines.length; i++) {
      var t = game.add.text(game.world.centerX, prevHeights, statLines[i], game.global.whiteFont);
      t.x -= t.width/2;
      t.y += t.height;
      t.x = Math.round(t.x);
      t.y = Math.round(t.y);
      t.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
      t.padding.x = 5;
      prevHeights += t.height;
      game.state.getCurrentState().statsUI.add(t);
    }
    prevHeights += t.height;

    var buttons = game.state.getCurrentState().buttons;

    for (var i = 0; i < buttons.length; i++) {
      var b = game.world.add(new game.global.SpeechBubble(game, game.world.centerX, prevHeights + game.global.borderFrameSize, Math.floor(game.world.width - (game.global.jinny.width*2)), buttons[i].text, false, true, buttons[i].function));
      b.centerX -= Math.floor(b.bubblewidth/2);
      prevHeights += b.bubbleheight + game.global.borderFrameSize;
      game.state.getCurrentState().statsUI.add(b);
    }

    game.state.getCurrentState().endGameUI.add(game.state.getCurrentState().statsUI);
  };

  endOfGameStateBM.update = function(){ //animates scores and keeps score text and names positioned near their respective avatars
    for (var i = 0; i < game.global.chars.length; i++) {
      // remove score bars
      game.global.chars[i].barSprite.destroy();
      // modify original score text to be above each characters' sprite
      game.global.chars[i].scoreText.fontSize = 30 * dpr;
      game.global.chars[i].scoreText.x = Math.floor(game.global.chars[i].sprite.centerX - (game.global.chars[i].sprite.width * 0.4));
      game.global.chars[i].scoreText.y = Math.floor(game.global.chars[i].sprite.centerY - (game.global.chars[i].sprite.height * 0.75));
    }
  };
  