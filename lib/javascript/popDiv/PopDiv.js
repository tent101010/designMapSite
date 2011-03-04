/* Consider this an example function showing how to use these two objects. Comment it out and write your own, probably in your main js file. It doesn't really belong here. */
/*
function popWrapper() {
  // get the arguments passed by bindAsEventListener
  var data = $A( arguments );
  // First, see if there's already a PopAndDim object and make one if necessary
  if ( !theServices.pAndD ) {
    theServices.pAndD = new PopAndDim( data[4], data[5], data[6] );
    theServices.pAndD.showDark();
  } else if ( theServices.pAndD.popColl.length == 0 ) {
     // If a pAndD object exitst and popCount=0 turn the dark property on.
     theServices.pAndD.showDark();
  }
  var pd = new PopDiv( data[1], data[2], data[3], data[6], data[7], data[8], data[9] );
  theServices.pAndD.addPopDiv( pd );
} 
*/
/*
 This little package contains two classes, PopAndDim and PopDiv, which enable easy and versatile placement of a popup div on an HTML page. The idea is to dim the original content, make that content inactive, and put up a DHTML popup (or more than one).
 
 Dependencies:
   scriptaculous.js, version 1.8.1 or better (http://script.aculo.us/)
 
 Thanks: This Javascript class picks bits and pieces from the X Library (http://www.cross-browser.com/). Thanks to Michael Foster for all the hard work. I've only used one entire function here, but I studied various files in the X Library which informed other things I've done and proved generally insightful.
 
 Tested on IE 6, IE 7, IE 8, FF 3.x, Safari 3.x, and Opera 9.x. The final appearance of a PopDiv depends on the CSS applied, so if the result is not what you expect, look at your styles before assuming there is something wrong with this code.
 */

/* 
 Class PopAndDim
 This small class does a few things:
 1. Provides the darkDiv that lives inbetween the main content and any visible popups.
 2. Provides a collection into which you can put your PopDivs along with methods to help manage the collection.
 3. Keeps track of how many PopDivs are visible and which ones. Note this number may be different from the number of PopDiv instances contained in the popColl because it's possible to create a PopDiv instances and then keep it alive so that it can be shown/hidden at will without creating a new PopDiv object every time. This is expecially handy if you're putting dynamic content into the PopDivs - via AJAX or whatever.
 4. Provides some convienience methods so that pass requests to show/hide and such to a PopDiv instance while also taking care of the PopAndDim things that need to be taken care of.
*/
/*
  CTOR
  @param opacity - How dark do you want the inactive content to be? If the input is < 0, opacity will be set to 0. If the input is > 1, the opacity will be set to 1.
  
  @param closeRange - 0 means that clicking outside a popped div will do nothing. 1 means that clicking outside a popped div will close the topmost div.
  
  @param transistionTime - How long should the fades be? This effect is done via the scriptaculous library's Effect.Appear and Effect.Fade objects.
  
  curZ - This value is used to set z-indexes. The dark layer is given 99 and the value is incremented for each popoup that is attached to the page. Therefore, order matters. You should add popups such that the last one you add is the one you want to appear on top. If you have z-index trouble try adjusting this in combination with setting containing elements to position:relative.
  
  dark - a div set with the opacity property. 'dark' covers the current document entirely and lies immediately on top of the main content and underneath any and all visible popups. 'dark' is attached when the first popup is attached and removed when the last popup is gone. You should create exactly one instance of PopAndDim on each page. There's nothing stopping you from creating more, but you can expect problems, starting with the fact that 'dark' is given as the HTML element id 'darkDiv'. Create more than one instance of this class, and you'll be trying to create more than one element with the same id. Naturally, this also means that the id 'darkDiv' must not already exist in your HTML.
  
  popColl - a collection of PopDiv instances currently attached to the page. Used to manage multiple popups on one page.
  
  visibleCount - the number of PopDiv that are currently visible. This number could be but is not necessarily equal to the number of items in popColl. It depends on whether any of the items in the collection have been hidden rather than removed.
*/
function PopAndDim( opacity, closeRange, transitionTime  ) {
  if ( opacity < 0 ) {
    this.opacity = 0;
  } else if ( opacity > 1 ) {
    this.opacity = 1;
  } else {
    this.opacity = opacity;
  }
  closeRange === 0 || closeRange === 1 ? this.closeRange = closeRange : this.closeRange = 0;
  this.transitionTime = transitionTime;
  this.curZ = 99;
  this.dark = (function() {
    var dims = xDocSize();
    var d = new Element( 'div', {id:'darkDiv'} );
    d.setStyle( { position:'absolute', 
                  overflow:'hidden', 
                  top:'0px', 
                  left:'0px', 
                  backgroundColor:'#000', 
                  height:dims.h + 'px', 
                  width:dims.w + 'px', 
                  'z-index':this.curZ} );
    document.body.appendChild( d );
    d.hide();
    return d;
  } )();
  this.popColl = [];
  this.visibleCount = 0;
  this.isDarkVisible = false;
}

