<?php
  require('../../conn.php');
  include('redir-notinstructor.php');

  $rlValueToChange = $_POST["rlValueToChange"];
  //$rlValue = $_POST["rlValue"];

  $query = $dbcon->prepare("UPDATE roundlevel
                          SET $rlValueToChange = :docValue
                          WHERE roundlevelid = :rlValue");
                          $query->bindParam(':rlValue', $_POST["rlValue"]);
                          //$query->bindParam(':rlValueToChange', $_POST["rlValueToChange"]);
                          $query->bindParam(':docValue', $_POST["docValue"]);

  if($query->execute()){
    echo 'Question saved';
  }else{
    print_r($query->errorInfo());
  }
?>
