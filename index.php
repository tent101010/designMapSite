<?php
   include_once( 'glbl.php' );
  $pageId = 'index';
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- Sadly, using a transitional doctype b/c the history manager needs an iframe. -->
<html lang="en">
  <head>
    <meta http-equiv="content-Type" content="text/html; charset=utf-8">
    <meta name="description" content="DesignMap designs user experiences for web sites and web and desktop applications and integrates with product developement teams that do the same.">
    <title>DesignMap | Home</title>
    <link rel="stylesheet" type="text/css" href="site.css">
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
    <script>
	jQuery.noConflict();
     // Use jQuery via jQuery(...)
     jQuery(document).ready(function(){
     	/* search button image swap on hover */
		jQuery("#subscribeBtn").hover(function() { 
			jQuery('#subscribeBtn').attr('src', 'images/subscribeBtn_on.png'); }, function() {
				jQuery('#subscribeBtn').attr('src', 'images/subscribeBtn_off.png');
		});
		
		/* subscribe button image swap on hover */
		jQuery(".feed").hover(function() { 
			jQuery('.feed').attr('src', 'images/icon_rss_over.png'); }, function() {
				jQuery('.feed').attr('src', 'images/icon_rss_up.png');
		});
		
		/* social media image swap on hover */
		jQuery(".twit").hover(function() { 
			jQuery('.twit').attr('src', 'images/icon_twitter_over.png'); }, function() {
				jQuery('.twit').attr('src', 'images/icon_twitter_up.png');
		});
		jQuery(".facebook").hover(function() { 
			jQuery('.facebook').attr('src', 'images/icon_facebook_over.png'); }, function() {
				jQuery('.facebook').attr('src', 'images/icon_facebook_up.png');
		});	
		
		
		
		jQuery("form").submit(function() {
			// Grab form action
			formAction = jQuery("form").attr("action");
			
			emailId = "jiikud-jiikud";
			
			var nameChecker = true;
			var emailChecker = true;
			// Validate email address with regex
			if (!validate("subscribeForm",emailId)) 
			{
				emailChecker = false;
				//alert("Please enter a valid email address");
				//return false;
			} 
			
			if(jQuery('input#name').attr("value") == "Your name") { 
				nameChecker = false;  
				// reveal error message at line level
				//return false;  
			} else if (jQuery('input#name').attr("value") == "") { 
				nameChecker = false; 
				// reveal error message at line level
				//return false;  
			}
			
			if(nameChecker && emailChecker) {
				//complete success
				// Serialize form values to be submitted with POST
				var str = jQuery("form").serialize();
				
				// Add form action to end of serialized data
				final = str + "&action=" + formAction;
				// Submit the form via ajax
				jQuery.ajax({
					url: "proxy.php",
					type: "POST",
					data: final,
					error:function (xhr, ajaxOptions, thrownError){
						alert(xhr.status);
						alert(thrownError);
					},
					success: function(html){
						jQuery(".nameError").hide();
						jQuery(".emailError").hide();
						jQuery("#theForm").hide(); // If successfully submitted hides the form
						jQuery("#confirmation").slideDown("slow");  // Shows "Thanks for subscribing" div
					}
				});				
			} else {
				if(!nameChecker) {
					if(emailChecker) {
						jQuery(".emailError").hide();
					}
					//put code here to throw validation error for name
					jQuery(".nameError").show();
				}	
				if(!emailChecker) {
					if(nameChecker) {
						jQuery(".nameError").hide();
					}
					// put code here to throw validation error for email
					jQuery(".emailError").show();
				}
			}
			
			return false;
		});
		
     });
	 
	 
	 function validate(form_id,email) {
	   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	   var address = document.forms[form_id].elements[email].value;
	   if(reg.test(address) == false) {
		  return false;
	   } else {
	      return true;
	   }
	}
	</script>
</head>
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-9205689-1");
pageTracker._trackPageview();
} catch(err) {}
</script>
  <body id="body">
<div id="whiteFrame">
      <div id="topFrame">
        <div class="screenReaders">DesignMap is working to make this site fully accessible. If you are having difficulty seeing or using the site please let us know.</div>
        <iframe id="yui-history-iframe" src="blank.html" height="0" width="0" frameborder="0"></iframe>
        <input id="yui-history-field" type="hidden"> 
