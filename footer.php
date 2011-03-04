<?php
date_default_timezone_set('America/Los_Angeles');
$d = date( "Y" );
?>
<!-- begin footer -->
<div id="ftContainer">
  <div id="footerContainer">
    <div class="container">
      <div class="ltSideWithShadeAction foot">
        <div id="footer"><p>&copy; <?php echo( $d );?> DesignMap Inc. All Rights Reserved</p></div>
      </div>
      <div class="rtSide"></div>
    </div>
  </div>
</div>
<!-- end footer -->

<script src="/lib/javascript/scriptaculous-js-1.9.0/lib/prototype.js" type="text/javascript"></script>
<script src="/lib/javascript/scriptaculous-js-1.9.0/src/scriptaculous.js" type="text/javascript"></script>
<script src="/lib/javascript/scriptaculous-js-1.9.0/src/effects.js" type="text/javascript"></script>

<!-- Combo-handled YUI JS files: --><!--
<script type="text/javascript" src="http://yui.yahooapis.com/combo?2.6.0/build/yahoo-dom-event/yahoo-dom-event.js&2.6.0/build/animation/animation-min.js&2.6.0/build/connection/connection-min.js&2.6.0/build/history/history-min.js"></script> 
-->

<!-- use these for development -->
<script type="text/javascript" src="/lib/javascript/yui/build/yahoo/yahoo.js"></script> 
<script type="text/javascript" src="/lib/javascript/yui/build/dom/dom.js"></script> 
<script type="text/javascript" src="/lib/javascript/yui/build/event/event.js"></script> 
<script type="text/javascript" src="/lib/javascript/yui/build/animation/animation.js"></script> 
<script type="text/javascript" src="/lib/javascript/yui/build/connection/connection.js"></script> 
<script type="text/javascript" src="/lib/javascript/yui/build/history/history.js"></script>

<!-- always include this - consider minimizing if possible -->
<script src="site.js" type="text/javascript"></script>
