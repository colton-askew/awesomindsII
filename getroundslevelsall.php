<?php
  require('../../conn.php');
  include('redir-notloggedin.php');

  if ($_SESSION['isInstructor']) {
    $query = $dbcon->prepare("SELECT rl.roundlevelid FROM roundlevel rl");
    $query->execute();
  
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
  }
?>
