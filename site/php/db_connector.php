<?php
	$db_host = "mysql13.000webhost.com";
	$db_name = "a1756412_coor";
	$db_user = "a1756412_root";
	$db_pass = "track_";

	$db = mysqli_connect ($db_host, $db_user, $db_pass, $db_name) or die ("Users cannot access the database.");

	mysqli_query ($db, 'set character_set_results = "utf8"'); // в какой кодировке будем получать информацию из базы данных
?>