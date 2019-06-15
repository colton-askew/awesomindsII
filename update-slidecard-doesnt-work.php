<?php
  require('../../conn.php');
  include('redir-notinstructor.php');

  $query = $dbcon->prepare("UPDATE question SET slidecard = :slidecard WHERE questionid = :questionid");
  
  
  $query->bindParam(':questionid', $_POST["questionid"] );
  $query->bindParam(':slidecard', $_POST["slidecard"] );
  $result = $query->execute();
  if($result){
    echo json_encode($result);
    
  } else {
    echo json_encode($query->errorInfo());
    
  }
?>