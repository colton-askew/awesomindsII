var preModeState = {
  instructLines : [
    "How to play:\nA question will appear.\nClick/tap the question to make the answer choices appear.\nChoose the right answer as quickly as possible.\n \nEach round has as many questions as are in the chapter.\n \nGoal:\nTo Study!"
  ],
  
  makeHost: function(){
    game.global.jinny = game.add.sprite(0,0, 'jin', 0);
    game.global.hostText = game.add.text(0, 0, 'Jin', game.global.smallerWhiteFont);
    game.global.hostText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    game.global.hostText.padding.x = 5;
    game.global.hostText.alpha = 0;
    game.global.jinny.alpha = 0;
  },

  create: function(){
    console.log("state: premode");
    //Host
    game.global.bonus = 0;
    game.state.getCurrentState().makeHost();
    if (dpr >=2) game.global.jinny.scale.setTo(dpr/4, dpr/4);
    game.global.hostText.centerX = Math.floor(game.global.jinny.centerX);
    game.global.hostText.x = Math.floor(game.global.hostText.x);
    game.global.hostText.y = Math.floor(game.global.jinny.bottom);
    game.add.tween(game.global.logoText).to({x: Math.floor(game.global.jinny.right + game.global.borderFrameSize)}, 60, Phaser.Easing.Default, true, 0);
    this.pregameUI = game.add.group();

    var instructLines = game.state.getCurrentState().instructLines.slice();

    var courseText = game.add.text(game.global.pauseButton.left, game.world.y, game.global.selectedCourseName, game.global.smallerWhiteFont);
    courseText.x = Math.round(courseText.x - courseText.width - game.global.borderFrameSize);
    courseText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    courseText.padding.x = 5;

    game.global.chapterText = game.add.text(game.global.pauseButton.left, Math.floor(courseText.bottom - 5), 'Chapter ' + game.global.selectedChapter, game.global.smallerWhiteFont);
    game.global.chapterText.x = Math.round(game.global.chapterText.x - game.global.chapterText.width - game.global.borderFrameSize);
    game.global.chapterText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    game.global.chapterText.padding.x = 5;

    var prevHeights = 0;
    var speechX = Math.floor(game.global.jinny.right + (game.global.borderFrameSize * 2));
    var speechWidth = Math.floor(game.world.width - (game.global.jinny.width*1.5));
    var sbtweens = [];
    var bubbles = [];
    for (var i = 0; i < instructLines.length; i++) {
      bubbles[i] = game.world.add(new game.global.SpeechBubble(game, speechX, game.global.chapterText.bottom + prevHeights, speechWidth, instructLines[i], true, false, null, false, null, true));
      prevHeights += Math.floor(bubbles[i].bubbleheight + (10 * dpr));
      this.pregameUI.add(bubbles[i]);
      var w = bubbles[i].width;
      bubbles[i].width = 0;
      sbtweens[i] = game.add.tween(bubbles[i]).to({width: w}, 500, Phaser.Easing.Default, false, (i==0) ? 0 : 1000);
      if(i>0){
        sbtweens[i-1].chain(sbtweens[i]);
      }
    }

    game.global.oppImageKeys = game.global.shuffleArray(game.global.oppImageKeys);

    //Dirty fix for opponents being on screen for smaller devices
    game.global.imagecheck = game.add.sprite((game.width + game.width) ,(game.height + game.height), game.global.oppImageKeys[1].imageKey);
    if(dpr>=2) game.global.imagecheck.scale.setTo(dpr/4,dpr/4);
    var image = game.global.imagecheck;

    prevHeights += 10*dpr;

    game.global.chars = [];
    game.global.chars[0] = {};
    //stored score
    game.global.chars[0].score = 0;
    //score for appending onto the string 
    game.global.chars[0].onScreenScore = 0;
    //score on screen
    game.global.chars[0].scoreText = game.add.text(game.world.centerX, 500, "Points: " + game.global.chars[0].onScreenScore, {
      font: "25px Arial",
      fill: "#000000",
      align: "center",
      boundsAlignV: "bottom"
    });


    //create score text on screen 
     /*
     var score = 0;
     var text = game.add.text(game.world.centerX, 500, "Score: " + score, {
      font: "30px Arial",
      fill: "#000000",
      align: "center",
      boundsAlignV: "bottom"
    });

    text.anchor.setTo(0.5, 0.5);
      */
      
    var skip = game.world.add(new game.global.SpeechBubble(game, game.world.centerX, game.height, game.width, "Play", false, true, this.skipFunction));
    skip.x = Math.floor(skip.x - (skip.bubblewidth/2));
    skip.y = Math.floor(bubbles[bubbles.length-1].y + bubbles[bubbles.length-1].bubbleheight + (10*dpr));
    this.pregameUI.add(skip);

    //sbtweens[0].start();
  },
  skipFunction: function(){
    // get a chapter of questions from the database and load them into the questions array
    $.ajax({
      type: 'GET',
      url: 'getquestion.php',
      data: { 'courseid': game.global.selectedCourse, 'chapter': game.global.selectedChapter },
      dataType: 'json',
      success: function(data){
        game.global.questions = [];
        game.global.origQuestions = [];
        for (var i = 0; i < data.length; i++) {
          game.global.origQuestions[i] = $.parseJSON(data[i]["question"]);
        }
        //once the questions are successfully loaded, move to the play state
        game.state.getCurrentState().pregameUI.destroy();
        game.global.isRehash = false;
        game.global.rehashQuestions = [];
        game.global.roundNum = 1;
        game.state.start(game.global.selectedMode.gamestate, false, false);
      }
    });
  },
  update: function(){ //keeps names and crown positioned near their avatar
      //game.global.chars[0].scoreText.x = Math.floor(game.global.chars[0].sprite.right + (10*dpr));
      //game.global.chars[0].scoreText.y = Math.floor(game.global.chars[0].sprite.centerY + (10*dpr));
      }
};

