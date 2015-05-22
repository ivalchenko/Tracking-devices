<?php
	$db_host = "localhost";
	$db_name = "tracking";
	$db_user = "root";
	$db_pass = "lindsey";

	$db = mysqli_connect ($db_host, $db_user, $db_pass, $db_name) or die ("Users cannot access the database.");

	mysqli_query ($db, 'set character_set_results = "utf8"'); // в какой кодировке будем получать информацию из базы данных
?>