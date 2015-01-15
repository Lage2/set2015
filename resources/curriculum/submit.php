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
	    	$temp = explode(".",$file["name"]);
			$new_name = sha1(file_get_contents($file)) . '.' .end($temp);
	    	$target_file = $uploaddir .basename($new_name);
	    	$target_file_extention = pathinfo($target_file,PATHINFO_EXTENSION);

	    	$finfo = finfo_open(FILEINFO_MIME_TYPE);
			$mime = finfo_file($finfo, $file['tmp_name']);
			$data = array('mime' => $mime);

			//Check file extention
	    	if($target_file_extention != "pdf") {
	   			$error = true;
	   			$data = array('error' => 'File is not a PDF.', 'error_code' => 0);
			}

			//Check file size
			if ($file["size"] > 12000000) { //MAX_SIZE = 12MB
			    $error = true;
			    $data = array('error' => 'File is too big (max 12MB).', 'error_code' => 1);
			}

			if ($file["size"] < 64000) { //MAX_SIZE = 64kB
			    $error = true;
			    $data = array('error' => 'File is too small (min 64kB).', 'error_code' => 2); 
			}

			// Check if file already exists
			if (file_exists($target_file)) {
	    		$error = true;
	    		$data = array('error' => $target_file.' File already exists.', 'error_code' => 3); 
			}

			if(!$error){
				
				$temp = explode(".",$file["name"]);
				$new_name = sha1(file_get_contents($file)) . '.' .end($temp);

	        	//if(move_uploaded_file($file['tmp_name'], $target_file)){
        		if(move_uploaded_file($file['tmp_name'], $uploaddir . $new_name)){	
		            $files[] = $uploaddir .$file['name'];
		        }else{
		            $error = true;
		        }
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
		$linkedin_stmt->bind_param("s", $linkedinId);
		$linkedin_stmt->execute();
		$linkedin_stmt->close();
	}

	mysqli_close($conn);

	echo json_encode($data);
?>