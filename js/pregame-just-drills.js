//copy original pregame state and modify it
//One Crack
var preGameStateJD = Object.create(preGameState);

preGameStateJD.instructLines = [
  "How to play:\nA question will appear.\nClick/tap the question to make the answer choices appear.\nYou only get one choice.\n5 points if you are correct."
];

preGameStateJD.makeHost = function(){
  game.global.jinny = game.add.sprite(0,0, 'annabelle', 0);
  game.global.hostText = game.add.text(0, 0, 'Annabelle', game.global.smallerWhiteFont);
  game.global.hostText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
  game.global.hostText.padding.x = 5;
};

preGameStateJD.update = function(){
//  for (var i = 0; i < game.global.chars.length; i++) {
    game.global.chars[0].name.x = Math.floor(game.global.chars[0].sprite.right + (10*dpr));
    game.global.chars[0].name.y = Math.floor(game.global.chars[0].sprite.centerY + (10*dpr));
  }
//}