/* Put the dark div on top of the main content covering the entire viewport or page, whichever is larger. */
PopAndDim.prototype.showDark = function() { 
  if ( !this.isDarkVisible ) {
    var dims = xDocSize();
    this.dark.setStyle( {height:dims.h + 'px', width:dims.w + 'px'} );
    Effect.Appear( this.dark, {to:this.opacity, duration:this.transitionTime} ); 
    this.isDarkVisible = true;
  }
}

/* Using transitionTime, fade out the dark div */
PopAndDim.prototype.hideDark = function() {
  if ( this.visibleCount <= 0 ) {
    Effect.Fade( this.dark, {duration:this.transitionTime} );
    this.isDarkVisible = false;
  } else {
    throw "Tried to fade out the dark div when there was still at least one PopDiv item visible on the page.";
  }
}

/* If, after some dynamic junk happens on the page, the darkDiv doesn't cover the whole page/viewport (whichever is larger), then resize it to cover. */
PopAndDim.prototype.refreshDark = function() {
  var dims = xDocSize();
  this.dark.setStyle( {height:dims.h + 'px', width:dims.w + 'px'} );
}

/*
 This should be a private method. It's used by closePopDiv(). There's nothing to stop you from using this directly, but you shouldn't need to. See closePopDiv()'s documentation.
 1. Ask the PopDiv instance to show itself.
 2. Increment popCount (num of popups currently visible).
*/
PopAndDim.prototype.showPopDiv = function( aPopDiv ) {
  if ( !this.isDarkVisible ) {
    this.showDark();
  }
  aPopDiv.showPop( this.curZ+1 );
  this.visibleCount++;
  this.curZ++;
}

/*
 *This should be a private method. It's used by closePopDiv(). There's nothing to stop you from using this directly, but you shouldn't need to. See closePopDiv()'s documentation.
 1. Ask the PopDiv instance to hide itself.
 2. Decrement popCount (num of popups currently visible).
*/
PopAndDim.prototype.hidePopDiv = function( event ) {
  var pd;
  if ( this.pAndDFriend ) {
    Event.stop( event );
    pd = this.pAndDFriend;
    this.hidePop();
  } else {
    pd = this;
    event.hidePop();
  }
  
  pd.visibleCount--;
  pd.curZ--;
  if ( pd.visibleCount <= 0 ) {
    pd.hideDark();
  }
  // this is bad, bad, bad - must get this out of here.
  $("whiteFrame").setStyle("opacity:1");
  $("navContainer").setStyle("opacity:1");
  $("lowerSection").setStyle("opacity:1");
}

/* Remove a PopDiv from popColl, adjust member properties, and hide it. */
PopAndDim.prototype.removePopDiv = function( event ) {
  Event.stop( event );
  var pd = this.pAndDFriend;
  this.hidePop();  
  pd.visibleCount--;
  pd.curZ--;
  if ( pd.visibleCount <= 0 ) {
    pd.hideDark();
  }
  // find this PopDiv in popColl and take it out of the array, filling in the gap.
  for ( var i = 0; i < pd.popColl.length; i++ ) {
    if ( pd.popColl[i].contentContainer == this.contentContainer ) pd.popColl.splice( i, 1 );
  }
  // this is bad, bad, bad - must get this out of here.
  $("whiteFrame").setStyle("opacity:1");
  $("navContainer").setStyle("opacity:1");
  $("lowerSection").setStyle("opacity:1");
}

