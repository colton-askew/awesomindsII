<?php
  require('../../conn.php');
  include('redir-notloggedin.php');

  if ($_SESSION['isInstructor']) {
    $query = $dbcon->prepare("SELECT ga.gameattributeid, ga.livespergame, ga.rowbonuscount, ga.rowbonuspts, ga.gametheme, ga.rndslvlspergame
                            FROM gameattribute ga
                            WHERE ga.users_c_number = :c_number");
    $query->bindParam(':c_number', $_SESSION['c_number']);
    $query->execute();
  
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
  }
?>
