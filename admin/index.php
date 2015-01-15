<?php
include_once 'admin-class.php';
$admin = new itg_admin();
$admin->_authenticate();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Administrator page</title>
    </head>
    <body>
        <fieldset>
            <legend>Welcome <?php echo $admin->get_nicename(); ?></legend>
                <p>
                    Here are some of the basic informations
                </p>
                <p>
                    Username: <?php echo $_SESSION['admin_login']; ?>
                </p>
                <p>
                    Email: <?php echo $admin->get_email(); ?>
                </p>
        </fieldset>
        <p>
            <input type="button" onclick="javascript:window.location.href='logout.php'" value="logout" />
        </p>
    </body>
</html>