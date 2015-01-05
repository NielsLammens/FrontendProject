<?php
header("Access-Control-Allow-Origin: *");
//header('Content-type: application/json');

	$host = "mysqlstudent";
	$user = "nielslammesho4oo";
	$pass = "maen6Phoo3Iu";
	
	$db = "nielslammesho4oo";
	$table = "users";

	$con = mysql_connect($host, $user, $pass);
	mysql_select_db($db, $con);

	$result = mysql_query("SELECT * FROM ".$table);

	$array = array();

	while ($row = mysql_fetch_assoc($result)) {
		$array[] = $row;
		//print_r($row);
	}

	echo json_encode($array);

//echo "this is from the highscores php file";
?>