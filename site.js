/***********************
  GLOBAL VARIABLES
 ***********************/
var theSite = undefined;
var YUH = YAHOO.util.History; //for convenience
var nav = undefined;
var theGeo = undefined;
var theWinShade = undefined;
var theHome = undefined;
var theHist = undefined;
var theWork = undefined;
var theServices = undefined;
var theShifter = undefined;
var theTeam = undefined;
var theContact = undefined;
var mainContentEGM = undefined;

/***********************************************/
/*  Add methods to Prototype's Element object  */
/***********************************************/
/*
   getClassName returns, as a string, the first classname that
   matches the parameter strMatchMe. It's a regex matcher. Returns null if no
   match.
 */
var addToElement = {
getClassName: function( element, strMatchMe ) {
                  if ( element === undefined || element === null ) {
                      return undefined;
                  }
                  var classnames = Element.extend( element ).readAttribute( "class");
                  // make classnames into an array
                  var classnamesArr = classnames && typeof classnames.split == 'function' ?
                      classnames.split(' ') : [];
                  if ( classnamesArr.grep( strMatchMe ).first() ) {
                      return classnamesArr.grep( strMatchMe ).first();
                  } else {
                      return null;
                  }
              }
};
Element.addMethods( addToElement );
/******************************************************/
/*  End adding methods to Prototype's Element object  */
/******************************************************/

/* Initializations that must happen after the window loads */
Event.observe( window, 'load', function() {
        var pos = 1520 - $('lowCol2').cumulativeOffset()[0];
        $('body').setStyle( {backgroundPosition:"-"+ pos + "px 0px"} );
        /* Stop the navigation tab images from flickeringin IE6. */
        try {
        document.execCommand("BackgroundImageCache", false, true);
        } catch( err ) { }
        /* end IE6 flicker fix */

        Event.observe( window, 'resize', function(event) {
            // at x=1520 is where the color change is in the bg sprite.
            Event.stop(event);
            pos = 1520 - $('lowCol2').cumulativeOffset()[0];
            $('body').setStyle( {backgroundPosition:"-"+ pos + "px 0px"} );
            } );

        theSite = new Site();
        nav = new Navigation();

        // email obfuscation
        theGeo = new Geo();
        theGeo.process();
        var upperSecEGM, mainContentEGM, rightNavEGM, subNavMod, subNavModInitSec,
            lrqEGM, llEGM, lowSecMod, lowSecModInitSec, props1, props2, props3, m1, m2;
        // home page
        if ( nav.pageId == "index" ) {
            theHome = new HomePage( ".histItem" );
            theWinShade = new WindowShade( theHome );
            theSite.initOpenTopLinkUI();
            theSite.setCurSiteSection( theHome );
            props1 = [ null, null, null, null, null, null, null, null, null, null,
                   null, null, null, null, null, "bound" ];
            props2 = [  "arrowNone", "arrowGreen", "arrowBlack", null, "arrowNone",
                   "arrowBlack", "linkLRoff", "linkLRon", null, "linkLRoff", "linkLRon",
                   "textLRoff", "textLRon", "textLRon", null, "boundLR", "closeTop" ];
            upperSecEGM = new ElementGroupManager( ".homeTxt", props1,
                    theHome.homeTxtMouseover, theHome.homeTxtMouseout );
            lrqEGM = new ElementGroupManager( ".closeTop", props2, theHome.llMouseover,
                    theHome.llMouseout );
            theHome.setULegm( upperSecEGM );
            theHome.setLLegm( lrqEGM );
            theHome.initUI();
            // create the module(s) we need
            m1 = new Module( "lowerSec", "botLtDefaultContent", "botLtDynamicContent",
                    "default" );
            // pass the module(s) to YUIHistWrapper as an array
            theHist = new YUIHistWrapper( [m1], theHome );
            //theHome.doAnimationLoop();
            //setInterval( "theHome.doAnimationLoop()", 16000 );
        }

        // work page
        if ( nav.pageId == "work" ) {
            theWork = new WorkPage('.histItem');
            props1 = [ "arrowNone", "arrowGreen", "arrowBlack", null, "arrowNone",
                   "arrowBlack", "linkURoff", "linkURon", null, "linkURoff", "linkURon",
                   "textURoff", "textURon", "textURon", null, "bound", "rightnav"  ];
            props2 = [ null, null, null, null, null, null, null, null, null, null,
                   null, null, null, null, null, "bound", "ulGroup" ];
            rightNavEGM = new ElementGroupManager( ".rightnav", props1,
                    theWork.rtNavMouseover, theWork.rtNavMouseout );
            mainContentEGM = new ElementGroupManager( ".ulGroup", props2,
                    theWork.mainContentMouseover, theWork.mainContentMouseout );
            theWork.setURegm( rightNavEGM );
            theWork.setULegm(  mainContentEGM );
            theWork.initUI();
            m1 = new Module( "subnav", "defaultContent", "dynamicContent", "default" );
            m2 = new Module( "workImgIcons", "defaultContent", "dynamicContent",
                    "default" );
            theHist = new YUIHistWrapper( [m1,m2], theWork );
            theSite.setCurSiteSection( theWork );
        }

        // services page
        if ( nav.pageId == "services" ) {
            theServices = new ServicesPage('.histItem', '.nonHistory');
            theWinShade = new WindowShade( theServices );
            theSite.initOpenTopLinkUI();
            theSite.setCurSiteSection( theServices );
            theServices.setRings( new Rings( theServices ) );
            props1 = [ "arrowNone", "arrowGreen", "arrowBlack", null, "arrowNone",
                   "arrowBlack", "linkURoff", "linkURon", null, "linkURoff", "linkURon",
                   "textURoff", "textURon", "textURon", null, "bound", "rightnav", "psIconOff",
                   "psIconOn", "psIconOn", null, null, null ];
            props2 = [ null, null, null, null, null, null, null, null, null, null,
                   null, null, null, null, null, "bound", "ulGroup" ];
            props3 = [  null, null, null, null, null, null, null, null, null, null,
                   null, null, null, null, null, "", "closeTop" ];
            rightNavEGM = new ElementGroupManager( ".rightnav", props1,
                    theServices.rtNavMouseover, theServices.rtNavMouseout );
            mainContentEGM = new ElementGroupManager( ".ulGroup", props2,
                    theServices.mainContentMouseover, theServices.mainContentMouseout );
            llEGM = new ElementGroupManager( ".closeTop", props3,
                    theServices.llMouseover, theServices.llMouseout );
            theServices.setURegm( rightNavEGM );
            theServices.setULegm( mainContentEGM );
            theServices.setLLegm( llEGM );
            theServices.initUI();
            m1 = new Module( "subnav", "defaultContent", "dynamicContent", "default" );
            m2 = new Module( "lowerSec", "botLtDefaultContent", "botLtDynamicContent",
                    "default" );
            /*
               This module for loading content into a modal window. Not tracked by
               history even though it will exisist in the history wrapper instance.
             */
            m3 = new Module( "protModal", "protDefContent", "protDynContent", "default" );
            m4 = new Module( "compModal", "compDefContent", "compDynContent", "default" );
            m5 = new Module( "heurModal", "heurDefContent", "heurDynContent", "default" );
            m6 = new Module( "usabModal", "usabDefContent", "usabDynContent", "default" );
            theHist = new YUIHistWrapper( [m1,m2,m3], theServices );
            lowSecMod = theHist.getModule( "lowerSec" );
            lowSecModInitSec = lowSecMod.getInitSec();
            subNavMod = theHist.getModule( "subnav" );
            subNavModInitSec = subNavMod.getInitSec();
            if ( subNavModInitSec !== "default" && lowSecModInitSec !== "default" ) {
                theHist.setCurrentModule( subNavMod );
            } else if ( subNavModInitSec !== "default" ) {
                theHist.setCurrentModule( subNavMod );
            } else if ( lowSecModInitSec !== "default" ) {
                theHist.setCurrentModule( lowSecMod );
            }
            theShifter = new TextShifter();
        }

        // team page
        if ( nav.pageId == "team" ) {
            theTeam = new TeamPage('.histItem');
            theWinShade = new WindowShade( theTeam );
            theSite.initOpenTopLinkUI();
            theSite.setCurSiteSection( theTeam );
            props1 = [ "arrowNone", "arrowGreen", "arrowBlack", null, "arrowNone",
                   "arrowGreen", "linkURoff", "linkURon", null, "linkURoff", "linkURon",
                   "textURoff", "textURon", "textURon", null, "bound", "rightnav" ];
            props2 = [ null, null, null, null, null, null, null, null, null, null,
                   null, null, null, null, null, "bound", "ulGroup" ];
            props3 = [  "arrowNone", "arrowBlack", "arrowBlack", null, "arrowNone",
                   "arrowBlack", "linkLRoff", "linkLRon", null, "linkLRoff", "linkLRon",
                   "textLRoff", "textLRon", "textLRon", null, "boundLR", "" ];
            rightNavEGM = new ElementGroupManager( ".rightnav", props1,
                    theTeam.rtNavMouseover, theTeam.rtNavMoustout );
            mainContentEGM = new ElementGroupManager( ".map", props2,
                    theTeam.mapMouseover, theTeam.mapMouseout );
            llEGM = new ElementGroupManager( ".closeTop", props3, theTeam.llMouseover,
                    theTeam.llMouseout );
            theTeam.setURegm( rightNavEGM );
            theTeam.setULegm( mainContentEGM );
            theTeam.setLLegm( llEGM );
            theTeam.initUI();
            m1 = new Module( "subnav", "defaultContent", "dynamicContent", "default" );
            m2 = new Module( "lowerSec", "botLtDefaultContent", "botLtDynamicContent",
                    "default" );
            theHist = new YUIHistWrapper( [m1,m2], theTeam );
            lowSecMod = theHist.getModule( "lowerSec" );
            lowSecModInitSec = lowSecMod.getInitSec();
            subNavMod = theHist.getModule( "subnav" );
            subNavModInitSec = subNavMod.getInitSec();
            if ( subNavModInitSec !== "default" && lowSecModInitSec !== "default" ) {
                theHist.setCurrentModule( subNavMod );
            } else if ( subNavModInitSec !== "default" ) {
                theHist.setCurrentModule( subNavMod );
            } else if ( lowSecModInitSec !== "default" ) {
                theHist.setCurrentModule( lowSecMod );
            }
        }

        // contact page
        if ( nav.pageId === "contact" ) {
            theContact = new ContactPage( ".histItem", "contactForm" );
            theWinShade = new WindowShade( theContact );
            theSite.initOpenTopLinkUI();
            theSite.setCurSiteSection( theContact );
            props1 = [ null, null, null, null, null, null, null, null, null, null,
                   null, null, null, null, null, "bound", "ulGroup" ];
            props2 = [  "arrowNone", "null", "arrowBlack", null, "arrowNone", "null",
                   "linkLRoff", "linkLRon", null, "linkLRoff", "linkLRon", "textLRoff",
                   "textLRon", "textLRon", null, "boundLR", "" ];
            upperSecEGM = new ElementGroupManager( ".topCol1", props1, null, null );
            lrqEGM = new ElementGroupManager( ".botRtLink", props2,
                    theContact.llMouseover, theContact.llMouseout );
            theContact.setULegm( upperSecEGM );
            theContact.setLLegm( lrqEGM );
            theContact.initUI();
            m1 = new Module( "lowerSec", "botLtDefaultContent", "botLtDynamicContent",
                    "default" );
            theHist = new YUIHistWrapper( [m1], theContact );
            //lowSecMod = theHist.getModule( "lowerSec" );
            //lowSecModInitSec = lowSecMod.getInitSec();
        }

        // Initialize the browser history management library.
        try {
            YUH.initialize( "yui-history-field", "yui-history-iframe" );
        } catch (e) {
            /*
               The only exception that gets thrown here is when the browser is not
               supported (Opera, or not A-grade) Degrade gracefully. Note that we
               have two options here to degrade gracefully:
               1) Call initializeNavigationBar. The page will use Ajax/DHTML, but the
               back/forward buttons will not work.
               2) Initialize our module. The page will not use Ajax/DHTML, but the
               back/forward buttons will work. This is what we chose to do here:
             */
            if ( nav.pageId !== "contact" && nav.pageId !== "index" ) {
                theHist.loadSecFromRightNav( myHistObj.initLL );
                $("dynamicContent").show();
                $("topColTwo").show();
            }
            if ( nav.pageId === "index" ) {
                theHist.loadLowerLtContent( theHist.getModule( "lowerSec" ).initSec );
            } else if ( nav.pageId === "work" ) {
                theHist.loadSecFromRightNav( theHist.getModule( "subnav" ).initSec );
                theHist.loadSecFromImgIcons( theHist.getModule( "workImgIcons" ).initSec );
            } else if ( nav.pageId === "services" || nav.pageId === "team" ) {
                theHist.loadSecFromRightNav( theHist.getModule( "subnav" ).initSec );
                theHist.loadLowerLtContent( theHist.getModule( "lowerSec" ).initSec );
            } else if ( nav.pageId === "contact" ) {
                theHist.loadLowerLtContent( theHist.getModule( "lowerSec" ).initSec );
            }
        }
} );
/* end post onLoad event items */

/**********************************/
/*  HISTORY MANAGEMENT            */
/**********************************/
/* YUIHistWrapper is a wrapper for YUI's history manager.
   The hope is that this "class" can be used on any page to set up
   history management. The assumption, of course, is that YUIHistWrapper
   will only be used on pages that have state - that is the content
   viewable at a single URL changes, or can change, such that it'd be
   nice to keep track of those changes. Using the browsers back/forward
   button moves through the changes on a page rather than just to the
   last visited URL.
 */
var Module = Class.create( {
initialize: function( strName, defCont, dynCont, strDefState ) {
/*
   - defaultContent: the id of the element containing the section's
   default content
   - dynamicContent: the id of the element containing the section's
   dynamic content
   - defaultSec: a string indicating the default state of a Module. Note
   that Modules' default states are independent of one another. If
   there is more than one Module on a single page being tracked by YUH, then there
   is not so much a default page state as a series of default Module states that
   together make up the default page state.
   - bookmarkedSec: set if arriving at this page/state via a bookmark.
   - querySec: set if arriving at this page/state via a URI query string.
   - initSec:
 */
this.moduleName = strName;
this.defaultContent = defCont;
this.dynamicContent = dynCont;
this.defaultSec = strDefState;
this.bookmarkedSec = YUH.getBookmarkedState( this.moduleName );
this.querySec = YUH.getQueryStringParameter( this.moduleName );
this.initSec = this.bookmarkedSec || this.querySec || this.defaultSec;
            },
getModuleName: function() { return this.moduleName; },
               getDefaultContent: function() { return $( this.defaultContent ); },
               getDynamicContent: function() { return $( this.dynamicContent ); },
               getInitSec: function() { return this.initSec; }
} );

