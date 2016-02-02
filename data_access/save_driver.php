<?php
date_default_timezone_set('UTC');

session_start();
// Create connection
$con=mysqli_connect("analytics.carvertise.com","macnag","penguinads!","penguinads_drivers");
$Statecon= mysqli_connect("analytics.carvertise.com", "stak_scott", "t87565342","carvertise_analytics");

$driverID = -1;


echo $_POST['first_name'];
if (isset($_POST['first_name'])
		&&isset($_POST['last_name'])
		&&isset($_POST['phone'])
		&&isset($_POST['email'])
		&&isset($_POST['year'])
		&&isset($_POST['make'])
		&&isset($_POST['model'])
		&&isset($_POST['color'])
		&&isset($_POST['condition'])
		&&isset($_POST['work_city'])
		&&isset($_POST['work_zip'])
		&&isset($_POST['home_city'])
		&&isset($_POST['home_zip'])
		&&isset($_POST['miles_day'])
		&&isset($_POST['miles_weekend'])) {
      echo "good";
	$first_name =  mysqli_real_escape_string($con,$_POST['first_name']);
	$last_name =   mysqli_real_escape_string($con,$_POST['last_name']);
	$phone =  mysqli_real_escape_string($con,$_POST['phone']);
	$email=   mysqli_real_escape_string($con,$_POST['email']);
	$year=   mysqli_real_escape_string($con,$_POST['year']);
	$make=   mysqli_real_escape_string($con,$_POST['make']);
	$model=   mysqli_real_escape_string($con,$_POST['model']);
	$color=   mysqli_real_escape_string($con,$_POST['color']);
	$condition=   mysqli_real_escape_string($con,$_POST['condition']);
	$work_city =   mysqli_real_escape_string($con,$_POST['work_city']);
	$work_zip =   mysqli_real_escape_string($con,$_POST['work_zip']);
	$home_city =   mysqli_real_escape_string($con,$_POST['home_city']);
	$home_zip =   mysqli_real_escape_string($con,$_POST['home_zip']);
	$avg=  mysqli_real_escape_string($con,$_POST['miles_day']);
	$avg_weekend=  mysqli_real_escape_string($con,$_POST['miles_weekend']);
	$comments =  mysqli_real_escape_string($con,$_POST['comments']);
	$_SESSION['firstName'] =  mysqli_real_escape_string($con,$first_name);
	$_SESSION['email'] =  mysqli_real_escape_string($con,$email);

	$date = date("m/d/Y H:i:s");
	// $sql="INSERT INTO DriverInfo (FirstName, LastName, Email, Phone, Referral,Referral_Person, dateSubmitted)
// 		VALUES ('$first_name', '$last_name', '$email', '$phone', NULL,NULL, '$date')";

	$getWorkState = mysqli_query($Statecon,"SELECT * FROM zipcode WHERE zip = '$work_zip'");
	//$setWorkState = mysqli_fetch_array($getWorkState);

  $workState ="";
	while($row = mysqli_fetch_array($getWorkState))
	{
		$workState=$row['state'];
	}

	$getHomeState = mysqli_query($Statecon,"SELECT * FROM zipcode WHERE zip = '$home_zip'");
	//$setWorkState = mysqli_fetch_array($getWorkState);
  $homeState="";
	while($row = mysqli_fetch_array($getHomeState))
	{
		$homeState=$row['state'];
	}

	//avgmonthly = (weekday miles * 22) + (weekend miles * 4.3)
	$avgMonthlyMiles = $avg*22 + $avg_weekend*4.3;

	$sql="INSERT INTO DriverInfo (FirstName, LastName, Email, Phone, dateSubmitted, HomeState, WorkState)
		VALUES ('$first_name', '$last_name', '$email', '$phone', '$date', '$homeState','$workState')";
    error_log ($sql, 3, 'mobile_bug.txt');

	if (!mysqli_query($con,$sql))
	{
	    error_log ('Error: '.mysqli_error($con), 3, 'mobile_bug.txt');

	 	die('Error: ' . mysqli_error($con));
	}
	else
	{

		$driverID = mysqli_insert_id($con);
		$sql="INSERT INTO DriverHabits (DriverID, Home_Zip, Home_City, Work_Zip, Work_City, Avg_Weekday_Miles,Avg_Weekend_Miles, Avg_Monthly_Miles,Comments, Home_State, Work_State)
			VALUES ($driverID,'$home_zip', '$home_city','$work_zip', '$work_city', '$avg', $avg_weekend, $avgMonthlyMiles,'$comments','$homeState', '$workState')";
      echo $sql;
	    error_log ($sql, 3, 'mobile_bug.txt');

		if (!mysqli_query($con,$sql))
		{
		    error_log ('Error: '.mysqli_error($con), 3, 'mobile_bug.txt');

			echo $sql;
			die('Error: ' . mysqli_error($con));
		}
		else
		{
			$sql="INSERT INTO VehicleInfo (DriverID,Year, Make, Model, Color,Current_Condition)
				VALUES ($driverID,$year, '$make', '$model', '$color', '$condition')";

		    error_log ($sql, 3, 'mobile_bug.txt');
			if (!mysqli_query($con,$sql))
			{
			    error_log ('Error: '.mysqli_error($con), 3, 'mobile_bug.txt');

				die('Error: ' . mysqli_error($con));
			}
			else
			{
				sendConfirmationEmail();
				echo "succeed";
			}
		}
	}
}

function sendConfirmationEmail(){

	$firstName = $_SESSION['firstName'];
	$email = $_SESSION['email'];

	//recipient - change this to your name and email
	$to = $email;
	//sender
	$from = '<breyla@carvertise.com>';

	//subject and the html message
	$subject = 'Thanks For Signing up!';

	$headers = "From: " . strip_tags('breyla@carvertise.com') . "\r\n";
	$headers .= "Reply-To: ". strip_tags('breyla@carvertise.com') . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";

	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


	$message = file_get_contents('admin/email_template.html');

	//Insert Users name into email
	$message = str_replace('{{name}}', $firstName, $message);

	//send the mail
	//$result = sendmail($to, $subject, $message, $from);
	$result = mail($to, $subject, $message,$headers);

}
mysqli_close($con);
?>
