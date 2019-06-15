var dpr = Math.floor(window.devicePixelRatio);
var game = new Phaser.Game(Math.floor(window.innerWidth * dpr), Math.floor(window.innerHeight * dpr), Phaser.AUTO, 'gameDiv', null, true, true);
game.global = {}; // create global object we can add properties to and access from any state

game.global.mapNum = function (num, in_min, in_max, out_min, out_max) {
  return Math.floor((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
}

WebFontConfig = {
  google: {
    //add any google fonts here
    families: ['Roboto', 'Varela Round', 'Material Icons']
  }
}

// add game states
//menu states
game.state.add('preload', preloadState);
game.state.add('menuCourse', menuCourseState);
game.state.add('menuChapter', menuChapterState);
game.state.add('menuMode', menuModeState);

//pregame and premode states with master being at the top
game.state.add('pregame', preGameState);
game.state.add('premode', preModeState);
game.state.add('pregameSU', preGameStateSU);
game.state.add('pregameTB', preGameStateTB);
game.state.add('pregameOC', preGameStateOC);
game.state.add('pregameJD', preGameStateJD);
game.state.add('premodeRQ', preModeStateRQ);
game.state.add('premodeSC', preModeStateSC);
game.state.add('pregameBM', preGameStateBM);


//game and mode states with masters being at the top
game.state.add('play', playState);
game.state.add('mode', modeState);
game.state.add('playSU', playStateSU);
game.state.add('playTB', playStateTB);
game.state.add('playOC', playStateOC);
game.state.add('playJD', playStateJD);
game.state.add('modeRQ', modeStateRQ);
game.state.add('modeSC', modeStateSC);
game.state.add('playBM', playStateBM);

//end of game and mode state with masters being at the top
game.state.add('endOfGame', endOfGameState);
game.state.add('endOfMode', endOfModeState);
game.state.add('endOfGameWWG', endOfGameStateWWG);
game.state.add('endOfGameTB', endOfGameStateTB);
game.state.add('endOfGameOC', endOfGameStateOC);
game.state.add('endOfGameJD', endOfGameStateJD);
game.state.add('endOfModeRQ', endOfModeStateRQ);
game.state.add('endOfModeSC', endOfModeStateSC);
game.state.add('endOfGameBM', endOfGameStateBM);


game.global.session = phpSession;
game.state.start('preload');
