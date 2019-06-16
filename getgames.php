<?php
  require('../../conn.php');
  include('redir-notloggedin.php');

  if ($_SESSION['isInstructor']) {
    $query = $dbcon->prepare("SELECT g.gameid, g.gname
                            FROM game g");
    $query->execute();
  
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
  }
?>
