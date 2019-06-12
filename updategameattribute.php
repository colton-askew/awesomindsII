<?php
  require('../../conn.php');
  include('redir-notinstructor.php');

  $gaValueToChange = $_POST["gaValueToChange"];

  $query = $dbcon->prepare("UPDATE gameattribute
                          SET $gaValueToChange = :docValue
                          WHERE users_c_number = :c_number");
                          //$query->bindParam(':gaValue', $_POST["gaValue"]);
                          //$query->bindParam(':gaValueToChange', $_POST["gaValueToChange"]);
  $query->bindParam(':docValue', $_POST["docValue"]);
  $query->bindParam(':c_number', $_SESSION['c_number']);

  if($query->execute()){
    echo 'gameattribute updated';
  }else{
    print_r($query->errorInfo());
  }
?>
