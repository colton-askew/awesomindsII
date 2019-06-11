<?php
  require('../../conn.php');
  include('redir-notloggedin.php');

  if ($_SESSION['isInstructor']) {
    $query = $dbcon->prepare("SELECT rl.roundlevelid, rl.numofq, rl.maxptsperq, rl.goalpts, rl.goalcompleteround, rl.goalbeatopponent, rl.game_gameid, g.gname
                            FROM roundlevel rl, game g
                            WHERE rl.game_gameid = g.gameid
                            AND g.users_c_number = :c_number");
    $query->bindParam(':c_number', $_SESSION['c_number']);
    $query->execute();
  
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
  }
?>
