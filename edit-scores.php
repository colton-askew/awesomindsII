<?php
  require('../../conn.php');
  include('redir-notinstructor.php');
  //edit student score
  $query = $dbcon->prepare("UPDATE score SET total_score = :newscore WHERE courseid = :courseid AND c_number = :c_number AND game_mode = :gamemode");
  
  
  $query->bindParam(':courseid ', $_POST["courseid"]);
  $query->bindParam(':c_number ', $_POST["c_number"]);
  $query->bindParam(':newscore ', $_POST["newscore"]);
  $query->bindParam(':gamemode ', $_POST["gamemode"]);
  
  $result = $query->execute();
  if($result){
    echo json_encode($result);
    
  } else {
    echo json_encode($query->errorInfo());
    
  }
?>