var YUIHistWrapper = Class.create( {
        /*
           initialize() gets passed an object that looks like this:
           { m1: {  name:"nameToGiveToHistoryModule",
defCont:"idOfElementContainingDefaultContent",
dynCont:"idOfElementContainingDynamicContent" } }
Each key/value pair will become a YUH module. initialize() iterates
through the collection, and does the following:
- creates a Module object for each key value pair in passed object
- creates a YUH module using the information stored in the Module object
Note that the Module object I refer to has nothing to do directly with
the concept of a module according to the YAHOO History object. That is
Modue objects are NOT part of the YAHOO.util.History object.
         */
initialize: function( arrModules, objSiteSection ) {
var ths = this; // for use in function literals below
this.modules = arrModules;
this.siteSection = objSiteSection;
this.fetchMe = "default";
this.doPolling = undefined;
/* Register each Module with the History Manager */
this.modules.each( function( item ) {
        var ths = this;
        // Note that the last param passed to register() is item, or the Module
        // object
        // corresponding to the module we are registering.
        YUH.register( item.moduleName, item.initSec, function( section ) {
            var modName = item.moduleName;
            if ( modName === "lowerSec" ) {
            /*
               If the current state is default then we don't need to do anything
               other than open the top up to expose the default content - there
               is nothing to load, it's already there.
             */
            if ( YUH.getCurrentState( "lowerSec" ) === "default" ) {
            $('botLtDefaultContent').setOpacity( 1 );
            if ( !theWinShade.getTopIsOpen() ) {
            theWinShade.openTop();
            if ( ths.getModule( "subnav" ) ) {
            if ( YUH.getCurrentState( "subnav" ) !== "default" ) {
            $("dynamicContent").show();
            } else {
            $("defaultContent").show();
            }
            }
            if ( $("topColTwo") ) {
            $("topColTwo").show();
            }
            }
            } else {
                ths.loadLowerLtContent( section, item );
            }
            } else if ( modName === "subnav" ) {
                if ( YUH.getCurrentState( "subnav" ) === "default" ) {
                    $("dynamicContent").hide();
                    $("defaultContent").show();
                    // on the work page, remove the float image if there is one
                    if ( nav.pageId === "work" ) {
                        var floatImgs = $$( "div.ulGroup" );
                        floatImgs.each( function( item ) {
                                item.remove();
                                } );
                    }
                    var c2 = $("topColTwo") || $("topColTwoTeam");
                    c2.show();
                    var siteSec = theHist.getSiteSection();
                    var targetEGM = siteSec.getURegm();
                    var hotItem = targetEGM.getCurOnGroup()[0];
                    if ( hotItem !== undefined ) {
                        siteSec.getURegm().setToNormalState(
                                $$("."+hotItem.getClassName("bound") ) );
                        targetEGM.linkGroup( targetEGM.getCurOnGroup() );
                    }
                } else {
                    ths.loadSecFromRightNav( section, item );
                }
            } else if ( modName === "workImgIcons" ) {
                ths.loadSecFromImgIcons( section, item );
            }
        }, item );
}, this );
/* currentModule tells us which History module is associated with the
   current action, like a click. When instantiating a YUIHistWrapper
   check to see if any of the modules have a bookmarked state. Depending
   on what page you're on this may matter:
   HOME - one history module: lowerSec
   WORK - two history modules: subnav and workImgIcons. workImgIcons does
   not exist until something other than view 1 (workProj*v1) is
   requested
   SERVICES - two history modules: rightnav and lowerSec. This is tricky
   because the content in the two modules overlaps each other
   visually. First, load subnav. Then, if lowerSec is NOT
   default, load it. That way both modules will get set. When
   the top needs to close to display the lowerSec content the
   correct rightnav content well remain in place, but hidden.
   When the window opens again, the correct rightnav content
   will be there.
   TEAM - two history modules: rightnav and lowerSec. Tricky is same way as
   the SERVICES section.
   CONTACT - one history module, lowerSec.

   Note that modules must be added to an existing YUIHistWrapper rather
   than created at instantiation.
 */
this.currentModule = undefined;
YUH.onReady( function() {
        if ( nav.pageId === "index" ) {
        ths.initLowerRtLinksHistory();
        ths.initOpenTopLinkHistory();
        } else if ( nav.pageId === "work" ) {
        /*
           initSubNavLinksHistory() checks to see what's up with the
           workImgIcons module. If the module's state is other than default,
           initSubNavLinksHistory will do it's initalization but it will not
           display anything.
         */
        ths.initSubNavLinksHistory();
        } else if ( nav.pageId === "services" ) {
        ths.initSubNavLinksHistory();
        ths.initLowerRtLinksHistory();
        ths.initOpenTopLinkHistory();
        theSite.updateHistoryActionables( $$('.histItem') );
        updateNonHistoryActionables( theServices.nonHistItems );
        if ( YUH.getCurrentState("subnav") === "default" ) {
        Event.observe( window, 'resize',
            theServices.getRings().updateCoords.bindAsEventListener( this,
                theServices.getRings() ) );
        $("defaultContent").show();
        $("topColTwo").show();
        }
        } else if ( nav.pageId === "team" ) {
            ths.initSubNavLinksHistory();
            ths.initLowerRtLinksHistory();
            ths.initOpenTopLinkHistory();
            theSite.updateHistoryActionables( $$('.histItem') );
            if ( YUH.getCurrentState( "subnav" ) === "default" ) {
                $("defaultContent").show();
                $("topColTwo").show();
            }
        } else if ( nav.pageId === "contact" ) {
            ths.initLowerRtLinksHistory();
            ths.initOpenTopLinkHistory();
        }
}, ths );
},

polling: function() {
             this.doPolling = setTimeout( this.waiting, 100 );
         },

addModule: function( objModule ) { this.modules.push( objModule ); },
    getModuleName: function( objModule ) { return objModule.getModuleName(); },
    getCurrentModule: function() { return this.currentModule; },
    setCurrentModule: function( objModule ) { this.currentModule = objModule; },

    /*
       wrap YUI.util.History.navigate into a function with 3 parameters so that
       it can be called via prototype.js's bindAsEventListener.
     */
    navigateWrapper: function( evt, strModuleName, strState, stopEvent ) {
        if ( stopEvent ) {
            evt.stop();
        }
        // set clickedTab in the Navigation object, so that we can easily fetch it
        // later.
        nav.setClickedTab( evt.element() );
        YUH.navigate( strModuleName, strState );
    },

    /* strName - the name of the module we want */
getModule: function( strName ) {
               for ( var i=0; i<this.modules.length; i++ ) {
                   var name = this.modules[i].getModuleName();
                   if ( name === strName ) {
                       return this.modules[i];
                   }
               }
               return null; //went through the loop, no match, so return null
           },

getSiteSection: function() { return this.siteSection; },

    initLowerRtLinksHistory:function() {
        var items, i, len, item, curSec, curState;
        // Add the opening state to the history.
        curState = YUH.getCurrentState( "lowerSec" );
        if ( curState !== "default" ) {
            this.loadLowerLtContent( curState, this.getModule( "lowerSec" ) );
        }
        items = $$( '.closeTop' );
        for( i=0, len=items.length; i<len; i++ ) {
            item = items[i];
            if ( item.tagName === "A" ) {
                YAHOO.util.Event.addListener( item, 'click', function( evt ) {
                        var itm, href, section, idx1, idx2;
                        // set the currentModule.
                        this.setCurrentModule( this.getModule( "lowerSec" ) );
                        itm = YAHOO.util.Event.getTarget( evt );
                        itm = $(itm);
                        /* loadLowerLtContent() needs the item that was clicked but it's
                           hard to pass it, so store in the EGM instance. */
                        href = itm.readAttribute("href");
                        // Make sure itm is an <a> element by moving up until you find one.
                        while ( !href ) {
                        itm = itm.up();
                        href = itm.readAttribute("href");
                        }
                        var llegm = this.siteSection.getLLegm();
                        llegm.setClickedElement( itm );
                        if ( theServices ) {
                        theServices.psMouseout( evt, null );
                        }
                        idx1 = href.lastIndexOf('=');
                        idx2 = href.lastIndexOf('_');
                        href = href.slice( idx1+1, idx2+2 );
                        section = YUH.getQueryStringParameter( 'lowerSec' ) || href;
                        try {
                            YUH.navigate( "lowerSec", section );
                        } catch( err ) {
                            YUIHistWrapper.loadLowerLtContent( section );
                        }
                        YAHOO.util.Event.preventDefault( evt );
                }, this, true );
            }
        }
        curSec = YUH.getCurrentState( "lowerSec" );
    },

initOpenTopLinkHistory: function() {
                            var target = $('shadeTrigger');
                            YAHOO.util.Event.addListener( target, 'click', function( evt ) {
                                    /*
                                       A shadeTrigger click always sets the lower left and right sections
                                       back to the default state.
                                     */
                                    theHist.setCurrentModule( theHist.getModule( "lowerSec" ) );
                                    theSite.openTopTxtNoHover( evt );
                                    try {
                                    YUH.navigate( "lowerSec", "default" );
                                    } catch( err ) {
                                    YUIHistWrapper.loadLowerLtContent( "default" );
                                    }
                                    YAHOO.util.Event.preventDefault( evt );
                                    } );
                        },

updateDynamicHistLinks:function() {
                           $$( ".histItem" ).each( function( item ) {
                                   YAHOO.util.Event.addListener( item, 'click', function( evt ) {
                                       var itm, href, section;
                                       theHist.setCurrentModule( theHist.getModule( "lowerSec" ) );
                                       itm = $(YAHOO.util.Event.getTarget( evt )); //extend the element
                                       theHist.siteSection.getLLegm().setClickedElement( itm );
                                       href = itm.readAttribute( "href" );
                                       /* stupid IE return absolute paths here regardless of whether or not
                                        * the string in the href attribute is an absolute path. Must clean that up.
                                        * Note this is hacky and will fail if the path you want, that is, the path you
                                        * put in the href attribute includes one or more forward slashes ("/"). */
                                       var iePath = href.substr( href.lastIndexOf( "/" ) + 1 );
                                       if ( iePath.length > 0 ) {
                                       href = iePath;
                                       }
                                       if ( href.startsWith( "contact" ) ) {
                                       return true;
                                       } else {
                                       href = href.slice( href.lastIndexOf("=")+1, href.lastIndexOf("_")+2 );
                                       section = YUH.getQueryStringParameter( 'lowerSec' ) || href;
                                       try {
                                       YUH.navigate( "lowerSec", section );
                                       } catch( err ) {
                                           YUIHistWrapper.loadLowerLtContent( section );
                                       }
                                       YAHOO.util.Event.preventDefault( evt );
                                       }
                                   } );
                           } );
                       },

loadLowerLtContent: function( strSection ) {
                        /*
                           Before allowing this method to run, wait, if necessary for dynamic data
                           to load into the upper left section (main content). If we don't wait,
                           then the top my close, the main content container set to display:none
                           and the data won't get loaded. Then when we openTop(), there's no data!
                           Bummer. Most likely case is a bookmarked Team page where the state of
                           the lower left and upper left section is other than default.
                         */
                        this.fetchMe = strSection;
                        this.polling();
                    },

waiting: function() {
             if ( theSite.getCurSiteSection().getULegm().getIsContentLoaded() === false ) {
                 theHist.polling();
             } else {
                 clearTimeout( this.doPolling );
                 var fetch, fetchURL, linkID, oGrp, clicked;
                 fetch = theHist.fetchMe;
                 theHist.setCurrentModule( theHist.getModule( "lowerSec" ) );
                 oGrp = undefined;
                 if ( fetch.startsWith( "blog" ) ) {
                     linkID = fetch.substr( 9 );
                     oGrp = $$( "." + theHist.siteSection.llEGM.getGroupString() + linkID );
                     fetchURL = fetch.substr( 0, 8) + ".php";
                 } else if ( fetch.startsWith( "jobs" ) ) {
                     linkID = fetch.substr( fetch.length - 1 );
                     oGrp = $$("." + theHist.siteSection.llEGM.getGroupString() + linkID );
                     fetchURL = fetch + ".php";
                     //} else if ( fetch.startsWith( "ps" ) ) {
                     //  linkID = fetch.substr( fetch.length -1 );
                     //  oGrp = $$("." + theHist.siteSection.llEGM.getGroupString() + linkID );
                     //  fetchURL = fetch + ".php";
             } else {
                 fetchURL = fetch + ".php";
             }
             if ( fetch === "default.php" ) {
                 if ( nav.pageId === "index" || nav.pageId === "team" ) {
                     //open top, show default lower left content.
                     theWinShade.openTop();
                 }
                 return;
             }
             // If necessary, re-link the group that was last unlinked
             clicked = theHist.siteSection.llEGM.linkGroup(
                     theHist.siteSection.llEGM.getCurOnGroup() );
             // Even it there's nothing that was clicked, we may be coming from a
             // bookmark
             if ( !clicked ) {
                 clicked = $( fetch );
             }
             // Set the re-linked group's state to normal
             if ( clicked ) {
                 theHist.siteSection.llEGM.setGroupToOperateOn( clicked, null );
                 theHist.siteSection.llEGM.setToNormalState(
                         theHist.siteSection.llEGM.getGroupToOperateOn() );
             }
             // unlink and set this element and its friends to the "on" state.
             if ( oGrp !== undefined ) {
                 theHist.siteSection.llEGM.setGroupToOperateOn( oGrp[0], null );
             }
             // PACKAGED SERVICES ISSUE
             //hold off on this until switching from link to span and back is in place
             oGrp = theHist.siteSection.llEGM.getGroupToOperateOn();
             // unlinkGroup() set curOnGroup after it does the unlinking...
             //theHist.siteSection.llEGM.unlinkGroup( oGrp );
             // ...so you can use curOnGroup here
             // theHist.siteSection.llEGM.setToOnState(
             // theHist.siteSection.llEGM.getCurOnGroup() );

             var lowerSecSuccessHandler = function( obj ) {
                 if ( theWinShade.getTopIsOpen() ) {
                     theWinShade.closeTop( this );
                 }
                 var curMod = theHist.getCurrentModule();
                 YAHOO.util.Dom.get( curMod.getDynamicContent() ).innerHTML =
                     obj.responseText;
                 //theSite.setCurSiteSection( theSite.getSiteSection( nav.pageId ) );
                 // find and process and email addresses for obfuscation
                 if ( theGeo ) {
                     theGeo.process();
                 }
                 if ( nav.pageId === "services" && YUH.getCurrentState( "lowerSec" ) !==
                         "default" ) {
                     /*
                        If content was just loaded in the lower section on the Services
                        page, then we are dealing with Package Services content.
                      */
                     theHist.updateDynamicHistLinks( ".histItem" );
                     // Set up observers on UI items
                     theServices.initDynElementsUI( ".dynUI" );
                     // Set up observers on items that trigger modal windows.
                     if ( YUH.getCurrentState( "lowerSec" ) === "psProductTuning_1" ) {
                         theServices.initProdTuningOpenModals();
                     } else if ( YUH.getCurrentState( "lowerSec" ) === "psSubscription_1" ) {
                         theServices.initSubscriptionOpenModals();
                     }
                 }
                 if ( nav.pageId === "contact" && YUH.getCurrentState( "lowerSec" ) !== "default" ) {
                     var llegm = theContact.getLLegm();
                     var item = llegm.getClickedElement();
                     /* If we're arriving at this state by some means other than clicking
                      * a lower right link, then clickedElement will not be set. Let's ingore that
                      * for now. */
                     if ( item ) {
                         llegm.setCurOnGroup( item );
                         llegm.unlinkGroup( llegm.getCurOnGroup() );
                     }
                     var rsv = new RSV( {
formID: "contactForm",
errorFieldClass: "errorField",
customErrorHandler: theContact.handleFormErrors, rules: [
"required,name,Please tell us your name.",
"required,email,Please enter a valid email address.",
"valid_email,email,Please enter a valid email address."
]
} );
$("sbmt").observe( 'mouseover',
        theContact.sbmtOverOut.bindAsEventListener( this ) ).observe( 'mouseout',
        theContact.sbmtOverOut.bindAsEventListener( this ) );
theContact.tickFormCheckboxes();
$( "contactForm" ).observe( "submit", function( event ) {
        Event.stop( event );
        // If there's nothing in the returnHash, then we are error-free.
        if ( rsv.returnHash.size() === 0 ) {
        $("sbmt").disabled = true;
        $("sbmtMessage").innerHTML = "Processing...";
        this.request( {
onSuccess: function( obj ) {
if ( obj.responseText.match(/^OK/) != null ) {
$('contactForm').reset();
$("sbmtMessage").innerHTML = "Thank you. We'll be in touch soon!";
} else {
alert( obj.responseText );
}
$("sbmt").disabled = false;
$("sbmt").value = "Submit";
},
onFailure: function() {
alert( "Ack, failed!" );
},
onException: function( xhr, err ) {
alert( err )
}
} );
return false;
}
} );
}
/*
   We might need to scroll the current page down, to get to a specific
   blog entry, for example. Note that, for the topmost entry we don't
   want to scroll, so that entry has an empty id. Therefore, we have to
   skip the following if $( url ) comes back null.
 */
if ( oGrp[0] ) {
    var url = oGrp[0].readAttribute( "href" );
    if ( url ) {
        var indexOne = url.lastIndexOf("_");
        var indexTwo = url.lastIndexOf(".");
        url = url.slice( indexOne, indexTwo );
        var scroll = function() {
            var u = $( url );
            if ( u !== null ) {
                u.scrollTo();
            }
        };
        setTimeout( scroll, 2000 );
    }
}
};

var lowerSecFailureHandler = function( obj ) {
    location.href = "#lowerSec=" + fetchURL;
};

YAHOO.util.Connect.asyncRequest( "GET", fetchURL, {
success:lowerSecSuccessHandler,
failure:lowerSecFailureHandler
} );
}
},

loadSecFromRightNav: function( strSection ) {
                         /*
                            Set the mainContentEGM isContentLoaded property to false. We're loading
                            content now, so we don't want to allow a call to closeTop(), which may
                            set the main content container to display:none before the new data is
                            loaded.
                          */
                         var fetchMe, linkID, oGrp, curMod, linked, bldc, clicked;
                         this.siteSection.getULegm().setIsContentLoaded( false );
                         fetchMe = strSection + ".php";
                         theHist.setCurrentModule( theHist.getModule( "subnav" ) );
                         oGrp = undefined;
                         if ( fetchMe.startsWith( "work" ) || fetchMe.startsWith( "serv" ) ||
                                 fetchMe.startsWith( "team" ) ) {
                             linkID = getProject();
                             oGrp = $$( "." + this.siteSection.getURegm().getGroupString() + linkID );
                         }
                         curMod = theHist.getCurrentModule();
                         if ( fetchMe === "default.php") {
                             //make the default content show up.
                             curMod.getDynamicContent().hide();
                             curMod.getDefaultContent().show();
                             /*
                                turn off whatever right nav item might have been on. Note, we should
                                be all set to operate on the correct group, since the last time
                                curOnGroup was was set was when we turned "on" the group that we now
                                want to turn off
                              */
                             linked = this.siteSection.getURegm().linkGroup(
                                     this.siteSection.getURegm().getCurOnGroup() );
                             this.siteSection.getURegm().setGroupToOperateOn( linked, null );
                             this.siteSection.getURegm().setToNormalState(
                                     this.siteSection.getURegm().getGroupToOperateOn() );
                             if ( nav.pageId == "work" ) {
                                 $('topSecWork').setStyle( {background:"url(images/gridWithLegend.gif) no-repeat 0px 0px"} );
                             }
                             //Set the opacity for the lower left content.
                             if ( nav.pageId == "work" || nav.pageId == "services" || nav.pageId == "team" ) {
                                 bldc = $('botLtDefaultContent');
                                 bldc.setOpacity( 1 );
                             }
                             if ( nav.pageId == "team" ) { //reset the sprite to its base position
                                 theTeam.resetBg();
                             }
                             if ( nav.pageId == "services" ) {
                                 theServices.resetBg();
                             }
                             return;
                         }
                         // If necessary, re-link the group that was last unlinked
                         clicked = this.siteSection.getURegm().linkGroup(
                                 this.siteSection.getURegm().getCurOnGroup() );
                         // Set the re-linked group's state to normal
                         if ( clicked ) {
                             this.siteSection.getURegm().setGroupToOperateOn( clicked, null );
                             this.siteSection.getURegm().setToNormalState(
                                     this.siteSection.getURegm().getGroupToOperateOn() );
                         }
                         // unlink and set this element and its friends to the "on" state.
                         if ( oGrp !== undefined ) {
                             this.siteSection.getURegm().setGroupToOperateOn( oGrp[0], null );
                         } else {
                             this.siteSection.getURegm().setGroupToOperateOn(
                                     this.siteSection.getURegm().getClickedElement(), null );
                         }
                         oGrp = this.siteSection.getURegm().getGroupToOperateOn();
                         // unlinkGroup() sets curOnGroup after it does the unlinking...
                         this.siteSection.getURegm().unlinkGroup( oGrp );
                         // ...so you can use curOnGroup here
                         this.siteSection.getURegm().setToOnState(
                                 this.siteSection.getURegm().getCurOnGroup() );

                         function secSuccessHandler( obj ) {
                             var curMod, defTarget, dynTarget, bldc, tc1;
                             curMod = theHist.getCurrentModule();
                             defTarget = curMod.getDefaultContent();
                             dynTarget = curMod.getDynamicContent();
                             $("topColTwo").hide();
                             defTarget.hide();
                             dynTarget.setStyle( {display:"block"} );
                             YAHOO.util.Dom.get( dynTarget ).innerHTML = obj.responseText;
                             /*
                                After successfully loading the requested content content:
                                1. set observers on all elements to be tracked by the History object.
                                2. Set up mouseover/outs.
                                3. Update to right nav UI
                                4. Set the opacity for the lower left content. */
                             $("topColTwo").show();
                             if ( nav.pageId == "work" || nav.pageId == "services" || nav.pageId == "team" ) {
                                 if ( YUH.getCurrentState( "subnav" ) !== "default" ) {
                                     bldc = $('botLtDefaultContent');
                                     bldc.setOpacity( 0.3 );
                                     // also observe mouseover/out on this element, changing opacity as
                                     // needed.
                                     bldc.observe( 'mouseover', function() {
                                             bldc.setOpacity( 1 );
                                             } );
                                     bldc.observe( 'mouseout', function() {
                                             bldc.setOpacity( 0.3 );
                                             } );
                                     tc1 = $("topColOne").setStyle( {"cursor":"auto"} );
                                 }
                             }
                             if ( nav.pageId === "services" && YUH.getCurrentState("subnav") !== "default" ) {
                                 //shift the small rings sprite.
                                 var p, yOff, pos;
                                 p = getProject();
                                 yOff = -1*(theServices.smRings[p] * theServices.smRingsMultiplier + theServices.smRingsYoffset);
                                 pos = theServices.smRingsXoffset + " " + yOff + "px";
                                 $('smRings').setStyle( {backgroundPosition:pos} );
                             }
                             if ( nav.pageId == "work" ) {
                                 theWork.updateWorkImgIcons();
                             }
                             if ( $('workProjLeftCol' ) ) { //pagination on view one of project in work page
                                 updateNonHistoryActionables( $$('#workProjLeftCol') );
                                 $('topSecWork').setStyle( {background:"url(images/gridWork.gif) no-repeat 5px 6px"} );
                             }
                             if ( strSection.startsWith( 'serv' ) ) {
                                 updateNonHistoryActionables( $$('.nonHistory') );
                             }
                             if ( nav.pageId == "team" && getProject() !== -1 ) {
                                 updateNonHistoryActionables( $$('#smPath') );
                             }
                             theSite.getCurSiteSection().getULegm().setIsContentLoaded( true );
                         }

                         function secFailureHandler( obj ) {
                             location.href = "#subnav=" + strSection;
                         }

                         YAHOO.util.Connect.asyncRequest( "GET", fetchMe, {
success:secSuccessHandler,
failure:secFailureHandler
} );
},

loadSecFromImgIcons: function( strSection ) {
                         var fetchMe, linkID;
                         fetchMe = strSection + ".php";
                         if ( fetchMe === "default.php" ) {
                             // need to get the project number
                             linkID = getProject();
                             fetchMe = "workProj" + linkID + "v1.php";
                         }

                         function secSuccessHandler( obj ) {
                             var curMod, defTarget, dynTarget, r, items;
                             curMod = theHist.getCurrentModule();
                             defTarget = curMod.getDefaultContent();
                             dynTarget = curMod.getDynamicContent();
                             defTarget.hide();
                             dynTarget.setStyle( {display:"block"} );
                             r = obj.responseText;
                             YAHOO.util.Dom.get( dynTarget ).innerHTML = r;
                             /* after successfully loading the requested content content:
                                1. set observers on all elements to be tracked by the History object.
                                2. Set up mouseover/outs.
                                3. Update to right nav UI */
                             items = $$('.imgIcon');
                             theSite.updateHistoryActionables( items );
                             if ( YUH.getCurrentState("subnav") !== "default" ) {
                                 theWork.updateWorkImgIcons();
                             }
                             if ( $('workProjLeftCol' ) ) { //pagination on view one of project in work page
                                 updateNonHistoryActionables( $$('#workProjLeftCol') );
                                 $('topSecWork').setStyle( {background:"url(images/gridWork.gif) no-repeat 5px 6px"} );
                             }
                         }

                         function secFailureHandler( obj ) {
                             location.href = "#subnav=" + strSection + "&workImgIcons=" + strSection;
                         }

                         YAHOO.util.Connect.asyncRequest( "GET", fetchMe, {
success:secSuccessHandler,
failure:secFailureHandler
} );
},

initSubNavLinksHistory:function() {
                           var curState, items, i, len, item;
                           // Add the opening state to the history.
                           curState = YUH.getCurrentState( "subnav" );
                           if ( curState !== "default" ) {
                               this.loadSecFromRightNav( curState, this.getModule( "subnav" ) );
                               $("dynamicContent").show();
                               $("topColTwo").show();
                           } else {
                               $("defaultContent").show();
                               $("topColTwo").show();
                           }
                           items = $$( '.rightnav' );
                           len = items.length;
                           if ( len === 0 ) { //don't do anything if there's no right nav
                               return false;
                           }
                           for ( i=0; i<len; i++ ) {
                               item = items[i];
                               YAHOO.util.Event.addListener( item, 'click', function( evt ) {
                                       YAHOO.util.Event.preventDefault( evt );
                                       // set the currentModule.
                                       this.setCurrentModule( this.getModule( "subnav" ) );
                                       var itm = YAHOO.util.Event.getTarget( evt );
                                       itm = $(itm);
                                       /*
                                          if itm is a member of curOnGroup, then return. This is how we ignore
                                          a click on an element that is in the "on" state
                                        */
                                       if ( this.siteSection.getURegm().getCurOnGroup() && this.siteSection.getURegm().isCurOnGroupMember( itm ) ) {
                                       return;
                                       }
                                       var href, subNavSection;
                                       href = itm.readAttribute("href");
                                       /* if href comes back null try assuming that we're on a services ring */
                                       if ( href === null ) {
                                       var r = theServices.getRings();
                                       var h = theServices.getCurHotRing();
                                       href = r.getServSubSecURL( h );
                                       } else {
                                           var idx1 = href.lastIndexOf('=');
                                           var idx2 = href.lastIndexOf ( '.' );
                                           href = href.slice( idx1+1, idx2 );
                                       }
                                       subNavSection = YUH.getQueryStringParameter( 'subnav' ) || href;
                                       try {
                                           YUH.navigate( "subnav", subNavSection );
                                       } catch( err)  {
                                           theHist.loadSecFromRightNav( section );
                                       }
                               }, this, true );
                           }
                           theSite.setIsRtNavInit( true );
                           //theSite.setCurSiteSection( theSite.getSiteSection( nav.pageId ) );
                           return true;
                       },

initWorkImgIconsHistory:function() {
                            var items, i, len, item;
                            var curState = YUH.getCurrentState( "workImgIcons" );
                            if ( curState !== "default" ) {
                                this.laodSecFromImgIcons( curState, this.getModule( "workImgIcons" ) );
                            }
                            items = $$( ".imgIcon" );
                            len = items.length;
                            for ( i=0; i<len; i++ ) {
                                item = items[i];
                                YAHOO.util.Event.addListener( item, 'click', function( evt ) {
                                        // set the current module
                                        this.setCurrentModule( this.getModule( "workImgIcons" ) );
                                        var itm, href, section, idx1, idx2;
                                        itm = YAHOO.util.Event.getTarget( evt );
                                        itm = $( itm );
                                        /*
                                           if itm is a member of curOnGroup, then return. This is how we ignore
                                           a click on an element that is in the "on" state
                                         */
                                        if ( this.siteSection.getURegm().getCurOnGroup() &&
                                            this.siteSection.getURegm().isCurOnGroupMember( itm ) ) {
                                        return;
                                        }
                                        href = itm.readAttribute( "href" );
                                        idx1 = href.lastIndexOf('=');
                                        idx2 = href.lastIndexOf ( '.' );
                                        href = href.slice( idx1+1, idx2 );
                                        section = YUH.getQueryStringParameter( "workImgIcons" ) || href;
                                        try {
                                        YUH.navigate( "workImgIcons", section );
                                        } catch( err ) {
                                            theHist.loadSecFromImageIcons( section );
                                        }
                                        YAHOO.util.Event.preventDefault( evt );
                                }, this );
                            }
                            curSec = YUH.getCurrentState( "workImgIcons" );
                            if ( curSec !== "default" ) {
                                theHist.loadSecFromImgIcons( curSec );
                                $("dynamicContent").show();
                            }
                            //theSite.setCurSiteSection( theSite.getSiteSection( nav.pageId ) );
                            return true;
                        }
} );
/**********************************/
/*  END HISTORY MANAGEMENT        */
/**********************************/

