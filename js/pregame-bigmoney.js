//copy original pregame state and modify it
var preGameStateBM = Object.create(preGameState);

preGameStateBM.instructLines = [
    `How to play:\n
        A question will appear.\n
        Click/tap the question to make the answer choices appear.\n
        Keep choosing until you get the right answer.\n
        \n
        If you are correct on the 1st try – earn points.\n
        On the 2nd try – earn 0 points.\n
        On the 3rd try – lose points.\n
        If you are incorrect on all 3 – game over.`
  ];

preGameStateBM.makeHost = function() {
    game.global.jinny = game.add.sprite(0,0, 'annabelle', 0);
    game.global.hostText = game.add.text(0, 0, 'Annabelle', game.global.smallerWhiteFont);
    game.global.hostText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    game.global.hostText.padding.x = 5;
};

preGameStateBM.update = function(){
    for (var i = 0; i < game.global.chars.length; i++) {
        game.global.chars[i].name.x = Math.floor(game.global.chars[i].sprite.right + (10*dpr));
        game.global.chars[i].name.y = Math.floor(game.global.chars[i].sprite.centerY + (10*dpr));
    }
}