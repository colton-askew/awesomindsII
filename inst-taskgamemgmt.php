<!DOCTYPE html>
<html>

<head>
    <?php
    include('redir-notinstructor.php');
    include 'css/css.html';
    ?>
    <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.15/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="//cdn.datatables.net/1.10.15/js/jquery.dataTables.js"></script>
    <title>Tasks/Game Management - Awesominds</title>
</head>

<body>
    <?php include 'inst-nav2.php' ?>
    <div class="container text-center">
        <h2>Task/Game Management</h2><br>
        <div class="card">
            <form style="font-size: 14px">
                <div id="taskMgmt">
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
                </div>
                <div id="gameAttributesMgmt">
                    <div class="form-group">
                        <div class="form-row">
                            <label for="gameAttributesMgmt" class="col-sm-3"
                                style="font-weight: bold; font-size: 24px">Game Attributes</label>
                        </div>
                        <div class="form-row" style="margin-top: 1.0em">
                            <div class="col-sm-1"></div>
                            <label style="col-sm-2">Number of lives per game:</label>
                            <select class="custom-select mr-sm-4" id='gameAttributeValueDropdown0'
                                style="margin-left: 1em" onchange="changeGameAttribute()">
                            </select>
                            <label class="col-sm-3">If you lose a round, you lose a life and have to repeat a
                                round</label>
                        </div>
                        <div class="form-row" style="margin-top: 1.0em">
                            <div class="col-sm-1"></div>
                            <label style="col-sm-2">'In a row' bonus:</label>
                            <select class="custom-select mr-sm-4" id='gameAttributeValueDropdown1'
                                style="margin-left: 1em" onchange="changeGameAttribute()">
                            </select>
                            <label class="col-sm-3">Correct answers 'In a row' earns:</label>
                            <select class="custom-select mr-sm-4" id='gameAttributeValueDropdown2'
                                style="margin-left: 1em" onchange="changeGameAttribute()">
                            </select>
                            <label class="col-sm-1" style="margin-left: -20px">points</label>
                        </div>
                        <div class="form-row" style="margin-top: 1.0em">
                            <div class="col-sm-1"></div>
                            <label style="col-sm-2">Game theme:</label>
                            <select class="custom-select mr-sm-4" id="gameAttributeValueDropdown3" style="margin-left: 1em">
                            </select>
                        </div>
                        <div class="form-row" style="margin-top: 1.0em">
                            <div class="col-sm-1"></div>
                            <label style="col-sm-2">Number of rounds/levels per game:</label>
                            <select class="custom-select mr-sm-4" id='gameAttributeValueDropdown4'
                                style="margin-left: 1em" onchange="changeGameAttribute()">
                            </select>
                        </div>
                    </div>
                </div>
                <div id="roundLevelMgmt">
                    <div class="form-group">
                        <div class="form-row" style="margin-top: 1.0em">
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
                            <td><label style="font-weight: bold">One Choice Time Bonus:</label><br>Race the clock and the opponents. Less time = more points.</td>
                        </tr>
                        <tr>
                            <td><label style="font-weight: bold">Big Money:</label><br>Keep choosing until the right answer is selected. Game over on 4th attempt.
                                Fewer selections = more points.</td>
                        </tr>
                        <tr>
                            <td><label style="font-weight: bold">One Crack:</label><br>Choose 1 answer. Correct answer = 15 points.</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>

    

<script>
var selectedCourse = "";
var courses = [];
var selectedChapter = 0;
var thingToDelete = "";
var questions = [];
var questionid = 0;
var table = null;
var games = [];
var gameAttributes = [];
var roundsLevels =  [];
var roundLevelID = [];

function nextLetter(s){
  return s.replace(/([A-Z])[^A-Z]*$/, function(a){
    var c = a.charCodeAt(0);
    switch(c){
      case 90: return 'A';
      default: return String.fromCharCode(++c);
    }
  });
}

var optionLimit = 6
var numTotal = 1;

