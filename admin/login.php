<!DOCTYPE html>
<html>
	<head>
		<link href="../css/set.css" rel="stylesheet">
		<link href="../css/font-awesome.min.css" rel="stylesheet">
	</head>
	<body>
		<div id="navigation">
			<nav id="navigation-bar" class="navbar navbar-default navbar-fixed-top" role="navigation">
				<div class="container-fluid">
					
					<div class="navbar-header navbar-left">
						<button type="button" class="navbar-toggle collapsed" 
								data-toggle="collapse" data-target="#nav-collapse">
							<span class="sr-only">Toggle navigation</span>
					        <span class="icon-bar"></span>
					        <span class="icon-bar"></span>
					        <span class="icon-bar"></span>
						</button>
						<a id="set-logo" class="navbar-brand" href="#">
							<img class="hidden-xs" src="../img/set_media/set_small.png" alt="SET Logo">
							<img class="visible-xs-block" src="../img/set_media/set_tiny.png" alt="SET Logo">
						</a>
					</div>

					<div id="ist-logo" class="collapse navbar-collapse navbar-left">
						<a class="navbar-brand" target="blank" href="http://tecnico.ulisboa.pt/">
							<img class="collapsed" src="../img/set_media/tecnico_neg_big.png" alt="IST Logo">
						</a>
					</div>

					<div class="collapse navbar-collapse" id="nav-collapse">
						<ul class="nav navbar-nav navbar-right">
							<li><a href="../index.html"><i class="fa fa-undo"></i>  Regressar</a></li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
		<div>
			<form id="admin" action="login-action.php" method="post">
				<div class="form-group">
					<label for="exampleInputEmail1">istID</label>
					<input type="text" class="form-control" name="istID" id="istID" placeholder="ist1XXXXX">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input type="password" class="form-control" name="password" placeholder="Password">
				</div>
				<p><button type="submit" class="btn btn-default">Submit</button></p>
			</form>
		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script type="text/javascript" src="admin.js"></script>
	</body>
</html>