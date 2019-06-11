<?php
require('../../conn.php');
include('redir-notinstructor.php');

$rlValueToChange = $_POST["rlValueToChange"];
//$rlValue = $_POST["rlValue"];

$stmt = $dbcon->prepare("UPDATE roundlevel
                        SET $rlValueToChange = :docValue
                        WHERE roundlevelid = :rlValue");
                        $stmt->bindParam(':rlValue', $_POST["rlValue"]);
                        //$stmt->bindParam(':rlValueToChange', $_POST["rlValueToChange"]);
                        $stmt->bindParam(':docValue', $_POST["docValue"]);

if($stmt->execute()){
  echo 'Question saved';
}else{
  print_r($stmt->errorInfo());
}

?>
