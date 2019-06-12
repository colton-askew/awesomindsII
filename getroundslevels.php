<?php
  require('../../conn.php');
  include('redir-notloggedin.php');

  if ($_SESSION['isInstructor']) {
    $query = $dbcon->prepare("SELECT rl.roundlevelid, rl.numofq, rl.maxptsperq, rl.goalpts, rl.goalcompleteround, rl.goalbeatopponent, rl.game_gameid
                            FROM roundlevel rl, game g
                            WHERE g.gameid = rl.game_gameid
                            AND rl.users_c_number = :c_number
                            ORDER BY rl.roundlevelid ASC");
    $query->bindParam(':c_number', $_SESSION['c_number']);
    $query->execute();
  
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
  }
?>
