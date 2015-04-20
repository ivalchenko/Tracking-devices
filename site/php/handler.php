<?php
	include 'db_connector.php';

	//$send = $_POST['button'];
	//$date = $_POST['calendar'];
	$date = "2015-04-20";

	$startFrom = $_POST['startFrom'];
	$res = mysqli_query($db, "SELECT * FROM `coordinates` ORDER BY `id` DESC LIMIT {$startFrom}, 1"); 
	//$res = mysqli_query($db, "SELECT * FROM `coordinates` WHERE `date` BETWEEN '$date 00:00:00' AND '$date 23:59:59' LIMIT {$startFrom}, 1"); 

	$articles = array();
	while ($row = mysqli_fetch_assoc($res))
	{
	    $articles[] = $row;
	}

	echo json_encode($articles); // Превращаем массив статей в json-строку для передачи через Ajax-запрос
?>