<?php include_once( $_SERVER['DOCUMENT_ROOT'] . $base_path . 'header.php' ); ?>
        <!-- begin over content - what's written on the window shade -->
        <div id="overUpper">
          <div id="topSecWrapper"> <!-- for script.aculo.us -->
            <div id="topSecTopMarginHome">
              <div id="topSecHome">
                <div id="homeAniContainerOne">
                  <div class="topCol1Plus2">
                    <div class="lineOne"><img class="bound1" src="images/line1Norm.gif" width="851" height="58" alt="DesignMap designs user experiences for"></div>
                    <div class="lineTwo"><img class="bound2 bound3" src="images/line2Norm.gif" width="833"  height="58" alt="web sites, web and desktop applications,"></div>
                    <div class="lineThree"><img class="bound4" src="images/line3Norm.gif" width="852" height="58" alt="and integrates with product development"></div>
                    <div class="lineFour"><img src="images/line4Norm.gif" width="503" height="58" alt="teams that do the same."></div>
                    <img id="homeImageMap" src="images/transPix.gif" width="852" height="211" alt="transparent Image for the image map" usemap="#homeImageMap_Map">
                    <map name="homeImageMap_Map">
                      <area class="map bound1 homeTxt" shape="rect" alt="user experiences" coords="428,0,779,44" href="services.php">
                      <area class="map bound2 homeTxt" shape="rect" alt="web sites" coords="1,58,198,93" href="services.php#subnav=servProj9v1">
                      <area class="map bound3 homeTxt" shape="rect" alt="applications" coords="586,58,823,102" href="services.php#subnav=servProj10v1">
                      <area class="map bound4 homeTxt" shape="rect" alt="integrates" coords="91,116,293,160" href="services.php#subnav=servProj11v1">
                    </map>
                    <!--
                    <div id="homePaginationMain" class="pageOne">
                      <img src="images/transPix.gif" width="885" height="7" alt="" usemap="#paginationMainMap">
                      <map name="paginationMainMap">
                        <area href="#" id="homePgTwo" shape="circle" alt="" coords="852,2,4">
                      </map>
                    </div>
                    -->
                  </div>
                </div>
                <!--
                <div id="homeAniContainerTwo">
                  <div class="homeAniContainerTwo">
                    <div class="homePS">
                      <div class="homePStextOne"></div>
                      <div id="homePStextTwo" class="boundPsOne">
                        <img src="images/transPix.gif" width="297" height="46" alt="transparent Image for the image map" usemap="#homePsTuningMap">
                        <map name="homePsTuningMap">
                          <area class="homeTxt boundPsOne histItem" shape="rect" alt="Product Tuning" coords="0, 0, 297, 46" href="services.php#lowerSec=psProductTuning_1">
                        </map>
                        <div id="tuningArrow">
                          <img class="boundPsOne" src="images/home_ps_arrow.gif" alt="arrow">
                        </div>
                      </div>
                      <div id="homePStextThree" class="boundPsTwo">
                        <img src="images/transPix.gif" width="250" height="46" alt="transparent Image for the image map" usemap="#homePsSubscriptionMap">
                        <map name="homePsSubscriptionMap">
                          <area class="homeTxt boundPsTwo histItem" shape="rect" alt="Subscription" coords="0, 0, 250, 46" href="services.php#lowerSec=psSubscription_1">
                        </map>
                        <div id="subscriptionArrow">
                          <img  class="boundPsTwo" src="images/home_ps_arrow.gif" alt="arrow">
                        </div>
                      </div>
                      <div id="homePaginationPS" class="pageTwo">
                        <img src="images/transPix.gif" width="885" height="7" alt="" usemap="#paginationPSMap">
                        <map name="paginationPSMap">
                          <area href="#" id="homePgOne" shape="circle" alt="" coords="842,2,4">
                       </map>
                      </div>
                    </div>
                  </div>
                </div>
                -->
              </div> <!-- end topSecHome -->
            </div> <!-- end topSecTopMarginHome -->
          </div> <!-- end topSecWrapper -->
        </div> <!-- end overUpper -->
      </div> <!-- end topFrame -->
    </div> <!-- end whiteFrame -->

    <!-- nav -->
    <div id="navContainer">
      <div id="navContainerTwo" class="navContNorm">
        <div id="lowCol1WithShadeAction">
          <?php 
		  include_once( $_SERVER['DOCUMENT_ROOT'] . $base_path . 'nav.php' );
		  
		  		
		  ?>
        </div>
        <div id="lowCol2" class="lowColTwoTopOpen rtSide">
          <div id="openTopWrapper"> <!-- for script.aculo.us -->
            <div id="shadeTrigger" class="openTop norm" style="display:none;">
              <span class="spanNorm">Open Top</span>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <!-- end nav -->

    <div id="lowerSection">
      <div class="container">
        <div class="ltSideWithShadeAction">
          <div id="botLtDefaultContent" class="botLtContent botLtDefContent">
            <div class="topItem">
              <p class="home">We know that any product we design must be delightful and intuitive <i>and</i> buildable and viable. Finding perfection in this balance is what makes us passionate about design, your business and your users.</p>
              <h5><a href="DesignMapCapabilityOverview.pdf">Download Our Capabilities Overview</a></h5>
            </div>
          </div>
          <div id="botLtDynamicContent" class="botLtContent botLtDefContent" style="display:none;"></div>
        </div>
        <div class="rtSide botRtContent">
          <h5 class="topItem medium">Latest Blog Posts</h5>
          <?php
			// include lastRSS library
			include 'lastRSS.php';
			// create lastRSS object
			$rss = new lastRSS;
			
			// setup transparent cache
			$rss->cache_dir = './cache';
			$rss->cache_time = 3600; // one hour
			$rss->items_limit = 5; 
			
			// load some RSS file
			if ($rs = $rss->get('http://uncharted.designmap.com/?feed=rss2')) {
				echo "<ul class=\"entries\">\n";
				foreach($rs['items'] as $item) {
					echo "\t<li><a href=\"$item[link]\">".$item['title']."</a><br />".$item['description']."</li>\n";
					}
				echo "</ul>\n";
			}
			
		  ?>
          <div id="blogArchive" style="display:none;">
            <!-- 
            <h5 class="lighter">Archive</h5>
              <div id="archiveLinks">
                <a href="#">May 2008</a> | <a href="#">April 2008</a> | <a href="#">March 2008</a>
              </div>
            -->
          </div>
          <div id="emailSubscribe">
          	<h5 class="topItem medium">Email Newsletter</h5>
            <div id="theForm">
            <p>Sign up to get our featured articles delivered straight to your inbox.</p>
                <form id="subscribeForm" name="emailSubscribe"  action="http://designmap.createsend.com/t/r/s/jiikud/" method="post">
                    <input class="emailer" type="text" name="cm-name" id="name"  value="Your name" onFocus="if(this.value=='Your name')value='';" onblur="if(this.value=='')value='Your name';"><span class="nameError" style="display: none;"><img src="images/x.png" width="12" height="12" alt="error"></span>
                    <input class="emailer" type="text"name="cm-jiikud-jiikud" id="jiikud-jiikud" value="Your email address" onFocus="if(this.value=='Your email address')value='';" onblur="if(this.value=='')value='Your email address';"><span class="emailError" style="display: none;"><img src="images/x.png" width="12" height="12" alt="error"></span><br>
                    <input type="image" src="images/subscribeBtn_off.png" width="66" height="22" id="subscribeBtn">
                </form>
			</div>
            <div id="confirmation" style="display: none;">Thanks for subscribing</div>
          </div> <!-- end #emailSubscribe -->
          <div id="stayConnect">
          	Stay connected with <a href="http://uncharted.designmap.com/?feed=rss2"><img src="images/icon_rss_up.png" alt="Subscribe to our feed" width="16" height="27" class="feed"></a> <a href="http://twitter.com/designmap"><img src="images/icon_twitter_up.png" alt="Follow us on Twitter" width="16" height="27" class="twit"></a> <a href="http://www.facebook.com/DesignMap"><img src="images/icon_facebook_up.png" alt="Follow us on facebook" width="16" height="27" class="facebook"></a>          </div> 
          <!-- end #stayConnect -->
        </div>
      </div>
    </div>
    <?php include_once( $_SERVER['DOCUMENT_ROOT'] . $base_path . 'footer.php' ); ?>
    <img src="images/icon_rss_over.png" width="16" height="27" alt="RSS" style="display:none;" />
    <img src="images/icon_twitter_over.png" width="16" height="27" alt="Twitter" style="display:none;" />
    <img src="images/icon_facebook_over.png" width="16" height="27" alt="Facebook" style="display:none;" />
    <img src="images/subscribeBtn_on.png" width="66" height="22" alt="Subscribe" style="display:none;" />
     

 </body>
</html>