/**********************************/
/*  CLASS ElementGroupManager     */
/**********************************/
var ElementGroupManager = Class.create( {
        /*
           @param strClassName - is the CSS className that is shared by the elements
           that an EGM instance will manage.
           @param arrClassNames - an array of classNames that will be assigned to
           properties of a Chunk instance. Naturally, you must
           pass an array that is the same length as the number
           of properties to be defined in the object, and of
           course the order matters. If you don't want to
           define a property, set the corresponding array
           element to null.
         */
initialize: function( strClassName, arrClassNames, mouseoverHandler, mouseoutHandler ) {
this.controlledElements = $$( strClassName ); //all the elements controlled by this class
/*
   Each portion of the page that falls under an ElementGroupManager
   initially has default content loaded. isContentLoaded is used on pages
   that combine >1 EGM with dynamic content and animation. As of 2/2/2009
   that includes the Services and Team pages. The primary issue is that
   when loading one of these pages from a bookmark where that state is
   something other than default for both the upper left section and the
   lower left section we have to wait for the data to load into the upper
   left section before calling the closeTop() animation. closeTop() uses
   script.aculo.us' BlindUp() method, which ends up setting the obscured
   container to display:none. At that point, apparently, the result of the
   xhr for the upper left content can't load. isContentLoaded is set to
   false on entry into loadSecFromRightNav() and set to true once, inside
   that method's success handler, the data is loaded. closeTop() should not
   run if isContentLoaded is false.
 */
this.isContentLoaded = true;
/*
   Sometimes, it's hard to pass on the element that was clicked, so here's
   property to store it if needed.
 */
this.clickedElement = undefined;
/*
   The group of elements that are in an "on" state as a result of a click.
   In this app, that means unlinked and a certain color, perhaps with a
   tiny arrow decoration on the left. This intended to be a private method,
   which I would enforce if I new how. For now, I've just not provided a
   public setter.
 */
this.curOnGroup = undefined;
/*
   A collection of elements on which we are currently operating. Note how
   this is different than curOnGroup, which is only set as a result of a
   click (ultimately it's set by unlinkGroup()) and remains set until
   another click on another item resets the property. There is no public
   setter for curOnGroup while there is one for groupToOperateOn.
 */
this.groupToOperateOn = [];

/*
   relinkUs holds any <a> elements that will need to be re-linked
   b/c they were previously unlinked as part of an "on" state.
 */
this.relinkUs = [];
this.elementDecorationNormalState = arrClassNames[0];
this.elementDecorationHoverState = arrClassNames[1];
this.elementDecorationOnState = arrClassNames[2];
this.elementDecorationActiveState = arrClassNames[3];
this.elementDecorationVisitedState = arrClassNames[4];
this.elementDecorationVisitedHoverState = arrClassNames[5];
this.linkNormalState = arrClassNames[6];
this.linkHoverState = arrClassNames[7];
this.linkActiveState = arrClassNames[8];
this.linkVisitedState = arrClassNames[9];
this.linkVisitedHoverState = arrClassNames[10];
this.textNormalState = arrClassNames[11];
this.textHoverState = arrClassNames[12];
this.textOnState = arrClassNames[13];
this.textActiveState = arrClassNames[14];
/*
   This is the string used to tie groups together. For example, you might
   use the word "bound" followed by an integer. Then, given an element you
   can get the className that starts with bound and then use the full
   className to get all the elements that share that className.
 */
this.groupString = arrClassNames[15];
/*
   This string is used to single a subset of a bound group. You're likely
   to have elements in a bound group that are from two different (from a
   behaviour perspective) part of the page. Often, you'll want to operate
   on the whole group by actually breaking the group into sub groups - do
   something to the member of the group that belong to the right nav and do
   something else to the members the belong to the main content area, for
   example.
 */
this.secondaryIndentifyingClassName = arrClassNames[16];
// the following "special" group allows for on-offs within a group.
// The Packaged Services link and icon on the Services page is an example.
this.specialNormalState = arrClassNames[17];
this.specialHoverState = arrClassNames[18];
this.specialOnState = arrClassNames[19];
this.specialActiveState = arrClassNames[20];
this.specialVisitedState = arrClassNames[21];
this.specialVisitedHoverState = arrClassNames[22];
            },

getControlledElements: function() {
                           return this.controlledElements;
                       },

setIsContentLoaded: function( bool ) { this.isContentLoaded = bool; },
                    getIsContentLoaded: function() { return this.isContentLoaded; },
                    getClickedElement: function() {
                        if ( this.clickedElement ) {
                            return this.clickedElement;
                        } else {
                            return false;
                        }
                    },

setClickedElement: function( anElement ) {
                       this.clickedElement = anElement;
                   },

getCurOnGroup: function() {
                   if ( this.curOnGroup === undefined ) {
                       return false;
                   } else {
                       return this.curOnGroup;
                   }
               },

setCurOnGroup: function( targetElement ) {
                   if ( targetElement !== undefined ) {
                       this.curOnGroup = $$("." + $(targetElement).getClassName( this.groupString ));
                   } else {
                       this.curOnGroup = undefined;
                   }
               },

getGroupToOperateOn: function() {
                         if ( this.groupToOperateOn ) {
                             return this.groupToOperateOn;
                         } else {
                             return false; // the groupToOperateOn propety is not set.
                         }
                     },

                     /*
                        @param anElement - unless overridden with the strOverride param, this
                        method extracts the CSS className from the element that
                        matches what is stored in the groupString property for
                        this instance of a ElementGroupManager and uses that to
                        build a collection of all the elements that share that
                        className.
                        @param strOverride - you can use this if you know the exact name of the
                        class that you want to use to bind a group together.
                        Usually, you won't know the exact className, only
                        that it's "bound__". The override can, however, come
                        in handy when you need to enable one element to be
                        bound to two or more different groups, bound1 and
                        bound2 for example. Then you'll have to pass the full
                        className via the strOverride param in order to be
                        sure you're collecting the correct elements. The
                        reason for this is that this method calls
                        getClassName(), an extention of prototype.js's
                        Element class, that takes a string and returns the
                      *first* matching className among all the CSS classes
                      associated with the element on which getClassName()
                      was called. Using the example of an element with
                      class="bound1 bound2*, getClassName( "bound" ) will
                      always return "bound1". You can't get "bound2" back,
                      so strOverride help you do this. It's weakness is
                      that you'll have to know the exact complete string
                      you're looking for, reducing the flexibility of the
                      method. Yes, I should fix this.
                      */
setGroupToOperateOn: function( anElement, strOverride ) {
                         var e = undefined;
                         // start by clearing out anything that was previous set
                         this.groupToOperateOn.clear();
                         if ( !strOverride ) {
                             // make sure anElement is extended - dang that IE6.
                             e = $( anElement );
                             this.boundClassName = e.getClassName( this.groupString );
                             this.controlledElements.each( function( item ) {
                                     if ( item.hasClassName( this.boundClassName ) ) {
                                     this.groupToOperateOn.push( item );
                                     }
                                     }, this );
                         } else { // override parameter provided
                             this.controlledElements.each( function( item ) {
                                     if ( item.hasClassName( strOverride ) ) {
                                     this.groupToOperateOn.push( item );
                                     }
                                     }, this );
                         }
                     },

getElementDecorationNormalState: function() { return this.elementDecorationNormalState; },
                                 getElementDecorationHoverState: function() { return this.elementDecorationHoverState; },
                                 getElementDecorationOnState: function() { return this.elementDecorationOnState; },
                                 getElementDecorationActiveState: function() { return this.elementDecorationActiveState; },
                                 getElementDecorationVisitedState: function() { return this.elementDecorationVisitedState; },
                                 getElementDecorationVisitedHoverState: function() { return this.elementDecorationVisitedHoverState; },
                                 getLinkNormalState: function() { return this.linkNormalState; },
                                 getLinkHoverState: function() { return this.linkHoverState; },
                                 getLinkActiveState: function() { return this.linkActiveState; },
                                 getLinkVisitedState: function() { return this.linkVisitedState; },
                                 getLinkVisitedHoverState: function() { return this.linkVisitedHoverState; },
                                 getTextNormalState: function() { return this.textNormalState; },
                                 getTextHoverState: function() { return this.textHoverState; },
                                 getTextOnState: function() { return this.textOnState; },
                                 getTextActiveState: function() { return this.textActiveState; },
                                 getGroupString: function() { return this.groupString; },
                                 getSecondaryIndentifyingClassName: function() { return this.secondaryIndentifyingClassName; },
                                 getSpecialNormalState: function() { return this.specialNormalState; },
                                 getSpecialHoverState: function() { return this.specialHoverState; },
                                 getSpecialOnState: function() { return this.specialOnState; },
                                 getSpecialActiveState: function() { return this.specialActiveState; },
                                 getSpecialVisitedState: function() { return this.specialVisitedState; },
                                 getSpecialVisitedHoverState: function() { return this.specialVisitedHoverState; },

                                 /* @param anElement - Does this element belong to curOnGroup?  */
                                 isCurOnGroupMember: function( anElement ) {
                                     if ( !this.curOnGroup ) {
                                         return false; //there is no curOnGroup set to match against.
                                     }
                                     var b1, b2;
                                     b1 = anElement.getClassName( "bound" );
                                     b2 = this.curOnGroup[0].getClassName( "bound" );
                                     if ( b1 === null ) {
                                         return false; //element is not a member of any group
                                     } else if ( b1 == b2 ) {
                                         return true;
                                     } else {
                                         return false; //anElement is a member of some group but not a match for b2
                                     }
                                 },

                                 /*
                                    @param anElement - given this passed element, get its friends
                                    @param str - the name (can be partial) of a class that all friends of anElement share
                                  */
setCurOnContainerGroup: function( targetElement, str ) {
                            if ( targetElement !== undefined ) {
                                this.curOnContainerGroup = $$("." + targetElement.up().getClassName( str ));
                            } else {
                                this.curOnContainerGroup = undefined;
                            }
                        },

                        /*
                           unlink the item was clicked on, ending up with text in the "on" state.
                           Assumed - this method operated on curOnGroup, so that property must be set
                           correctly before calling unlinkGroup().
                           @param anAtag - passed an <a> element
Note: var txt comes from the name attribute of the <a> tag, so make sure i
that exists in your HTML. In most cases the name attribute will contain
exactly the same text as between the <a></a> tags. Yes, it is perhaps un-
necessary to do this but for now...
                         */
unlinkGroup: function( collElements ) {
                 var i, c, groupClassName, txt, up, e;
                 for ( i=0; i<collElements.length; i++ ) {
                     c = collElements[i];
                     groupClassName = c.getClassName( "bound" );
                     // only operate on <a> elements
                     if ( c.tagName === "A" ) {
                         txt = c.readAttribute( "name" );
                         this.relinkUs.push( {"link":c, "text":txt} );
                         if ( txt === "" || txt === null || txt === undefined ) {
                             alert( "You must have a name attr containing the text you're linking. Linking an image is not supported." );
                         }
                         up = c.up(); //get the containing tag
                         // create a new span element in place of the a element
                         e = new Element( 'span' );
                         /*
                            If this <a> tag has a decoration that goes with its on state turn on
                            the decoration in the container.
                          */
                         e.update( txt );
                         e.addClassName( groupClassName );
                         e.addClassName( this.getTextOnState() );
                         up.update( e );
                     }
                 }
                 this.setCurOnGroup( e );
             },

             /*
NOTE: If you want to call unlinkGroup() and linkGroup() in succession, You
must call linkGroup() before calling unlinkGroup() because
unlinkGroup() sets the group it's operating on to the curOnGroup
property. If you update that property via a calling to unlinkGroup()
before calling linkGroup(), you'll most like not be operating on the
elements you want.
This method expects to be passed a group of elements. Typically, the group
you pass will be <span>s or <p>s - some kind of single-level text
container that you'll turn into links. The method grabs the parent element
of each item in the group and replaces the child (which is now your
target) with a link. So, you need a container element.
@param collElements - a collection of elements. Can be curOnGroup from
this calls or can simple be the result of a call to
$$().
              */
linkGroup: function( collElements ) {
               var j, container, i, item, fd;
               if ( collElements === false || collElements === null && collElements === undefined ) {
                   // no group was passed. Typically, this is result of passing curOnGroup when that property is not set.
                   return false;
               }
               j=0;
               for ( i=0; i<collElements.length; i++ ) {
                   item = $(collElements[i]);
                   if ( item.tagName !== "A" && item.getClassName( "text" ) !== null ) {
                       container = item.up().update( this.relinkUs[j].link );
                       fd = container.firstDescendant().update( this.relinkUs[j++].text );
                       if ( fd.hasClassName( this.getLinkHoverState() ) ) {
                           fd.removeClassName( this.getLinkHoverState() );
                           fd.addClassName( this.getLinkNormalState() );
                       }
                   }
               }
               // must clear out relinkUs or it will just keep pushing more and more items
               this.relinkUs.clear();
               //this.setGroupToOperateOn( this.curOnGroup[0], "bound" );
               this.curOnGroup = undefined;
               return container.firstDescendant(); //return one of the re-linked elements
           },

doDecoration: function( strState, strClassName, anElement ) {
                  // stupid IE6... make sure anElement is extended
                  var e = $(anElement);
                  switch( strState ) {
                      case "on":
                          e.removeClassName( strClassName );
                      e.addClassName( this.getElementDecorationOnState() );
                      break;
                      case "normal":
                          e.removeClassName( strClassName );
                      e.addClassName( this.getElementDecorationNormalState() );
                      break;
                      case "hover":
                          e.removeClassName( strClassName );
                      e.addClassName( this.getElementDecorationHoverState() );
                      break;
                  }
              },

              // This function only applies to text. It should not be called on links.
setToOnState: function( collElements ) {
                  var c, textOn, decoration;
                  collElements.each( function( curItem ) {
                          c = $(curItem);
                          // do the link
                          if ( c.tagName === "SPAN" ) {
                          // add the correct "text___" className
                          textOn = this.getTextOnState();
                          if ( !c.hasClassName( textOn ) ) {
                          c.addClassName( textOn );
                          }
                          }
                          // do the decoration, if any
                          decoration = c.getClassName( "arrow" );
                          if ( decoration !== null ) {
                          this.doDecoration( "on", decoration, c );
                          }
                          }, this );
              },

setToNormalState: function( collElements ) {
                      var c, decoration;
                      if ( collElements !== false ) {
                          collElements.each( function( curItem ) {
                                  c = $(curItem);
                                  // do the link
                                  if ( c.tagName === "A") {
                                  var curLinkClass = c.getClassName( "link" );
                                  var normLink = this.getLinkNormalState();
                                  if ( curLinkClass !== null ) {
                                  c.removeClassName( curLinkClass );
                                  }
                                  if ( !c.hasClassName( normLink ) ) {
                                  c.addClassName( normLink );
                                  }
                                  } else if ( c.tagName === "SPAN" ) {
                                  var curTxtClass = c.getClassName( "text" );
                                  var normTxt = this.getTextNormalState();
                                  if ( curTxtClass !== null ) {
                                  c.removeClassName( curTxtClass );
                                  }
                                  if ( !c.hasClassName( normTxt ) ) {
                                  c.addClassName( normTxt );
                                  }
                                  }
                                  // do the decoration, if any
                                  decoration = c.getClassName( "arrow" );
                                  if ( decoration !== null ) {
                                      this.doDecoration( "normal", decoration, c );
                                  }
                                  // do the home page text
                                  if ( nav.pageId === "index" && c.hasClassName( "map" ) ) {
                                      var boundClassName = c.getClassName( "bound" );
                                      var targetImg = $$( "."+boundClassName )[0];
                                      var att = targetImg.readAttribute( "src" );
                                      if ( boundClassName === "bound2" ) {
                                          att = att.sub( "SitesHover", "Norm" );
                                      } else if ( boundClassName === "bound3" ) {
                                          att = att.sub( "AppsHover", "Norm" );
                                      } else {
                                          att = att.sub( "Hover", "Norm" );
                                      }
                                      targetImg.writeAttribute( "src", att );
                                  }
                                  // do the Services Rings
                                  if ( nav.pageId == "services" && YUH.getCurrentState("subnav") == "default" ) {
                                      $('servicesMain').setStyle( {backgroundPosition:theServices.getRings().defaultBgPos} );
                                  }
                          }, this );
                      }
                  },

                  // if the LinkHoverState class is not already set, set it.
setToHoverState: function( collElements ) {
                     var c, curLinkClass, hover, decoration, boundClassName, targetImg, att, r;
                     collElements.each( function( curItem ) {
                             c = $(curItem);
                             // do the link
                             if ( c.tagName === "A" ) {
                             curLinkClass = c.getClassName( "link" );
                             hover = this.getLinkHoverState();
                             if ( !c.hasClassName( hover ) ) {
                             c.addClassName( hover );
                             }
                             if ( curLinkClass !== null ) {
                             c.removeClassName( curLinkClass );
                             }
                             }
                             // do the decoration
                             decoration = c.getClassName( "arrow" );
                             if ( decoration !== null ) {
                             this.doDecoration( "hover", decoration, c  );
                             }
                             // do the home page text
                             if ( nav.pageId === "index" && c.hasClassName( "map" ) ) {
                             boundClassName = c.getClassName( "bound" );
                             targetImg = $$( "."+boundClassName )[0];
                             att = targetImg.readAttribute( "src" );
                             if ( boundClassName === "bound2" ) {
                                 att = att.sub( "Norm", "SitesHover" );
                             } else if ( boundClassName === "bound3" ) {
                                 att = att.sub( "Norm", "AppsHover" );
                             } else {
                                 att = att.sub( "Norm", "Hover" );
                             }
                             targetImg.writeAttribute( "src", att );
                             }

                             // do the Services Rings
                             if ( nav.pageId == "services" && YUH.getCurrentState("subnav") === "default" ) {
                                 //figure out which ring to turn on
                                 r = parseInt( c.getClassName( this.groupString ).substr( 5 ), 10 );
                                 if ( r < 9 ) {
                                     $('servicesMain').setStyle( {backgroundPosition:theServices.getRings().rngs[r][6]} );
                                 } else {
                                     $('servicesMain').setStyle( {backgroundPosition:theServices.getRings().multiRings[r]} );
                                 }
                             }
                     }, this );
                 }
} );
/***********************************/
/*  end CLASS ElementGroupManager  */
/***********************************/

