//copy original pregame state and modify it
var preModeStateRQ = Object.create(preModeState);

preModeStateRQ.instructLines = [
  "Click to see options, click again to see the answer, then rate based on difficulty"
];

preModeStateRQ.update = function(){};