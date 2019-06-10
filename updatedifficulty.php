<?php
  require('../../conn.php');
  include('redir-notinstructor.php');

  $query = $dbcon->prepare("UPDATE question SET hard = :hard WHERE courseid = :courseid AND chapter = :chapter AND question = :question");

  $query->bindParam(':chapter', $_POST["chapter"]);
  $query->bindParam(':courseid', $_POST["courseid"]);
  //match with question text
  $query->bindParam(':question', $_POST["question"]);
  $query->bindParam(':hard', $_POST["hard"]);
  $result = $query->execute();
  if($result){
    echo json_encode($result);
    
  } else {
    echo json_encode($query->errorInfo());
    
  }
?>