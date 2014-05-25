<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Asheville, NC Budget App | A Code for Asheville Creation</title>
	<meta name='description' content='This website is a collaboration between Code for Asheville and the City of Asheville to improve citizens' ability to view, engage and discuss the city budget.'>
	<link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/css/bootstrap-combined.min.css" rel="stylesheet">

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script src="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min.js"></script>
	<link href="/css/splash.css" rel="stylesheet">

	<SCRIPT TYPE="text/javascript">
	  <!--
	      function popup(mylink, windowname)
	      {
	      if (! window.focus)return true;
	      var href;
	      if (typeof(mylink) == 'string')
	      href=mylink;
	      else
	      href=mylink.href;
	      window.open(href, windowname, 'width=500,height=300,scrollbars=yes');
	      return false;
	      }
	      //-->
	</SCRIPT>
</head>
<body>
	<img src="../img/background.jpg" class="background-image" alt="background image" />
	<div class='header-container'>
		<?php 
		// include '../includes/template_elements/nav.php'; 
		?>
		<div class='container'>
			<div class="row header-area">		
				<div class="span6">
					<h1>
						Asheville City Budget<br>
						2014-2015
					</h1>
				</div>
				<div class='header-right span6'>
					<p>
						a collaborative web effort brought to you by:
					</p>									
					<a href="http://www.codeforasheville.org" target="_blank">
						Code for Asheville
					</a>
					<span>&</span>
					<a href="http://www.ashevillenc.gov" target="_blank">
						The City of Asheville
					</a>
					<div class="CTA">
						<a href="/getinvolved.html" class="arrow-button" onclick="return popup(this, 'Getting Involved')">
							How Do I Get Involved?
						</a>
					</div>
				</div>					
			</div>		
		</div>
	</div>
	<div class="wrapper container">	
	</div>
	<div class="full-bleed full-bleed1">
		<div class="wrapper container">
			<div class="row">	
				<div class="span2 section-icon offset1">
					<img src="../img/bulb-icon.png" alt="bulb icon" />
				</div>
				<div class="span4">
					<h3 class="section-header">
						<a name="whatis">Tell Me What's New</a>
					</h3>
				</div>
				<div class="span5">
					<ul class="link-list">
						<li>
							<a href="message" class="">
								Understand Budget Priorities &#8594;
							</a>
						</li>
						<li>
							<a href="whatsnew" class="" >
								Explore What's Changed &#8594;
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="full-bleed full-bleed2">
		<div class="wrapper container">
			<div class="row">	
				<div class="span2 section-icon offset1">
					<img src="../img/money-icon.png" alt="bulb icon" />
				</div>
				<div class="span4">
					<h3 class="section-header">
						<a name="whatis">Show me the Money</a>
					</h3>
				</div>
				<div class="span5">
					<ul class="link-list">
						<li>
							<a href="expenses" class="">
								See how much goes where &#8594;
							</a>
						</li>
						<li>
							<a href="whatsnew" class="">
								See what's changed over time &#8594;
							</a>
						</li>						
					</ul>
				</div>
			</div>
		</div>		
	</div>
	<div class="full-bleed full-bleed3">
		<div class="wrapper container">
			<div class="row">	
				<div class="span2 section-icon offset1">
					<img src="../img/db-icon.png" alt="bulb icon" />
				</div>
				<div class="span4">
					<h3 class="section-header">
						<a name="whatis">Context and Resources</a>
					</h3>
				</div>
				<div class="span5">
					<ul class="link-list">
						<li>
							<a href="#" class="" style='color: red'>
								Budget Process &#8594;
							</a>
						</li>
						<li>
							<a href="#" class="" style='color: red'>
								Backup Documentation &#8594;
							</a>
						</li>
						<li>
							<a href="#" class="" style='color: red'>
								City Organization &#8594;
							</a>
						</li>						
					</ul>
				</div>
			</div>
		</div>		
	</div>
	<div class="full-bleed full-bleed4">
		<div class="wrapper container">
			<div class="row">	
				<div class="span2 section-icon offset1">
					<img src="../img/pencil-icon.png" alt="bulb icon" />
				</div>
				<div class="span4">
					<h3 class="section-header">
						<a name="whatis">About This App</a>
					</h3>
				</div>
				<div class="span5">
					<ul class="link-list">
						<li>
							<a href="about" class="">
								What's this about? &#8594;
							</a>
						</li>
						<li>
							<a href="next-steps" class="">
								Next Steps &#8594;
							</a>
						</li>						
						<li>
							<a href="how-to-help" class="">
								How you can help &#8594;
							</a>
						</li>						
					</ul>
				</div>
			</div>
		</div>		
	</div>
	<?php include '../includes/template_elements/footer.php'; ?>
</body>
</html>
