<?php
require('../../conn.php');
include('redir-notinstructor.php');

$roundLevelCount = $_POST['roundLevelCount'];
$removeRoundLevelCount = $_POST['removeRoundLevelCount'];

for (; $removeRoundLevelCount < 0; $removeRoundLevelCount++) {
    $stmt = $dbcon->prepare('DELETE FROM roundlevel WHERE roundlevelid = :roundlevelcount');
    $stmt->bindParam(':roundlevelcount', $roundLevelCount);
    if($stmt->execute()){
        echo 'Question saved';
        $roundLevelCount--;
    }else{
        print_r($stmt->errorInfo());
    }
}

?>
