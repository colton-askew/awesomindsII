<?php
  require('../../conn.php');
  include('redir-notloggedin.php');

  if ($_SESSION['isInstructor']) {
    $query = $dbcon->prepare("SELECT ga.gameattributeid, ga.ganame, ga.gavalue, g.users_c_number
                            FROM gameattribute ga, game g
                            WHERE ga.game_gameid = g.gameid
                            AND g.users_c_number = :c_number");
    $query->bindParam(':c_number', $_SESSION['c_number']);
    $query->execute();
  
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
  }
?>
