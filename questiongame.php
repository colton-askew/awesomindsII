<?php include('redir-notloggedin.php'); ?>

<title>Awesominds II</title>

<script type="text/javascript" src="js/phaser.min.js"></script>
<script type="text/javascript" src="js/moment.min.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<?php
  if ($_SESSION['devmode']) {
    echo '<script type="text/javascript" src="js/devvars.js"></script>';
  } else {
    echo '<script>var devmode = false;</script>';
  }
?>

<script type="text/javascript">var phpSession = <?php echo json_encode(array('play_name'=>$_SESSION['play_name'], 'avatarnum'=>$_SESSION['avatarnum'], 'user_volume'=>$_SESSION['user_volume'])); ?></script>
<script type="text/javascript" src="js/menu-mode.js"></script>
<script type="text/javascript" src="js/menu-games.js"></script>
<script type="text/javascript" src="js/menuchapter.js"></script>
<script type="text/javascript" src="js/menucourse.js"></script>

<script type="text/javascript" src="js/play.js"></script>
<script type="text/javascript" src="js/mode.js"></script>
<script type="text/javascript" src="js/play-choose123.js"></script>
<script type="text/javascript" src="js/play-keepchoosing.js"></script>
<script type="text/javascript" src="js/play-timebonus.js"></script>
<script type="text/javascript" src="js/play-onecrack.js"></script>
<script type="text/javascript" src="js/just-drills.js"></script>
<script type="text/javascript" src="js/mode-ratequestion.js"></script>
<script type="text/javascript" src="js/mode-slidecard.js"></script>

<script type="text/javascript" src="js/play-bigmoney.js"></script>
<script type="text/javascript" src="js/endofgame.js"></script>
<script type="text/javascript" src="js/endofmode.js"></script>
<script type="text/javascript" src="js/endofgame-c123.js"></script>
<script type="text/javascript" src="js/endofgame-kc.js"></script>
<script type="text/javascript" src="js/endofgame-tb.js"></script>
<script type="text/javascript" src="js/endofgame-oc.js"></script>
<script type="text/javascript" src="js/endofgame-just-drills.js"></script>
<script type="text/javascript" src="js/endofmode-rq.js"></script>
<script type="text/javascript" src="js/endofmode-sc.js"></script>

<script type="text/javascript" src="js/endofgame-bm.js"></script>
<script type="text/javascript" src="js/pregame.js"></script>
<script type="text/javascript" src="js/premode.js"></script>
<script type="text/javascript" src="js/pregame-choose123.js"></script>
<script type="text/javascript" src="js/pregame-keepchoosing.js"></script>
<script type="text/javascript" src="js/pregame-timebonus.js"></script>
<script type="text/javascript" src="js/pregame-onecrack.js"></script>
<script type="text/javascript" src="js/pregame-bigmoney.js"></script>
<script type="text/javascript" src="js/pregame-just-drills.js"></script>
<script type="text/javascript" src="js/premode-ratequestion.js"></script>
<script type="text/javascript" src="js/premode-slidecard.js"></script>

<script type="text/javascript" src="js/preload.js"></script>
<script type="text/javascript" src="js/game.js"></script>

<style type="text/css">
  body {
    margin: 0;
  }
  #wrapper {
    background: rgba(0,133,173,1);
    background: -moz-linear-gradient(top, rgba(0,133,173,1) 0%, rgba(0,133,173,1) 1%, rgba(41,184,229,1) 25%, rgba(188,224,238,1) 71%, rgba(252,252,252,1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(0,133,173,1)), color-stop(1%, rgba(0,133,173,1)), color-stop(25%, rgba(41,184,229,1)), color-stop(71%, rgba(188,224,238,1)), color-stop(100%, rgba(252,252,252,1)));
    background: -webkit-linear-gradient(top, rgba(0,133,173,1) 0%, rgba(0,133,173,1) 1%, rgba(41,184,229,1) 25%, rgba(188,224,238,1) 71%, rgba(252,252,252,1) 100%);
    background: -o-linear-gradient(top, rgba(0,133,173,1) 0%, rgba(0,133,173,1) 1%, rgba(41,184,229,1) 25%, rgba(188,224,238,1) 71%, rgba(252,252,252,1) 100%);
    background: -ms-linear-gradient(top, rgba(0,133,173,1) 0%, rgba(0,133,173,1) 1%, rgba(41,184,229,1) 25%, rgba(188,224,238,1) 71%, rgba(252,252,252,1) 100%);
    background: linear-gradient(to bottom, rgba(0,133,173,1) 0%, rgba(0,133,173,1) 1%, rgba(41,184,229,1) 25%, rgba(188,224,238,1) 71%, rgba(252,252,252,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#0085ad', endColorstr='#fcfcfc', GradientType=0 );
    margin: 0;
    padding: 0;
  }
  #gamediv {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  </style>
</head>
<body>
<div id="wrapper">
  <div id="gameDiv"></div>
</div>


