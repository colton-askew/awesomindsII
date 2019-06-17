<!DOCTYPE html>
<html>

<head>
    <?php
    include('redir-notinstructor.php');
    include 'css/css.html';
    ?>
    <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.15/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="//cdn.datatables.net/1.10.15/js/jquery.dataTables.js"></script>
    <title>Task/Game Management - Awesominds</title>
</head>

<body>
    <?php include 'inst-nav2.php' ?>
    <div class="container text-center">
        <h2>Task/Game Management</h2><br>
        <div class="card">
            <form style="font-size: 14px">
                <div id="tasksMgmt">
                    <div class="form-group">
                        <div class="form-row" style="margin-top: 1.0em">
                            <label for="taskMgmt" class="col-sm-3"
                                style="font-weight: bold; font-size: 24px; margin-left: -2.6em">Tasks
                            </label>
                        </div>
                        <div>
                          <div class="form-row" style="margin-top: 0.5em">
                              <label class="col-sm-2" style="font-weight: bold; text-align: left; margin-left: 3.0em">Rate Questions</label>
                          </div>
                          <div class="form-row">
                              <div class="col-sm-1"></div>
                              <div class="form-check">
                                <label class="form-check-label mr-sm-4" for="form-check" style="margin-left: -1.5em">
                                  Enabled:
                                </label>
                                <input class="form-check-input mr-sm-1" type="checkbox" value="0" id='taskAttributeControl0' onchange="changeTasksCheck(0); changeTaskAttribute()">
                              </div>
                                <label style="col-sm-2; margin-left: 2.0em">Point(s) per Question:</label>
                                <select class="custom-select mr-sm-4" id='taskAttributeControl1'
                                    style="margin-left: 1em" onchange="changeTaskAttribute()">
                                </select> 
                          </div>
                        </div>
                        <div>
                          <div class="form-row" style="margin-top: 0.5em">
                              <label class="col-sm-2" style="font-weight: bold; text-align: left; margin-left: 3.0em">Slide Cards</label>
                          </div>
                          <div class="form-row">
                              <div class="col-sm-1"></div>
                              <div class="form-check">
                                <label class="form-check-label mr-sm-4" for="form-check" style="margin-left: -1.5em">
                                  Enabled:
                                </label>
                                <input class="form-check-input mr-sm-1" type="checkbox" value="0" id='taskAttributeControl2' onchange="changeTasksCheck(2); changeTaskAttribute()">
                              </div>
                                <label style="col-sm-2; margin-left: 2.0em">Point(s) per Question:</label>
                                <select class="custom-select mr-sm-4"id='taskAttributeControl3'
                                    style="margin-left: 1em" onchange="changeTaskAttribute()">
                                </select> 
                          </div>
                        </div>
                        <div>
                          <div class="form-row" style="margin-top: 0.5em">
                              <label class="col-sm-2" style="font-weight: bold; text-align: left; margin-left: 3.0em">Just Drills</label>
                          </div>
                          <div class="form-row">
                              <div class="col-sm-1"></div>
                              <div class="form-check">
                                <label class="form-check-label mr-sm-4" for="form-check" style="margin-left: -1.5em">
                                  Enabled:
                                </label>
                                <input class="form-check-input mr-sm-1" type="checkbox" value="0" id='taskAttributeControl4' onchange="changeTasksCheck(4); changeTaskAttribute()">
                              </div>
                                <label style="col-sm-2; margin-left: 2.0em">Max Points per Question:</label>
                                <select class="custom-select mr-sm-4" id='taskAttributeControl5'
                                    style="margin-left: 1em" onchange="changeTaskAttribute()">
                                </select> 
                          </div>
                        </div>
                        <div>
                          <div class="form-row" style="margin-top: 0.5em">
                              <label class="col-sm-2" style="font-weight: bold; text-align: left; margin-left: 3.0em">Game Show</label>
                          </div>
                          <div class="form-row">
                              <div class="col-sm-1"></div>
                              <div class="form-check">
                                <label class="form-check-label mr-sm-4" for="form-check" style="margin-left: -1.5em">
                                  Enabled:
                                </label>
                                <input class="form-check-input mr-sm-1" type="checkbox" value="0" id='taskAttributeControl6' onchange="changeTasksCheck(6); changeTaskAttribute()">
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
                <!-- <div id="taskMgmt">
                    <div class="form-group">
                        <div class="form-row" style="margin-top: 1.0em">
                            <label for="taskMgmt" class="col-sm-3"
                                style="font-weight: bold; font-size: 24px; margin-left: -60px">Tasks
                            </label>
                            <div class="col-sm-6" style="margin-left: 60px">
                                <p><button id='taskBtn0' data-toggle="button" data-target="#toggleRateQuestions"
                                        class="btn">Rate</button>
                                    <button id='taskBtn1' data-toggle="button" data-target="#toggleSlideCards"
                                        class="btn">Slide Cards</button>
                                    <button id='taskBtn2' data-toggle="button" data-target="#toggleJustDrills"
                                        class="btn">Just Drills</button>
                                    <button id='taskBtn3' data-toggle="button" data-target="#toggleGame"
                                        class="btn">Game</button>
                                </p>
                            </div>
                            <p class="col-sm-2" style="font-size: 14px; margin-left: -50px">Select to activate or
                                deactivate</p>
                        </div>
                        <div class="form-row" style="margin-top: -20px">
                            <div class="col-sm-4"></div>
                            <label class="col-sm-1" style="font-size: 10px; margin-left: -2.5em">1 pt per
                                question</label>
                            <label class="col-sm-1" style="font-size: 10px; margin-left: 15px">2 pts per
                                question</label>
                            <label class="col-sm-1" style="font-size: 10px; margin-left: 25px">Max 5 pts per
                                question</label>
                        </div>
                    </div>
                </div> -->
                <div id="gameAttributesMgmt">
                    <div class="form-group">
                        <div class="form-row" style="margin-top: 2.0em">
                            <label for="gameAttributesMgmt" class="col-sm-3"
                                style="font-weight: bold; font-size: 24px">Game Attributes</label>
                        </div>
                        <div class="form-row" style="margin-top: 1.0em">
                            <div class="col-sm-1"></div>
                            <label style="col-sm-2">Number of lives per game:</label>
                            <select class="custom-select mr-sm-4" id='gameAttributeControl0'
                                style="margin-left: 1em" onchange="changeGameAttribute()">
                            </select>
                            <label class="col-sm-3">If you lose a round, you lose a life and have to repeat a
                                round</label>
                        </div>
                        <div class="form-row" style="margin-top: 1.0em">
                            <div class="col-sm-1"></div>
                            <label style="col-sm-2">'In a row' bonus:</label>
                            <select class="custom-select mr-sm-4" id='gameAttributeControl1'
                                style="margin-left: 1em" onchange="changeGameAttribute()">
                            </select>
                            <label class="col-sm-3">Correct answers 'In a row' earns:</label>
                            <select class="custom-select mr-sm-4" id='gameAttributeControl2'
                                style="margin-left: 1em" onchange="changeGameAttribute()">
                            </select>
                            <label class="col-sm-1" style="margin-left: -20px">points</label>
                        </div>
                        <div class="form-row" style="margin-top: 1.0em">
                            <div class="col-sm-1"></div>
                            <label style="col-sm-2">Game theme:</label>
                            <select class="custom-select mr-sm-4" id="gameAttributeControl3" style="margin-left: 1em">
                            </select>
                        </div>
                        <div class="form-row" style="margin-top: 1.0em">
                            <div class="col-sm-1"></div>
                            <label style="col-sm-2">Number of rounds/levels per game:</label>
                            <select class="custom-select mr-sm-4" id='gameAttributeControl4'
                                style="margin-left: 1em" onchange="changeGameAttribute()">
                            </select>
                        </div>
                    </div>
                </div>
                <div id="roundLevelMgmt">
                    <div class="form-group">
                        <div class="form-row" style="margin-top: 2.0em">
                            <label for="taskSelection" class="col-sm-3"
                                style="font-weight: bold; font-size: 24px">Rounds/Levels
                            </label>
                        </div>
                        <div class="form-row">
                            <div class="col-sm-8"></div>
                            <div class="col-sm-4" style="text-align: center">GOAL</div>
                        </div>
                        <div id="roundsLevelsTable"> 
                    </div>
                </div>
            </form>
        </div>
    </div>

    <br>

    <!-- Game Challenges - More Information -->
    <div class="modal fade" id="challengeTypeInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title text-center" id="myModalLabel">Camosun College's <i>Awesominds II</i></h4>
                </div>
                <div class="modal-body text-center" style="font-size: 14px">

                    <h5>Type of Challenge - More Information</h5>
                    <table class="table table-sm text-left">
                        <tr>
                            <td><label style="font-weight: bold">Keep Choosing:</label><br>Keep choosing until the right answer is selected. Fewer attempts =
                                more points.</td>
                        </tr>
                        <tr>
                            <td><label style="font-weight: bold">Choose 1, 2, or 3:</label><br>Choose up to 3 answers. Fewer selections = more points.
                            </td>
                        </tr>
                        <tr>
                            <td><label style="font-weight: bold">One Crack Time Bonus:</label><br>Race the clock and the opponents. Less time = more points.</td>
                        </tr>
                        <tr>
                            <td><label style="font-weight: bold">Big Money:</label><br>Keep choosing until the right answer is selected. Game over on 4th attempt.
                                Fewer selections = more points.</td>
                        </tr>
                        <tr>
                            <td><label style="font-weight: bold">One Crack:</label><br>Choose 1 answer. Correct answer = earn points.</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>

    
