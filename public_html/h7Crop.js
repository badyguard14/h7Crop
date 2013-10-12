(function($) {

    $.fn.h7Crop = function(options, func) {
        var $me = $(this);
        var defaults = {
            viewPortId: ((new Date().getTime().toString())),
            viewPortW: 500,
            viewPortH: 250,
            ratio: 1,
            maxLeftImage: 0,
            maxTopImage: 0,
            viewButton:true,
            maskImage:null
        };
        var options = $.extend(defaults, options);
        var _ViewPort = null, _BtnPlus = null, _BtnMinus = null;
        var _orginalWidth=null,_maxLeftImage=null,_maxTopImage=null,_x=0,_y=0;
        var _cordinates={x:null,y:null,w:null,h:null};
        var _fakeImg = new Image();
        _fakeImg.src = $me.attr("src");
       
        if (navigator.userAgent.match(/MSIE 7.0/i) || navigator.userAgent.match(/MSIE 8.0/i))
        {
            if (_fakeImg.complete){
               if(_fakeImg.width<options.viewPortW || _fakeImg.height<options.viewPortH){
                   alert("Your image natural size can't be small than viewPort size!")
               }else{
                _wrapMe();
                _calCord();
                }
            }           
        } else {
            _fakeImg.onload = function() {
               if(_fakeImg.width<options.viewPortW || _fakeImg.height<options.viewPortH){
                   alert("Your image natural size can't be small than viewPort size!")
               }else{
                _wrapMe();
                _calCord();
                }
            }
        }

        function _wrapMe() {
            $me.wrap("<div id='h7CropPort-" + options.viewPortId + "' style='cursor:move;position:relative;padding:0;margin:5px;overflow:hidden;width:" + options.viewPortW + "px;height:" + options.viewPortH + "px;'></div>");
            _setStyle();
            _ViewPort = $("#h7CropPort-" + options.viewPortId);
            _createMask();
            options.viewButton ?  _createButtons() : "";
            _actions();
        
        }
       
        function _setStyle(){
            $me.css({
                "width":_fakeImg.width,
                "height":_fakeImg.height,
                "left":-(_fakeImg.width-options.viewPortW)/2,
                "top":-(_fakeImg.height-options.viewPortH)/2,
                "position":"absolute",
                "border":0,
                "cursor":"move"
            });
            _orginalWidth=_fakeImg.width;
            _maxLeftImage=_fakeImg.width-options.viewPortW;
            _maxTopImage=_fakeImg.height-options.viewPortH;
        }
       
        function _createMask() {
           var def=options.maskImage!=null ? "background:url("+options.maskImage+") no-repeat;" : "background:#fff;opacity:0;filter:alpha(opacity=0);";
            _ViewPort.append("<div style='cursor:move;"+def+"position:absolute;left:0;top:0;\n\
            \n\
            width:" + options.viewPortW + "px;height:" + options.viewPortH + "px;'></div>");
        }
        
        function _actions(){
            _ViewPort.mousedown(function(){
                $(document).mousemove(function(e){
                    var xMove,yMove;
                    if (_x == e.pageX || _x == 0) {
                        _x = e.pageX;
                    } else {
                        xMove = e.pageX - _x;
                        _x = e.pageX;
                    }

                    if (_y == e.pageY || _y == 0) {
                        _y = e.pageY;
                    } else {
                        yMove = e.pageY - _y;
                        _y = e.pageY;
                    }
                    //left movement
                    var left = parseFloat($me.css("left")) + xMove;
                    var min_left = 0;
                    var max_left = -_maxLeftImage;

                    if (left >= min_left) left = min_left;
                    if (left <= max_left) left = max_left;
                    $me.css("left", left);
                    //top movement
                    var top = parseFloat($me.css("top")) + yMove;
                    var min_top = 0;
                    var max_top = -_maxTopImage;

                    if (top >= min_top) top = min_top;
                    if (top <= max_top) top = max_top;
                    $me.css("top", top);
                    _calCord();
                });
            });
            $(document).mouseup(function(){
                _x=0;
                _y=0;
                $(document).unbind("mousemove");
            });
            if(options.viewButton){
             _BtnPlus.click(function(){
                    _zoomIn();
             });
             _BtnMinus.click(function(){
                    _zoomOut();
            });  
            }
         var _port=document.getElementById(_ViewPort.attr("id"));
        if(window.addEventListener)
        _port.addEventListener('DOMMouseScroll', whellon, false);
        //for IE/OPERA etc
        _port.onmousewheel = whellon;
        
            function whellon(event){
                var delta = 0;
                 if (!event) event = window.event;
                // normalize the delta
               if (event.wheelDelta) {
                   // IE and Opera
                   delta = event.wheelDelta / 60;
               } else if (event.detail) {
                   delta = -event.detail / 2;
               }
               if(delta>0){_zoomIn();}else{_zoomOut();}
            }
        
        }
        
        function _zoomIn(){
            var nowWidth=$me.width();
               var nowHeight=$me.height();
               var per=100/nowWidth;
               var amount=nowHeight*per;
               var newWidth=nowWidth+100;
               var newHeight=nowHeight+amount;
               $me.css({
                   "width":newWidth,
                   "height":newHeight,
                   "image-rendering": '-moz-crisp-edges',
                   "image-rendering": 'auto'
               });
               options.ratio=_orginalWidth/newWidth;
               _maxLeftImage = parseFloat(newWidth - options.viewPortW);
               _maxTopImage = parseFloat(newHeight - options.viewPortH);
                _calCord();
        }
        
        function _zoomOut(){
            var nowWidth=$me.width();
               var nowHeight=$me.height();
               var per=100/nowWidth;
               var amount=nowHeight*per;
               var newWidth=nowWidth-100;
               var newHeight=nowHeight-amount;
               if((newWidth>=options.viewPortW) && (newHeight>=options.viewPortH)){
                       $me.css({
                        "width":newWidth,
                        "height":newHeight,
                        'image-rendering': '-moz-crisp-edges',
                        'image-rendering': 'auto',
                        "left":-60,
                        "top":-60
                    });
                    options.ratio=_orginalWidth/newWidth;
                    _maxLeftImage = parseFloat(newWidth - options.viewPortW);
                    _maxTopImage = parseFloat(newHeight - options.viewPortH);
               }
               if(((newWidth-100)<=options.viewPortW)){
                   $me.css("left",0);
               }
               if(((newHeight-amount)<=options.viewPortH)){
                   $me.css("top",0);
               }
               _calCord();
        }
        
        function _createButtons() {
            _ViewPort.append("<div style='width:" + options.viewPortW + "px;text-align:center;position:absolute;bottom:25px;left:0;'>\n\
        <a href='javascript:;' class='h7CropButton' id='h7CropZoomOut' style='\n\
        border:1px solid #ccc;border-radius:3px;padding:3px 11px;background:#fff;margin:1px;text-decoration:none;\n\
        color:#4a4a4a;'>-</a><a href='javascript:;' class='h7CropButton' id='h7CropZoomIn' style='\n\
        border:1px solid #ccc;border-radius:3px;padding:3px 10px;background:#fff;margin:1px;text-decoration:none;\n\
        color:#4a4a4a;'>+</a><br/></div>");
            _BtnPlus = $("#h7CropZoomIn", _ViewPort);
            _BtnMinus = $("#h7CropZoomOut", _ViewPort);
         }
         
        function _calCord(){
            _cordinates.x=(Math.round(parseFloat($me.css("left")) * -1 * options.ratio));
            _cordinates.y=(Math.round(parseFloat($me.css("top")) * -1 * options.ratio));
            _cordinates.w=(Math.round(options.viewPortW * options.ratio));
            _cordinates.h=(Math.round(options.viewPortH * options.ratio));
            func(_cordinates);
	}
        

    }
})(jQuery);