/**********************************/
/*  CLASS WindowShade             */
/**********************************/
/* WindowShade should contain anything related to the top section of the site
 * opening and closing,
 something that happens is sections Home and Team
 */
var WindowShade = Class.create( {
initialize: function( objContainer ) {
/* assume this is true. If the page loads such that the top
   section closes right away, closeTop() will run, setting it to
   false. */
this.topIsOpen = true;
/* provide a reference the the ojbect, if any, that contains this
   instantiation of WindowShade */
this.containingObj = objContainer;
},

getTopIsOpen: function() { return this.topIsOpen; },
setTopIsOpen: function( bool ) { this.topIsOpen = bool; },
getContainingObject: function() { return this.containingObj; },

closeTop: function( fromCaller ) {
var parallelEffcts = new Effect.Parallel( [
    // close the top section
    new Effect.BlindUp( 'topSecWrapper', {sync:true} ),
    // scale scaleMe to 37px high
    new Effect.Scale( 'scaleMe', 3900, {scaleX:false,
        scaleMode:{originalHeight:1}, sync:true} ),
    // fade out the default text on the left
    new Effect.Fade( 'botLtDefaultContent', {sync:true} ),
    // fade out the footer
    new Effect.Fade( 'ftContainer', {sync:true} )
    // move the image map image.
    ], {duration:1, afterFinish:function() {
    var parEffcts = new Effect.Parallel( [
        // fade in the dynamic text on the left
        new Effect.Appear( 'botLtDynamicContent', {sync:true} ),
        /* fade in the archive links. Do this here in the
           afterFinish() method to avoid having the footer jump. */
        new Effect.Appear( 'blogArchive', {sync:true} ),
        // fade in the footer
        new Effect.Appear( 'ftContainer', {sync:true} )], {duration:1} );
    $('navContainer').setStyle( {background:'url(images/navBgSprite.gif)', backgroundPosition:'-525px -50px'} );
    theWinShade.setTopIsOpen( false );
    }
    }
);
$('openTopWrapper').setStyle( {visibility:'visible'});
$('openTopWrapper').appear( {duration:0.5} );
$('shadeTrigger').appear( {duration:0.5} );

/* also set observers on the nav bar and the header links so that if one of those
   is clicked the top opens and then the user is taken to the new page. */
var tabs, id, i, headerLinks, j, hid;
tabs = $$('.tab');
for ( i=0; i<tabs.length; i++ ) {
    id = "ref" + i;
    nav.observerRefs[id] = theHist.navigateWrapper.bindAsEventListener( this, "lowerSec", "default", true );
    tabs[i].observe( 'click', nav.observerRefs[id] );
}
headerLinks = $$('.headerLink');
for ( j=0; j<headerLinks.length; j++ ) {
    hid = "ref" + j;
    theSite.headerLinkObservers[hid] = theWinShade.openTop.bindAsEventListener( theWinShade );
    headerLinks[j].observe( 'click', theSite.headerLinkObservers[hid] );
}
},


    /* You only need to pass an event to openTop() if you want to go to another
       page after opening the top. Otherwise openTop() is just revealing
       content that is already on the page. Note that the event will just be
       passed on to afterTopOpen(), the afterFinish function. */
openTop: function( event ) {
             var dest, tabs, i, headerLinks, j, grp, relinkedItem, move;
             dest = undefined;
             if ( event !== undefined ) {
                 event.stop();
             }
             dest = nav.getClickedTab();
             if ( dest ) {
                 dest = dest.readAttribute( "href" );
             } else if ( event ) {
                 dest = event.element();
                 while ( dest.tagName !== "A" ) {
                     dest = dest.up();
                 }
                 dest = dest.readAttribute( "href" );
             }
             // Stop the nav observers set when the top was closed.
             if ( nav.observerRefs[0] !== null ) {
                 tabs = $$('.tab');
                 for ( i=0; i<tabs.length; i++ ) { tabs[i].stopObserving( 'click', nav.observerRefs[i] ); }
             }

             // Stop the header link observers set when the top was closed.
             if ( theSite.headerLinkObservers !== null ) {
                 headerLinks = $$('.headerLink');
                 for ( j=0; j<headerLinks.length; j++ ) { headerLinks[j].stopObserving( 'click', theSite.headerLinkObservers[j] ); }
             }

             // Reset the ElementGroupManager links in the lower section
             grp = this.containingObj.getLLegm().getCurOnGroup();
             if ( grp ) {
                 relinkedItem = this.containingObj.getLLegm().linkGroup( grp );
                 this.containingObj.getLLegm().setGroupToOperateOn( relinkedItem, null );
                 this.containingObj.getLLegm().setToNormalState( this.containingObj.getLLegm().getGroupToOperateOn() );
             }
             // Return the open top trigger to its default state
             $('navContainer').setStyle( {backgroundImage:'none'} );
             $('shadeTrigger').fade( {duration:0.5} );
             $('openTopWrapper').fade( {duration:0.5} );
             $('openTopWrapper').setStyle( {visibility:'hidden'});
             move = new Effect.Move( 'imgMapImg', {x:50, y:0, mode:'absolute'} );
             var parallelEffects = new Effect.Parallel( [
                     new Effect.BlindDown( 'topSecWrapper', {sync:true} ),
                     // scale scaleMe to 1px high
                     new Effect.Scale( 'scaleMe', 100, {scaleX:false, scaleMode:{originalHeight:1}, sync:true} ),
                     // fade out the footer
                     new Effect.Fade( 'ftContainer', {sync:true} ),
                     new Effect.Fade( 'botLtDynamicContent', {sync:true} ),
                     new Effect.Fade( 'blogArchive', {sync:true} )
                     ], {duration:1, "destination":dest, afterFinish:function() {
                     /* After the top re-opens, we may have to gGo to another page. This
                        happens if the event that triggered the opening was a click on a
                        nav tab corresponding to a page other than the page we're on now. */
                     var pEffcts = new Effect.Parallel( [
                         new Effect.Appear('botLtDefaultContent', {sync:true} ),
                         new Effect.Appear('ftContainer', {sync:true} )], {duration:1} );
                     var destTest = this.destination;
                     if ( destTest !== undefined && destTest !== (nav.pageId + ".php") ) {
                     document.location.href = destTest;
                     }
                     }}
                     );
             this.topIsOpen = true;
         }
} );
/***************************/
/*  END CLASS WindowShade  */
/***************************/

/***********************
  CLASS NAVIGATION
 ***********************/
var Navigation = Class.create( {
initialize: function() {
/* What page we're on - filename with extenstion removed. Note that a URL
   ending in / or # will be interpreted as index.php and truncated to
   index. If your server is configured to serve something other than
   index.*, you'll have to edit this script to account for that. */
/* l = left, c = current, o = over, n = normal, h = hover, u = under */
this.pageId = this.setPageId( location.pathname );
this.lcon =    "0";
this.lcoh =  "-50";

this.lnuc = "-100";
this.lnon = "-150";
this.lnoh = "-200";

this.lhuc = "-250";
this.lhon = "-300";

this.icon = "-350";
this.icoh = "-400";
this.inon = "-450";
this.inoh = "-500";
this.inuc = "-550";
this.ihon = "-600";
this.ihuc = "-650";

this.ec   = "-700";
this.en   = "-750";
this.eh   = "-800";

this.index    = { "name":"index",                                                 "norm":"", "focus":"" };
this.work     = { "name":"work",     "ltNeighbor":"index",    "ltNeighHovPos":"", "norm":"", "focus":"" };
this.services = { "name":"services", "ltNeighbor":"work",     "ltNeighHovPos":"", "norm":"", "focus":"" };
this.team     = { "name":"team",     "ltNeighbor":"services", "ltNeighHovPos":"", "norm":"", "focus":"" };
this.blog     = { "name":"blog",     "ltNeighbor":"team",     "ltNeighHovPos":"", "norm":"", "focus":"" };
this.contact  = { "name":"contact",  "ltNeighbor":"blog",     "ltNeighHovPos":"", "norm":"", "focus":"" };

this.normalXshift = "0px ";
/* the number of pixels to add to the x value when hovering
   on the openTop area (shifts everything to the left by this amount */
this.hoverXshift = "-200px ";

/* Set the tabSprite y-coord for each tab given the pageId.
   That is, if we're on the work.php, then we know exactly which
   parts of the tabSprite we need, so place those values into the
   index, work, services, team and contact properties. */
if ( this.pageId === "index" ) {
    this.index.norm = this.lcon;
    this.index.focus = null;
    this.work.ltNeighHovPos = this.lcoh;
    this.work.norm = this.inon;
    this.work.focus = this.ihon;
    this.services.ltNeighHovPos = this.inoh;
    this.services.norm = this.inon;
    this.services.focus = this.ihon;
    this.team.ltNeighHovPos = this.inoh;
    this.team.norm = this.inon;
    this.team.focus = this.ihon;
    this.blog.ltNeighHovPos = this.inoh;
    this.blog.norm = this.inon;
    this.blog.focus = this.ihon;
    this.contact.ltNeighHovPos = this.inoh;
    this.contact.norm = this.en;
    this.contact.focus = this.eh;
} else if ( this.pageId === "work" ) {
    this.index.norm = this.lnuc;
    this.index.focus = this.lhuc;
    this.work.ltNeighHovPos = this.lnuc;
    this.work.norm = this.icon;
    this.work.focus = null;
    this.services.ltNeighHovPos = this.icoh;
    this.services.norm = this.inon;
    this.services.focus = this.ihon;
    this.team.ltNeighHovPos = this.inoh;
    this.team.norm = this.inon;
    this.team.focus = this.ihon;
    this.blog.ltNeighHovPos = this.inoh;
    this.blog.norm = this.inon;
    this.blog.focus = this.ihon;
    this.contact.ltNeighHovPos = this.inoh;
    this.contact.norm = this.en;
    this.contact.focus = this.eh;
} else if ( this.pageId === "services" ) {
    this.index.norm = this.lnon;
    this.index.focus = this.lhon;
    this.work.ltNeighHovPos = this.lnoh;
    this.work.norm = this.inuc;
    this.work.focus = this.ihuc;
    this.services.ltNeighHovPos = this.ihuc;
    this.services.norm = this.icon;
    this.services.focus = null;
    this.team.ltNeighHovPos = this.icoh;
    this.team.norm = this.inon;
    this.team.focus = this.ihon;
    this.blog.ltNeighHovPos = this.inoh;
    this.blog.norm = this.inon;
    this.blog.focus = this.ihon;
    this.contact.ltNeighHovPos = this.inoh;
    this.contact.norm = this.en;
    this.contact.focus = this.eh;
} else if ( this.pageId === "team" ) {
    this.index.norm = this.lnon;
    this.index.focus = this.lhon;
    this.work.ltNeighHovPos = this.lnoh;
    this.work.norm = this.inon;
    this.work.focus = this.ihon;
    this.services.ltNeighHovPos = this.inoh;
    this.services.norm = this.inuc;
    this.services.focus = this.ihuc;
    this.team.ltNeighHovPos = this.inuc;
    this.team.norm = this.icon;
    this.team.focus = null;
    this.blog.ltNeighHovPos = this.icoh;
    this.blog.norm = this.inon;
    this.blog.focus = this.ihon;
    this.contact.ltNeighHovPos = this.inoh;
    this.contact.norm = this.en;
    this.contact.focus = this.eh;
} else if ( this.pageId === "blog" ) {
    this.index.norm = this.lnon;
    this.index.focus = this.lhon;
    this.work.ltNeighHovPos = this.lnoh;
    this.work.norm = this.inon;
    this.work.focus = this.ihon
        this.services.ltNeighHovPos = this.inoh;
    this.services.norm = this.inuc;
    this.services.focus = this.ihuc;
    this.team.ltNeighHovPos = this.inuc;
    this.team.norm = this.icon;
    this.team.focus = null;
    this.blog.ltNeighHovPos = this.inoh;
    this.blog.norm = this.inon;
    this.blog.focus = this.ihon;
    this.contact.ltNeighHovPos = this.icoh;
    this.contact.norm = this.en;
    this.contact.focus = this.eh;
} else if ( this.pageId === "contact" ) {
    this.index.norm = this.lnon;
    this.index.focus = this.lhon;
    this.work.ltNeighHovPos = this.lnoh;
    this.work.norm = this.inon;
    this.work.focus = this.ihon;
    this.services.ltNeighHovPos = this.inoh;
    this.services.norm = this.inon;
    this.services.focus = this.ihon;
    this.team.ltNeighHovPos = this.inoh;
    this.team.norm = this.inon;
    this.team.focus = this.ihon;
    this.blog.ltNeighHovPos = this.inoh;
    this.blog.norm = this.inuc;
    this.blog.focus = this.ihuc;
    this.contact.ltNeighHovPos = this.inuc;
    this.contact.norm = this.ec;
    this.contact.focus = null;
} else {
    alert( "Something gone wrong initializing the navigation bar (inside the if else statement of the initialize() method)..." );
}

/* Set the tabSprite y-coord in the CSS for each tab given the pageId.*/
this.setToOpenTopNormalState();

/* observerRefs is an object that stores references to the functions that
   are called when when clicks are observed on the nav tabs when the top
   portion of the page is closed. We need to have references to these
   functions so that we can stopObserving when the top section opens back
   up. The point is this: If the top section is closed, then clicking on
   a nav tab should open the top section and then navigate to the new
   page. To do this, we need to observe the tabs. However, we only want
   to observe them when the top section is closed. We don't want clicking
   a nav tab to trigger an animation if the top section is open. In that
   case just go to the new page. */
this.observerRefs = [];
this.clickedTab = undefined;

// set observers on the naviation elements
var tabs = $$('.tab');
for ( var i=0; i<tabs.length; i++ ) {
    tabs[i].observe( 'mouseover', this.doMouseover.bindAsEventListener( this, tabs[i], this.pageId ) ).observe( 'mouseout', this.doMouseout.bindAsEventListener( this, tabs[i], this.pageId ) );
}
},

setToOpenTopNormalState: function() {
                             $('indexLi').setStyle( {backgroundPosition:this.normalXshift + this.index.norm + 'px'} );
                             $('workLi').setStyle( {backgroundPosition:this.normalXshift + this.work.norm + 'px'} );
                             $('servicesLi').setStyle( {backgroundPosition:this.normalXshift + this.services.norm + 'px'} );
                             $('teamLi').setStyle( {backgroundPosition:this.normalXshift + this.team.norm + 'px'} );
                             $('blogLi').setStyle( {backgroundPosition:this.normalXshift + this.blog.norm + 'px'} );
                             $('contactLi').setStyle( {backgroundPosition:this.normalXshift + this.contact.norm + 'px'} );
                             /* Initially, the navigation is hidden. After setting these coords, make
                                it visible. This eliminates the lag between the html loding and the
                                javascript running to set the background sprite correctly. */
                             $('mainNav').setStyle( {"visibility":"visible"} );
                         },

setToOpenTopHoverState: function() {
                            $('indexLi').setStyle( {backgroundPosition:this.hoverXshift + this.index.norm + 'px'} );
                            $('workLi').setStyle( {backgroundPosition:this.hoverXshift + this.work.norm + 'px'} );
                            $('servicesLi').setStyle( {backgroundPosition:this.hoverXshift + this.services.norm + 'px'} );
                            $('teamLi').setStyle( {backgroundPosition:this.hoverXshift + this.team.norm + 'px'} );
                            $('blogLi').setStyle( {backgroundPosition:this.hoverXshift + this.blog.norm + 'px'} );
                            $('contactLi').setStyle( {backgroundPosition:this.hoverXshift + this.contact.norm + 'px'} );
                            /* Initially, the navigation is hidden. After setting these coords, make
                               it visible. This eliminates the lag between the html loding and the
                               javascript running to set the background sprite correctly. */
                        },

setPageId: function( aString ) {
               var fName = this.getFnameFromURI( aString );
               return fName.slice( 0, fName.lastIndexOf( "." ) );
           },

setClickedTab: function( anElement ) {
                   this.clickedTab = anElement;
               },

getClickedTab: function() {
                   return this.clickedTab;
               },
               /* helper function to get the filename off the href attribute
                  @aString - should be the result of a call to getAttribute( 'href' ); */
getFnameFromURI: function( aString ) {
                     var str, indexLastSlash, indexLastHash;
                     str = aString;
                     if ( str === null || str === '' || str === undefined ) {
                         return "";
                     } else {
                         indexLastSlash = str.lastIndexOf( "/" );
                         if ( indexLastSlash > -1 ) {
                             str = str.slice( indexLastSlash+1 );
                         }
                         indexLastHash = str.lastIndexOf( "#" );
                         if ( indexLastHash > -1 ) {
                             str = str.slice( 0, indexLastHash );
                         }
                         if ( str === "" ) {
                             return "index.php";
                         } else {
                             return str;
                         }
                     }
                 },

getTab: function( strTabId ) {
            if ( strTabId === "" ) {
                return null;
            }
            switch( strTabId ) {
                case "index": return this.getIndex();
                case "work": return this.getWork();
                case "services": return this.getServices();
                case "team": return this.getTeam();
                case "blog": return this.getBlog();
                case "contact": return this.getContact();
                default:
                alert( "Something wrong with getTab()." );
                break;
            }
        },

getIndex: function() { return this.index; },
    getWork: function() { return this.work; },
    getServices: function() { return this.services; },
    getTeam: function() { return this.team; },
    getBlog: function() { return this.blog; },
    getContact: function() { return this.contact; },

    doMouseover: function( anEvent, anElement, pageId ) {
        var thisTabId, tabObj, ltNeighborTabObj, bgPosStr;
        thisTabId = anElement.id;
        tabObj = nav.getTab( thisTabId );
        if ( tabObj.name != pageId ) {
            if ( tabObj.name !== "index" ) {
                ltNeighborTabObj = nav.getTab( tabObj.ltNeighbor );
                $(ltNeighborTabObj.name+"Li").setStyle( {backgroundPosition:"0px " + tabObj.ltNeighHovPos + "px"} );
            }
            bgPosStr = '0px ' + tabObj.focus + "px";
            $(tabObj.name+"Li").setStyle( {backgroundPosition:bgPosStr} );
            $(tabObj.name+"A").setStyle( {"color":"#fff"} );
        }
    },

doMouseout: function( anEvent, anElement, pageId ) {
                var thisTabId, tabObj, ltNeighborTabObj;
                thisTabId = anElement.id;
                tabObj = nav.getTab( thisTabId );
                if ( tabObj.name != pageId ) {
                    if ( tabObj.name !== "index" ) {
                        ltNeighborTabObj = nav.getTab( tabObj.ltNeighbor );
                        $(ltNeighborTabObj.name+"Li").setStyle( {backgroundPosition:"0px " + ltNeighborTabObj.norm + "px"} );
                    }
                    $(tabObj.name+"Li").setStyle( {backgroundPosition:"0px " + tabObj.norm + "px"} );
                    $(tabObj.name+"A").setStyle( {"color":"#ddd"} );
                }
            }
} );
/**************************/
/*  END CLASS NAVIGATION  */
/**************************/

