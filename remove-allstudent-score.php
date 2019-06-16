<?php
  require('../../conn.php');
  include('redir-notloggedin.php');

  //delete all students in course
  $query = $dbcon->prepare("DELETE FROM score WHERE courseid = :courseid");
  
  $query->bindParam(':courseid', $_POST["courseid"]);
  $query->execute();


  $result = $query->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($result);
?>