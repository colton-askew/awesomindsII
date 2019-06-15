var menuModeState = {
  create: function(){
    var back = game.world.add(new game.global.SpeechBubble(game, game.world.x, game.world.y, game.world.width, 'Back', false, true, menuModeState.backButton));

    var courseText = game.add.text(game.global.pauseButton.left, game.world.y, game.global.selectedCourseName, game.global.smallerWhiteFont);
    courseText.x = Math.round(courseText.x - courseText.width - game.global.borderFrameSize);
    courseText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    courseText.padding.x = 5;

    var chapterText = game.add.text(game.global.pauseButton.left, Math.floor(courseText.bottom - 5), 'Chapter ' + game.global.selectedChapter, game.global.smallerWhiteFont);
    chapterText.x = Math.round(chapterText.x - chapterText.width - game.global.borderFrameSize);
    chapterText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    chapterText.padding.x = 5;

    var text = game.add.text(game.world.centerX + 1000, Math.floor(chapterText.bottom), 'Which type of game would you like to play?', game.global.whiteFont);
    game.add.tween(text).to({x: Math.floor(game.world.centerX - (text.width/2))}, 100, Phaser.Easing.Default, true, 0);
    text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    text.padding.x = 5;
    text.style.wordWrap = true;
    text.style.wordWrapWidth = game.world.width - (game.global.borderFrameSize * 2);

    var modes = [
      { name: 'Countdown Crown', desc: 'The faster you respond, the more points you get', prestate: 'pregame', gamestate: 'play', id: 0, endstate: 'endOfGame', maxPtsPerQ: 25, totalTime: 25},
      { name: 'Wild Wild Guess', desc: 'Keep guessing until you get it right\n(Best for beginners)', prestate: 'pregameSU', gamestate: 'playSU', id: 1, endstate: 'endOfGameWWG', maxPtsPerQ: 15, totalTime: 25},
      { name: 'Time Bonus', desc: 'The faster you respond, the more points you get', prestate: 'pregameTB', gamestate: 'playTB', id: 2, endstate: 'endOfGameTB', maxPtsPerQ: 25, totalTime: 10},
      { name: 'One Crack', desc: 'You only get one choice\n 15 points if you are correct', prestate: 'pregameOC', gamestate: 'playOC', id: 3, endstate: 'endOfGameOC', maxPtsPerQ: 15, totalTime: 25},
      { name: 'Big Money', desc: 'Keep choosing until you get the right answer', prestate: 'pregameBM', gamestate: 'playBM', id: 4, endstate: 'endOfGameBM', maxPtsPerQ: 100, totalTime: 25},
      { name: 'Choose 1, 2, or 3', desc: 'Choose up to 3 of the options displayed', prestate: 'pregameC123', gamestate: 'playC123', id: 5, endstate: 'endOfGameC123', maxPtsPerQ: 15, totalTime: 25},
      { name: 'Keep Choosing', desc: 'Keep selecting options until you find the right one.\n(Best for beginners)', prestate: 'pregameKC', gamestate: 'playKC', id: 6, endstate: 'endOfGameKC', maxPtsPerQ: 15, totalTime: 25},
      { name: 'Just Drills', desc: 'Studying Mode!\n 5 points if you are correct', prestate: 'pregameJD', gamestate: 'playJD', id: 7, endstate: 'endOfGameJD', maxPtsPerQ: 5, totalTime: 25}, 
      { name: 'Rate Question', desc: 'Rate Question based on difficulty', prestate: 'premodeRQ', gamestate: 'modeRQ', id: 8, endstate: 'endOfModeRQ', maxPtsPerQ: 1, totalTime: 10},
      { name: 'Slide Cards', desc: 'Slide question to reveal answer', prestate: 'premodeSC', gamestate: 'modeSC', id: 9, endstate: 'endOfModeSC', maxPtsPerQ:2, totalTime:25}
      ];
    var prevHeights = 10 * dpr;
    for (var i = 0; i < modes.length; i++) { //create a button and text for each game mode
      var b = game.world.add(new game.global.SpeechBubble(game, game.world.width + 1000, text.bottom, game.world.width * .8, modes[i].name, false, true, this.btnClick));
      b.y += prevHeights;
      prevHeights += b.bubbleheight + (10 * dpr);
      b.data = modes[i];

      var t = game.add.text(game.world.width + 1000, b.y + b.bubbleheight, modes[i].desc, game.global.smallerWhiteFont);
      t.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
      t.padding.x = 3;
      prevHeights += t.height;

      //animate button coming in
      game.add.tween(b).to({x: Math.floor(game.world.centerX - b.bubblewidth/2)}, 350, Phaser.Easing.Default, true, 150 * i);
      game.add.tween(t).to({x: Math.floor(game.world.centerX - t.width/2)}, 350, Phaser.Easing.Default, true, 150 * i);
    }

  },
  btnClick: function(){
    game.global.selectedMode = this.data;
    game.state.start(this.data.prestate);
  },
  backButton: function(){
    game.state.start('menuChapter');
  }
}
