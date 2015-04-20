<head>
	<link rel="stylesheet" href="../css/post-date.css" type="text/css">
</head>

<?php
	include 'db_connector.php';

	$send = $_POST['button'];
	$date = $_POST['calendar'];

	$res = mysqli_query($db, "SELECT * FROM `posts` WHERE `date` BETWEEN '$date 00:00:00' AND '$date 23:59:59'");
SELECT * FROM `posts` WHERE `date` BETWEEN
  '$date 00:00:00' AND '$date 23:59:59'
	if ($send != "button")
	{
		echo "<html><head>"; 
		echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
		echo "<title>Successful send</title>"; 
		echo "</head>"; 
		echo "<body>"; 
		echo "<p>Sent date: <span>$date</span></p>";
		echo "<p></p>"; 
		echo "<div>"; 
		echo '<a href="../demo.html">Go back</a>';
		echo "</div>"; 
		echo "</body>"; 
		echo "</html>";
	}
?>
