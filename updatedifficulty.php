<?php
  require('../../conn.php');
  include('redir-notinstructor.php');

  $query = $dbcon->prepare("UPDATE question SET hard = '1' WHERE question = :question");
  //match with questionid
  $query->bindParam(':question', $_POST["question"] );
  $result = $query->execute();
  if($result){
    echo json_encode($result);
    
  } else {
    echo json_encode($query->errorInfo());
    
  }
?>