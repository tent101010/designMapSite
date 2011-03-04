/* Copyright 2008 by MSE-iT / Thomas Maierhofer www.maierhofer.de
 * Licenced under: LGPL http://www.gnu.org/licenses/lgpl.html
 *
 */



( function( $ ) {
  $.fn.backgroundCanvas = function() {
    $( this ).each( function() {
      var $this = $(this);
      // JQuery Browser version fix for IE6 & IE7 detection
      $.browser.version = $.browser.msie && parseInt($.browser.version) == 6 && window["XMLHttpRequest"] ? "7.0" : $.browser.version;
      // Remove background and border color so that canvas can be seen.
      $this.css("background-color","transparent");
      $this.css("border-color","transparent");
      // The borders are needed to offset the canvas object           
      var borderTop = $this.css("border-top-width");
      var borderLeft = $this.css("border-bottom-width");
      // the padding must be transfered to the content DIV
      var paddingTop = $this.css("padding-top");
      var paddingBottom = $this.css("padding-bottom");
      var paddingLeft = $this.css("padding-left");
      var paddingRight = $this.css("padding-right");
      $this.css("padding-top","0px");
      $this.css("padding-bottom","0px");
      $this.css("padding-left","0px");
      $this.css("padding-right","0px");
      $this.wrapInner('<div class="jbgContentDiv" style="width:auto; height:auto; border: 0px transparent solid; display:block; position:relative; z-index:2;"><\/div>');
      var $content = $this.children(".jbgContentDiv");
      $content.css("padding-top",paddingTop);
      $content.css("padding-bottom",paddingBottom);
      $content.css("padding-left",paddingLeft);
      $content.css("padding-right",paddingRight);
      
      if( $.browser.msie ) {
        alert( "borderTop: " + borderTop );
        alert( "borderLeft: " + borderLeft );
        var divElement = document.createElement('div');
        divElement.className = "jbgCanvasDiv";
        divElement.style.position = "relative";
        divElement.style.display = "block";                 
        divElement.style.height = "0px";
        divElement.style.width = "0px";
        divElement.style.top = "-" + borderTop;
        divElement.style.left = "-" +borderLeft;
        divElement.setAttribute("z-index", "0"); 
        var canvasElement = document.createElement('canvas');
        canvasElement.className = "jbgCanvas";
        canvasElement.style.height = "0px";
        canvasElement.style.width = "0px";
        canvasElement.setAttribute("z-index", "-1");
        canvasElement = G_vmlCanvasManager.initElement(canvasElement);
        $this.get(0).insertBefore(divElement,$this.get(0).firstChild);
        divElement.appendChild(canvasElement);
      } else {
        $this.prepend('<div class="jbgCanvasDiv" style="display:block; position:relative;' + ' top:-'+borderTop+'; left:-'+borderLeft+'; width:0px; height:0px;  z-index:0;">' + '<canvas class="jbgCanvas" style="width:0px; height:0px; z-index:-1;" ></canvas></div>');
      }
    } );
    return this;
   };
   
   $.fn.backgroundCanvasPaint = function( paintFkt ) {
     $(this).each( function() {
           var $this = $(this);
            var $canvasDiv = $this.children(".jbgCanvasDiv");
            var $canvas = $canvasDiv.children(".jbgCanvas");
            var $content = $this.children(".jbgContentDiv");
            if( $canvas.length == 0 )
                return this;
                
            var canvas = $canvas.get(0);
        
            
                
           if( $.browser.msie )   // Internet Explorer ignores bounding divs -> With/Height 0/0 is applicable, other browsers must adjust bounding elements 
           {     
                if( parseInt(jQuery.browser.version) < 7 ) // IE6 and below
             {
                    $canvas.width('0px');
                    $canvas.height('0px');  
                    $canvasDiv.css("width",'0px');
                    $canvasDiv.css("height",'0px');
                    
                    $canvasDiv.css("margin-bottom",'0px');
                    $canvasDiv.css("margin-right",'0px');
                    
                    $content.css("width",'');
                    $content.css("height",'');
             }
            
            }
            
                                        
            var width = $this.outerWidth();
            var height = $this.outerHeight(); 
            
           if(! $.browser.msie )   // Internet Explorer ignores bounding divs -> With/Height 0/0 is applicable, other browsers must adjust bounding elements 
           {    
                $canvas.width(width +'.4px');
                $canvas.height(height + '.4px');
            }
            else
            {
                if( parseInt(jQuery.browser.version) < 7 )
             {
                   
                    $content.css("width",width+'.4px');
                    $content.css("height",height+'.4px');
                  
                    $canvasDiv.css("margin-bottom",'-'+width+'.4px');
                    $canvasDiv.css("margin-right",'-'+height+'.4px');
                    $canvasDiv.css("width",width+'.4px');
                    $canvasDiv.css("height",height+'.4px');                    
                    
             }
             
            }


            if (canvas.getContext) 
            {
                canvas.width=width;
                canvas.height=height; 

                var ctx = canvas.getContext("2d");
                paintFkt( ctx, width, height, canvas, $canvas, $canvasDiv, $content, $this );

            }
            else
            {
                alert("can't create context")
            } 
                    
        
            
       });
       
        return this;
    };
    


    // Helper functions to paint background elements like rounded rects on canvas
    $.canvasPaint = {
        roundedRect: function( ctx, options ) {
          options = jQuery.extend( {
            width: 0,
            radius: 0,
            border: 0,
            stroke: false,
            fill: true,
            adjustRadius: true
          }, options);
          options = jQuery.extend( {
            x: 0,
            y: 0,
            height: options.width,
            radiusTL: options.radius,
            radiusTR: options.radius,
            radiusBL: options.radius,
            radiusBR: options.radius,
            borderL: options.border,
            borderR: options.border,
            borderT: options.border,
            borderB: options.border
          }, options);            
          /*
            radius = Math.min(radius,height/2);
            radius = Math.min(radius,width/2);
          */
          if ( options.adjustRadius ) {
            options.radiusTL = Math.max( options.radiusTL - ((options.borderT + options.borderL) / 2), 0);
            options.radiusTR = Math.max( options.radiusTR - ((options.borderT + options.borderR) / 2), 0);
            options.radiusBL = Math.max( options.radiusBL - ((options.borderB + options.borderL) / 2), 0);
            options.radiusBR = Math.max( options.radiusBR - ((options.borderB + options.borderR) / 2), 0);
          }
          var x = options.x + options.borderL;
          var y = options.y + options.borderT;
          var width = options.width - options.borderL - options.borderR;
          var height = options.height - options.borderT - options.borderB; 
          var kappaRradiusTL = options.radiusTL * 0.3333;
          var kappaRradiusTR = options.radiusTR * 0.3333;
          var kappaRradiusBL = options.radiusBL * 0.3333;
          var kappaRradiusBR = options.radiusBR * 0.3333;
          ctx.beginPath();
          ctx.moveTo(x,y+ options.radiusTL);              // left top corner
          ctx.lineTo(x,y+height-options.radiusBL);        // left line to bottom  corner
          ctx.bezierCurveTo(x,y+height-kappaRradiusBL, x+kappaRradiusBL,y+height, x+options.radiusBL,y+height); // left lower corner
          ctx.lineTo(x+width-options.radiusBR,y+height); // lower line to right lower corner
          ctx.bezierCurveTo(x+width-kappaRradiusBR,y+height,x+width,y+height-kappaRradiusBR,x+width,y+height-options.radiusBR); // right lower corner
          ctx.lineTo(x+width,y+options.radiusTR); // right line to upper corner
          ctx.bezierCurveTo(x+width,y+kappaRradiusTR,x+width-kappaRradiusTR,y,x+width-options.radiusTR,y); // right upper corner
          ctx.lineTo(x+options.radiusTL,y); // top line to left corner
          ctx.bezierCurveTo(x+kappaRradiusTL,y,x,y+kappaRradiusTL,x,y+options.radiusTL); // left upper corner
          if ( options.stroke ) ctx.stroke();
          if ( options.fill ) ctx.fill();
        },
        
        // draws a tab with round corners 
        roundTab: function(ctx,options){
            options = jQuery.extend({
             x: 0,
             y: 0,
             width: 0,
             radiusLeft: 0,
             radiusRight: 0,
             bottomRadiusLeft: 0,
             bottomRadiusRight: 0,
             offsetLeft: 0,
             offsetRight: 0,
             border: 0,
             stroke: false,
             fill: true,
             adjustRadius: true
            }, options);
            options = jQuery.extend({
             height: options.width
            }, options);
            /*
            radius = Math.min(radius,height/2);
            radius = Math.min(radius,width/2);
            */
            if ( options.adjustRadius ) {
                 options.radiusLeft = options.radiusLeft - options.border;
                 options.radiusRight = options.radiusRight - options.border;
                 options.bottomRadiusLeft = options.bottomRadiusLeft - options.border;
                 options.bottomRadiusRight = options.bottomRadiusRight - options.border;
            }
            var x = options.x + options.border;
            var y = options.y + options.border;
            var width = options.width - options.border - options.border;
            var height = options.height - options.border;
            var hypoLeft = Math.sqrt( (height * height) + (options.offsetLeft * options.offsetLeft) );
            var hypoRight = Math.sqrt( (height * height) + (options.offsetRight * options.offsetRight) );
            ctx.beginPath();
            // Connection Point calc.
            // ctx.moveTo(x,y+height); // Lower right corner

            var xRadius = ( options.radiusLeft * options.offsetLeft ) / hypoLeft;
            var yRadius = ( options.radiusLeft * height ) / hypoLeft;
            var kappaRadius = options.radiusLeft * 0.3333;
            var kappaXRadius = xRadius * 0.3333;
            var kappaYRadius = yRadius * 0.3333;            
            ctx.moveTo(x + options.offsetLeft - xRadius,y + yRadius ); // left line
            ctx.bezierCurveTo(x + options.offsetLeft - kappaXRadius,y + kappaYRadius,    x + options.offsetLeft + kappaRadius,y,     x + options.offsetLeft + options.radiusLeft,y); // Left upper radius
            var xRadius = ( options.radiusRight * options.offsetRight ) / hypoRight;
            var yRadius = ( options.radiusRight * height ) / hypoRight;
            var kappaRadius = options.radiusRight * 0.3333;
            var kappaXRadius = xRadius * 0.3333;
            var kappaYRadius = yRadius * 0.3333;             
            ctx.lineTo(x + width  - options.offsetRight - options.radiusRight,y); // top line       
            ctx.bezierCurveTo(x + width  - options.offsetRight - kappaRadius,y,
                x + width  - options.offsetRight + kappaXRadius,y + kappaYRadius,
                x + width  - options.offsetRight + xRadius,y + yRadius); // Right upper radius 
           

            
            
            var xRadius = ( options.bottomRadiusRight * options.offsetRight ) / hypoRight;
            var yRadius = ( options.bottomRadiusRight * height ) / hypoRight;
            var kappaRadius = options.bottomRadiusRight * 0.3333;
            var kappaXRadius = xRadius * 0.3333;
            var kappaYRadius = yRadius * 0.3333;               
            
            ctx.lineTo(x + width - xRadius, y+height - yRadius); // right line
            ctx.bezierCurveTo(x + width  - kappaXRadius, y+height - kappaYRadius,
                x + width +  kappaRadius, y+height,
                x + width +  options.bottomRadiusRight, y+height); // right lower radius
                
            var xRadius = ( options.bottomRadiusLeft * options.offsetLeft ) / hypoLeft;
            var yRadius = ( options.bottomRadiusLeft * height ) / hypoLeft;
            var kappaRadius = options.bottomRadiusLeft * 0.3333;
            var kappaXRadius = xRadius * 0.3333;
            var kappaYRadius = yRadius * 0.3333;               
                                
                
            ctx.lineTo(x - options.bottomRadiusLeft,y+height); // Lower right corner               

            ctx.bezierCurveTo(x - kappaRadius, y+height,
                x + kappaXRadius, y+height-kappaYRadius,
                x + xRadius, y+height-yRadius ); // left lower radius
          
            if( options.stroke )
                ctx.stroke();
                
            if( options.fill )
                ctx.fill();
        }


    };

})(jQuery)