/**************************/
/*   CLASS TextShifter    */
/**************************/
// Do not instantiate until after DOM is loaded.
var TextShifter = Class.create( {
initialize: function() {
// animation attributes
this.cls = { width: { to: 0 } };
this.opn = { width: { to: 345 } };
this.moveLt = { left: { to: -350 } };
this.moveLt2 = { left: { to: 0 } };
this.moveRt = { left: { to: 0 } };
this.moveRt2 = { left: { to: 350 } };
},

close: function( id, atts ) {
var cls = new YAHOO.util.Anim( id, atts, 0.5 );
cls.animate();
},

open: function( id, atts ) {
var opn = new YAHOO.util.Anim( id, atts, 0.5 );
opn.animate();
},

moveRight: function( id, atts ) {
               var r = new YAHOO.util.Motion( id, atts, 0.5 );
               r.animate();
               r.onComplete.subscribe( function() {
                       $('left0').setStyle( {overflow:"visible"} );
                       $('right0').setStyle( {overflow:"visible"} );
                       } );
           },

moveLeft: function( id, atts ) {
              var r = new YAHOO.util.Motion( id, atts, 0.5 );
              r.animate();
              r.onComplete.subscribe( function() {
                      $('left1').setStyle( {overflow:"visible"} );
                      $('right1').setStyle( {overflow:"visible"} );
                      } );
          },

shiftServicesText: function( fromCaller, objTS ) {
                       var clickedOn, bgCont;
                       clickedOn = fromCaller.element(); //what we clicked on.
                       bgCont = $('servTitle'); //SHOULD FIX THIS - too specific.
                       if ( clickedOn.hasClassName('nextPage') ) {
                           // hide any overflow right away - animations look bad if there's overflow.
                           $('left0').setStyle( {overflow:"hidden"} );
                           $('right0').setStyle( {overflow:"hidden"} );
                           // do animations
                           objTS.close( 'left0', objTS.cls );
                           objTS.close( 'right0', objTS.cls );
                           objTS.moveLeft( 'textLt0', objTS.moveLt );
                           objTS.moveLeft( 'textRt0', objTS.moveLt );
                           objTS.open( 'left1', objTS.opn );
                           objTS.open( 'right1', objTS.opn );
                           objTS.moveLeft( 'left1', objTS.moveLt2 );
                           objTS.moveLeft( 'right1', objTS.moveLt2 );
                           toggleDots( bgCont, true );
                       } else { //assume we want the previous page
                           $('left1').setStyle( {overflow:"hidden"} );
                           $('right1').setStyle( {overflow:"hidden"} );
                           objTS.close( 'left1', objTS.cls );
                           objTS.close( 'right1', objTS.cls );
                           objTS.moveRight( 'left1', objTS.moveRt2 );
                           objTS.moveRight( 'right1', objTS.moveRt2 );
                           objTS.open( 'left0', objTS.opn );
                           objTS.open( 'right0', objTS.opn );
                           objTS.moveRight( 'textLt0', objTS.moveRt );
                           objTS.moveRight( 'textRt0', objTS.moveRt );
                           toggleDots( bgCont, false );
                       }
                   }
} );
/***************************/
/*  END CLASS TextShifter  */
/***************************/

