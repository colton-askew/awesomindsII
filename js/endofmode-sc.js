var endOfModeStateSC = Object.create(endOfGameState);

endOfModeStateSC.optionButtons = function(){
    console.log('in buttons');
    var buttonsTemplate = [
        { text: 'Continue', function: game.state.getCurrentState().continueClick},
        { text: 'Select Different Course', function: game.state.getCurrentState().chooseCourseClick },
        { text: 'Select Different Game', function: game.state.getCurrentState().chooseChapterClick },
        { text: 'Log Out', function: game.state.getCurrentState().logOutClick }
      ];
      var buttons = [];

      for (var i = 0; i < buttonsTemplate.length; i++) {
        buttons.push(buttonsTemplate[i]);
      }
      return buttons;
};
endOfModeStateSC.getStatLines = function(){
    console.log('in statsline');
    var statLines = [
      game.global.session.play_name,
      
      "Score This Round: " + game.global.totalStats.score,
      "Your Highest Score: " + game.global.scoreData["high_score"],
      "Total Points Earned: " + game.global.scoreData["total_score"],
    ];
    return statLines;
};
  
endOfModeStateSC.create = function(){
    console.log('state: endofgame');

    //create ui group to destroy when switching back to play state
    this.endGameUI = game.add.group();

    $(function (){
      $.ajax({
        url: 'getscore.php',
        data: 'courseid=' + game.global.selectedCourse + '&chapter=' + game.global.selectedChapter + '&game_mode=' + game.global.selectedMode.id,
        success: function(data){
          game.global.scoreData = $.parseJSON(data);
          //if no data is returned, set up new data and insert it
          if(game.global.scoreData == null){
            game.global.scoreData = {
              chapter: game.global.selectedChapter,
              courseid: game.global.selectedCourse,
              high_score: game.global.totalStats.score,
              total_score: game.global.totalStats.score,
              game_mode: game.global.selectedMode.id,
              times_played: 1
            };

            $(function (){
              $.ajax({
                type: 'POST',
                url: 'insertscore.php',
                data: game.global.scoreData,
                success: function(data){
                  game.state.getCurrentState().makeStatUI();
                }
              });
            });

          }else{
            //if we got data, it's in game.global.scoreData and can be updated
            game.global.scoreData["total_score"] = parseInt(game.global.scoreData["total_score"]) + game.global.totalStats.score;
            game.global.scoreData["high_score"] = Math.max(parseInt(game.global.scoreData["high_score"]), game.global.totalStats.score);
            game.global.scoreData["times_played"] = parseInt(game.global.scoreData["times_played"]) + 1;
            $(function (){
              $.ajax({
                type: 'POST',
                url: 'updatescore.php',
                data: game.global.scoreData,
                success: function(data){
                  game.state.getCurrentState().makeStatUI();
                }
              });
            });
          }

        }
      });
    });
  };
  endOfModeStateSC.isGameOver = function(){
    console.log('game is over due to stop');
  };

  endOfModeStateSC.makeStatUI = function(){
      
    var score = game.global.totalStats.score;
    game.state.getCurrentState().buttons = game.state.getCurrentState().optionButtons();
    game.state.getCurrentState().statLines = game.state.getCurrentState().getStatLines();
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
    game.state.getCurrentState().statsUI.visible = !game.state.getCurrentState().statsUI.visible;
  };
  modeStateSC.continueClick = function(){
    game.global.music.stop();
    game.state.start('premodeSC');
  }

