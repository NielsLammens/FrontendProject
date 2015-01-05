<?php
header("Access-Control-Allow-Origin: *");
//header('Content-type: application/json');

if(isset($_GET["pos"]) && isset($_GET["am"])){

	$position = $_GET["pos"];
	$amount = $_GET["am"];

	$host = "mysqlstudent";
	$user = "nielslammesho4oo";
	$pass = "maen6Phoo3Iu";
	
	$db = "nielslammesho4oo";
	$table = "users";

	$con = mysql_connect($host, $user, $pass);
	mysql_select_db($db, $con);

	$SQL = "SELECT * FROM ".$table." WHERE position = '".$position."' ORDER BY points DESC LIMIT ".$amount;

	$result = mysql_query($SQL);

	$array = array();

	while ($row = mysql_fetch_assoc($result)) {
		$array[] = $row;
		//print_r($row);
	}

	echo json_encode($array);
}

?>