/***************************/
/*  CLASS Site             */
/***************************/
var Site = Class.create( {
initialize: function() {
this.curOnRtNavItem = undefined;
// has the right nav been initialized?
this.isRtNavInit = false;
this.curSiteSection = undefined;
this.headerLinkObservers = [];
this.dynContentScript = "getDynamicContent.php";
},

getIsRtNavInit: function() { return this.isRtNavInit; },
setIsRtNavInit: function( bool ) { this.isRtNavInit = bool; },
getCurSiteSection: function() { return this.curSiteSection; },
setCurSiteSection: function( objSiteSection ) { this.curSiteSection = objSiteSection; },
getCurOnRtNavItem: function() { return this.curOnRtNavItem; },
setCurOnRtNavItem: function( anElement ) { this.curOnRtNavItem = anElement; },
getDynContentScript: function() { return this.dynContentScript; },

/*
   Start by assuming that we have a group of elements that need to be "turned
   off". If there's only one, well, then we have a group of one.
   @param strGroupName - a className. Used to collect all the element that
   share that class name, so we can operate on all of
   them
 */
    turnCurRtNavItemOff: function( strGroupName ) {
        var groupName, friends, i, item;
        if ( this.curOnRtNavItem !== undefined ) {
            groupName = "." + getClassName( this.curOnRtNavItem, strGroupName );
            this.curOnRtNavItem = undefined;
            friends = $$( groupName ); //get all the members of this group
            for ( i=0; i<friends.length; i++ ) {
                item = friends[i];
                if ( item.hasClassName( 'rightnav' ) ) {
                    item.setStyle( {color:item.comApejoyTxtNorm} );
                    if ( item.hasClassName( 'arrow' ) ) {
                        item.setStyle( {backgroundPosition:this.tinyArrowsOff} );
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    },

    //@elmItem - the right nav item that is to be set to on.
turnCurRtNavItemOn: function( anElement, strGroupName ) {
                        var groupName, friends, i, item;
                        this.curOnRtNavItem = anElement;
                        groupName = "." + getClassName( this.curOnRtNavItem, strGroupName );
                        friends = $$( groupName ); //get all the members of this group
                        for ( i=0; i<friends.length; i++ ) {
                            item = friends[i];
                            if ( item.hasClassName( 'rightnav' ) ) {
                                item.removeClassName( 'textURoff');
                                item.addClassName( 'textURon' );
                                if ( item.hasClassName( 'arrowNone' ) ) {
                                    item.addClassName( 'arrowBlack' );
                                }
                            }
                        }
                        return true;
                    },

updateHistoryActionables: function( arrElements ) {
                              var i, id, cur, bcn;
                              if ( arrElements.length === 0 ) {
                                  return;
                              }
                              for ( i=0; i<arrElements.length; i++ ) {
                                  cur = Element.extend( arrElements[i] );
                                  id = cur.id;
                                  if ( cur.hasClassName( 'txt') ) { //we're doing text
                                      // We're at the root of the Team Page
                                      if ( nav.pageId == "team" && YUH.getCurrentState("subnav") == "default" ) {
                                          bcn = cur.getClassName( 'bound' );
                                          if ( bcn !== null ) {
                                              cur.proj = theTeam.members[bcn].proj;
                                              cur.mainBgHover = theTeam.members[bcn].mainBgHover;
                                          } else if ( cur.hasClassName('jobs') ) { //do the jobs links
                                              cur.comApejoySrc = theTeam.members.jobs.src;
                                          } else if ( cur.hasClassName( 'ps' ) ) { //make sure the appropriate tabs are tracked in the Packaged Services content.
                                              YAHOO.util.Event.addListener( cur, 'click', function( evt ) {
                                                      var href, section;
                                                      href = this.readAttribute("href");
                                                      if ( href.startsWith( "http" ) ) {
                                                      href = href.substr( href.lastIndexOf( "/")+1 );
                                                      }
                                                      href = href.slice( 0, href.lastIndexOf(".") );
                                                      section = YUH.getQueryStringParameter( 'subnav' ) || href;
                                                      try {
                                                      YUH.navigate( "subnav", section );
                                                      } catch( err2 ) {
                                                      YUIHistWrapper.loadSecFromRightNav( section );
                                                      }
                                                      YAHOO.util.Event.preventDefault( evt );
                                                      } );
                                          }
                                      }
                                      // we're doing images
                                  } else if ( cur.hasClassName('img') || cur.hasClassName('imgIcon') || cur.hasClassName( "map" ) ) {
                                      // do the team map
                                      if ( cur.hasClassName( "map" ) ) {
                                          if ( nav.pageId == "team" && YUH.getCurrentState("subnav") == "default" ) {
                                              bcn = cur.getClassName( 'bound' );
                                              if ( bcn !== null ) {
                                                  cur.proj = theTeam.members[bcn].proj;
                                                  cur.mainBgHover = theTeam.members[bcn].mainBgHover;
                                                  cur.comApejoySrc = theTeam.members[bcn].src;
                                              }
                                              YAHOO.util.Event.addListener( cur, 'click', function( evt ) {
                                                      var href, section;
                                                      href = this.readAttribute("href");
                                                      if ( href.startsWith( "http" ) ) {
                                                      href = href.substr( href.lastIndexOf( "/")+1 );
                                                      }
                                                      href = href.slice( 0, href.lastIndexOf(".") );
                                                      section = YUH.getQueryStringParameter( 'subnav' ) || href;
                                                      try {
                                                      YUH.navigate( "subnav", section );
                                                      } catch( err2 ) {
                                                      YUIHistWrapper.loadSecFromRightNav( section );
                                                      }
                                                      YAHOO.util.Event.preventDefault( evt );
                                                      } );
                                          }
                                      }
                                  }
                              }
                          },
                          /******************************************/
                          /*    OPEN TOP NORMAL AND HOVER STATES    */
                          /******************************************/
openTopTxtHover: function( anEvent ) {
                     var st, span, nc2;
                     anEvent.stop();
                     $('lowCol2').addClassName( 'lowColTwoTopClosedHover' );
                     st = $('shadeTrigger');
                     span = st.firstDescendant();
                     st.removeClassName( 'norm' );
                     st.addClassName( 'hover' );
                     st.setStyle( {backgroundColor:"#7a7a7a"} );
                     span.removeClassName( 'spanNorm' );
                     span.addClassName( 'spanHover' );
                     $('navContainer').setStyle( {backgroundPosition:'-525px -100px'} );
                     // do the hover state behind the nav tabs
                     nc2 = $('navContainerTwo');
                     nc2.removeClassName( "navContNorm" );
                     nc2.addClassName( "navContHover" );
                     // do the hover state of the nav itself
                     nav.setToOpenTopHoverState();
                 },

openTopTxtNoHover: function( anEvent ) {
                       var cTwo, st, span, nc2;
                       cTwo = $('lowCol2');
                       st = $('shadeTrigger');
                       span = st.firstDescendant();
                       cTwo.removeClassName( 'lowColTwoTopClosedHover' );
                       st.removeClassName( 'hover' );
                       st.addClassName( 'norm' );
                       st.setStyle( {backgroundColor:"#888"} );
                       span.removeClassName( 'spanHover' );
                       span.addClassName( 'spanNorm' );
                       $('navContainer').setStyle( {backgroundPosition:'-525px -50px'} );
                       // undo the hover state behind the nav tabs
                       nc2 = $('navContainerTwo');
                       nc2.removeClassName( "navContHover" );
                       nc2.addClassName( "navContNorm" );
                       // do the hover state of the nav itself
                       nav.setToOpenTopNormalState();
                   },

initOpenTopLinkUI: function() {
                       var target = $('shadeTrigger');
                       target.observe( 'mouseover', this.openTopTxtHover.bindAsEventListener( this ) );
                       target.observe( 'mouseout', this.openTopTxtNoHover.bindAsEventListener( this ) );
                   }
/******************************************/
/*  END OPEN TOP NORMAL AND HOVER STATES  */
/******************************************/
} );

/***************************/
/*  END CLASS Site         */
/***************************/

/************************/
/*  CLASS HomePage      */
/************************/
var HomePage = Class.create( {
initialize: function( strHistItems ) {
this.histItems = strHistItems; //the className attached to all elements whose history should be tracked.
this.rootTitle = "DesignMap - interaction design and strategy";
this.secondaryTitle = "DesignMap - design news and ideas";
// holds the history state for the page right before the top section was closed.
this.histState = {};
this.ulEGM = undefined;
this.llEGM = undefined;
this.ulHotItem = null;
this.llHotItem = null;
},

initUI: function() {
var controlled = this.ulEGM.getControlledElements();
var i, item;
/* use this loop to set up any obervers you want to on the elements
   being managed by the EGM instance */
for( i=0; i<controlled.length; i++ ) {
item = controlled[i];
item.observe( 'mouseover', this.homeTxtMouseover.bindAsEventListener( this, item ) );
item.observe( 'mouseout', this.homeTxtMouseout.bindAsEventListener( this, item ) );
}
controlled = this.llEGM.getControlledElements();
for( i=0; i<controlled.length; i++ ) {
    item = controlled[i];
    if ( item.tagName === "A" ) { //only set observers on the <a> elements
        item.observe( 'mouseover', this.llMouseover.bindAsEventListener( this, item ) );
        item.observe( 'mouseout', this.llMouseout.bindAsEventListener( this, item ) );
    }
}
/*
   $("homePgOne").observe( 'click', this.doHomePagination.bind( this ) );
   $("homePgOne").observe( 'mouseover', this.homePaginationOver.bindAsEventListener( this ) )
   $("homePgOne").observe( 'mouseout', this.homePaginationOut.bindAsEventListener( this ) );
   $("homePgTwo").observe( 'click', this.doHomePagination.bind( this ) )
   $("homePgTwo").observe( 'mouseover', this.homePaginationOver.bindAsEventListener( this ) )
   $("homePgTwo").observe( 'mouseout', this.homePaginationOut.bindAsEventListener( this ) );
 */
},

setULegm: function( objElementGroupManager ) { this.ulEGM = objElementGroupManager; },
    getULegm: function() { return this.ulEGM; },
    setLLegm: function( objElementGroupManager ) { this.llEGM = objElementGroupManager; },
    getLLegm: function() { return this.llEGM; },
    setULhotItem: function( anElement ) {
        if ( anElement ) {
            this.ulHotItem = anElement;
        } else {
            alert( "anElement does not exist" );
        }
    },
    getULhotItem: function() { return this.ulHotItem; },
    setLLhotItem: function( anElement ) { this.llHotItem = anElement; },
    getLLhotItem: function() { return this.llHotItem; },

    homeTxtMouseover: function( evt, anElement ) {
        var e = anElement;
        if ( e.hasClassName( "bound2" ) ) {
            this.ulEGM.setGroupToOperateOn( null, "bound2" );
            this.ulEGM.setToHoverState( this.ulEGM.getGroupToOperateOn() );
        } else if ( e.hasClassName( "bound3" ) ) {
            this.ulEGM.setGroupToOperateOn( null, "bound3" );
            this.ulEGM.setToHoverState( this.ulEGM.getGroupToOperateOn() );
        } else if ( e.getClassName( "boundPs" ) ) { // Do the Packaged Services texts
            var cn = e.getClassName( "boundPs" );
            var targets = $$( "." + cn );
            for ( var i=0; i<targets.length; i++ ) {
                if ( targets[i].tagName === "DIV" && targets[i].id.endsWith( "Three" ) ) { //move the background image
                    $(targets[i]).setStyle( {"backgroundPosition":"335px -525px"} );
                }
                if ( targets[i].tagName === "DIV" && targets[i].id.endsWith( "Two" ) ) { //move the background image
                    $(targets[i]).setStyle( {"backgroundPosition":"335px -282px"} );
                }
                if ( targets[i].tagName === "IMG" ) { //swap out the arrow image
                    $(targets[i]).writeAttribute( {"src":"images/home_ps_arrow_ani.gif"} );
                }
            }
        } else {
            this.ulEGM.setGroupToOperateOn( e, null );
            this.ulEGM.setToHoverState( this.ulEGM.getGroupToOperateOn() );
        }
    },

homeTxtMouseout: function( evt, anElement ) {
                     var e = anElement;
                     if ( e.hasClassName( "bound2" ) ) {
                         this.ulEGM.setGroupToOperateOn( null, "bound2" );
                         this.ulEGM.setToNormalState( this.ulEGM.getGroupToOperateOn() );
                     } else if ( e.hasClassName( "bound3" ) ) {
                         this.ulEGM.setGroupToOperateOn( null, "bound3" );
                         this.ulEGM.setToNormalState( this.ulEGM.getGroupToOperateOn() );
                     } else if ( e.getClassName( "boundPs" ) ) {
                         var cn = e.getClassName( "boundPs" );
                         var targets = $$( "." + cn );
                         for ( var i=0; i<targets.length; i++ ) {
                             if ( targets[i].tagName === "DIV" && targets[i].id.endsWith( "Three" ) ) { //move the background image
                                 $(targets[i]).setStyle( {"backgroundPosition":"335px -153px"} );
                             }
                             if ( targets[i].tagName === "DIV" && targets[i].id.endsWith( "Two" ) ) { //move the background image
                                 $(targets[i]).setStyle( {"backgroundPosition":"335px -93px"} );
                             }
                             if ( targets[i].tagName === "IMG" ) { //swap out the arrow image
                                 $(targets[i]).writeAttribute( {"src":"images/home_ps_arrow.gif"} );
                             }
                         }
                     } else {
                         this.ulEGM.setGroupToOperateOn( e, null );
                         this.ulEGM.setToNormalState( this.ulEGM.getGroupToOperateOn() );
                     }
                 },

llMouseover: function( evt, anElement ) {
                 this.llEGM.setGroupToOperateOn( anElement, null );
                 this.llEGM.setToHoverState( this.llEGM.getGroupToOperateOn() );
             },

llMouseout: function( evt, anElement ) {
                this.llEGM.setGroupToOperateOn( anElement, null );
                this.llEGM.setToNormalState( this.llEGM.getGroupToOperateOn() );
            },

            /* You can only call this function after the DOM has loaded. It will start a
             * timer (ex: wait 10 seconds and then do the first crossfade. Continue fading
             * back and forth every 10 seconds). You don't want to start the time until
             * things have loaded. */

doFade: function( containerId, fadeTime ) {
            var c = $(containerId);
            c.fade( {duration:fadeTime} );
            var hpm = $("homePaginationMain");
            var hpps = $("homePaginationPS");
        },

doAppear: function( containerId, fadeTime ) {
              var c = $(containerId);
              c.appear( {duration:fadeTime } );
              if ( containerId === "homeAniContainerOne" ) {
                  $("homePaginationPS").setStyle( {backgroundPosition:"840px 0px"} );
              } else {
                  $("homePaginationPS").setStyle( {backgroundPosition:"840px -120px"} );
              }
          },

doAnimationLoop: function() {
                     setTimeout( "theHome.doFade( \"homeAniContainerTwo\", 2 )", 6000 );
                     setTimeout( "theHome.doAppear( \"homeAniContainerOne\", 2 )", 6000 );
                     setTimeout( "theHome.doFade( \"homeAniContainerOne\", 2 )", 14000 );
                     setTimeout( "theHome.doAppear( \"homeAniContainerTwo\", 2 )", 14000 );
                 },

doHomePagination: function( evt ) {
                      Event.stop( evt );
                      var target = evt.element();
                      if ( target.id === "homePgOne" ) {
                          theHome.doFade( "homeAniContainerTwo", 2 );
                          theHome.doAppear( "homeAniContainerOne", 2 );
                      } else if ( target.id === "homePgTwo" ) {
                          theHome.doFade( "homeAniContainerOne", 2 );
                          theHome.doAppear( "homeAniContainerTwo", 2 );
                      }
                  },

homePaginationOver: function( evt ) {
                        var t = evt.element();
                        if ( t.id === "homePgTwo" ) {
                            $("homePaginationMain").setStyle( {backgroundPosition:"840px -120px"} );
                        } else if ( t.id === "homePgOne" ) {
                            $("homePaginationPS").setStyle( {backgroundPosition:"840px 0px"} );
                        }
                    },

homePaginationOut: function( evt ) {
                       var t = evt.element();
                       if ( t.id === "homePgTwo" ) {
                           $("homePaginationMain").setStyle( {backgroundPosition:"840px 0px"} );
                       } else if ( t.id === "homePgOne" ) {
                           $("homePaginationPS").setStyle( {backgroundPosition:"840px -120px"} );
                       }
                   },

updateHistState: function() {
                     this.histState = {"lowerSec":YUH.getCurrentState("lowerSec")};
                 }
} );
/************************/
/*  END CLASS HomePage  */
/************************/

/************************/
/*  CLASS WorkPage      */
/************************/
var WorkPage = Class.create( {
initialize: function( strHistItems ) {
this.histItems = strHistItems; //the className attached to all elements whose history should be tracked.
this.offsets = [ null,
{"x":"86px", "y":"135px"},
{"x":"536px",   "y":"0px"},
{"x":"491px", "y":"135px"},
{"x":"-4px", "y":"0px"},
{"x":"266px", "y":"45px"},
{"x":"176px", "y":"0px"},
{"x":"356px", "y":"0px"},
{"x":"266px", "y":"45px"} ];
// create properties that will hold ElementGroupManager objects.
this.ulEGM = undefined;
this.urEGM = undefined;
// when we do a mouseover, set these properties, so we can easily remove
// or re-insert them
this.ulHotItem = null;
this.urHotItem = null;
},

initUI: function() {
            var controlled = this.ulEGM.getControlledElements();
            var i, item;
            /* use this loop to set up any obervers you want to on the elements
               being managed by the EGM instance */
            for( i=0; i<controlled.length; i++ ) {
                item = controlled[i];
                item.observe( 'mouseover', this.mainContentMouseover.bindAsEventListener( this, item ) );
            }
            controlled = this.urEGM.getControlledElements();
            for( i=0; i<controlled.length; i++ ) {
                item = controlled[i];
                if ( item.tagName === "A" ) { //only set observers on the <a> elements
                    item.observe( 'mouseover', this.rtNavMouseover.bindAsEventListener( this, item ) );
                    item.observe( 'mouseout', this.rtNavMouseout.bindAsEventListener( this, item ) );
                }
            }
        },

getXoffset: function( intProjectNumber ) { return this.offsets[ intProjectNumber ].x; },
    getYoffset: function( intProjectNumber ) { return this.offsets[ intProjectNumber ].y; },
    setULegm: function( objElementGroupManager ) { this.ulEGM = objElementGroupManager; },
    getULegm: function() { return this.ulEGM; },
    setURegm: function( objElementGroupManager ) { this.urEGM = objElementGroupManager; },
    getURegm: function() { return this.urEGM; },
    setULhotItem: function( anElement ) {
        if ( anElement ) {
            this.ulHotItem = anElement;
        } else {
            alert( "anElement does not exist" );
        }
    },
    getULhotItem: function() { return this.ulHotItem; },

    removeULhotItem: function() {
        /* The try catch handles a bug in IE7/8 where ulHotItem comes back null
           and can't be removed. So, catch that and run a loop that tests each
           possible id for the dynamically created element. If it's there,
           lingering in the doc, then remove it. Relies on the ulHotItem
           elements being given an id, which they are in insertFloatImage(). */
        try {
            this.ulHotItem.remove();
        } catch( e ) {
            //alert( "ulHotItem is null" );
            for ( var i=0; i<this.ulEGM.getControlledElements().length; i++ ) {
                var orphan = $('workFloat'+i);
                //alert( "orphan: " + orphan );
                if ( orphan ) {
                    orphan.remove();
                    break;
                }
            }
        }
        this.ulHotItem = null;
    },

rtNavMouseover: function( evt, anElement ) {
                    var e = anElement;
                    /* if itm is a member of curOnGroup, then return. This is how we ignore
                       a click on an element that is in the "on" state */
                    if ( this.urEGM.getCurOnGroup() && this.urEGM.isCurOnGroupMember( e ) ) {
                        return;
                    }
                    var boundClassName = e.getClassName( "bound" );
                    // do the rightnav
                    this.urEGM.setGroupToOperateOn( null, boundClassName );
                    this.urEGM.setToHoverState( this.urEGM.getGroupToOperateOn() );
                    if ( YUH.getCurrentState( "subnav" ) === "default" ) {
                        // do the mainContent element
                        this.ulEGM.setGroupToOperateOn( null, boundClassName );
                        var ulTarget = this.ulEGM.getGroupToOperateOn()[0];
                        var proj = boundClassName.substr( boundClassName.lastIndexOf( "d" )+1 );
                        this.insertFloatImg( ulTarget, parseInt( proj, 10 ) );
                    }
                },

rtNavMouseout: function( evt, anElement ) {
                   var e = anElement;
                   /* if itm is a member of curOnGroup, then return. This is how we ignore
                      a click on an element that is in the "on" state */
                   if ( this.urEGM.getCurOnGroup() && this.urEGM.isCurOnGroupMember( e ) ) {
                       return;
                   }
                   this.urEGM.setGroupToOperateOn( e, null );
                   this.urEGM.setToNormalState( this.urEGM.getGroupToOperateOn() );
                   if ( YUH.getCurrentState( "subnav" ) === "default" ) {
                       // do the mainContent element
                       this.removeULhotItem( this.ulHotItem );
                   }
               },

mainContentMouseover: function( evt, anElement ) {
                          var e = anElement;
                          if ( YUH.getCurrentState( "subnav" ) === "default" ) {
                              var boundClassName = e.getClassName( "bound" );
                              // do the rightnav
                              this.urEGM.setGroupToOperateOn( null, boundClassName );
                              this.urEGM.setToHoverState( this.urEGM.getGroupToOperateOn() );
                              // do the mainContent element
                              var proj = boundClassName.substr( boundClassName.lastIndexOf( "d" )+1 );
                              this.insertFloatImg( e, parseInt( proj, 10 )  );
                          }
                      },

mainContentMouseout: function( evt ) {
                         var e = evt.element();
                         if ( YUH.getCurrentState( "subnav" ) === "default" ) {
                             this.urEGM.setGroupToOperateOn( e, null );
                             this.urEGM.setToNormalState( this.urEGM.getGroupToOperateOn() );

                             //do the mainContent element
                             this.removeULhotItem( this.ulHotItem );
                         }
                     },

doIconMouseOverOut: function( evt, isHover ) {
                        evt.stop();
                        var e = evt.element();
                        var icon = e.getClassName( 'icon' );
                        if ( isHover ) { //mouseover
                            if ( !icon.endsWith("On") ) {
                                e.removeClassName( icon );
                                e.addClassName( icon.sub( "Normal", "Hover" ) );
                            }
                        } else { //mouseout
                            if ( icon.endsWith( "Hover" ) ) {
                                e.removeClassName( icon );
                                e.addClassName( icon.sub( "Hover", "Normal" ) );
                            }
                        }
                    },

                    /* @param anImgElement - this is the tiny image element on which the mouseover event occurred.
                       @param xOffset - how much to move to floating image horizontally.
                       @param yOffset - how much to move to floating image vertically. */
insertFloatImg: function( anImgElement, intProjectNumber ) {
                    var a = new Element( "a" );
                    var href = "#subnav=workProj" + intProjectNumber + "v1";
                    a.writeAttribute( {"href":href} );
                    var existingSrc = anImgElement.readAttribute( "src" );

                    var newSrc = existingSrc.sub( "tiny", "" );
                    newSrc = newSrc.sub( "jpg", "png" );
                    var existingAlt = anImgElement.readAttribute( "alt" );
                    var i = new Element( "img" );
                    i.writeAttribute( {"class":"bound"+intProjectNumber} );
                    i.writeAttribute( {"src":newSrc} );
                    i.writeAttribute( {"alt":existingAlt} );
                    i.writeAttribute( {"width":"188"} );
                    i.writeAttribute( {"height":"185"} );
                    var d = new Element( "div" );
                    d.writeAttribute( {"id":"workFloat"+intProjectNumber} );
                    d.writeAttribute( {"class":"ulGroup bound"+intProjectNumber} );
                    d.setStyle( {"position":"absolute"} );
                    d.setStyle( {"top":this.offsets[intProjectNumber].y} );
                    d.setStyle( {"left":this.offsets[intProjectNumber].x} );
                    a.appendChild( i );
                    d.appendChild( a );
                    anImgElement.up().appendChild( d );
                    /* store this div so that we can get it later. If we have to call removeFloatImg
                       manually (as we do if handling mouseout on a right nav item). In order to call
                       removeFloatImg directly, as oppossed to it being triggered as an event, we have
                       to pass an element for it to operate on. Since the div we need to remove is
                       dynamically created, we can't get to it via DOM methods. */
                    this.ulHotItem = d;
                    // set an observer on the new div to handle mouseout
                    d.observe( "mouseout", this.mainContentMouseout.bindAsEventListener( this ) );
                },

                /* @param anEvent - passed via bindAsEventListener.
Note: This function relies on specific HTML structure. If you don't have:
<div>
<img>
</div>
this method will almost certainly not work correctly. */
removeFloatImg: function( anEvent ) {
                    var e = anEvent.element();
                    if ( e.tagName === "div" ) {
                        e.remove();
                    } else { // event occurred on the <img> element
                        e.up().remove();
                    }
                    // also set the corresponding right nav back to normal
                    this.urEGM.setGroupToOperateOn( e, null );
                    var opGroup = this.urEGM.getGroupToOperateOn();
                    this.urEGM.setToNormalState( opGroup );
                },

updateWorkImgIcons: function () {
                        var items, i, len, item, icon;
                        items = $$( '.imgIcon' );
                        len = items.length;
                        if ( len === 0 ) {
                            return;
                        }
                        for ( i=0; i<len; i++ ) {
                            item = items[i];
                            icon = item.getClassName( "icon" );
                            if ( icon.endsWith( "Normal") ) {
                                item.setStyle( {"cursor":"pointer"} );
                                item.observe( 'mouseover', this.doIconMouseOverOut.bindAsEventListener( this, true ) );
                                item.observe( 'mouseout', this.doIconMouseOverOut.bindAsEventListener( this, false ) );
                                YAHOO.util.Event.addListener( item, 'click', function( evt ) {
                                        theHist.setCurrentModule( theHist.getModule( "workImgIcons" ) );
                                        var it = Element.extend( this );
                                        it = it.firstDescendant();
                                        var href = it.readAttribute( "href" );
                                        var idx1 = href.lastIndexOf( "=" );
                                        var idx2 = href.lastIndexOf( "." );
                                        href = href.slice( idx1+1, idx2 );
                                        var section = YUH.getQueryStringParameter( 'workImgIcons' ) || href;
                                        try {
                                        YUH.navigate( 'workImgIcons', section );
                                        } catch( err ) {
                                        YUIHistWrapper.loadSecFromImgIcons( section );
                                        }
                                        YAHOO.util.Event.preventDefault( evt );
                                        } );
                            }
                        }
                    }
} );

/************************/
/*  END CLASS WorkPage  */
/************************/

/***********************/
/*        RINGS:       */
/***********************/
var Rings = Class.create( {
initialize: function( objContainingObject) {
this.containingObj = objContainingObject;
/* Prototype's Event.pointerX() and Event.pointerY() methods return the
   position of the mouse WRT to the document not the viewport, so let's
   do everything like that. That way, we don't have to deal with
   scrolling - positions WRT the document don't change just because the
   document was scrolled.

   Element.cumulativeOffset() gives us the position of the
   ring-containing element WRT to the document. To begin with, however,
   we need to note and retain the position of the rings WRT their center
   as well as the center WRT to the containing element. We just need to
   adjust these points to be relative to the document.

   The center of the ring is 360px to the left and 250px down from the
   top left corner of the containing box. Therefore, the center of the
   rings is cumulativeOffset()[0] + 360, cumulativeOffset()[1] + 250 and
   the innermost circle can be defined by adding/subtracting 13 from
   that docuement-relative center. */
this.container = $('topColOne');
this.containerX = this.container.cumulativeOffset()[0];
this.containerY = this.container.cumulativeOffset()[1];

this.centerX = this.containerX + 360;
this.centerY = this.containerY + 250;

// top, right, bottom, and left boundaries of the outtermost ring WRT to the page.
this.tpBound = this.centerY-209; //209 = distance from center to outtermost circle
this.rtBound = this.centerX+209;
this.btBound = this.centerY+110;
this.ltBound = this.centerX-209;

/* Circle defining points WRT to the center of the rings. We need to
   retain this information in order to update onResize. */
this.wrtCenter0=[13,0,-13,0,-13,0];
this.wrtCenter1=[32,0,-32,0,-32,0];
this.wrtCenter2=[58,0,-58,0,-58,0];
this.wrtCenter3=[83,0,-83,0,-84,0];
this.wrtCenter4=[109,0,-109,0,-109,0];
this.wrtCenter5=[135,0,-135,0,-135,0];
this.wrtCenter6=[161,0,-161,0,-161,0];
this.wrtCenter7=[187,0,-187,0,-186,0];
this.wrtCenter8=[209,0,-209,0,-209,0];
this.wrtCenter=[this.wrtCenter0,this.wrtCenter1,this.wrtCenter2,this.wrtCenter3,this.wrtCenter4,this.wrtCenter5,this.wrtCenter6,this.wrtCenter7,this.wrtCenter8];
this.defaultBgPos = "0px 41px";

/* The first 6 items define 3 points on a circle WRT the document.
   They need to be updated when the window resizes. The order is
   x1, x2, x3, y1, y2, y3, so one pair is (x1,y1)

   The 7th item is the backgroundPosition for the rings sprite that
   cooresponds to the ring as defined by the previous 6 items. */
this.ring0=[this.centerX+13,this.centerX,this.centerX-13,this.centerY,this.centerY-13,this.centerY,''];
this.ring1=[this.centerX+32,this.centerX,this.centerX-32,this.centerY,this.centerY-32,this.centerY,'0px -3959px'];
this.ring2=[this.centerX+58,this.centerX,this.centerX-58,this.centerY,this.centerY-58,this.centerY,'0px -3559px'];
this.ring3=[this.centerX+83,this.centerX,this.centerX-83,this.centerY,this.centerY-84,this.centerY,'0px -3159px'];
this.ring4=[this.centerX+109,this.centerX,this.centerX-109,this.centerY,this.centerY-109,this.centerY,'0px -2759px'];
this.ring5=[this.centerX+135,this.centerX,this.centerX-135,this.centerY,this.centerY-135,this.centerY,'0px -2359px'];
this.ring6=[this.centerX+161,this.centerX,this.centerX-161,this.centerY,this.centerY-161,this.centerY,'0px -1959px'];
this.ring7=[this.centerX+187,this.centerX,this.centerX-187,this.centerY,this.centerY-186,this.centerY,'0px -1559px'];
this.ring8=[this.centerX+209,this.centerX,this.centerX-209,this.centerY,this.centerY-209,this.centerY,'0px -1159px'];
this.rngs=[this.ring0,this.ring1,this.ring2,this.ring3,this.ring4,this.ring5,this.ring6,this.ring7,this.ring8];

this.multiRings=[null,null,null,null,null,null,null,null,null,"0px -759px","0px -359px","0px -359px"];
this.urls=[null,"servProj1v1","servProj2v1","servProj3v1","servProj4v1","servProj5v1","servProj6v1","servProj7v1","servProj8v1","servProj9v1","servProj10v1","servProj11v1"];
// ring 8 is the outtermost ring.
            },

getContainingObj: function() { return this.containingObj; },
                  getRngs: function() { return this.rngs; },

                  getTPbound: function() { return this.tpBound; },
                  getRTbound: function() { return this.rtBound; },
                  getBTbound: function() { return this.btBound; },
                  getLTbound: function() { return this.ltBound; },

                  doRingBg: function( intRing ) {
                      // begin by setting all the right side links to normal
                      if ( this.containingObj.getULegm().getCurOnGroup() ) {
                          mainContentEGM.setToNormalState();
                          mainContentEGM.linkGroup();
                      }
                      $('servicesMain').setStyle( {backgroundPosition:"0px 41px"} );
                      $('topColOne').setStyle( {cursor:"default"} );
                      if ( intRing > -1 && intRing < 9 ) {
                          //set the cursor to a pointer.
                          $('topColOne').setStyle( {cursor:"pointer"} );
                          $('servicesMain').setStyle( {backgroundPosition:this.rngs[intRing][6]} );
                      } else if ( intRing > 8 && intRing < 12 ) {
                          //set the cursor to a pointer.
                          $('topColOne').setStyle( {cursor:"pointer"} );
                          $('servicesMain').setStyle( {backgroundPosition:this.multiRings[intRing]} );
                      }
                  },

inRing: function( obj, arr ) {
            var r;
            //get the mouse coordinates for where the mousemove event occurred.
            var mouseX = Event.pointerX(obj);
            var mouseY = Event.pointerY(obj);
            /* check to see if we could possibly be in a ring - the mouseover event is
               attached to the image containing the rings, but the image is larger than
               the rings themselves. */
            if ( mouseX >= this.rings.getLTbound() && mouseX <= this.rings.getRTbound() && mouseY >= this.rings.getTPbound() && mouseY <= this.rings.getBTbound() ) {
                //do binary search to determine if a point is in a ring, and if so which one.
                r = this.rings.binarySearch( arr, 0, arr.length, mouseX, mouseY );
                // set hover state for the correct ring
                this.rings.doRingBg( r );
                theServices.setLastHotRing( theServices.getCurHotRing() );
                theServices.setCurHotRing( r );
                // turn off hover for a previous ring
                this.ulEGM.setToNormalState( this.ulEGM.getGroupToOperateOn() );
                // turn on hover for the current ring
                if ( r !== -1 ) {
                    if ( this.rings.getLastHotRing !== r ) {
                        var e = $$("." + this.ulEGM.getGroupString() + r )[0];
                        /* the ring is done already, but still need to do the rightnav,
                           and no, I don't like doing it in here. */
                        this.urEGM.setToNormalState( this.urEGM.getGroupToOperateOn() );
                        this.urEGM.setGroupToOperateOn( e, null );
                        this.setURhotItem( e );
                        this.urEGM.setToHoverState( this.urEGM.getGroupToOperateOn() );
                    }
                }
                return r;
            } else { //we're not in a ring so reset to default
                this.rings.doRingBg( -1 );
                theServices.setCurHotRing( -1 );
                // set the rightNav to normal
                this.urEGM.setGroupToOperateOn( null, this.urEGM.getGroupString()+this.lastHotRing );
                this.urEGM.setToNormalState( this.urEGM.getGroupToOperateOn() );
                /* if r is -1, we're not in a ring, so make sure that nothing in the rightNav is
                   in the hover state. There are only two items that could be on at this point.
                   Set them both to the normal state. */
                var designStrategyRingID = $$("." + this.ulEGM.getGroupString() + "1" )[0];
                this.ulEGM.setGroupToOperateOn( designStrategyRingID, null );
                this.ulEGM.setToNormalState( this.ulEGM.getGroupToOperateOn() );
                var frontEndDevRingID = $$("." + this.ulEGM.getGroupString() + "8" )[0];
                this.ulEGM.setGroupToOperateOn( frontEndDevRingID, null );
                this.ulEGM.setToNormalState( this.ulEGM.getGroupToOperateOn() );
                return -1;
            }
        },

updateCoords: function( fromCaller, aRing ) {
                  aRing.container = $('topColOne');
                  aRing.containerX = aRing.container.cumulativeOffset()[0];
                  aRing.containerY = aRing.container.cumulativeOffset()[1];
                  aRing.centerX = aRing.containerX + 360;
                  aRing.centerY = aRing.containerY + 250;
                  for ( var i=0; i<aRing.rngs.length; i++ ) {
                      for ( var j=0; j<3; j++ ) {
                          aRing.rngs[i][j] = aRing.centerX + aRing.wrtCenter[i][j];
                      }
                  }
                  for ( var k=0; k<aRing.rngs.length; k++ ) {
                      for ( var m=3; m<6; m++ ) {
                          aRing.rngs[k][m] = aRing.centerY + aRing.wrtCenter[k][m];
                      }
                  }
                  // update the boundaries
                  aRing.tpBound = aRing.centerY-209; //209 = distance from center to outtermost circle
                  aRing.rtBound = aRing.centerX+209;
                  aRing.btBound = aRing.centerY+110;
                  aRing.ltBound = aRing.centerX-209;
              },

binarySearch: function( arr, low, high, x, y ) {
                  var message = "";
                  var ring;
                  if ( high < low ) {
                      return -1; //not in any ring
                  }
                  var mid = Math.floor( (low + high) / 2 );
                  if ( this.isOnCircle( arr[mid], x, y ) < 0 ) {
                      if ( arr[mid-1] && this.isOnCircle( arr[mid-1], x, y ) > 0 ) {
                          message = "ring lies between ";
                          message = message + mid;
                          message = message + " and ";
                          message = message + (mid-1);
                          ring = mid;
                          return ring;
                      } else {
                          return this.binarySearch( arr, low, mid-1, x, y );
                      }
                  } else {
                      if ( arr[mid+1] && this.isOnCircle( arr[mid+1], x, y ) < 0 ) {
                          message = "ring lies between ";
                          message = message + mid;
                          message = message + " and ";
                          message = message + (mid+1);
                          ring = mid+1;
                          return ring;
                      } else {
                          return this.binarySearch( arr, mid+1, high, x, y );
                      }
                  }
              },

              /* Checks whether a point (x,y) lies inside, outside or on a circle defined
                 by 3 other points. The x,y point to check comes from the current cursor position.

Syntax:
isOnCircle( obj, anArray )
obj - the event that sent us to the function
anArray - [0],[1],[2] = [x1 x2 x3], [3],[4], [5] = [y1 y2 y3]

A circle can be made out of 3 points (x1,y1), (x2,y2), and (x3,y3).
Not just any 3 points though. You can't draw a circle through three points
on a straight line. Each point must lie in a different quadrant of the circle.
A convienent choice of points for the unit circle would be: (1,0), (0,1), (-1,0).

return  0 ==> lies on the circle
return >1 ==> lies outside the circle
return -1 ==> lies inside the circle

For this usage on the circle and outside the circle have the same meaning. */
isOnCircle: function( aCircle, xCoord, yCoord ) {
                if ( aCircle !== undefined ) {
                    var x1 = aCircle[0];
                    var x2 = aCircle[1];
                    var x3 = aCircle[2];
                    var y1 = aCircle[3];
                    var y2 = aCircle[4];
                    var y3 = aCircle[5];
                    var x = xCoord;
                    var y = yCoord;

                    var k = ((x1-x2)*(x2*x2-x3*x3+y2*y2-y3*y3)-(x2-x3)*(x1*x1-x2*x2+y1*y1-y2*y2))/((2)*((y2-y3)*(x1-x2)-(y1-y2)*(x2-x3)));
                    var h = ((y1-y2)*(y1+y2-2*k))/((2)*(x1-x2))+(x1+x2)/2;
                    var r = Math.sqrt((x3-h)*(x3-h)+(y3-k)*(y3-k));

                    var ans = (x-h)*(x-h)+(y-k)*(y-k)-r*r;
                    return ans;
                } else {
                    return;
                }
            },

getServSubSecURL: function( int ) {
                      if ( int !== -1 ) { //we've clicked on a ring
                          var href = this.urls[int];
                          return href;
                      } else {
                          return false;
                      }
                  }
} );
/***********************/
/*      END RINGS:     */
/***********************/

/****************************/
/*  CLASS ServicesPage      */
/****************************/
var ServicesPage = Class.create( {
initialize: function( strHistItems, strNonHistItems ) {
this.histItems = strHistItems; //the className attached to all elements whose history should be tracked.
this.nonHistItems = $$(strNonHistItems);
this.rings = undefined;
this.mainBgNorm = "0px 41px";
this.smRingsXoffset = "20px";
this.smRingsYoffset = -10;
this.smRingsMultiplier = 100;
/* the small rings image for "Design Strategy" is 2 * 100 - 10 vertical
   pixels in the sprite. */
this.smRings = [-1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 1];
/* if mouse is on a rings, this tells witch on. -1 means not on any ring.
   Otherwise, the numbers correspond to the project numbers in the
   rightnav. */
this.curHotRing = -1;
this.lastHotRing = undefined;
this.ulEGM = undefined;
this.urEGM = undefined;
this.llEGM = undefined;
this.ulHotItem = null;
this.urHotItem = null;
this.packServRtNav = $$(".bound12" );
this.pAndD = undefined;
            },

initUI: function() {
            var controlled = this.urEGM.getControlledElements();
            var i, item;
            for( i=0; i<controlled.length; i++ ) {
                item = controlled[i];
                if ( item.tagName === "A" ) { //only set observers on the <a> elements
                    item.observe( 'mouseover', this.rtNavMouseover.bindAsEventListener( this, item ) );
                    item.observe( 'mouseout', this.rtNavMouseout.bindAsEventListener( this, item ) );
                }
            }
            controlled = this.ulEGM.getControlledElements();
            for( i=0; i<controlled.length; i++ ) {
                item = controlled[i];
                var mousemoveObs = item.observe( 'mousemove', this.rings.inRing.bindAsEventListener( this, this.rings.getRngs() ) );
                item.observe( 'mouseout', function() {
                        item.stopObserving( 'mousemove', mousemoveObs );
                        $('servicesMain').setStyle( {backgroundPosition:"0px 41px"} );
                        }.bind( this ) );
            }
            controlled = this.llEGM.getControlledElements();
            for( i=0; i<controlled.length; i++ ) {
                item = controlled[i];
                if ( item.tagName === "A" ) {
                    item.observe( 'mouseover', this.llMouseover.bindAsEventListener( this, item ) );
                    item.observe( 'mouseout', this.llMouseout.bindAsEventListener( this, item ) );
                }
            }
            controlled = this.packServRtNav;
            for ( i=0; i<controlled.length; i++ ) {
                item = controlled[i];
                item.observe( 'mouseover', this.psMouseover.bindAsEventListener( this, item ) );
                item.observe( 'mouseout', this.psMouseout.bindAsEventListener( this, item ) );
            }
        },

        /*
           Use this function to set UI behaviors on elements that are loaded
           dynamically. For example, the Packaged Services content all comes in via
           XHR, so call this method after that content has loaded.
           @param aClassName - give all elements that need special UI treatment the
           same className and pass in that string.
         */
initDynElementsUI: function( aClassName ) {
                       var items, item, i, href;
                       items = $$( aClassName ); //don't forget the "." - ".dynUI" not "dynUI"
                       for ( i=0; i<items.length; i++ ) {
                           item = items[i];
                           if ( item.hasClassName( "psBoxOne" ) ) {
                               if ( item.hasClassName( "fl" ) ) {
                                   item.observe( 'click', this.observePsOverviewBox_tuning.bindAsEventListener( this, item ) );
                               } else if ( item.hasClassName( "fr" ) ) {
                                   item.observe( 'click', this.observePsOverviewBox_subscription.bindAsEventListener( this, item ) );
                               }
                           }
                           item.observe( 'mouseover', this.dynMouseover.bindAsEventListener( this, item ) );
                           item.observe( 'mouseout', this.dynMouseout.bindAsEventListener( this, item ) );
                       }
                   },

observePsOverviewBox_tuning: function( evt, obj ) {
                                 try {
                                     YUH.navigate( "lowerSec", "psProductTuning_1" );
                                 } catch( err ) {
                                     YUIHistWrapper.loadLowerLtContent( "psProductTuning_1" );
                                 }
                                 YAHOO.util.Event.preventDefault( evt );
                             },

observePsOverviewBox_subscription: function( evt, obj ) {
                                       try {
                                           YUH.navigate( "lowerSec", "psSubscription_1" );
                                       } catch( err ) {
                                           YUIHistWrapper.loadLowerLtContent( "psSubscription_1" );
                                       }
                                       YAHOO.util.Event.preventDefault( evt );
                                   },

setRings: function( objRings ) { this.rings = objRings; },
          getRings: function() { return this.rings; },
          setULegm: function( objElementManagerGroup ) { this.ulEGM = objElementManagerGroup; },
          getULegm: function() { return this.ulEGM; },
          setURegm: function( objElementManagerGroup ) { this.urEGM = objElementManagerGroup; },
          getURegm: function() { return this.urEGM; },
          setLLegm: function( objElementManagerGroup ) { this.llEGM = objElementManagerGroup; },
          getLLegm: function() { return this.llEGM; },
          setURhotItem: function( anElement ) { this.urHotItem = anElement; },
          getURhotItem: function() { return this.urHotItem; },
          resetBg: function() { $('servicesMain').setStyle( {backgroundPosition:this.mainBgNorm} ); },
          getCurHotRing: function() { return this.curHotRing; },
          setCurHotRing: function( int ) { this.curHotRing = int; },
          getLastHotRing: function() { return this.lastHotRing; },
          setLastHotRing: function( int ) { this.lastHotRing = int; },

          rtNavMouseover: function( evt, anElement ) {
              var e = anElement;
              var boundClassName = e.getClassName( "bound" );
              // do the rightnav
              this.urEGM.setGroupToOperateOn( null, boundClassName );
              this.urEGM.setToHoverState( this.urEGM.getGroupToOperateOn() );
              // if at the root, do the mainContent element
              if ( YUH.getCurrentState( "subnav" ) === "default" ) {
                  var proj = boundClassName.substr( boundClassName.lastIndexOf( "d" )+1 );
                  this.rings.doRingBg( proj );
              }
          },

rtNavMouseout: function( evt, anElement ) {
                   var e = anElement;
                   /*
                      if itm is a member of curOnGroup, then return. This is how we ignore a
                      click on an element that is in the "on" state
                    */
                   if ( this.urEGM.getCurOnGroup() && this.urEGM.isCurOnGroupMember( e ) ) {
                       return;
                   }
                   this.urEGM.setGroupToOperateOn( e, null );
                   this.urEGM.setToNormalState( this.urEGM.getGroupToOperateOn() );
                   // do the mainContent element
                   if ( YUH.getCurrentState( "subnav" ) === "default" ) {
                       this.rings.doRingBg( -1 );
                   }
               },

llMouseover: function( evt, anElement ) {
                 evt.stop();
                 this.llEGM.setGroupToOperateOn( anElement, null );
                 this.llEGM.setToHoverState( this.llEGM.getGroupToOperateOn() );
             },

llMouseout: function( evt, anElement ) {
                this.llEGM.setGroupToOperateOn( anElement, null );
                this.llEGM.setToNormalState( this.llEGM.getGroupToOperateOn() );
            },

psMouseover: function( evt, anElement ) {
                 Event.stop( evt );
                 this.packServRtNav.each( function( item ) {
                         item.removeClassName( "off" );
                         item.addClassName( "on" );
                         } );
             },

psMouseout: function( evt, anElement ) {
                Event.stop( evt );
                this.packServRtNav.each( function( item ) {
                        item.removeClassName( "on" );
                        item.addClassName( "off" );
                        } );
            },

dynMouseover: function( evt, anElement ) {
                  evt.stop();
                  var b, boundGroup;
                  if ( anElement.tagName === "IMG" ) {
                      anElement = anElement.up();
                  }
                  b = anElement.getClassName( "bound" );
                  if ( !b ) { //assume we're just targeting a single element
                      if ( anElement.id.endsWith( "Btn" ) ) {
                          var xPos = anElement.getStyle( "background-position" );
                          if ( !xPos ) { //IE, dammit
                              xPos = anElement.getStyle( "background-position-x" );
                              xPos = xPos + " ";
                          } else {
                              xPos = xPos.substr( 0, xPos.lastIndexOf( " " ) + 1 );
                          }
                          anElement.setStyle( {backgroundPosition:xPos + "-115px"} );
                      } else {
                          anElement.setStyle( {"cursor":"pointer"} );
                          anElement.removeClassName( "off" );
                          anElement.addClassName( "on" );
                      }
                  } else if ( b ) {
                      boundGroup = $$( "." + b );
                      boundGroup.each( function( item ) {
                              item.setStyle( {"cursor":"pointer"} );
                              item.removeClassName( "off" );
                              item.addClassName( "on" );
                              } );
                  }
              },

dynMouseout: function( evt, anElement ) {
                 var b, boundGroup;
                 if ( anElement.tagName === "IMG" ) {
                     anElement = anElement.up();
                 }
                 b = anElement.getClassName( "bound" );
                 if ( !b ) { //assume we're just targeting a single element
                     if ( anElement.id.endsWith( "Btn" ) ) {
                         var xPos = anElement.getStyle( "background-position" );
                         if ( !xPos ) { //IE, dammit
                             xPos = anElement.getStyle( "background-position-x" );
                             xPos = xPos + " ";
                         } else {
                             xPos = xPos.substr( 0, xPos.lastIndexOf( " " ) + 1 );
                         }
                         anElement.setStyle( {backgroundPosition:xPos + "0px"} );
                     } else {
                         anElement.setStyle( {"cursor":"default"} );
                         anElement.removeClassName( "on" );
                         anElement.addClassName( "off" );
                     }
                 } else if ( b ) {
                     boundGroup = $$( "." + b );
                     boundGroup.each( function( item ) {
                             item.setStyle( {"cursor":"default"} );
                             item.removeClassName( "on" );
                             item.addClassName( "off" );
                             } );
                 }
             },

popWrapper: function () {
                // get the arguments passed by bindAsEventListener
                var data = $A( arguments );
                // First, see if there's already a PopAndDim object and make one if necessary
                if ( !theServices.pAndD ) {
                    theServices.pAndD = new PopAndDim( data[1], data[2], data[3] );
                }
                // First see if the PopDiv instance that we want to show is already in pAndD's popColl
                var exists = theServices.pAndD.scanPopDivColl( data[6] );
                if ( exists ) {
                    theServices.pAndD.showPopDiv( exists );
                    return exists;
                } else {
                    var pd = new PopDiv( data[4], data[5], data[6], data[7], data[3],
                            data[8], data[9], data[10], data[11] );
                    theServices.pAndD.addPopDiv( pd );
                    theServices.pAndD.showPopDiv( pd );
                    pd.position();
                    return pd;
                }
            },

            /* Call this in a successHandler after loading the the dynamic content.
               In this case, after loading the Product Tuning view of the Packaged
               Services content
             */
initProdTuningOpenModals: function() {
                              var g, i;
                              g = $$(".prototyping");
                              for ( i=0; i<g.length; i++ ) {
                                  g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                              'modalPrototyping.html', 'popDivProt', 'modalDynContentProt', 'modalCloseProt',
                                              'packServ' ) );
                              }
                              g = $$(".compAnalysis");
                              for ( i=0; i<g.length; i++ ) {
                                  g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                              'modalCompAnalysis.html', 'popDivComp', 'modalDynContentComp',
                                              'modalCloseComp', 'packServ' ) );
                              }
                              g = $$(".heuristicReview");
                              for ( i=0; i<g.length; i++ ) {
                                  g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                              'modalHeuristicReview.html', 'popDivHeur', 'modalDynContentHeur',
                                              'modalCloseHeur', 'packServ' ) );
                              }
                              g = $$(".usabilityResearch");
                              for ( i=0; i<g.length; i++ ) {
                                  g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                              'modalUsabilityResearch.html', 'popDivUsab', 'modalDynContentUsab',
                                              'modalCloseUsab', 'packServ' ) );
                              }
                          },

