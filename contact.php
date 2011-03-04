<?php
   include_once( 'glbl.php' );
   $pageId = 'contact';
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- Sadly, using a transitional doctype b/c the history manager needs an iframe. -->
<html lang="en">
  <head>
    <meta http-equiv="content-Type" content="text/html; charset=utf-8">
    <meta name="description" content="DesignMap designs user experiences for web sites and web and desktop applications and integrates with product developement teams that do the same.">
    <title>DesignMap | Contact Us</title>
    <link rel="stylesheet" type="text/css" href="site.css">
  </head><script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-9205689-1");
pageTracker._trackPageview();
} catch(err) {}</script>
  <body id="body">
    <div id="whiteFrame">
      <div id="topFrame">
        <div class="screenReaders">DesignMap is working to make this site fully accessible. If you are having difficulty seeing or using the site please let us know.</div>
        <iframe id="yui-history-iframe" src="blank.html" height="0" width="0" frameborder="0"></iframe>
        <input id="yui-history-field" type="hidden"> 
        <?php include_once( 'header.php' ); ?>        
        <!-- begin over content - what's written on the window shade -->
        <div id="overUpper">
          <div id="topSecWrapper"> <!-- for script.aculo.us -->
            <div id="topSec">
              <div id="topColOne" class="topCol1"><img src="images/map.jpg" height="361" width="721" alt="map of DesignMap's location"></div>
              <div id="topColTwo" class="topCol2">
                <h4 class="top">DesignMap</h4>
                <ul class="rtNav">
                  <li class="arrowNone">539 Bryant Street, Suite 210<br>San Francisco, CA  94107</li>
                  <li class="arrowNone">P: (415) 357-1875<br>F: (415) 449-3570</li>
                  <li class="arrowNone"><a class="emailContactRtSide" href="mailto:info@designmap.com">Email DesignMap</a>.</li>
                </ul>
              </div>
            </div> <!-- end topSec -->
          </div> <!-- end topSecWrapper -->
        </div> <!-- end overUpper -->
      </div> <!-- end topFrame -->
    </div> <!-- end whiteFrame -->

    <!-- nav -->
    <div id="navContainer">
      <div id="navContainerTwo" class="navContNorm">
        <div id="lowCol1WithShadeAction">
          <?php include_once( 'nav.php' ); ?>
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
            <h4>Contacting DesignMap</h4>
            <p>If you're interested in working with DesignMap or just want to learn more about us, <a class="emailContact" href="mailto:work@designmap.com">drop us a line</a>, and we'll get back to you!
          </div>
          <div id="botLtDynamicContent" class="botLtContent botLtDefContent" style="display:none;"></div>
        </div>
        <div class="rtSide botRtContent">
          <h5 class="topItem lighter">Directions</h5>
          <ul>
            <li class="boundLR1 arrowNone"><a class="botRtLink boundLR1 linkLRoff" href="http://maps.google.com/maps?client=safari&amp;ie=UTF8&amp;oe=UTF-8&amp;q=539+Bryant+St.,+San+Francisco,+CA&amp;fb=1&amp;hl=en&amp;cd=1&amp;f=&amp;ll=37.780467,-122.396879&amp;spn=0.01277,0.021672&amp;z=16&amp;iwloc=addr" name="Find us on Google Maps.">Find us on Google Maps.</a></li>
            <li class="boundLR2 arrowNone"><a class="botRtLink boundLR2 linkLRoff closeTop" href="#lowerLtContent=contactForm_1.php" name="Let's Start a Conversation">Let's Start a Conversation</a></li>
          </ul>
          <div id="blogArchive" style="display:none;">
        </div>
      </div>
    </div>     
    <?php include_once( 'footer.php' ); ?>
    <script src="/lib/javascript/prototypeExtensions/rsv.js" type="text/javascript"></script>
  </body>
</html>
