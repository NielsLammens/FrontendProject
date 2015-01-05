<?php
header("Access-Control-Allow-Origin: *");

// example url:
// http://student.howest.be/niels.lammens/fe/insert_goalkeeper.php?fn=Daniel&n=Van%20Buyten&d=07-02-1978&c=85&ps=0&sl=98&dp=10&sm=6983&pos=defender


if (isset($_GET["prov"]) && isset($_GET["p_id"])) {
	
	//print("testp");

	$prov = $_GET["prov"];
	$p_id = $_GET["p_id"];
	
	//echo "Ready to insert, score: ".$score." Name: ".$name;

$conn = new mysqli("mysqlstudent", "nielslammesho4oo", "maen6Phoo3Iu", "nielslammesho4oo");


if($conn->errno) {
	$message ="fout bij verbinding, probeer later opnieuw";
	exit();	
}

$stmt = $conn->prepare("UPDATE Votes SET score = score + 1 WHERE prov_id = ? AND speler_id = ?");

if($conn->errno) {
	$message = "fout bij preparen van het statement, probeer later opnieuw";
	exit();	
}

$stmt-> bind_param("ii", $prov, $p_id);

if($stmt->errno) {
	$message = "fout bij het binden van de parameters, probeer later opnieuw";
	exit();	
}

$stmt->execute();

if($stmt->errno) {
	$message = "fout bij uitvoeren van de query, probeer later opnieuw";
	exit();	
}
//echo "hallo";
//printf("rows inserted: %d\n", $stmt->affected_rows);

printf("%d", $stmt->affected_rows);


$stmt->close();
$conn->close();

} else {

	print("No score inserted, no name and score");
}







?>