initSubscriptionOpenModals: function() {
                                var g, i;
                                g = $$(".designDirector");
                                for ( i=0; i<g.length; i++ ) {
                                    g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                                'modalDesignDirector.html', 'popDivDesi', 'modalDynContentDesi',
                                                'modalCloseDesi', 'packServ' ) );
                                }
                                g = $$(".proDesign");
                                for ( i=0; i<g.length; i++ ) {
                                    g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                                'modalProDesign.html', 'popDivProf', 'modalDynContentProf', 'modalCloseProf',
                                                'packServ' ) );
                                }
                                g = $$(".productionDesign");
                                for ( i=0; i<g.length; i++ ) {
                                    g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                                'modalProductionDesign.html', 'popDivProd', 'modalDynContentProd',
                                                'modalCloseProd', 'packServ' ) );
                                }
                            },

initModalNavLinks: function() {
                       var g, i;
                       g = $$(".modalNavProt" );
                       for ( i=0; i<g.length; i++ ) {
                           g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                       'modalPrototyping.html', 'popDivProt', 'modalDynContentProt', 'modalCloseProt',
                                       'packServ' ) );
                       }
                       g = $$(".modalNavComp" );
                       for ( i=0; i<g.length; i++ ) {
                           g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                       'modalCompAnalysis.html', 'popDivComp', 'modalDynContentComp',
                                       'modalCloseComp', 'packServ' ) );
                       }
                       g = $$(".modalNavHeur" );
                       for ( i=0; i<g.length; i++ ) {
                           g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                       'modalHeuristicReview.html', 'popDivHeur', 'modalDynContentHeur',
                                       'modalCloseHeur', 'packServ' ) );
                       }
                       g = $$(".modalNavUsab");
                       for ( i=0; i<g.length; i++ ) {
                           g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                       'modalUsabilityResearch.html', 'popDivUsab', 'modalDynContentUsab',
                                       'modalCloseUsab', 'packServ' ) );
                       }
                       g = $$(".modalNavDesi");
                       for ( i=0; i<g.length; i++ ) {
                           g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                       'modalDesignDirector.html', 'popDivDesi', 'modalDynContentDesi',
                                       'modalCloseDesi', 'packServ' ) );
                       }
                       g = $$(".modalNavProf");
                       for ( i=0; i<g.length; i++ ) {
                           g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                       'modalProDesign.html', 'popDivProf', 'modalDynContentProf', 'modalCloseProf',
                                       'packServ' ) );
                       }
                       g = $$(".modalNavProd");
                       for ( i=0; i<g.length; i++ ) {
                           g[i].observe( 'click', this.doModalWindow.bindAsEventListener( this,
                                       'modalProductionDesign.html', 'popDivProd', 'modalDynContentProd',
                                       'modalCloseProd', 'packServ' ) );
                       }
                   },
                   // Not sure where this method should live - perhaps not here.
