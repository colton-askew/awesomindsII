//copy original pregame state and modify it
var preGameStateC123 = Object.create(preGameState);

preGameStateC123.instructLines = [
  `How to play:\n
        A question will appear.\n
        Click/tap the question to make the answer choices appear.\n
        Choose up to 3 of the options displayed.\n
        \n
        If you are correct and chose 1 option – earn 15 points.\n
        If you are correct and chose 2 options – earn 10 points.\n
        If you are correct and chose 3 options – earn 5 points.\n
        If you are incorrect on all 3 – no points are awarded.`
];

preGameStateC123.makeHost = function(){
  game.global.jinny = game.add.sprite(0,0, 'annabelle', 0);
  game.global.hostText = game.add.text(0, 0, 'Annabelle', game.global.smallerWhiteFont);
  game.global.hostText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
  game.global.hostText.padding.x = 5;
};

preGameStateC123.update = function(){
  for (var i = 0; i < game.global.chars.length; i++) {
    game.global.chars[i].name.x = Math.floor(game.global.chars[i].sprite.right + (10*dpr));
    game.global.chars[i].name.y = Math.floor(game.global.chars[i].sprite.centerY + (10*dpr));
  }
}
