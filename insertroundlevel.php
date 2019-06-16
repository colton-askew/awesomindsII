<?php
    require('../../conn.php');
    include('redir-notinstructor.php');

    $roundLevelCount = $_POST['roundLevelCount'];
    $addRoundLevelCount = $_POST['addRoundLevelCount'];

    for (; $addRoundLevelCount > 0; $addRoundLevelCount--) {
        $roundLevelCount++;
        $query = $dbcon->prepare("INSERT INTO roundlevel (numofq, maxptsperq, goalpts, goalcompleteround, goalbeatopponent, game_gameid, users_c_number) VALUES (10, 15, 0, 0, 0, 1, :c_number)");
        //$query->bindParam(':roundlevelcount', $roundLevelCount);
        $query->bindParam(':c_number', $_SESSION['c_number']);
        if($query->execute()){
            echo 'roundlevel inserted';
        }else{
            print_r($query->errorInfo());
        }
    }
?>
