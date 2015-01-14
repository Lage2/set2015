<?php
	
	$data = array();

	/* File Upload */

	if(isset($_GET['files']))
	{  
	    $error = false;
	    $files = array();

	    $uploaddir = './uploads/';

	    foreach($_FILES as $file)
	    {
	    	
	    	$target_file = $uploaddir .basename($file['name']);
	    	$target_file_extention = pathinfo($target_file,PATHINFO_EXTENSION);

	    	$finfo = finfo_open(FILEINFO_MIME_TYPE);
			$mime = finfo_file($finfo, $file['tmp_name']);
			$data = array('mime' => $mime);

			//Check file extention
	    	if($target_file_extention != "pdf") {
	   			$error = true;
	   			$data = array('error' => 'File is not a PDF.'); 
			}

			//Check file size
			if ($file["size"] > 12000000) { //MAX_SIZE = 12MB
			    $error = true;
			    $data = array('error' => 'File is too big (max 12MB).'); 
			}

			// Check if file already exists
			if (file_exists($target_file)) {
	    		$error = true;
	    		$data = array('error' => $target_file.' File already exists.'); 
			}

			if(!$error)
	        	if(move_uploaded_file($file['tmp_name'], $target_file)){
		            $files[] = $uploaddir .$file['name'];
		        }else{
		            $error = true;
		        }
	    }
	}else{
	    $data = array('success' => 'Form was submitted', 'formData' => $_POST);
	}


	/* LinkedIn */
	$servername = "db.tecnico.ulisboa.pt"; //localhost
	$username = "g02480_set2015";
	$password = "set2015IST";
	$dbname = "g02480_set2015";

	// Create connection
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	// Check connection
	if (!$conn) {
	    die("Connection failed: " . mysqli_connect_error());
	}


	$linkedinId = $_POST["linkedinId"];

	if(!empty($linkedinId)){

		$linkedin_stmt = $conn->prepare("INSERT INTO linkedin (id) VALUES(?)");
		$linkedin_stmt->bind_param("i", $linkedinId);
		$linkedin_stmt->execute();
		$linkedin_stmt->close();
	}

	mysqli_close($conn);

	echo json_encode($data);
?>