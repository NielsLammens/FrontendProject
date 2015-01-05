<?php
header("Access-Control-Allow-Origin: *");
//header('Content-type: application/json');

if(isset($_GET["prov"])){

	$prov = $_GET["prov"];

	$host = "mysqlstudent";
	$user = "nielslammesho4oo";
	$pass = "maen6Phoo3Iu";
	
	$db = "nielslammesho4oo";

	$con = mysql_connect($host, $user, $pass);
	mysql_select_db($db, $con);

	$SQL = "SELECT * FROM Votes WHERE prov_id = ".$prov." ORDER BY score DESC LIMIT 1";


	$result = mysql_query($SQL);

	$array = array();

	while ($row = mysql_fetch_assoc($result)) {
		$array[] = $row;
		//print_r($row);
	}

	echo json_encode($array);
}

?>