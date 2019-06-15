<?php
  require('../../conn.php');
  include('redir-notinstructor.php');

  $taValueToChange = $_POST["taValueToChange"];

  $query = $dbcon->prepare("UPDATE taskattribute
                          SET $taValueToChange = :docValue
                          WHERE task_taskid = :taskID
                          AND users_c_number = :c_number");
                          //$query->bindParam(':taValue', $_POST["taValue"]);
                          //$query->bindParam(':taValueToChange', $_POST["taValueToChange"]);
  $query->bindParam(':docValue', $_POST["docValue"]);
  $query->bindParam(':taskID', $_POST["taskID"]);
  $query->bindParam(':c_number', $_SESSION['c_number']);

  if($query->execute()){
    echo 'taskattribute updated';
  }else{
    print_r($query->errorInfo());
  }
?>
