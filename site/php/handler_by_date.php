<?php
	include 'db_connector.php';

	$date = $_POST['date'];
	$res = mysqli_query($db, "SELECT * FROM `coordinates` WHERE `date` BETWEEN '$date 00:00:00' AND '$date 23:59:59'"); 

	$articles = array();
	while ($row = mysqli_fetch_assoc($res))
	{
	    $articles[] = $row;
	}

	echo json_encode($articles); // Превращаем массив статей в json-строку для передачи через Ajax-запрос
?>