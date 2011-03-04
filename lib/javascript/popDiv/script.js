var pAndD = undefined;
Event.observe( window, "load", function () {
  $('one').observe( 'click', popWrapper.bindAsEventListener( null, 200, 400, $('popupOne'), 0.85, 0, 1 ) ); 
  $('two').observe( 'click', popWrapper.bindAsEventListener( null, 150, 300, $('popupTwo'), 0.85, 0, 0 ) ); 
  $('twoUp').observe( 'click', popWrapper.bindAsEventListener( null, 50, 100, $('popupFour'), 0.85, 0 ) );
  $('threeUp').observe( 'click', popWrapper.bindAsEventListener( null, 100, 200, $('popupThree'), 0.85, 0 ) );
  // pass a PopDiv instance
  $('closePop1').observe( 'click', function() {
    // cruise through the array of PopDivs until you find the one where
    // the content HTML Object's id  matches
    var target = pAndD.scanPopDivColl( 'popupOne' );
    if ( target != null ) {
      pAndD.hidePopDiv( target );
    }	
  } );
  $('closePop2').observe( 'click', function() {
    var target = pAndD.scanPopDivColl( 'popupTwo' );
    if ( target != null ) {
      pAndD.hidePopDiv( target );
    }
  } );
  $('closePop3').observe( 'click', function() {
    var target = pAndD.scanPopDivColl( 'popupThree' );
    if ( target != null ) {
      pAndD.hidePopDiv( target );
    }
  } );
  $('closePop4').observe( 'click', function() {
    var target = pAndD.scanPopDivColl( 'popupFour' );
    if ( target != null ) {
      pAndD.hidePopDiv( target );
    }
  } );
} );