<script>
var table = null;
var tasks = [];
var taskAttributes = [];
var gameAttributes = [];
var games = [];
var roundsLevels =  [];
var roundLevelID = [];


// Update database - Task Attributes
function changeTaskAttribute() {
var taFieldNameArr = [ "enabledstatus", "ptsperq", "enabledstatus", "ptsperq", "enabledstatus", "ptsperq", "enabledstatus" ];
var taFieldValArr = [ taskAttributes[0].enabledstatus, taskAttributes[0].ptsperq, taskAttributes[1].enabledstatus, taskAttributes[1].ptsperq, taskAttributes[2].enabledstatus, taskAttributes[2].ptsperq, taskAttributes[3].enabledstatus ];

    if (document.getElementById('taskAttributeControl0').value != taFieldValArr[0]) {
      console.log("!=");
      console.log("taskAttributeControl0");
      
      // Debugging
      console.log("taValueToChange: " , taFieldNameArr[0]);
      console.log("docValue: " , document.getElementById('taskAttributeControl0').value);
      console.log("taValue: " , taFieldValArr[0]);

      $.ajax({
        type: 'POST',
        url: 'updatetaskattribute.php',
        data: { taValue: taFieldValArr[0], taValueToChange: taFieldNameArr[0], docValue: document.getElementById('taskAttributeControl0').value, taskID: 1 },
        success: function(data) {
          getTaskAttributes();
          console.log("taskattributes updated");
        }
      });
    } else if (document.getElementById('taskAttributeControl1').value != taFieldValArr[1]) {
      console.log("!=");
      console.log("taskAttributeControl1");
      
      // Debugging
      console.log("taValueToChange: " , taFieldNameArr[1]);
      console.log("docValue: " , document.getElementById('taskAttributeControl1').value);
      console.log("taValue: " , taFieldValArr[1]);

      $.ajax({
        type: 'POST',
        url: 'updatetaskattribute.php',
        data: { taValue: taFieldValArr[1], taValueToChange: taFieldNameArr[1], docValue: document.getElementById('taskAttributeControl1').value, taskID: 1 },
        success: function(data) {
          getTaskAttributes();
          console.log("taskattributes updated");
        }
      });
    } else if (document.getElementById('taskAttributeControl2').value != taFieldValArr[2]) {
      console.log("!=");
      console.log("taskAttributeControl2");
      
      // Debugging
      console.log("taValueToChange: " , taFieldNameArr[2]);
      console.log("docValue: " , document.getElementById('taskAttributeControl2').value);
      console.log("taValue: " , taFieldValArr[2]);

      $.ajax({
        type: 'POST',
        url: 'updatetaskattribute.php',
        data: { taValue: taFieldValArr[2], taValueToChange: taFieldNameArr[2], docValue: document.getElementById('taskAttributeControl2').value, taskID: 2 },
        success: function(data) {
          getTaskAttributes();
          console.log("taskattributes updated");
        }
      });
    } else if (document.getElementById('taskAttributeControl3').value != taFieldValArr[3]) {
      console.log("!=");
      console.log("taskAttributeControl3");
      
      // Debugging
      console.log("taValueToChange: " , taFieldNameArr[3]);
      console.log("docValue: " , document.getElementById('taskAttributeControl3').value);
      console.log("taValue: " , taFieldValArr[3]);

      $.ajax({
        type: 'POST',
        url: 'updatetaskattribute.php',
        data: { taValue: taFieldValArr[3], taValueToChange: taFieldNameArr[3], docValue: document.getElementById('taskAttributeControl3').value, taskID: 2 },
        success: function(data) {
          getTaskAttributes();
          console.log("taskattributes updated");
        }
      });
    } else if (document.getElementById('taskAttributeControl4').value != taFieldValArr[4]) {
      console.log("!=");
      console.log("taskAttributeControl4");
      
      // Debugging
      console.log("taValueToChange: " , taFieldNameArr[4]);
      console.log("docValue: " , document.getElementById('taskAttributeControl4').value);
      console.log("taValue: " , taFieldValArr[4]);

      $.ajax({
        type: 'POST',
        url: 'updatetaskattribute.php',
        data: { taValue: taFieldValArr[4], taValueToChange: taFieldNameArr[4], docValue: document.getElementById('taskAttributeControl4').value, taskID: 3 },
        success: function(data) {
          getTaskAttributes();
          console.log("taskattributes updated");
        }
      });
    } else if (document.getElementById('taskAttributeControl5').value != taFieldValArr[5]) {
      console.log("!=");
      console.log("taskAttributeControl5");
      
      // Debugging
      console.log("taValueToChange: " , taFieldNameArr[5]);
      console.log("docValue: " , document.getElementById('taskAttributeControl5').value);
      console.log("taValue: " , taFieldValArr[5]);

      $.ajax({
        type: 'POST',
        url: 'updatetaskattribute.php',
        data: { taValue: taFieldValArr[5], taValueToChange: taFieldNameArr[5], docValue: document.getElementById('taskAttributeControl5').value, taskID: 3 },
        success: function(data) {
          getTaskAttributes();
          console.log("taskattributes updated");
        }
      });
    } else if (document.getElementById('taskAttributeControl6').value != taFieldValArr[6]) {
      console.log("!=");
      console.log("taskAttributeControl6");
      
      // Debugging
      console.log("taValueToChange: " , taFieldNameArr[6]);
      console.log("docValue: " , document.getElementById('taskAttributeControl6').value);
      console.log("taValue: " , taFieldValArr[6]);

      $.ajax({
        type: 'POST',
        url: 'updatetaskattribute.php',
        data: { taValue: taFieldValArr[6], taValueToChange: taFieldNameArr[6], docValue: document.getElementById('taskAttributeControl6').value, taskID: 4 },
        success: function(data) {
          getTaskAttributes();
          console.log("taskattributes updated");
        }
      });
    } else {
      console.log("==");
    }
};