/* Wrapper function that allows easy handling of persistent and non-persistent PopDiv instances. There is no need to remove a PopDiv if there's a chance it might need to be opened again, do hide it but let PopAndDim keep track of it.
   @param aPopDiv - PopDiv obj, the one you want to close
   @param persists - boolean, if true, then just hide, don't remove
*/
PopAndDim.prototype.closePopDiv = function( aPopDiv, persists ) {
  if ( persists ) {
    this.hidePopDiv( aPopDiv );
  } else {
    this.removePopDiv( aPopDiv );
  }
}

/* Add a PopDiv instance to popColl. Use PopDiv methods attach(), show() and hide() to actually add them to a page and to make them 
   @param aPopDiv - pass an instance of a PopDiv object to display on the page */
PopAndDim.prototype.addPopDiv = function( aPopDiv ) {
  this.popColl.push( aPopDiv );
  aPopDiv.setPandDFriend( this );
}

/* Takes a string argument and tries to match that string with the id of a member of the collection. Returns the matching element if it exists. */
PopAndDim.prototype.scanPopDivColl = function( aString ) {
  for ( var i = 0; i < this.popColl.length; i++ ) {
    if ( this.popColl[i].animationContainer == aString ) return this.popColl[i]; 
  }
  return null;
}
// end PopAndDim

/* xDocSize r1, Copyright 2007 Michael Foster (Cross-Browser.com)
   Part of X, a Cross-Browser Javascript Library, Distributed under the terms of the GNU LGPL */
 function xDocSize() {
  var b = document.body
  var e = document.documentElement;
  var esw = 0, eow = 0, bsw = 0, bow = 0, esh = 0, eoh = 0, bsh = 0, boh = 0;
  if (e) {
    esw = e.scrollWidth;
    eow = e.offsetWidth;
    esh = e.scrollHeight;
    eoh = e.offsetHeight;
  }
  if (b) {
    bsw = b.scrollWidth;
    bow = b.offsetWidth;
    bsh = b.scrollHeight;
    boh = b.offsetHeight;
  }
  return {w:Math.max( esw, eow, bsw, bow ),h:Math.max( esh, eoh, bsh, boh )};
}

/******************/
/*  Class PopDiv  */
/******************/
/* 
 CTOR
 Properties:
 
 height - the height of the popup 
 
 width - with width of the popup
 
 animationContainer - An HTML element object. It must already exist in the HTML. It's best if this is a plain old div with no CSS attached. This div will be used as the target for animations. In some cases animations goof up if there are styles attached to the target element. Essentially, this element is the popup. 
 Note:If the content you wish to have show up in a popup is in the HTML page, then it's likely you've hidden it. If you haven't already make sure you set "display:none" as an inline style attribute inside your HTML tag. Hey, I don't like it either, but Prototype.js's show() and hide() functions goof up if display:none isn't set this  way.
 
 contentContainer - Right inside animationContainer place another container. What you put in here can be almost anything. Load it with the page or fetch it later by any fancy means you like. Create whatever CSS rules you want and to target this element and it's children. The exceptions to this are the height and width rules, which are passed in at construction. Don't set these styles in your stylesheet - asking for trouble. 
 
 transTime - This value is passed in at construction and is used to set the length of time for the dark div to fade-in/out as well as the fade-in/out of the PopDiv. The effect is done via the scriptaculous library's Effect.Appear and Effect.Fade objects.
 
 closeTriggers - a collectiong of elements, identified by a common className that close a popup when clicked.
 
 relToElement - allows a PopDiv instance to be placed relative to some other element in the page rather than the default, which is to center in the viewport
 
 ofstTop - pixels down from the top of relToElement
 
 ofstLeft - pixels left from the left edge of relToElement
 */
function PopDiv( aHeight, aWidth, animationContainerId, contentContainerId, aTime, closeTriggers, anElementId, intTop, intLeft ) {
  // instance properties
  this.height = aHeight;
  this.width = aWidth;
  this.animationContainer = animationContainerId;
  $(this.animationContainer).setStyle( {opacity:1, position:'absolute', height:this.height + 'px', width:this.width + 'px'} ); 
  this.contentContainer = contentContainerId;
  this.transTime = aTime;
  this.closeTriggers = closeTriggers
  this.relToElement = anElementId;
  intTop === null ? this.ofstTop = 0 : this.ofstTop = intTop;
  intLeft === null ? this.ofstLeft = 0 : this.ofstLeft = intLeft;
  //this.pop = new Element( 'div' );
  
  this.pAndDFriend = null;
}

