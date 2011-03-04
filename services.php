<?php 
  include_once( 'glbl.php' );
  $pageId = 'services'; 
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<!-- Sadly, using a transitional doctype b/c the history manager needs an iframe. -->
<html lang="en">
  <head>
    <meta http-equiv="content-Type" content="text/html; charset=utf-8">
    <meta name="description" content="DesignMap designs user experiences for web sites and web and desktop applications and integrates with product developement teams that do the same.">
    <title>DesignMap | Our Services</title>
    <link rel="stylesheet" type="text/css" href="site.css">
  </head>
  <script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-9205689-1");
pageTracker._trackPageview();
} catch(err) {}</script>
  <body id="body">
    <div id="popDivProt" style="display:none;">
      <div id="modalDynContentProt"></div>
    </div>
    <div id="popDivComp" style="display:none;">
      <div id="modalDynContentComp"></div>
    </div>
    <div id="popDivHeur" style="display:none;">
      <div id="modalDynContentHeur"></div>
    </div>
    <div id="popDivUsab" style="display:none;">
      <div id="modalDynContentUsab"></div>
    </div>
    <div id="popDivDesi" style="display:none;">
      <div id="modalDynContentDesi"></div>
    </div>
    <div id="popDivProf" style="display:none;">
      <div id="modalDynContentProf"></div>
    </div>
    <div id="popDivProd" style="display:none;">
      <div id="modalDynContentProd"></div>
    </div>
    <div id="whiteFrame">
      <div id="topFrame">
        <div class="screenReaders">
          DesignMap is working to make this site fully accessible. If you are having difficulty seeing or using the site please let us know.
        </div>
        <iframe id="yui-history-iframe" src="blank.html" height="0" width="0" frameborder="0"></iframe> 
        <input id="yui-history-field" type="hidden">  
        <?php include_once( 'header.php' ); ?>
        <!-- begin over content - what's written on the window shade -->
        <div id="overUpper">
          <div id="topSecWrapper"> <!-- for script.aculo.us -->
            <div id="topSec">
              <div id="topColOne" class="topCol1">
                <div id ="defaultContent" style="display:none;">
                  <div id="servicesMain" class="ulGroup histItem rightnav"></div>
                </div>
                <div id ="dynamicContent" style="display:none;"></div>
              </div>
              <div id="topColTwo" class="topCol2" style="display:none;">
                <h4 class="top">Project Types</h4>
                <ul class="rtNav">
                  <li class=" bound9 rightnav arrowNone">
                    <a id= "servProj9c1RtLink" class="histItem rightnav  bound9 txt linkURoff" href="#subnav=servProj9v1.php" name="Web Site Design">Web Site Design</a>
                  </li>
                  <li class="bound10 rightnav arrowNone">
                    <a id="servProj10c1RtLink" class="histItem rightnav bound10 txt linkURoff" href="#subnav=servProj10v1.php" name="Application Design">Application Design</a>
                  </li>
                  <li class="bound11 rightnav arrowNone">
                    <a id="servProj11c1RtLink" class="histItem rightnav bound11 txt linkURoff" href="#subnav=servProj11v1.php" name="Augmenting Teams">Augmenting Teams</a>
                  </li>
                </ul>
                <h4>Services</h4>
                <ul class="rtNav">
                  <li class="bound1 rightnav arrowNone">
                    <a id="servProj1c1RtLink" class="histItem rightnav bound1 txt linkURoff" href="#subnav=servProj1v1.php" name="Design Strategy">Design Strategy</a>
                  </li>
                  <li class="bound2 rightnav arrowNone">
                    <a id="servProj2c1RtLink" class="histItem rightnav bound2 txt linkURoff" href="#subnav=servProj2v1.php" name="Audits (Heuristic Reviews)">Audits (Heuristic Reviews)</a>
                  </li>
                  <li class="bound3 rightnav arrowNone">
                    <a id="servProj3c1RtLink" class="histItem rightnav bound3 txt linkURoff" href="#subnav=servProj3v1.php" name="User Research">User Research</a>
                  </li>
                  <li class="bound4 rightnav arrowNone">
                    <a id="servProj4c1RtLink" class="histItem rightnav bound4 txt linkURoff" href="#subnav=servProj4v1.php" name="Proofs of Concept">Proofs of Concept</a>
                  </li>
                  <li class="bound5 rightnav arrowNone">
                    <a id="servProj5c1RtLink" class="histItem rightnav bound5 txt linkURoff" href="#subnav=servProj5v1.php" name="Usability Studies">Usability Studies</a>
                  </li>
                  <li class="bound6 rightnav arrowNone">
                    <a id="servProj6c1RtLink" class="histItem rightnav bound6 txt linkURoff" href="#subnav=servProj6v1.php" name="Interaction Design">Interaction Design</a>
                  </li>
                  <li class="bound7 rightnav arrowNone">
                    <a id="servProj7c1RtLink" class="histItem rightnav bound7 txt linkURoff" href="#subnav=servProj7v1.php" name="Visual Design">Visual Design</a>
                  </li>
                  <li class="bound8 rightnav arrowNone">
                    <a id="servProj8c1RtLink" class="histItem rightnav bound8 txt linkURoff" href="#subnav=servProj8v1.php" name="Front-End Development">Front-End Development</a>
                  </li>
                </ul>
                <!--
                <div class="psRtNav">
                  <h4><a class="bound12 closeTop" href="#lowerLtContent=psOverview_1.php">Packaged Services</a></h4>
                  <div><a class="bound12 closeTop off" href="#lowerLtContent=psOverview_1.php"><img src="images/transPix.gif" alt="transparent pixel" width="30" height="31"></a></div>
                </div>
                -->
              </div>
            </div> <!-- end topSec -->
          </div> <!-- end topSecWrapper -->
        </div> <!-- end overUpper -->
      </div> <!-- end topFrame -->
    </div> <!-- end whiteFrame -->
      
    <!-- debug divs -->
    <div id="cursorPos"></div>
    <div id="debug"></div> 
    <div id="isOnCircleDebug"></div>
    <!-- end debug divs -->      
      
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
            <p class="impBlurb">We start our engagements by deeply understanding our client's problems, issues and information. Then we create a visual record of our understanding to get shared agreement on the problem, the goal, and the solution. <i>Then</i> we put our skills and services together in a way that meets the client's particular needs.</p>
            <p class="impBlurb">Get the details on our process here, or <a href="DesignMapCapabilityOverview.pdf">download our capabilities overview</a> (PDF) to share with your team.</p>
          </div>
          <div id="botLtDynamicContent" class="botLtContent" style="display:none;"></div>
        </div>
        <div class="rtSide botRtContent">
          <div id="blogArchive" style="display:none;"></div> 
        </div>
      </div>
    </div>
    <?php include_once( 'footer.php' ); ?>
    <script src="/lib/javascript/popDiv/PopDiv.js" type="text/javascript"></script>
  </body>
</html>
