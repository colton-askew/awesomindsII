<?php
    require('../../conn.php');
    include('redir-notinstructor.php');

    $roundLevelCount = $_POST['roundLevelCount'];
    $removeRoundLevelCount = $_POST['removeRoundLevelCount'];

    for (; $removeRoundLevelCount < 0; $removeRoundLevelCount++) {
        $query = $dbcon->prepare('DELETE FROM roundlevel WHERE roundlevelid = :roundlevelcount');
        $query->bindParam(':roundlevelcount', $roundLevelCount);
        if($query->execute()){
            echo 'roundlevel deleted';
            $roundLevelCount--;
        }else{
            print_r($query->errorInfo());
        }
    }
?>