function deleteOption(thing){ //delete an option, then reletter all options to stick to ABC pattern
  if($('div[id^="optionRow"]').length > 1){
    var rowsBefore = thing.parents();
    rowsBefore[1].remove();
    numTotal = $('div[id^="optionRow"]').length;
    if (numTotal < optionLimit){
      $("#addOptionBtn").prop("disabled", false);
      $("#limitMessage").empty();
    }
    var row = $('div[id^="optionRow"]')[0];
    $(row).find('#optionLetter').val('A');
    $(row).find('#optionLetter').html('A');
    $(row).find('#optionLetterHidden').val('A');
    $(row).find('#answerRadio').val('A');
    for (var i = 1; i < $('div[id^="optionRow"]').length; i++) {
      var row = $('div[id^="optionRow"]')[i];
      var prevRow = $('div[id^="optionRow"]')[i-1];
      var letter = $(prevRow).find('#optionLetter').val();
      $(row).find('#optionLetter').val(nextLetter(letter));
      $(row).find('#optionLetter').html(nextLetter(letter));
      $(row).find('#optionLetterHidden').val(nextLetter(letter));
      $(row).find('#answerRadio').val(nextLetter(letter));
    }
    //if answer was deleted, mark the last option as the answer to avoid having an undefined answer
    if (!$("input[name='answer']:checked").val()) $("input[name='answer']:last").prop("checked", true);
    //disable delete button if there's only one option left
    if($('div[id^="optionRow"]').length <= 1) $('.deleteOptionBtn').prop("disabled", true);
  }
}

function addOption(){
  numTotal = $('div[id^="optionRow"]').length;
  if(numTotal < optionLimit){
    var $div = $('div[id^="optionRow"]:last');
    var newRow = $div.clone().prop('id', 'optionRow' + numTotal );
    var letter = newRow.find('#optionLetterHidden').val().toUpperCase();
    newRow.find('#optionLetter').html(nextLetter(letter));
    newRow.find('#optionLetterHidden').val(nextLetter(letter));
    newRow.find('#answerRadio').val(nextLetter(letter));
    newRow.find('#optionText').val('');
    $("#addOption").before(newRow);
    numTotal++;
    if($('div[id^="optionRow"]').length > 1) $('.deleteOptionBtn').prop("disabled", false);
    $(".deleteOptionBtn").off('click');
    $(".deleteOptionBtn").click(function(){
      deleteOption($(this));
    });
    if(numTotal >= optionLimit){
      $("#addOptionBtn").prop("disabled", true);
      $("#limitMessage").html('<p><small>Limit ' + optionLimit + ' options per question</small></p>');
    }
  }
};

