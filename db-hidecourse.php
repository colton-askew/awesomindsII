<?php
  require('../../conn.php');
  include('redir-notinstructor.php');
  function console_log( $data ){
    echo '<script>';
    echo 'console.log('. json_encode( $data ) .')';
    echo '</script>';
  }
  
  $myvar = "Made it im hide course";
  console_log( $myvar ); // [1,2,3]

  $dbcon->setAttribute(PDO::ATTR_EMULATE_PREPARES, 1);

  //due to foreign key constraints, delete score, then question, then course?
  if($_POST["hideCourse"] == "true"){
    $sqltext = "UPDATE `course` SET `isHidden` = 1 WHERE `courseid` = :courseid;";
  } else {
    $sqltext = "UPDATE `chapter` SET `isHidden` = 1 WHERE `courseid` = :courseid AND `chapter`= :chapter;";
  }

 // $sqltext = "UPDATE `course` SET `isHidden` = 1 WHERE `courseid` = :courseid;";
  
  $output = [];
  $output[] = $_POST;
  $output[] = $sqltext;

  $sqltext as $key => $value 
  $query = $dbcon->prepare($value);
  //$query = $dbcon->prepare($sqltext);
  $query->bindParam(':courseid', $_POST["courseid"]);
  
  if($_POST["hideChapter"] == "true"){
      $query->bindParam(':chapter', $_POST["chapter"];
  }

  $result = $query->execute();
  if($result){
    // echo json_encode($result);
    $output[] = $result;
  } else {
    // echo json_encode($query->errorInfo());
    $output[] = $query->errorInfo();
  }
    echo json_encode($output);

/*    

  foreach ($sqltext as $key => $value) {
    $query = $dbcon->prepare($value);
    $query->bindParam(':courseid', $_POST["courseid"]);

    if($_POST["deletingCourse"] == "false"){
      $query->bindParam(':chapter', $_POST["chapter"]);
    }
    $result = $query->execute();
    if($result){
      // echo json_encode($result);
      $output[] = $result;
    } else {
      // echo json_encode($query->errorInfo());
      $output[] = $query->errorInfo();
    }
  }

  echo json_encode($output);
  */
  ?>