doModalWindow: function() {
                   /*
                      the args passed in should be:
                      data[0] - the bound object or event
                      data[1] - the URL of the file to fetch
                      data[2] - the popup we want to launch
                      data[3] - the dynamic content container
                      data[4] - the className attached to any elements that trigger the popup to close
                      data[5] - (optional). Put this in if you want to position a modal div relative to another element in the page rather than the default, which is to center the modal div in the viewport.
                    */
                   var data = $A( arguments );
                   Event.stop( data[0] );
                   // 1. fetch the desired content with an XHR.
                   var modalSuccessHandler = function( obj ) {
                       /*
                          args to pass to popWrapper are:
                          0th - the event that gets passed when using bindAsEventListener().
                          1st - the opacity to set the dark div to
                          2nd - indicates whether clicking outside popup div closes the div or not
                          3rd - duration of the fade in/out of both the popup and the dark div
                          4th - height to make the modal window
                          5th - width of the modal window
                          6th - the outtermost container. Animations are called on this one.
                          7th - a container nested right inside the outtermost
                          8th - className on elements that trigger the modal div to close
                          9th - (optional) id of an element you'd like to place this PopDiv relative to
                          10th - (optional) integer for pixels down from top of page
                          11th - (optional) integer for pixels from the left side of page
                        */
                       var pd = theServices.popWrapper( data[0], 0, 1, 0, 662, 682, data[2],
                               data[3], data[4], data[5], 50, 25 );
                       var t = YAHOO.util.Dom.get( data[3] );
                       var huh = t.insert( obj.responseText );
                       pd.initCloseActions( true );
                       theServices.initModalNavLinks();

                       // set the opacity of the page to dim a bit
                       $("whiteFrame").setStyle("opacity:0.4");
                       $("navContainer").setStyle("opacity:0.4");
                       $("lowerSection").setStyle("opacity:0.4");
                   };

                   var modalFailureHandler = function( obj ) {
                       alert( "ack, phewy." );
                   };

                   /* If we're in here as a result of a click on a nav link inside a modal
                    * window, close the current one and procede. */
                   var e = data[0];
                   e = e.element();
                   var cn = $w(e.className);
                   cn.each( function( item ) {
                           if ( item.startsWith('modalNav') ) { //clicked on a navigation link in a modal window
                           /* close the PopDiv that open now before loading the one requested by the link. */
                           e = e.up();
                           var d = e.id;
                           while ( !d.startsWith( 'popDiv' ) ) {
                           e = e.up();
                           d = e.id;
                           }
                           var target = theServices.pAndD.scanPopDivColl( d );
                           theServices.pAndD.closePopDiv( target, true );
                           }
                           } );

                   /* First, see if we already have the PopDiv that we want with content
                    * loaded. If so, show it, if not go ahead with fetching the content. To do
                    * that, use the inner of the two divs that act as the containers for the
                    * popups and which already exist in the page. If that innermost div is empty
                    * then we haven't (duh) loaded content.*/
                   if ( $(data[3]).empty() ) {
                       YAHOO.util.Connect.asyncRequest( "GET", data[1], {
success:modalSuccessHandler,
failure:modalFailureHandler
} );
} else {
    theServices.pAndD.showPopDiv( theServices.pAndD.scanPopDivColl( data[2] ) );
}
},

handleCloseBtnClick: function( evt, targetPopId ) {
                         evt.stop();
                         var p = theServices.pAndD;
                         var target = p.scanPopDivColl( targetPopId, p );
                         if ( target != null ) {
                             p.hidePopDiv( target );
                             evt.element().stopObserving( 'click',
                                     this.handleCloseBtnClick.bindAsEventListener( evt, targetPopId ) );
                         }
                     },
                     /* Call this in a successHandler after loading the the dynamic content.
                        In this case, after loading one of the modal window associate with the
                        Product Tuning view of the Packaged Services content
                        @param anElementId - the ID of the element that gets clicked to close a
                        modal window
                        @param targetPopId - the ID of the modal window to close
                      */
initCloseModalAction: function( anElementId, targetPopId ) {
                          $(anElementId).observe( 'click',
                                  this.handleCloseBtnClick.bindAsEventListener( this, targetPopId ) );
                      }
} );

/****************************/
/*  END CLASS ServicesPage  */
/****************************/

/************************/
/*  CLASS TeamPage     */
/************************/
var TeamPage = Class.create({
initialize: function( strHistItems ) {
this.histItems = strHistItems; //the className attached to all elements whose history should be tracked.
this.members  = {
"mainBgNorm":"27px 63px",
"subBgShift":-100,
"smPathBaseOffset":86,
"smPathBgShift":150,
"jobs":    { "src":"jobs" },
"bound1":  { "src":"teamProj1v1",  "proj":1, "mainBgHover":"27px -399px"  },
"bound2":  { "src":"teamProj2v1",  "proj":2,  "mainBgHover":"27px -799px"  },
"bound3":  { "src":"teamProj3v1",  "proj":3,  "mainBgHover":"27px -1199px" },
"bound4":  { "src":"teamProj4v1",  "proj":4,  "mainBgHover":"27px -1599px" },
"bound5":  { "src":"teamProj5v1",  "proj":5,  "mainBgHover":"27px -1999px" },
"bound6":  { "src":"teamProj6v1",  "proj":6,  "mainBgHover":"27px -2399px" },
"bound7":  { "src":"teamProj7v1",  "proj":7,  "mainBgHover":"27px -2799px" },
"bound8":  { "src":"teamProj8v1",  "proj":8,  "mainBgHover":"27px -3199px" },
"bound9":  { "src":"teamProj9v1",  "proj":9,  "mainBgHover":"27px -3599px" },
"bound10": { "src":"teamProj10v1", "proj":10, "mainBgHover":"27px -3999px" }
};
this.ulEGM = undefined;
this.urEGM = undefined;
this.llEGM = undefined;
},

initUI: function() {
            var controlled = this.urEGM.getControlledElements();
            var i, item;
            for( i=0; i<controlled.length; i++ ) {
                item = controlled[i];
                if ( item.tagName === "A" ) { //only set observers on the <a> elements
                    item.observe( 'mouseover', this.rtNavMouseover.bindAsEventListener( this, item ) );
                    item.observe( 'mouseout', this.rtNavMouseout.bindAsEventListener( this, item ) );
                }
            }
            controlled = this.ulEGM.getControlledElements();
            for( i=0; i<controlled.length; i++ ) {
                item = controlled[i];
                item.observe( 'mouseover', this.mapMouseover.bindAsEventListener( this, item ) );
                item.observe( 'mouseout', this.mapMouseout.bindAsEventListener( this, item ) );
            }
            controlled = this.llEGM.getControlledElements();
            for( i=0; i<controlled.length; i++ ) {
                item = controlled[i];
                if ( item.tagName === "A" ) {
                    item.observe( 'mouseover', this.llMouseover.bindAsEventListener( this, item ) );
                    item.observe( 'mouseout', this.llMouseout.bindAsEventListener( this, item ) );
                }
            }
        },

setULegm: function( objElementManagerGroup ) { this.ulEGM = objElementManagerGroup; },
    getULegm: function() { return this.ulEGM; },
    setURegm: function( objElementManagerGroup ) { this.urEGM = objElementManagerGroup; },
    getURegm: function() { return this.urEGM; },
    setLLegm: function( objElementManagerGroup ) { this.llEGM = objElementManagerGroup; },
    getLLegm: function() { return this.llEGM; },

    rtNavMouseover: function( evt, anElement ) {
        evt.stop();
        var e = anElement;
        var boundClassName = e.getClassName( "bound" );
        // do the rightnav
        this.urEGM.setGroupToOperateOn( null, boundClassName );
        this.urEGM.setToHoverState( this.urEGM.getGroupToOperateOn() );
    },

rtNavMouseout: function( evt, anElement ) {
                   if ( evt ) { evt.stop(); }
                   var e = anElement;
                   /* if itm is a member of curOnGroup, then return. This is how we ignore
                      a click on an element that is in the "on" state */
                   if ( this.urEGM.getCurOnGroup() && this.urEGM.isCurOnGroupMember( e ) ) {
                       return;
                   }
                   // do the rightnav
                   this.urEGM.setGroupToOperateOn( e, null );
                   this.urEGM.setToNormalState( this.urEGM.getGroupToOperateOn() );
               },

mapMouseover: function( evt, anElement ) {
                  evt.stop();
                  var e = anElement;
                  var boundClassName = e.getClassName( "bound" );
                  // do the rightnav
                  this.urEGM.setGroupToOperateOn( null, boundClassName );
                  this.urEGM.setToHoverState( this.urEGM.getGroupToOperateOn() );
              },

mapMouseout: function( evt, anElement ) {
                 evt.stop();
                 if ( YUH.getCurrentState( "subnav" ) === "default" ) {
                     var e = anElement;
                     // do the rightnav
                     this.urEGM.setGroupToOperateOn( e, null );
                     this.urEGM.setToNormalState( this.urEGM.getGroupToOperateOn() );
                 }
             },

llMouseover: function( evt, anElement ) {
                 evt.stop();
                 this.llEGM.setGroupToOperateOn( anElement, null );
                 this.llEGM.setToHoverState( this.llEGM.getGroupToOperateOn() );
             },

llMouseout: function( evt, anElement ) {
                this.llEGM.setGroupToOperateOn( anElement, null );
                this.llEGM.setToNormalState( this.llEGM.getGroupToOperateOn() );
            },

resetBg: function() { },

    /* @param target - the target element, and yes, it should be an element, not a string
       @param intMult - multiplier for how far to shift the spite */
    shiftSmPathSprite: function( target, intMult ) {
        // projects are numbered starting from 1, but we need to start from zero to move the sprite properly.
        var mult = intMult - 1;
        var y = mult * this.members.smPathBgShift + this.members.smPathBaseOffset;
        target.setStyle( {backgroundPosition:"0px -" + y + "px"} );
    }
});
/************************/
/*  END CLASS TeamPage  */
/************************/

/***************************/
/*  CLASS ContactPage      */
/***************************/
var ContactPage = Class.create( {
initialize: function( strHistItems, contactFormId ) {
this.histItems = strHistItems;
this.llEGM = undefined;
this.ulEGM = undefined;
this.contactForm = $( contactFormId );
this.query = $H( document.location.href.toQueryParams() );
},

initUI: function() {
var controlled = this.llEGM.getControlledElements();
var i, item;
for( i=0; i<controlled.length; i++ ) {
item = controlled[i];
item.observe( 'mouseover', this.llMouseover.bindAsEventListener( this, item ) );
item.observe( 'mouseout', this.llMouseout.bindAsEventListener( this, item ) );
}
},

setULegm: function( objElementManagerGroup ) { this.ulEGM = objElementManagerGroup; },
getULegm: function() { return this.ulEGM; },
    setLLegm: function( objElementManagerGroup ) { this.llEGM = objElementManagerGroup; },
    getLLegm: function() { return this.llEGM; },

    llMouseover: function( evt, anElement ) {
        evt.stop();
        this.llEGM.setGroupToOperateOn( anElement, null );
        this.llEGM.setToHoverState( this.llEGM.getGroupToOperateOn() );
    },

llMouseout: function( evt, anElement ) {
                this.llEGM.setGroupToOperateOn( anElement, null );
                this.llEGM.setToNormalState( this.llEGM.getGroupToOperateOn() );
            },

sbmtOverOut: function( evt ) {
                 t = evt.element();
                 if ( t.hasClassName( "off" ) ) {
                     t.removeClassName( "off" );
                     t.addClassName( "on" );
                 } else {
                     t.removeClassName( "on" );
                     t.addClassName( "off" );
                 }
             },

handleFormErrors: function( form, rules ) {
                      /* First, clear out any messages that might have been in place. */
                      $('nameMessage').innerHTML = "";
                      $('emailMessage').innerHTML = "";
                      rules.each( function( item ) {
                              /* item is the element on which an error occurred. Grab the appropriate
                               * <span> and stick the message in it. */
                              $( item[0].readAttribute( "name" ) + "Message" ).insert( item[1] );
                              } );
                      return (rules.length === 0) ? true : false;
                  },

tickFormCheckboxes: function() {
                        this.query.each( function( pair ) {
                                var v = pair.value;
                                if ( pair.value === "true" ) {
                                var k = pair.key;
                                $( pair.key ).writeAttribute( "checked", "checked" );
                                }
                                } );
                    }
} );
/***************************/
/*  END CLASS ContactPage  */
/***************************/

function updateNonHistoryActionables( arrElements ) {
    var i, id;
    for ( i=0; i<arrElements.length; i++ ) {
        var cur = arrElements[i];
        id = cur.id;
        //set up pagination for Work View 1 if necessary
        if ( cur.id == "workProjLeftCol" && cur.hasClassName('hasBg') ) {
            cur.setStyle( {cursor:"pointer"} );
            cur.observe( 'mouseover', toggleTxtColHover.bindAsEventListener( this, cur, 0, true ) );
            cur.observe( 'mouseout', toggleTxtColHover.bindAsEventListener( this, cur, 0, false ) );
            cur.observe( 'click', doTxtSlide.bindAsEventListener( this ) );
        }
        if ( nav.pageId == "services" && YUH.getCurrentState("subnav") !== "default" ) { //in Services but not on servicesMain
            var right0 = $("right0");
            if ( right0.hasClassName( "nextPage" ) ) {
                $("right0").observe( 'click', theShifter.shiftServicesText.bindAsEventListener( this, theShifter ) );
                $("left1").observe( 'click', theShifter.shiftServicesText.bindAsEventListener( this, theShifter ) );
            }
            //set up pagination for Services
            if ( cur.hasClassName( 'nextPage' ) || cur.hasClassName( 'prevPage' ) ) {
                cur.observe( 'mouseover', toggleTxtColHover.bindAsEventListener( this, cur, -23, true ) );
                cur.observe( 'mouseout', toggleTxtColHover.bindAsEventListener( this, cur, 0, false ) );
            }
        }
        if ( nav.pageId == "team" && getProject() !== -1 ) { // on the Team page but not at the root
            var mult = getProject();
            theTeam.shiftSmPathSprite( cur, mult );
        }
    }
}

/* Given the current state of the page, which project are we looking at right now? */
function getProject() {
    var curState = YUH.getCurrentState("subnav");
    var index1 = curState.lastIndexOf( "j" );
    var index2 = curState.lastIndexOf( "v" );
    if ( index1 == -1 ) {
        return -1;
    } else {
        var curProj = curState.slice( index1+1, index2 );
        return parseInt( curProj, 10 );
    }
}

/*
   @param offset - the sprite offset is 300, but you can specify another
   offset to be combined with the normal 0px 300px to
   use the sprite in containers with smaller heights
 */
function toggleTxtColHover( fromCaller, elm, offset, isHover ) {
    var hoveredOn = elm;
    var target = undefined;
    var goLtOffset = offset;
    var goRtOffset = -300 + offset;
    if ( hoveredOn.hasClassName( 'hasBg' ) ) {
        target = hoveredOn;
    } else { //go up until we find it.
        var walker = hoveredOn;
        do {
            walker = walker.up();
        } while ( !walker.hasClassName( 'hasBg' ) );
        target = walker;
    }
    if ( isHover ) {
        if ( hoveredOn.hasClassName('prevPage') ) {
            target.setStyle( {backgroundPosition:"0px "+goLtOffset+"px"} );
        } else {
            target.setStyle( {backgroundPosition:"0px "+goRtOffset+"px"} );
        }
    } else {
        target.setStyle( {backgroundPosition:"-1000px 0px"} );
    }
}

/*
   @anElement - the element that has the pagination dots as a bg image
   @boolDir - 0 means left dot dark, 1 mean right dot dark.
   @offsetX - how much to adjust the sprite in the x-direction
   @offsetY - " y-direction

   Coords relative to the sprite are: normal at (0,0); hover at (0,-120)
 */
function toggleDots( anElement, boolDir ) {
    var e = $(anElement);
    if ( boolDir ) {
        if ( e.hasClassName( "pageOne" ) ) {
            e.removeClassName( "pageOne" );
        }
        e.addClassName( "pageTwo" );
    } else {
        if ( e.hasClassName( "pageTwo" ) ) {
            e.removeClassName( "pageTwo" );
        }
        e.addClassName( "pageOne" );
    }
}

/***********************
  YUI ANIMATIONS
 ***********************/
function doTxtSlide( fromCaller ) {
    var evt = fromCaller;
    var target = evt.element();
    if ( !target.hasClassName('hasBg') ) {
        do {
            target = target.up();
        } while ( !target.hasClassName('hasBg') );
    }
    var goRtAttributes = { points: { by: [-355, 0] } };
    var goLtAttributes = { points: { by: [355, 0] } };
    var bgContainer = $('workProjLeftCol');
    bgContainer.setStyle( {backgroundPosition:"-1000px 0px"} );
    if ( target.hasClassName('nextPage') ) {
        var goRt = new YAHOO.util.Motion('txtContainer', goRtAttributes);
        goRt.animate();
        toggleDots( $('projTitlev1'), true );
        bgContainer.removeClassName( 'nextPage' );
        bgContainer.addClassName( 'prevPage' );
        $('projTitlev1').removeClassName('pageOne');
        $('projTitlev1').addClassName('pageTwo');
    } else if ( target.hasClassName('prevPage') ) {
        var goLt = new YAHOO.util.Motion('txtContainer', goLtAttributes);
        goLt.animate();
        toggleDots( $('projTitlev1'), false );
        bgContainer.removeClassName( 'prevPage' );
        bgContainer.addClassName( 'nextPage' );
        $('projTitlev1').removeClassName('pageTwo');
        $('projTitlev1').addClassName('pageOne');
    } else {
        alert( "Runtime error in doTxtSlide()" );
    }
}

/***********************/
/*  END YUI ANIMATIONS */
/***********************/

/***********************/
/*  CLASS GEO          */
/***********************/
/* Graceful E-Mail Obfuscation - JavaScript function (decodes e-mail
   addresses)
   Last updated: July 31th, 2007 by Roel Van Gils
Modified: October 6, 2008 by Ryan Brown - Now it's stand-alone
Javascript. I removed the portions that were orginally modified by PHP
before serving. Those lines are still in the code, but commented out. */
var Geo = Class.create( {
initialize: function() {
this.rot13 = true;
//var tooltip_js_on = '<?=urldecode(stripslashes($_GET['tooltip_js_on']))?>';
this.tooltip_js_on = 'Send e-mail.';
//var tooltip_js_off = '<?=urldecode(stripslashes($_GET['tooltip_js_off']))?>';
this.tooltip_js_off = 'To reveal this e-mail address, you\'ll need to answer a simple question.';
this.map = this.rot13init();
},

// function to recompose the orginal address
geo_decode: function( anAelement ) {
var href = anAelement.readAttribute('href');
var address = href.replace(/.*contact\/([a-z0-9._%-]+)\+([a-z0-9._%-]+)\+([a-z.]+)/i, '$1' + '@' + '$2' + '.' + '$3');
var linktext = anAelement.innerHTML; // IE Fix
if (href !== address) {
// Add mailto link
anAelement.writeAttribute( {'href':'mailto:' + (this.rot13 ? this.str_rot13( address, this.map ) : address)} );
//IE Fix
anAelement.innerHTML = linktext;
}
},

    // Decode links when clicked
emailClick: function( evt, anElement ) {
                this.geo_decode( anElement );
            },

emailMouseover: function( evt, anElement ) {
                    /* don't show tooltips
                       if ( anElement.readAttribute( 'title' ) == this.tooltip_js_off ) { // Set custom tooltip if specified
                       anElement.writeAttribute( 'title', this.tooltip_js_on );
                       }
                     */
                    // Encode links when hovered (so that the address appears correctly in the
                    // browser's status bar)
                    this.geo_decode( anElement );
                },

process: function() {
             if ( this.rot13 ) { // Initiate ROT13 only if needed
                 var links = $$('a'); // Get all anchors
                 for ( var l=0; l<links.length; l++ ) { // Loop through the anchors
                     var item = links[l];
                     item.observe( 'click', this.emailClick.bindAsEventListener( this, item ) );
                     item.observe( 'mouseover', this.emailMouseover.bindAsEventListener( this, item ) );
                 }
             }
         },

rot13init: function() {
               var map = [];
               var s = "abcdefghijklmnopqrstuvwxyz";
               var i;
               for ( i=0; i<s.length; i++ ) {
                   map[s.charAt( i )] = s.charAt( (i+13) % 26 );
               }
               for ( i=0; i<s.length; i++ ) {
                   map[s.charAt(i).toUpperCase()] = s.charAt((i+13)%26).toUpperCase();
               }
               return map;
           },

str_rot13: function( a, map ) {
               var s = "";
               for ( var i=0; i<a.length; i++ ) {
                   var b = a.charAt( i );
                   s += ( b >= 'A' && b <= 'Z' || b >= 'a' && b <= 'z' ? map[b] : b );
               }
               return s;
           }
} );
/***********************/
/*  END CLASS GEO      */
/***********************/
