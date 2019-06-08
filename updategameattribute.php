<?php
require('../../conn.php');
include('redir-notinstructor.php');

$stmt = $dbcon->prepare('UPDATE gameattribute
                        SET gavalue = :gaValue
                        WHERE ganame = :gaName');
                        $stmt->bindParam(':gaValue', $_POST["gaValue"]);
                        $stmt->bindParam(':gaName', $_POST["gaName"]);

if($stmt->execute()){
  echo 'Question saved';
}else{
  print_r($stmt->errorInfo());
}

?>
