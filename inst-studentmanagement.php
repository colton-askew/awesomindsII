<!DOCTYPE html>
<html>
<head>
  <?php
    include('redir-notinstructor.php');
    include 'css/css.html';
  ?>
  <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.15/css/jquery.dataTables.css">
  <script type="text/javascript" charset="utf8" src="//cdn.datatables.net/1.10.15/js/jquery.dataTables.js"></script>
  <title>Add/Remove Student - Awesominds</title>
</head>
<body>
  <?php include 'inst-nav2.php' ?>
  <div class="container text-center">
  <div class="card">
      <p>Adjust Student Stats:</p>
      <p>Select a course</p>
      <div id='selectCourseDiv' class="container" style="max-width: 400px">
        <div class="input-group">
          <span class="input-group-addon">Course</span>
          <select class="form-control" id='courseDropdown'>
            <option value="null">Select a Course</option>
          </select>
        </div>
      </div>
    </div>

    <div class='card selectChapterUI'>
      <p>Select a chapter/game:</p>
      <div id='selectChapterDiv' class="container" style="max-width: 400px">
        <div class="input-group">
          <span class="input-group-addon">Chapter</span>
          <select class='form-control' id='chapterDropdown'>
            <option value="null">Select a Chapter/Game</option>
          </select>
        </div>
        <div id="selectedChapterOutput"></div>
      </div>
    </div>
    <div id="output" class="card"></div>
  </div>

  <div class="modal fade" id="confirmRemoval" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h4 class="modal-title text-center" id="myModalLabel2">Are you sure?</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body text-center" id='modalBody2'>
          Are you sure you want to remove this student?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger btn-ok" data-dismiss="modal" id="removeBtn">Remove</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
<script>
var thingToDelete = "";
var getCourses = function(){ //loads list of courses from the database and populates the course dropdown
  $.ajax({
    url: 'getcourses.php',
    success: function(data){
      $('#courseDropdown').empty();
      $('#courseDropdown').append('<option value="null">Select a Course</option>');
      var courses = $.parseJSON(data);
      for (var i = 0; i < courses.length; i++) {
        $('#courseDropdown').append('<option value="' + courses[i].courseid + '">' + courses[i].courseid + ' - ' + courses[i].name + '</option>');
      }
    }
  });
}

var getChapters = function(){ //loads list of chapters for the selected course from the database and populates the chapter dropdown
  $('#chapterDropdown').empty();
  $('#chapterDropdown').append('<option value="null">Select a Chapter</option>');
  $.ajax({
    url: 'getchapters-forstats.php',
    data: 'courseid=' + $('#courseDropdown').find(":selected").val(),
    success: function(data){
      var chapters = $.parseJSON(data);
      for (var i = 0; i < chapters.length; i++) {
        $('#chapterDropdown').append('<option value="' + chapters[i].chapter + '">' + chapters[i].chapter + '</option>');
      }
    }
  });
}

$(function (){
  $('.selectChapterUI').hide();
  $('#output').hide();
  var modes = ['Countdown Crown', 'Wild Wild Guess'];
  
  $("#courseDropdown").change(function(){ //whenever a course is selected from the dropdown, this function fires
    $('#output').empty();
    $('#output').show();
    $.ajax({ //set the selected course in the php session
      type: 'POST',
      url: 'setcourse.php',
      data: { course: $('#courseDropdown').find(":selected").val() },
      success: function(data){
        getChapters();
        
        $.ajax({ //get the scores for the selected course from the database and output them to a table
          url: 'getscores-allusers-course.php',
          data: 'courseid=' + $('#courseDropdown').find(":selected").val(),
          success: function(data){
            console.log('success!');
            var str = "<h2>Scores for " + $('#courseDropdown').find(":selected").val() + ' </h2><p>Click a column heading to sort by that attribute</p><table id="table" class="display"><thead><tr><th>Display Name</th><th>C Number</th><th>Last Name</th><th>Total pts earned</th><th></th></tr></thead><tbody>';

            var scores = $.parseJSON(data);
            
            for (var i = 0; i < scores.length; i++) {
              var studentid = scores[i].c_number;
              var courseid = scores[i].courseid;
              str += '<tr id="row' + studentid + '"><td>' + scores[i].play_name + '</td><td>' + scores[i].c_number + '</td><td>' + 'Dxxxx' + '</td><td>' + scores[i].total_score + '</td><td><button id="removeStudentbtn" data-toggle="modal" data-target="#confirmRemoval" class="btn btn-danger">Remove Student</button></td></tr>';
              
            }
            $('#output').html(str + '</tbody></table>');
            $('#table').DataTable({ paging: false, "order": [[1, 'asc']] }); //fancify the table with datatables.js, adding sorting and searching
             //remove student button
            $("#removeStudentbtn").click(function(){
              
                    $('#modalBody2').html('Are you sure you want to delete student ' + studentid + '?');
                    thingToDelete = 'student';
                    sid = studentid;
                    cid = courseid;
                    console.log(sid);
                    console.log(cid);
                  });
              //remove button functions
            $('#removeBtn').click(function(){
                switch (thingToDelete) {
                  case 'student':
                    $.ajax({
                      type: 'POST',
                      url: 'delete-studentfromcourse.php',
                      data: { courseid : cid, studentid : sid},
                      success: function(data){
                        console.log('deleted student '+ sid + ' from course: ' + cid);;
                      }
                    });
                    break;
                  case 'allstudents':
                  $.ajax({
                      type: 'POST',
                      url: 'remove-allstudentscores.php',
                      data: { courseid : cid},
                      success: function(data){
                        console.log('deleted student data from course: ' + cid);;
                      }
                    });
                    console.log('delete all student from course');
                    break;
                  
                  default:
                    break;
                }
              });
          }
        });
      }
    });
  });
  
 
  $("#chapterDropdown").change(function(){ //whenever a chapter is selected from the dropdown, this function fires
    $('#output').empty();
    $('#output').show();
    $.ajax({ //get the scores for the selected chapter from the database and output them to a table
      url: 'getscores-allusers-chapter.php',
      data: 'courseid=' + $('#courseDropdown').find(":selected").val() + '&chapter=' + $('#chapterDropdown').find(":selected").val(),
      success: function(data){
        var str = "<h2>Scores for " + $('#courseDropdown').find(":selected").val() + ", Chapter " + $('#chapterDropdown').find(":selected").val() + ' </h2><p>Click a column heading to sort by that attribute</p><table id="table" class="display"><thead><tr><th>C Number</th><th>Display Name</th><th>Game Mode</th><th>High Score</th><th>Total Points Earned</th><th>Times Played</th></tr></thead><tbody>';
        var scores = $.parseJSON(data);
        for (var i = 0; i < scores.length; i++) {
          str += '<tr><td>' + scores[i].c_number + '</td><td>' + scores[i].play_name + '</td><td>' + modes[scores[i].game_mode] + '</td><td>' + scores[i].high_score + '</td><td>' + scores[i].total_score + '</td><td>' + scores[i].times_played + '</td></tr>';
        }
        $('#output').html(str + '</tbody></table>');
        $('#table').DataTable({ paging: false, "order": [[1, 'asc']] }); //fancify the table with datatables.js, adding sorting and searching
      }
    });
  });

  getCourses();

});
</script>
</body>
</html>
