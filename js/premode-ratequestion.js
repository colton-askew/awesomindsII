//copy original pregame state and modify it
var preModeStateRQ = Object.create(preGameState);

preModeStateRQ.instructLines = [
  "Click to see options, click again to see the answer, then rate based on difficulty"
];

preModeStateRQ.makeHost = function(){
  game.global.jinny = game.add.sprite(0,0, 'annabelle', 0);
  game.global.hostText = game.add.text(0, 0, 'Annabelle', game.global.smallerWhiteFont);
  game.global.hostText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
  game.global.hostText.padding.x = 5;
};

preModeStateRQ.update = function(){
  console.log('no avatars');
  // for (var i = 0; i < game.global.chars.length; i++) {
    
  //     game.global.chars[i].name.x = Math.floor(game.global.chars[i].sprite.right + (10*dpr));
  //     game.global.chars[i].name.y = Math.floor(game.global.chars[i].sprite.centerY + (10*dpr));
  // }
}