// Update database - Game Attributes (and Rounds/Levels)
function changeGameAttribute() {
var gaFieldNameArr = [ "livespergame", "rowbonuscount", "rowbonuspts", "gametheme", "rndslvlspergame" ];
var gaFieldValArr = [ gameAttributes[0].livespergame, gameAttributes[0].rowbonuscount, gameAttributes[0].rowbonuspts, gameAttributes[0].gametheme, gameAttributes[0].rndslvlspergame ];
var newRoundLevelCount = 0;

  for (var i = 0; i < gaFieldNameArr.length; i++) {
    if (document.getElementById('gameAttributeControl' + i).value != gaFieldValArr[i]) {
      console.log("!=");
      console.log("i: " , i);
      console.log("gaFieldNameArr.length - 1: " , gaFieldNameArr.length - 1);

      if (i == gaFieldNameArr.length - 1) {
        newRoundLevelCount = document.getElementById('gameAttributeControl' + i).value - gameAttributes[0].rndslvlspergame;
        console.log("newRoundLevelCount: " , newRoundLevelCount);
        console.log("typeof: newRoundLevelCount: " , typeof(newRoundLevelCount));        
      }
      
      // Debugging
      //console.log("gaValueToChange: " , gaFieldNameArr[i]);
      //console.log("typeof: gaValueToChange: " , typeof(gaFieldNameArr[i]));
      //console.log("docValue: " , document.getElementById('gameAttributeControl' + i).value);
      //console.log("typeof: docValue: " , typeof(document.getElementById('gameAttributeControl' + i).value));
      //console.log("gaValue: " , gaFieldValArr[i]);
      //console.log("typeof: gaValue: " , typeof(gaFieldValArr[i]));        
      //console.log("roundLevelID[roundsLevels.length - 1]: " , roundLevelID[roundsLevels.length - 1])

      $.ajax({
        type: 'POST',
        url: 'updategameattribute.php',
        data: { gaValue: gaFieldValArr[i], gaValueToChange: gaFieldNameArr[i], docValue: document.getElementById('gameAttributeControl' + i).value },
        success: function(data) {
          getGameAttributes();
          console.log("gameattributes updated");
        }
      });

      $.ajax({
        url: 'getroundslevelsall.php',
        success: function(data){
          roundslevelsall = $.parseJSON(data);
        
          if (newRoundLevelCount > 0) {
            console.log("newRoundsLevelCount > 0");
            $.ajax({
              type: 'POST',
              url: 'insertroundlevel.php',
              data: { roundLevelCount: gaFieldValArr[i], addRoundLevelCount: newRoundLevelCount },
              success: function(data) {
                getRoundsLevels();
                console.log("roundlevel inserted");
              }
            });
          } else if (newRoundLevelCount < 0) {
            console.log("newRoundLevelCount < 0");
            $.ajax({
              type: 'POST',
              url: 'deleteroundlevel.php',
              data: { roundLevelCount: roundLevelID[roundsLevels.length - 1], removeRoundLevelCount: newRoundLevelCount },
              success: function(data) {
                getRoundsLevels();
                console.log("roundlevel deleted");
              }
            });
          }
        }
      });      
    }     
    else{
      console.log("==");
    }
  } 
};

