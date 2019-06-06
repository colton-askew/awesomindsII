//copy original pregame state and modify it
//One Crack
var preGameStateJD = Object.create(preModeState);

preGameStateJD.instructLines = [
  "How to play:\nA question will appear.\nClick/tap the question to make the answer choices appear.\nYou only get one choice.\n5 points if you are correct."
];

preGameStateJD.update = function(){};

