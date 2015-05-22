<?php
	include 'db_connector.php';

	$startFrom = $_POST['startFrom'];
	$res = mysqli_query($db, "SELECT * FROM `coor` ORDER BY `id` LIMIT {$startFrom}, 1"); 

	$articles = array();
	while ($row = mysqli_fetch_assoc($res))
	{
	    $articles[] = $row;
	}

	echo json_encode($articles); // Превращаем массив статей в json-строку для передачи через Ajax-запрос
?>