// Update database - Rounds/Levels
function changeRoundLevel() {
  for (var i = 0, j = 0; i < roundsLevels.length; i++, j += 6) {
    if (document.getElementById('roundLevelControl' + j).value != roundsLevels[i].numofq) {
      console.log("numofq !=");

      $.ajax({
        type: 'POST',
        url: 'updateroundlevel.php',
        data: { rlValue: roundLevelID[i], rlValueToChange: 'numofq', docValue: document.getElementById('roundLevelControl' + j).value },
        success: function(data) {
          getRoundsLevels();
          console.log("roundslevels+0 updated");
        }
      });
    } else if (document.getElementById('roundLevelControl' + (j + 1)).value != roundsLevels[i].game_gameid) {
      console.log("gname !=");

      console.log("rlValue: " , i + 1);
      console.log("rlValueToChange: game_gameid");
      console.log("docValue: " , document.getElementById('roundLevelControl' + (j + 1)).value);

      $.ajax({
        type: 'POST',
        url: 'updateroundlevel.php',
        data: { rlValue: roundLevelID[i], rlValueToChange: 'game_gameid', docValue: document.getElementById('roundLevelControl' + (j + 1)).value },
        success: function(data) {
          getRoundsLevels();
          console.log("roundslevels+1 updated");
        }
      });
    }else if (document.getElementById('roundLevelControl' + (j + 2)).value != roundsLevels[i].maxptsperq) {
      console.log("maxptsperq !=");

      $.ajax({
        type: 'POST',
        url: 'updateroundlevel.php',
        data: { rlValue: roundLevelID[i], rlValueToChange: 'maxptsperq', docValue: document.getElementById('roundLevelControl' + (j + 2)).value },
        success: function(data) {
          getRoundsLevels();
          console.log("roundslevels+2 updated");
        }
      });
    } else if (document.getElementById('roundLevelControl' + (j + 3)).value != roundsLevels[i].goalpts) {
      console.log("goalpts !=");

      $.ajax({
        type: 'POST',
        url: 'updateroundlevel.php',
        data: { rlValue: roundLevelID[i], rlValueToChange: 'goalpts', docValue: document.getElementById('roundLevelControl' + (j + 3)).value },
        success: function(data) {
          getRoundsLevels();
          console.log("roundslevels+3 updated");
        }
      });
    } else if (document.getElementById('roundLevelControl' + (j + 4)).value != roundsLevels[i].goalcompleteround) {
      console.log("goalcompleteround !=");

      $.ajax({
        type: 'POST',
        url: 'updateroundlevel.php',
        data: { rlValue: roundLevelID[i], rlValueToChange: 'goalcompleteround', docValue: document.getElementById('roundLevelControl' + (j + 4)).value },
        success: function(data) {
          getRoundsLevels();
          console.log("roundslevels+4 updated");
        }
      });
    } else if (document.getElementById('roundLevelControl' + (j + 5)).value != roundsLevels[i].goalbeatopponent) {
        console.log("goalbeatopponent !=");

        $.ajax({
          type: 'POST',
          url: 'updateroundlevel.php',
          data: { rlValue: roundLevelID[i], rlValueToChange: 'goalbeatopponent', docValue: document.getElementById('roundLevelControl' + (j + 5)).value },
          success: function(data) {
            getRoundsLevels();
            console.log("roundslevels+5 updated");
          }
        });
    }
    else{
      console.log("==");
      console.log("dropdownValue: " , (j + 5));
    }
  }
};

