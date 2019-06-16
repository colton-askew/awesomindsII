<head>
  <meta charset="UTF-8" />
  <?php include('redir-notloggedin.php'); ?>
  <title>Welcome <?= $_SESSION['play_name'] ?></title>
  <?php include 'css/css.html'; ?>
</head>

<body>
  <?php include 'inst-nav2.php' ?>
  <div class="container text-center">
    <h2>Welcome to Awesominds</h2>
    <p>
    <?php
    // Display any set message only once, then remove it
    if ( isset($_SESSION['message']) ){
      echo $_SESSION['message'];
      unset( $_SESSION['message'] );
    }
    if(isset($_SESSION['regcode'])){ //if there's a registration code, register in the course, let them know, and remove the code from the session
      require('../../conn.php');
      $stmt = $dbcon->prepare("SELECT courseid FROM course WHERE regcode = :regcode");
      $stmt->bindParam(':regcode', $_SESSION['regcode']);
      $stmt->execute();
      $result = $stmt->fetch(PDO::FETCH_ASSOC);
      if($result){
        $stmt2 = $dbcon->prepare("INSERT INTO usercoursereg (c_number, courseid) VALUES(:c_number, :courseid)");
        $stmt2->bindParam(':c_number', $_SESSION['c_number']);
        $stmt2->bindParam(':courseid', $result['courseid']);
        if($stmt2->execute()){
          echo '<div class="alert alert-success" role="alert">
                  You have successfully registered for ' . $result['courseid'] .'
                </div>';
        }
      } else {
        echo '<div class="alert alert-danger" role="alert">
                Invalid registration link, please try again!
              </div>';
      }
      unset($_SESSION['regcode']);
    } 
    ?>
    <h4>You are logged in as</h4><br>
  <?php echo '<img src="assets/opp2/oppon' . $_SESSION['avatarnum'] . '.png" width=120/>'; ?>
  <h3><?php echo $_SESSION['play_name']; ?></h3><h5><?php echo $_SESSION['c_number']; ?></h5><br>
  <?php
     if ($_SESSION['isInstructor']){
      echo '
      </p>
         <div>
          <a href="#link" class="btn btn-info" role="button">Manage Courses Button</a> <p>Create/hide/delete a course or chapter, add/edit/remove questions, etc. </p>
          <a href="#link" class="btn btn-info" role="button">Manage Tasks/Games</a> <p>Customize students experience</p>
          <a href="#link" class="btn btn-info" role="button">Invite Instructor</a> <p>Send an email to an instructor to use Awesominds</p>
          <a href="#link" class="btn btn-info" role="button">View Student Progress</a> <p>View students scores/analytics</p>
          <a href="#link" class="btn btn-info" role="button">Change Password</a> <p>Change your password </p>
        </div>
      </div>
    </body>'; 
      } else {
        echo '
        </p>
          <p><a class="btn btn-success" href="questiongame.php">Play Game</a></p>
        </div>
      </body>';
      }
  ?> 
