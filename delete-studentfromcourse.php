<?php
  require('../../conn.php');
  include('redir-notloggedin.php');

  //delete student from course
  $query = $dbcon->prepare("DELETE FROM score WHERE courseid = :courseid AND c_number = :c_number");
 
  $query->bindParam(':courseid ', $_POST["courseid"]);
  $query->bindParam(':c_number ', $_POST["c_number"]);
  $query->execute();


  $result = $query->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($result);
?>