// Set checkboxes in Rounds/Levels table
function changeColCheck(checkValue) {
  if (document.getElementById('roundLevelControl' + checkValue).checked) {
    document.getElementById('roundLevelControl' + checkValue).value = 1;
  } else {
    document.getElementById('roundLevelControl' + checkValue).value = 0;
  }
};

// Set checkboxes in Tasks section
function changeTasksCheck(checkValue) {
  if (document.getElementById('taskAttributeControl' + checkValue).checked) {
    document.getElementById('taskAttributeControl' + checkValue).value = 1;
  } else {
    document.getElementById('taskAttributeControl' + checkValue).value = 0;
  }
};

// Populate Tasks section
var getTaskAttributes = function(){
  $.ajax({
    url: 'gettaskattributes.php',
    success: function(data){
      taskAttributes = $.parseJSON(data);
      
      console.log("taskAttributes: " , taskAttributes);

      // Empty taskAttributeControl divs
      $('#taskAttributeControl0').empty();
      $('#taskAttributeControl1').empty();
      $('#taskAttributeControl2').empty();
      $('#taskAttributeControl3').empty();
      $('#taskAttributeControl4').empty();
      $('#taskAttributeControl5').empty();
      $('#taskAttributeControl6').empty();

      if (taskAttributes[0].enabledstatus == 0) {
        document.getElementById("taskAttributeControl0").checked = false;
        document.getElementById("taskAttributeControl0").value = 0;
      } else {
        document.getElementById("taskAttributeControl0").checked = true;
        document.getElementById("taskAttributeControl0").value = 1;
      }
      $('#taskAttributeControl1').append('<option value="' + taskAttributes[0].ptsperq + '">' + taskAttributes[0].ptsperq + '</option>');
      for (var i = 1; i <= 10; i++) {
        if (i != taskAttributes[0].ptsperq) {
          $('#taskAttributeControl1').append('<option value="' + i + '">' + i + '</option>');
        }
      }
      if (taskAttributes[1].enabledstatus == 0) {
        document.getElementById("taskAttributeControl2").checked = false;
        document.getElementById("taskAttributeControl2").value = 0;
      } else {
        document.getElementById("taskAttributeControl2").checked = true;
        document.getElementById("taskAttributeControl2").value = 1;
      }
      $('#taskAttributeControl3').append('<option value="' + taskAttributes[1].ptsperq + '">' + taskAttributes[1].ptsperq + '</option>');
      for (var i = 1; i <= 10; i++) {
        if (i != taskAttributes[1].ptsperq) {
          $('#taskAttributeControl3').append('<option value="' + i + '">' + i + '</option>');
        }
      }
      if (taskAttributes[2].enabledstatus == 0) {
        document.getElementById("taskAttributeControl4").checked = false;
        document.getElementById("taskAttributeControl4").value = 0;
      } else {
        document.getElementById("taskAttributeControl4").checked = true;
        document.getElementById("taskAttributeControl4").value = 1;
      }
      $('#taskAttributeControl5').append('<option value="' + taskAttributes[2].ptsperq + '">' + taskAttributes[2].ptsperq + '</option>');
      for (var i = 1; i <= 10; i++) {
        if (i != taskAttributes[2].ptsperq) {
          $('#taskAttributeControl5').append('<option value="' + i + '">' + i + '</option>');
        }
      }
      if (taskAttributes[3].enabledstatus == 0) {
        document.getElementById("taskAttributeControl6").checked = false;
        document.getElementById("taskAttributeControl6").value = 0;
      } else {
        document.getElementById("taskAttributeControl6").checked = true;
        document.getElementById("taskAttributeControl6").value = 1;
      }

      // Show taskAttributeControl divs
      $('#taskAttributeControl0').show();
      $('#taskAttributeControl1').show();
      $('#taskAttributeControl2').show();
      $('#taskAttributeControl3').show();
      $('#taskAttributeControl4').show();
      $('#taskAttributeControl5').show();
      $('#taskAttributeControl6').show();
    }
  });
}

