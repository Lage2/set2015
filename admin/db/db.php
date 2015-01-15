<?php
	/**
	* The db.php file which initiates a connection to the database
	* and gives a global $db variable for access
	* @author Swashata <swashata@intechgrity.com>
	* @uses ezSQL MySQL
	*/
	/** edit your configuration */
	$dbuser = 'g02480_set2015';
	$dbname = 'g02480_set2015';
	$dbpassword = 'set2015IST';
	$dbhost = 'db.tecnico.ulisboa.pt';
	 
	 
	/** defined the root for the db */
	if(!defined('ADMIN_DB_DIR'))
		define('ADMIN_DB_DIR', dirname(__FILE__));
	 
	require_once ADMIN_DB_DIR . '/ez_sql_core.php';
	require_once ADMIN_DB_DIR . '/ez_sql_mysql.php';
	global $db;
	
	$db = new ezSQL_mysql($dbuser, $dbpassword, $dbname, $dbhost);
?>