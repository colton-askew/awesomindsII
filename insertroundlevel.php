<?php
require('../../conn.php');
include('redir-notinstructor.php');

$roundLevelCount = $_POST['roundLevelCount'];
$addRoundLevelCount = $_POST['addRoundLevelCount'];

for (; $addRoundLevelCount > 0; $addRoundLevelCount--) {
    $roundLevelCount++;
    $stmt = $dbcon->prepare('INSERT INTO roundlevel VALUES (:roundlevelcount, 10, 15, 0, 0, 0, 1)');
    $stmt->bindParam(':roundlevelcount', $roundLevelCount);
    if($stmt->execute()){
        echo 'Question saved';
    }else{
        print_r($stmt->errorInfo());
    }
}

?>