// Create and populate Game Attributes section
var getGameAttributes = function(){
  $.ajax({
    url: 'getgameattributes.php',
    success: function(data){
      gameAttributes = $.parseJSON(data);
      
      console.log("gameAttributes: " , gameAttributes);

      // Empty gameAttributeControl divs
      $('#gameAttributeControl0').empty();
      $('#gameAttributeControl1').empty();
      $('#gameAttributeControl2').empty();
      $('#gameAttributeControl3').empty();
      $('#gameAttributeControl4').empty();

      $('#gameAttributeControl0').append('<option value="' + gameAttributes[0].livespergame + '">' + gameAttributes[0].livespergame + '</option>');
      for (var i = 1; i <= 10; i++) {
        if (i != gameAttributes[0].livespergame) {
          $('#gameAttributeControl0').append('<option value="' + i + '">' + i + '</option>');
        }
      }
      $('#gameAttributeControl1').append('<option value="' + gameAttributes[0].rowbonuscount + '">' + gameAttributes[0].rowbonuscount + '</option>');
      for (var i = 1; i <= 10; i++) {
        if (i != gameAttributes[0].rowbonuscount) {
          $('#gameAttributeControl1').append('<option value="' + i + '">' + i + '</option>');
        }
      }
      $('#gameAttributeControl2').append('<option value="' + gameAttributes[0].rowbonuspts + '">' + gameAttributes[0].rowbonuspts + '</option>');
      for (var i = 0; i <= 100; i++) {
        if (i != gameAttributes[0].rowbonuspts) {
          $('#gameAttributeControl2').append('<option value="' + i + '">' + i + '</option>');
        }
      }
      if (gameAttributes[0].gametheme == -1) {
        $('#gameAttributeControl3').append('<option value="' + gameAttributes[0].gametheme + '">Currently Unavailable</option>');
      } else {
        $('#gameAttributeControl3').append('<option value="' + gameAttributes[0].gametheme + '">' + gameAttributes[0].gametheme + '</option>');
      }
      $('#gameAttributeControl4').append('<option value="' + gameAttributes[0].rndslvlspergame + '">' + gameAttributes[0].rndslvlspergame + '</option>');
      for (var i = 1; i <= 25; i++) {
        if (i != gameAttributes[0].rndslvlspergame) {
          $('#gameAttributeControl4').append('<option value="' + i + '">' + i + '</option>');
        }
      }

      // Show gameAttributeControl divs
      $('#gameAttributeControl0').show();
      $('#gameAttributeControl1').show();
      $('#gameAttributeControl2').show();
      $('#gameAttributeControl3').show();
      $('#gameAttributeControl4').show();
    }
  });
}