/* Place this popup, or more specifically the 'pop' property of this PopDiv instance, in the center of the viewport. Once set, the position of a popup div does not change regardless of window resize or scrolling of content. */
PopDiv.prototype.positionViewportCenter = function() {
  var vpScrollOffs = document.viewport.getScrollOffsets();
  var vpDims = document.viewport.getDimensions();
  var popDims = $(this.animationContainer).getDimensions();
  var l = vpScrollOffs[0]+(vpDims.width-popDims.width)/2;
  var t = vpScrollOffs[1]+(vpDims.height-popDims.height)/2;
  $(this.animationContainer).setStyle( {top:t+'px', left:l+'px'} );
}

/* Remove the PopDiv element from the page. */
PopDiv.detach = function( aPopDiv ) {  
  aPopDiv.animationContainer.remove();
}

/* Position the popup relative to some other element on the page */
PopDiv.prototype.positionRelative = function() {
  var co = $(this.relToElement).cumulativeOffset();
  // remove this popup from it's current location in the DOM
  //var temp = $(this.animationContainer).remove();
  // attach it to the ___ of the relToElement property
  //$(this.relToElement).relativize();
  //$(this.relToElement).insert( {before:temp} );
  $(this.animationContainer).setStyle( {"top":co[1] + this.ofstTop + "px", "left":co[0] + this.ofstLeft + "px"} );
}

/* Based, on the relToElement property, call the appropriate position function */
PopDiv.prototype.position = function() {
  if ( $(this.relToElement) ) {
    this.positionRelative();
  } else {
    this.positionViewportCenter();
  }
}

/* Show the popup.  */
PopDiv.prototype.showPop = function( intCurrentZindex ) {
  Effect.Appear( this.animationContainer, {to:1, duration:this.transTime} );
  $(this.animationContainer).setStyle( {"zIndex":intCurrentZindex} );
}

/* Hide the popup. */
PopDiv.prototype.hidePop = function() {
  Effect.Fade( this.animationContainer, {to:0, duration:this.transTime} );
}

/* This method handles closing PopDivs.
  1. First, depending on the PopAndDim object property closeRange, set or do not set an observer on the dark div. This determines if clicking outside the PopDiv closes it or not.
  
  2. Allow for persistence. That is, allow for a PopDiv, once created to persist when it's not visible. There's no need to recreate a PopDiv object more than once. Set this to false if you're quite sure that a perticular PopDiv instance will only be opened one time. At this time all elements that close a PopDiv will have the same persistence setting. That is, you can't have one close trigger that removes the popup entirely and another close trigger on the same PopDiv that just hides.
  
  @param persist - boolean, indicates whether you want closing this PopDiv instance to remove it from popColl or not. This allows for a single popup window to go way and come back without creating a new object. */
PopDiv.prototype.initCloseActions = function( persists ) {
  if ( this.pAndDFriend.closeRange === 1 ) {
    if ( persists ) {
      $(this.pAndDFriend.dark).observe( 'click', this.pAndDFriend.hidePopDiv.bindAsEventListener( this ) );
    } else {
      $(this.pAndDFriend.dark).observe( 'click', this.pAndDFriend.removePopDiv.bindAsEventListener( this ) );
    }
  }
  var t = $$( '.' + this.closeTriggers );
  if ( t.length !== 0 ) {
    for ( var i = 0; i < t.length; i++ ) {
      if ( persists ) {
        $(t[i]).observe( 'click', this.pAndDFriend.hidePopDiv.bindAsEventListener( this ) );
      } else {
        $(t[i]).observe( 'click', this.pAndDFriend.removePopDiv.bindAsEventListener( this ) );
      }
    }
  }
}

PopDiv.prototype.setPandDFriend = function( aPopAndDimObj ) {
  this.pAndDFriend = aPopAndDimObj;
}