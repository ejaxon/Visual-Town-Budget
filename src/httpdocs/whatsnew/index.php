<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Asheville, NC Budget App | A Code for Asheville Creation</title>
  <meta name='description' content='ReRoute AVL is a civic hackathon bringing together transportation organizations and civic­ minded citizens of Asheville to rapidly conceive, design, and prototype multi­modal transportation solution apps.'>
  <?php include '../includes/template_elements/resources.php'; ?>
  
  <!-- PAGE SPECIFIC CSS -->
  <link rel="stylesheet" href="flexslider/flexslider.css">
  <style>
    rect.plus{
      fill:green;
    }
    rect.minus{
      fill:red;
    }
  </style>
  <!-- END PAGE SPECIFIC CSS -->

  <!-- PAGE SPECIFIC SCRIPTS -->
  <script src="flexslider/jquery.flexslider-min.js"></script>
  <script src="http://d3js.org/d3.v3.min.js"></script>
  <script src="budgetdiff.js"></script> 
  <!-- END PAGE SPECIFIC SCRIPTS -->

</head>

<body class="whatsnew">
  <!-- <img src="splash/images/background.jpg" class="background-image" alt="background image" /> -->
  <div class='header-container'>
    <?php include '../includes/template_elements/top-bar.php'; ?>     
  </div>
  <div class="slider">
    <div class="flexslider carousel">
      <ul class="slides">
        <li>
          <img src="http://media.reserveatlakekeowee.com/2013/02/slider_area_asheville_1-1280x651.jpg" />
            <div class="slide-overlay">
              <div>
                <h2>Stormwater Service Improvements</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed diam turpis. Phasellus accumsan auctor augue, ac scelerisque
                </p>
                <a href="#" class="border-button">
                  City Manager Explanation
                </a>
              </div>
            </div>
        </li>
        <li>
          <img src="http://media.reserveatlakekeowee.com/2013/02/slider_area_asheville_1-1280x651.jpg" />
            <div class="slide-overlay">
              <div>
                <h2>Another Slide</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed diam turpis. Phasellus accumsan auctor augue, ac scelerisque
                </p>
                <a href="#" class="border-button">
                  City Manager Explanation
                </a>
              </div>
            </div>
        </li>
      </ul>
    </div>
  </div>    
  <div class="container wrapper">
    <div class="row">
      <div class="span3">
        <div class="well">
          <div>
            <h3>What's Changed</h3>
          </div>
          <div id="mainFlow" class="interactionPanel" style="">
          </div> 
        </div>          
      </div>
      <div class="interactionPanel span9" style="">
        <h3>Top Ten Budget Differences Compared To Last Year</h3>
        <svg class="chart" id="chart" width="700" height="470"></svg>
      </div>
    </div>
  </div>
  <script>
    <!-- Fund,Department,Division,Account,Amount, -->
    d3.csv("budgetdiffs.csv", forceAmountType, afterRead);
  </script>
  <?php include '../includes/template_elements/footer.php'; ?>
</body>
</html>


<!-- SLIDER -->
<script type="text/javascript">
$('document').ready(function(){
  $('.flexslider').flexslider({
    animation: "slide",
    // animationLoop: false,
    // itemWidth: 210,
    // itemMargin: 5,
    // pausePlay: true,
    start: function(slider){
      $('body').removeClass('loading');
    }
  });
});
</script>

</html>