// Create and populate Rounds/Levels section (table)
var getRoundsLevels = function(){
  $.ajax({
    url: 'getgames.php',
    success: function(data){
      games = $.parseJSON(data);

      console.log("games: " , games);
      console.log("games.length: " , games.length);

      $.ajax({
        url: 'getroundslevels.php',
        success: function(data){
          roundsLevels = $.parseJSON(data);
          
          console.log("roundsLevels: " , roundsLevels);
          console.log("roundsLevels.length: " , roundsLevels.length);

          // Empty roundsLevelsTable div
          $('#roundsLevelsTable').empty();

          // Create table for roundsLevelsTable div
          // Table heading
          var htmlStr = '<table id="table" class="display table table-hover table-bordered"><thead><tr><th scope="col">#</th><th scope="col">Number of Questions</th><th scope="col" title="Click for more information">Type of Challenge<a class="btn"href="" name="story" data-toggle="modal"data-target="#challengeTypeInfoModal">[?]</a></th><th scope="col">Max Points Value per Question</th><th scope="col">Points</th><th scope="col">Complete Round</th><th scope="col">Beat Opponent</th></tr></thead><tbody>';
          for (var i = 0, k = 0; i < roundsLevels.length; i++, k += 6) {
            var id = roundsLevels[i].roundlevelid;
            var numofq = roundsLevels[i].numofq;
            var maxptsperq = roundsLevels[i].maxptsperq;
            var goalpts = roundsLevels[i].goalpts;
            var goalcompleteround = roundsLevels[i].goalcompleteround;
            var goalbeatopponent = roundsLevels[i].goalbeatopponent;
            var gameid = roundsLevels[i].game_gameid;

            roundLevelID[i] = id;

            // Column 1 (Row)
            htmlStr += '<tr id="row' + (i + 1) + '"><td>' + (i + 1) + '</td>';

            // Column 2 (Number of Questions)
            htmlStr += '<td><select class="custom-select mr-sm-4" id="roundLevelControl' + k + '" onchange="changeRoundLevel()" style="margin-left: 1em"><option value="' + numofq + '">' + numofq + '</option>';
            for (var j = 1; j <= 25; j++) {
                if (j != numofq) {
                    htmlStr += '<option value="' + j + '">' + j + '</option>';
                }
            }
            // Column 3 (Type of Challenge)
            htmlStr += '</select></td><td><select class="custom-select mr-sm-4" id="roundLevelControl' + (k + 1) + '" onchange="changeRoundLevel()" style="margin-left: 1em"><option value=' +  gameid + '>' + games[gameid - 1].gname + '</option>';
            //console.log("gameid: " , gameid);
            //console.log("games[gameid - 1]: " , games[gameid - 1].gname);
            for (var j = 1; j <= games.length; j++) {
                if (j != gameid) {
                    htmlStr += '<option value=' + (j) + '>' + games[j - 1].gname + '</option>';
                }
            }
            // Column 4 (Max Point Value per Question)
            htmlStr += '</select></td><td><select class="custom-select mr-sm-4" id="roundLevelControl' + (k + 2) + '" onchange="changeRoundLevel()" style="margin-left: 1em"><option value="' + maxptsperq + '">' + maxptsperq + '</option>';
            for (var j = 0; j <= 500; j += 5) {
                if (j != maxptsperq) {
                    htmlStr += '<option value="' + j + '">' + j + '</option>';
                }
            }
            // Column 5 ([Goal] Points)
            htmlStr += '</select></td><td><select class="custom-select mr-sm-4" id="roundLevelControl' + (k + 3) + '" onchange="changeRoundLevel()" style="margin-left: 1em">';
            if (goalpts == null) {
                htmlStr += '<option value=""></option>';
                for (var j = 0; j <= 500; j += 5) {
                    htmlStr += '<option value="' + j + '">' + j + '</option>';
                }
            } else {
                htmlStr += '<option value="' + goalpts + '">' + goalpts + '</option>';
                for (var j = 0; j <= 500; j += 5) {
                    if (j != goalpts) {
                        htmlStr += '<option value="' + j + '">' + j + '</option>';
                    }
                }
            }
            // Column 6 ([Goal] Complete Round)
            htmlStr += '</select></td><td>';
            if (goalcompleteround == 0) {
              htmlStr += '<input class="form-check-input" type="checkbox" id="roundLevelControl' + (k + 4) + '" onchange="changeColCheck(' + (k + 4) + ');changeRoundLevel()" value=0>';
            } else {
              htmlStr += '<input class="form-check-input" type="checkbox" id="roundLevelControl' + (k + 4) + '" onchange="changeColCheck(' + (k + 4) + ');changeRoundLevel()" value=1 checked>';
            }
            // Column 7 ([Goal] Beat Opponent)
            htmlStr += '</td><td>';
            if (goalbeatopponent == 0) {
                htmlStr += '<input class="form-check-input" type="checkbox" id="roundLevelControl' + (k + 5) + '" onchange="changeColCheck(' + (k + 5) + ');changeRoundLevel()" value=0>';
            } else {
                htmlStr += '<input class="form-check-input" type="checkbox" id="roundLevelControl' + (k + 5) + '" onchange="changeColCheck(' + (k + 5) + ');changeRoundLevel()" value=1 checked>';
            }
            htmlStr += '</td></tr>';
          }
          htmlStr += '</tbody></table>';

          $('#roundsLevelsTable').html(htmlStr);
          $('#roundsLevelsTable').show();
        }
      });
    }
  });
}

// "Main" function
$(function (){
  getTaskAttributes();
  getGameAttributes();
  getRoundsLevels();
});
</script>

</body>
</html>