// Update database - Game Attributes (and Rounds/Levels)
function changeGameAttribute() {
var gaFieldNameArr = [ "livespergame", "rowbonuscount", "rowbonuspts", "gametheme", "rndslvlspergame" ];
var gaFieldValArr = [ gameAttributes[0].livespergame, gameAttributes[0].rowbonuscount, gameAttributes[0].rowbonuspts, gameAttributes[0].gametheme, gameAttributes[0].rndslvlspergame ];
var newRoundLevelCount = 0;

  for (var i = 0; i < gaFieldNameArr.length; i++) {
    if (document.getElementById('gameAttributeValueDropdown' + i).value != gaFieldValArr[i]) {
      console.log("!=");
      console.log("i: " , i);
      console.log("gaFieldNameArr.length - 1: " , gaFieldNameArr.length - 1);

      if (i == gaFieldNameArr.length - 1) {
        newRoundLevelCount = document.getElementById('gameAttributeValueDropdown' + i).value - gameAttributes[0].rndslvlspergame;
        console.log("newRoundLevelCount: " , newRoundLevelCount);
        console.log("typeof: newRoundLevelCount: " , typeof(newRoundLevelCount));        
      }
      
      // Debugging leftovers
      //console.log("gaValueToChange: " , gaFieldNameArr[i]);
      //console.log("typeof: gaValueToChange: " , typeof(gaFieldNameArr[i]));
      //console.log("docValue: " , document.getElementById('gameAttributeValueDropdown' + i).value);
      //console.log("typeof: docValue: " , typeof(document.getElementById('gameAttributeValueDropdown' + i).value));
      //console.log("gaValue: " , gaFieldValArr[i]);
      //console.log("typeof: gaValue: " , typeof(gaFieldValArr[i]));        
      //console.log("roundLevelID[roundsLevels.length - 1]: " , roundLevelID[roundsLevels.length - 1])

      $.ajax({
        type: 'POST',
        url: 'updategameattribute.php',
        data: { gaValue: gaFieldValArr[i], gaValueToChange: gaFieldNameArr[i], docValue: document.getElementById('gameAttributeValueDropdown' + i).value },
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
}

// Update database - Rounds/Levels
function changeRoundLevel() {
  for (var i = 0, j = 0; i < roundsLevels.length; i++, j += 6) {
    if (document.getElementById('roundLevelDropdown' + j).value != roundsLevels[i].numofq) {
      console.log("numofq !=");

      $.ajax({
        type: 'POST',
        url: 'updateroundlevel.php',
        data: { rlValue: roundLevelID[i], rlValueToChange: 'numofq', docValue: document.getElementById('roundLevelDropdown' + j).value },
        success: function(data) {
          getRoundsLevels();
          console.log("roundslevels+0 updated");
        }
      });
    } else if (document.getElementById('roundLevelDropdown' + (j + 1)).value != roundsLevels[i].game_gameid) {
      console.log("gname !=");

      console.log("rlValue: " , i + 1);
      console.log("rlValueToChange: game_gameid");
      console.log("docValue: " , document.getElementById('roundLevelDropdown' + (j + 1)).value);

      $.ajax({
        type: 'POST',
        url: 'updateroundlevel.php',
        data: { rlValue: roundLevelID[i], rlValueToChange: 'game_gameid', docValue: document.getElementById('roundLevelDropdown' + (j + 1)).value },
        success: function(data) {
          getRoundsLevels();
          console.log("roundslevels+1 updated");
        }
      });
    }else if (document.getElementById('roundLevelDropdown' + (j + 2)).value != roundsLevels[i].maxptsperq) {
      console.log("maxptsperq !=");

      $.ajax({
        type: 'POST',
        url: 'updateroundlevel.php',
        data: { rlValue: roundLevelID[i], rlValueToChange: 'maxptsperq', docValue: document.getElementById('roundLevelDropdown' + (j + 2)).value },
        success: function(data) {
          getRoundsLevels();
          console.log("roundslevels+2 updated");
        }
      });
    } else if (document.getElementById('roundLevelDropdown' + (j + 3)).value != roundsLevels[i].goalpts) {
      console.log("goalpts !=");

      $.ajax({
        type: 'POST',
        url: 'updateroundlevel.php',
        data: { rlValue: roundLevelID[i], rlValueToChange: 'goalpts', docValue: document.getElementById('roundLevelDropdown' + (j + 3)).value },
        success: function(data) {
          getRoundsLevels();
          console.log("roundslevels+3 updated");
        }
      });
    } else if (document.getElementById('roundLevelDropdown' + (j + 4)).value != roundsLevels[i].goalcompleteround) {
      console.log("goalcompleteround !=");

      $.ajax({
        type: 'POST',
        url: 'updateroundlevel.php',
        data: { rlValue: roundLevelID[i], rlValueToChange: 'goalcompleteround', docValue: document.getElementById('roundLevelDropdown' + (j + 4)).value },
        success: function(data) {
          getRoundsLevels();
          console.log("roundslevels+4 updated");
        }
      });
    } else if (document.getElementById('roundLevelDropdown' + (j + 5)).value != roundsLevels[i].goalbeatopponent) {
        console.log("goalbeatopponent !=");

        $.ajax({
          type: 'POST',
          url: 'updateroundlevel.php',
          data: { rlValue: roundLevelID[i], rlValueToChange: 'goalbeatopponent', docValue: document.getElementById('roundLevelDropdown' + (j + 5)).value },
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
}

// Set checkboxes in Rounds/Levels table
function changeColCheck(dropdownValue) {
  if (document.getElementById('roundLevelDropdown' + dropdownValue).checked) {
    document.getElementById('roundLevelDropdown' + dropdownValue).value = 1;
  } else {
    document.getElementById('roundLevelDropdown' + dropdownValue).value = 0;
  }
}

// Create and populate Tasks section
var getTasks = function(){
  $.ajax({
    url: 'gettasks.php',
    success: function(data){
      tasks = $.parseJSON(data);
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

      $('#gameAttributeValueDropdown0').append('<option value="' + gameAttributes[0].livespergame + '">' + gameAttributes[0].livespergame + '</option>');
      for (var i = 1; i <= 10; i++) {
        if (i != gameAttributes[0].livespergame) {
          $('#gameAttributeValueDropdown0').append('<option value="' + i + '">' + i + '</option>');
        }
      }
      $('#gameAttributeValueDropdown1').append('<option value="' + gameAttributes[0].rowbonuscount + '">' + gameAttributes[0].rowbonuscount + '</option>');
      for (var i = 1; i <= 10; i++) {
        if (i != gameAttributes[0].rowbonuscount) {
          $('#gameAttributeValueDropdown1').append('<option value="' + i + '">' + i + '</option>');
        }
      }
      $('#gameAttributeValueDropdown2').append('<option value="' + gameAttributes[0].rowbonuspts + '">' + gameAttributes[0].rowbonuspts + '</option>');
      for (var i = 0; i <= 100; i++) {
        if (i != gameAttributes[0].rowbonuspts) {
          $('#gameAttributeValueDropdown2').append('<option value="' + i + '">' + i + '</option>');
        }
      }
      if (gameAttributes[0].gametheme == -1) {
        $('#gameAttributeValueDropdown3').append('<option value="' + gameAttributes[0].gametheme + '">Currently Unavailable</option>');
      } else {
        $('#gameAttributeValueDropdown3').append('<option value="' + gameAttributes[0].gametheme + '">' + gameAttributes[0].gametheme + '</option>');
      }
      $('#gameAttributeValueDropdown4').append('<option value="' + gameAttributes[0].rndslvlspergame + '">' + gameAttributes[0].rndslvlspergame + '</option>');
      for (var i = 1; i <= 25; i++) {
        if (i != gameAttributes[0].rndslvlspergame) {
          $('#gameAttributeValueDropdown4').append('<option value="' + i + '">' + i + '</option>');
        }
      }
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

          // Empty and show roundsLevelsTable div
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
            htmlStr += '<td><select class="custom-select mr-sm-4" id="roundLevelDropdown' + k + '" onchange="changeRoundLevel()" style="margin-left: 1em"><option value="' + numofq + '">' + numofq + '</option>';
            for (var j = 1; j <= 25; j++) {
                if (j != numofq) {
                    htmlStr += '<option value="' + j + '">' + j + '</option>';
                }
            }
            // Column 3 (Type of Challenge)
            htmlStr += '</select></td><td><select class="custom-select mr-sm-4" id="roundLevelDropdown' + (k + 1) + '" onchange="changeRoundLevel()" style="margin-left: 1em"><option value=' +  gameid + '>' + games[gameid - 1].gname + '</option>';
            console.log("gameid: " , gameid);
            console.log("games[gameid - 1]: " , games[gameid - 1].gname);
            for (var j = 1; j <= games.length; j++) {
                if (j != gameid) {
                    htmlStr += '<option value=' + (j) + '>' + games[j - 1].gname + '</option>';
                }
            }
            // Column 4 (Max Point Value per Question)
            htmlStr += '</select></td><td><select class="custom-select mr-sm-4" id="roundLevelDropdown' + (k + 2) + '" onchange="changeRoundLevel()" style="margin-left: 1em"><option value="' + maxptsperq + '">' + maxptsperq + '</option>';
            for (var j = 0; j <= 500; j += 5) {
                if (j != maxptsperq) {
                    htmlStr += '<option value="' + j + '">' + j + '</option>';
                }
            }
            // Column 5 ([Goal] Points)
            htmlStr += '</select></td><td><select class="custom-select mr-sm-4" id="roundLevelDropdown' + (k + 3) + '" onchange="changeRoundLevel()" style="margin-left: 1em">';
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
              htmlStr += '<input class="form-check-input" type="checkbox" id="roundLevelDropdown' + (k + 4) + '" onchange="changeColCheck(' + (k + 4) + ');changeRoundLevel()" value=0>';
            } else {
              htmlStr += '<input class="form-check-input" type="checkbox" id="roundLevelDropdown' + (k + 4) + '" onchange="changeColCheck(' + (k + 4) + ');changeRoundLevel()" value=1 checked>';
            }
            // Column 7 ([Goal] Beat Opponent)
            htmlStr += '</td><td>';
            if (goalbeatopponent == 0) {
                htmlStr += '<input class="form-check-input" type="checkbox" id="roundLevelDropdown' + (k + 5) + '" onchange="changeColCheck(' + (k + 5) + ');changeRoundLevel()" value=0>';
            } else {
                htmlStr += '<input class="form-check-input" type="checkbox" id="roundLevelDropdown' + (k + 5) + '" onchange="changeColCheck(' + (k + 5) + ');changeRoundLevel()" value=1 checked>';
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

var getCourses = function(){
  $.ajax({
    url: 'getcourses.php',
    success: function(data){
      $('#courseDropdown').empty();
      $('#courseDropdown').append('<option value="null">Select a Course</option>');
      $("#selectedCourseOutput").empty();
      courses = $.parseJSON(data);
      for (var i = 0; i < courses.length; i++) {
        $('#courseDropdown').append('<option value="' + courses[i].courseid + '">' + courses[i].courseid + ' - ' + courses[i].name + '</option>');
      }
      <?php
        if(isset($_GET["courseid"])){
          $c = $_GET["courseid"];
          echo "if ($('#courseDropdown option[value=\"$c\"]').length > 0){
                  selectedCourse = '$c';
                  $('.selectChapterUI').show();
                  $.ajax({
                    type: 'POST',
                    url: 'setcourse.php',
                    data: { course: selectedCourse },
                    success: function(data){
                      $('#courseDropdown').val(selectedCourse);
                      getChapters(selectedCourse);
                    }
                  });
                }";
        }
      ?>
    }
  });
}

var getChapters = function(course){
  $('#chapterDropdown').empty();
  $('#selectedChapterText').empty();
  $('#output').empty();
  $('#output').hide();
  $.ajax({
    url: 'api-getchapters-chaptertable.php',
    data: 'courseid=' + course,
    success: function(data){
      var chapters = $.parseJSON(data);
      $('#chapterDropdown').empty();
      $('#chapterDropdown').append('<option value="null">Select a Chapter</option>');
      for (var i = 0; i < chapters.length; i++) {
        $('#chapterDropdown').append('<option value="' + chapters[i].chapterid + '">' + chapters[i].chapterid + ' - ' + chapters[i].chaptername + '</option>');
      }
      $('#selectChapterDiv').show();
      // $('#selectChapterText').show();
      $('.newChapterBtn').html('Create New Chapter in Course "' + selectedCourse + '"');
      $("#selectedCourseOutput").html('<br><p><button id="inviteStudentsBtn" data-toggle="modal" data-target="#inviteStudentsModal" class="btn btn-primary">Invite Students</button> <button id="deleteCourseBtn" data-toggle="modal" data-target="#confirmDelete" class="btn btn-danger">Delete Course "'+ selectedCourse +'"</button></p>');
      $('#deleteCourseBtn').click(function(){
        $('#modalBody2').html('Are you sure you want to delete the course "' + selectedCourse + '"?');
        thingToDelete = 'course';
      });
      <?php
      if(isset($_GET["chapter"])){
        $ch = $_GET["chapter"];
        echo "if($('#chapterDropdown option[value=\"$ch\"]').length > 0){
                selectedChapter = '$ch';
                $('#chapterDropdown').val(selectedChapter);
                $.ajax({
                  type: 'POST',
                  url: 'setchapter.php',
                  data: { chapterid: selectedChapter },
                  success: function(data){
                    getQuestions();
                  }
                });
              }";
      }
      ?>
      $('#inviteStudentsBtn').off('click');
      $('#inviteStudentsBtn').click(function(){
        for (var i = 0; i < courses.length; i++) { //find this course's regcode and make the link
          if(courses[i].courseid === selectedCourse){
            var url = window.location.href.substring(0, window.location.href.indexOf("inst-coursemgmt.php"));
            $('#studentReglink').val(url + '?regcode=' + courses[i].regcode);
          } 
        }
        $('#studentReglink').off('click');
        $('#studentReglink').click(function(){ this.select(); });
        $('#inviteStudentsModalLabel').html('Invite Students to ' + selectedCourse);
      });

      $("#editChapterBtn").off('click');
      $('#editChapterBtn').click(function(){
        $('#createChapterBtn').hide();
        $('#updateChapterBtn').show();
        $('#chapterIDinput').prop('readonly', true);
        $('#createChapterModalLabel').html('Edit Chapter ' + selectedCourse + ' - ' + selectedChapter);
        $('#createChapterModalDesc').html('You may edit the name and dates of the selected chapter here');
        $.ajax({
          type: 'GET',
          url: 'api-getonechapter.php?chapter=' + selectedChapter,
          dataType: 'json',
          success: function(data){
            $('#chapterIDinput').val(data.chapterid);
            $('#chapterNameinput').val(data.chaptername);
            $('#date_start_input').val(data.date_start);
            $('#date_end_input').val(data.date_end);
          }
        });
      });
    }
  });
}

var getQuestions = function(){
  $.ajax({
    type: 'GET',
    url: 'getquestion.php',
    data: { 'courseid': selectedCourse, 'chapter': selectedChapter },
    dataType: 'json',
    success: function(data){
      questions = [];
      $('#output').empty();
      $('#output').show();
      var htmlStr = '<h3>'+ selectedCourse + ' - Chapter ' + selectedChapter + ' Questions</h3><p><button class="btn btn-success addQuestionBtn" data-toggle="modal" data-target="#editModal">Add Question</button> <button class="btn btn-success uploadQuestionsBtn" data-toggle="modal" data-target="#uploadModal">Upload .doc File of Questions</button></p><table id="table" class="display table table-hover table-bordered text-left"><thead><tr><th>ID#</th><th>Question Text</th><th>Choices</th><th>Answer</th><th>Options</th></tr></thead><tbody>';
      for (var i = 0; i < data.length; i++) {
        var q = $.parseJSON(data[i]["question"]);
        var id = $.parseJSON(data[i]["questionid"]);
        htmlStr += '<tr id="row' + id + '"><td>' + id +'</td><td>' + q.question + '</td><td>'
        Object.keys(q.choices).forEach(function(key){
          htmlStr += key + ': ' + q.choices[key] + '<br>';
        });
        htmlStr += '</td><td>' + q.answer + '</td><td><button class="btn btn-primary editBtn" data-toggle="modal" data-target="#editModal" id="' + id + '"">Edit</button><br><button class="btn btn-danger deleteQuestionBtn" data-toggle="modal" data-target="#confirmDelete" id="' + id + '">Delete</button></td></tr>';
      }
      htmlStr += '</tbody></table>';
      $('#output').html(htmlStr);
      $('#selectedChapterOutput').show();

      $('.uploadQuestionsBtn').click(function(){
        $('#uploadModalLabel').html('Upload Questions to "' + selectedCourse + ' - '+ selectedChapter + '"');
      });

      $("#deleteChapterBtn").click(function(){
        $('#modalBody2').html('Are you sure you want to delete Chapter ' + selectedChapter + ' from ' + selectedCourse + '?');
        thingToDelete = 'chapter';
      });
      table = $('#table').DataTable({ paging: false, "order": [[0, 'asc']] });

      $('.deleteQuestionBtn').click(function(){
        $('#modalBody2').html('Are you sure you want to delete question #' + $(this).attr('id') + '?');
        thingToDelete = 'question';
        questionid = $(this).attr('id');
      });

      $(".editBtn").off('click');
      $('.editBtn').click(function(){
        $('#saveQuestionBtn').show();
        $('#newQuestionBtn').hide();
        questionid = $(this).attr('id');
        $('#editModalLabel').html('Edit Question #' + questionid);
        $.ajax({
          type: 'GET',
          url: 'api-getonequestion.php?qid=' + questionid,
          dataType: 'json',
          success: function(data){
            var q = $.parseJSON(data['question']);
            $('#questionText').val(q.question);
            var keys = Object.keys(q.choices);
            for (var i = 0; i < keys.length; i++) {
              if(i < keys.length-1) addOption();
              $('#optionRow' + i).children('#optionText').val(q.choices[keys[i]]);
            }
            if($('div[id^="optionRow"]').length <= 1) $('.deleteOptionBtn').prop("disabled", true);
            $('#answerRadio[value='+ q.answer +']').prop("checked", true);
            numTotal = $('div[id^="optionRow"]').length;
            if (numTotal < optionLimit){
              $("#addOptionBtn").prop("disabled", false);
              $("#limitMessage").empty();
            }
          }
        });
      });

      $(".addQuestionBtn").off('click');
      $('.addQuestionBtn').click(function(){
        $('#saveQuestionBtn').hide();
        $('#newQuestionBtn').show();
        $('#editModalLabel').html('Add Question');
        $('.question').val('');
        $("input[name='answer']:last").prop("checked", true);
        $('.deleteOptionBtn').prop("disabled", true);
        $("#addOptionBtn").prop("disabled", false);
        $("#limitMessage").empty();
      });

      function prepQuestion(){
        var formArray = $('#editQuestionForm').serializeArray();
        var questionBank = {};
        questionBank.choices = {};
        for (var i = 0; i < formArray.length; i++) {
          switch (formArray[i].name) {
            case 'optionText':
              questionBank.choices[formArray[i-1].value] = formArray[i].value;
              break;
            case 'questionText':
              questionBank.question = formArray[i].value;
              break;
            case 'answer':
              questionBank.answer = formArray[i].value;
              break;
            default:
              break;
          }
        }
        return questionBank;
      };

      $("#saveQuestionBtn").off('click');
      $('#saveQuestionBtn').click(function(){
        var questionBank = prepQuestion();
        $.ajax({
          type: 'POST',
          url: 'api-updatequestion.php',
          data: { questionBank: prepQuestion(), questionid: questionid },
          success: function(data) {
            getQuestions();
            $('div[id^="optionRow"]').not(':first').remove();
            numTotal = 1;
          }
        });
      });

      $("#newQuestionBtn").off('click');
      $('#newQuestionBtn').click(function(){
        var questionBank = prepQuestion();
        $.ajax({
          type: 'POST',
          url: 'api-insert.php',
          data: { questionBank: prepQuestion(), chapter: selectedChapter, courseid: selectedCourse },
          success: function(data) {
            getQuestions();
            $('div[id^="optionRow"]').not(':first').remove();
            numTotal = 1;
          }
        });
      });
    }
  });
}

var createForm = $('#createCourseForm');
createForm.submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: createForm.attr('method'),
    url: createForm.attr('action'),
    data: createForm.serialize(),
    success: function(data) {
      window.location.href = "inst-coursemgmt.php?courseid=" + $('#courseIDinput').val().toUpperCase();
    }
  });
});

var createChapterForm = $('#createChapterForm');
createChapterForm.submit(function (e) {
  e.preventDefault();
  var postData = {
    courseid : selectedCourse,
    chapterid : $('#chapterIDinput').val(),
    chaptername: $('#chapterNameinput').val(),
    date_start: $('#date_start_input').val(),
    date_end: $('#date_end_input').val()
  };
  var url = createChapterForm.attr('action');
  if(document.activeElement.id == 'updateChapterBtn') url = 'api-updatechapter.php';
  $.ajax({
    type: createChapterForm.attr('method'),
    url: url,
    data: postData,
    success: function(data) {
      if(data.includes('successfully')){
        window.location.href = "inst-coursemgmt.php?courseid=" + selectedCourse + "&chapter=" + $('#chapterIDinput').val();
      } else if(data.includes('Duplicate')){
        $('#createChapterOutput').html('Error creating chapter - chapter number already exists!');
      }
    }
  });
});

//configuration
var max_file_size           = 1048576 * 3; //allowed file size. (1 MB = 1048576)
var result_output           = '#uploadOutput'; //ID of an element for response output
var total_files_allowed     = 1; //Number files allowed to upload

//on form submit
$('#uploadForm').submit(function(e) {
  e.preventDefault();
  var proceed = true; //set proceed flag
  var error = []; //errors
  var total_files_size = 0;

  if(!window.File && window.FileReader && window.FileList && window.Blob){ //if browser doesn't supports File API
    error.push("Your browser does not support new File API! Please upgrade."); //push error text
  }else{
    var total_selected_files = this.elements['fileToUpload'].files.length; //number of files

    //limit number of files allowed
    if(total_selected_files > total_files_allowed){
      error.push( "You have selected "+total_selected_files+" file(s), " + total_files_allowed +" is maximum!"); //push error text
      proceed = false; //set proceed flag to false
    }
     //iterate files in file input field
    $(this.elements['fileToUpload'].files).each(function(i, ifile){
      if(ifile.value !== ""){ //continue only if file(s) are selected
        total_files_size = total_files_size + ifile.size; //add file size to total size
      }
    });

    //if total file size is greater than max file size
    if(total_files_size > max_file_size){
      error.push( "You have "+total_selected_files+" file(s) with total size "+total_files_size+", Allowed size is " + max_file_size +", Try smaller file!"); //push error text
      proceed = false; //set proceed flag to false
    }

    var submit_btn  = $('#uploadSubmitBtn'); //form submit button

    //if everything looks good, proceed with jQuery Ajax
    if(proceed){
      submit_btn.val("Please Wait...").prop( "disabled", true); //disable submit button
      var form_data = new FormData(this); //Creates new FormData object
      var post_url = $(this).attr("action"); //get action URL of form

      //jQuery Ajax to Post form data
      $.ajax({
        url : post_url,
        type: "POST",
        data : form_data,
        contentType: false,
        cache: false,
        processData:false,
        mimeType:"multipart/form-data"
      }).done(function(res){ //
        $('#uploadForm')[0].reset(); //reset form
        $(result_output).html(res + '<p><a href="inst-coursemgmt.php?courseid=' + selectedCourse + '&chapter=' + selectedChapter + '">View Questions</a></p>'); //output response from server
        submit_btn.val("Upload file").prop( "disabled", false); //enable submit button once ajax is done
      });
    }
  }

  $(result_output).empty(); //reset output

});

$('.newChapterBtn').click(function(){
  $('#createChapterBtn').show();
  $('#updateChapterBtn').hide();
  $('#createChapterForm').trigger('reset');
  $('#chapterIDinput').prop('readonly', false);
  $('#createChapterModalLabel').html('Create Chapter in Course "' + selectedCourse + '"');
  $('#createChapterModalDesc').html('Enter a chapter number, chapter name, and availability dates to create a new chapter.');
  $('#date_start_input').val(moment().format("YYYY-MM-DDTHH:mm"));
  $('#date_end_input').val(moment().add(14, 'days').format("YYYY-MM-DDTHH:mm"));
});

$(function (){
  $('.selectChapterUI').hide();
  $('#selectChapterDiv').hide();
  // $('#selectChapterText').hide();
  $('#output').hide();

  $('#editModal').on('hide.bs.modal', function () {
    $('div[id^="optionRow"]').not(':first').remove();
    numTotal = 1;
  })

  $('#uploadModal').on('hide.bs.modal', function () {
    getQuestions();
  })

  $("#courseDropdown").change(function(){
    $('#output').empty();
    if($('#courseDropdown').find(":selected").val() != 'null'){
      $('.selectChapterUI').show();
      selectedCourse = $('#courseDropdown').find(":selected").val();
      $.ajax({
        type: 'POST',
        url: 'setcourse.php',
        data: { course: selectedCourse },
        success: function(data){
          getChapters(selectedCourse);
        }
      });
    } else {
      $('.selectChapterUI').hide();
      $('#selectedCourseOutput').empty();
      $('#selectChapterDiv').hide();
      // $('#selectChapterText').hide();
      $('#output').hide();
    }
    $('#selectedChapterOutput').hide();
  });

  $("#chapterDropdown").change(function(){
    if($('#chapterDropdown').find(":selected").val() != 'null'){
      selectedChapter = $('#chapterDropdown').find(":selected").val();
      $.ajax({
        type: 'POST',
        url: 'setchapter.php',
        data: { chapterid: selectedChapter },
        success: function(data){
          getQuestions();
        }
      });
    } else {
      $('#output').empty();
      $('#output').hide();
    }
  });

  $('#deleteBtn').click(function(){
    switch (thingToDelete) {
      case 'question':
        $.ajax({
          type: 'POST',
          url: 'api-deletequestion.php',
          data: { questionid : questionid },
          success: function(data){
            getQuestions();
          }
        });
        break;
      case 'course':
        $.ajax({
          type: 'POST',
          url: 'db-deletecourse.php',
          data: { courseid: selectedCourse, deletingCourse: true },
          success: function(data){
            getCourses();
            $('#selectChapterDiv').hide();
            $('.selectChapterUI').hide();
          }
        });
        break;
      case 'chapter':
        $.ajax({
          type: 'POST',
          url: 'db-deletecourse.php',
          data: { courseid: selectedCourse, deletingCourse: false, chapter: selectedChapter },
          success: function(data){
            getChapters(selectedCourse);
            $('#selectedChapterOutput').hide();
          }
        });
        break;
      default:
        break;
    }
  });

  $("#addOptionBtn").click(function(){
    addOption();
  });

  getCourses();
  getGameAttributes();
  getRoundsLevels();
});
</script>

</body>
</html>
