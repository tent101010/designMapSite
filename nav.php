<?php
$links = array(   
   'index' => array(    'id' => 'index',
                        'static' => 'Home', 
                        'href' => 'href="index.php"',
                        'link' => '<a id="indexA" href="index.php">Home</a>', 
                        'linkCur' => '<a id="indexA" class="cur" href="index.php">Home</a>', 
            			   'coords' => 'coords="120,0, 101,26, 5,26, 5,24, 1,21, 0,0"' ), 
   'work'  => array(    'id' => 'work', 
                        'static' => 'Work',
                        'href' => 'href="work.php"',
                        'link' => '<a id="workA" href="work.php">Our Work</a>', 
                        'linkCur' => '<a id="workA" class="cur" href="work.php">Our Work</a>', 
            			   'coords' => 'coords="229,2,210,26,115,26,108,15,119,2"' ), 
   'services' => array( 'id' => 'services', 
                        'static' => 'Services', 
                        'href' => 'href="services.php"',
                        'link' => '<a id="servicesA" href="services.php">Our Services</a>',
                        'linkCur' => '<a id="servicesA" class="cur" href="services.php">Our Services</a>',
            			   'coords' => 'coords="339,2,320,26,225,26,218,15,229,2"' ), 
   'team' => array(     'id' => 'team', 
                        'static' => 'Team', 
                        'href' => 'href="team.php"',
                        'link' => '<a id="teamA" href="team.php">Our Team</a>',
                        'linkCur' => '<a id="teamA" class="cur" href="team.php">Our Team</a>',
            			   'coords' => 'coords="447,2,428,27,335,27,328,15,339,2"' ), 
	'blog' => array(    'id' => 'blog', 
                        'static' => 'Blog', 
                        'href' => 'href="http://uncharted.designmap.com"',
                        'link' => '<a id="blogA" href="http://uncharted.designmap.com">Blog</a>',
                        'linkCur' => '<a id="blogA" class="cur" href="http://uncharted.designmap.com">Blog</a>',
            			   'coords' => 'coords="556,2,537,27,444,27,437,15,448,2"' ), 	
   'contact' => array(  'id' => 'contact', 
                        'static' => 'Contact Us', 
                        'href' => 'href="contact.php"',
                        'link' => '<a id="contactA" href="contact.php">Contact Us</a>',
                        'linkCur' => '<a id="contactA" class="cur" href="contact.php">Contact Us</a>',
            			   'coords' => 'coords="666,2,647,27,554,27,546,15,557,2"' )
);

   echo( '<ul id="mainNav">' ."\n" );
   foreach ( $links as $key => $value ) {
      if ( $key == $pageId ) { //this is the current tab
         if ( $key === 'index' ) { //is it the leftmost one (index)?
            echo( "\t\t\t" . '<li id="' . $links[$key]['id'] .'Li" class="cur leftmost">' . $links[$key]['linkCur'] . '</li>' . "\n" );
         } else {
            echo( "\t\t\t" . '<li id="' . $links[$key]['id'] .'Li" class="cur">' . $links[$key]['linkCur'] . '</li>' . "\n" );
         }
      } elseif ( $key === 'index' ) {
         echo( "\t\t\t" . '<li id="' . $links[$key]['id'] .'Li" class="leftmost">' . $links[$key]['link'] . '</li>' . "\n" );
      } else {
         echo( "\t\t\t" . '<li id="' . $links[$key]['id'] . 'Li"> ' . $links[$key]['link'] . '</li>' . "\n" );
      }
   }
   echo( "\t\t" . '</ul>' . "\n" .
          "\t\t" .'<div id="imgMapImgContainer"><img id="imgMapImg" src="images/gifs/transPix.gif" width="662" height="28" usemap="#tabsMap" alt="transparent image"></div>' . "\n" .
          "\t\t" .'<map name="tabsMap">' . "\n");
   foreach ( $links as $key => $value ) {
      echo( "\t\t\t" .'<area id="' . $links[$key]['id'] .'" class="tab" shape="poly" alt=""' . $links[$key]['coords'] . ' ' . $links[$key]['href'] . ' >' . "\n" );
   }
   echo( "\t\t" . '</map> ' );
?>

