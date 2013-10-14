h7Crop
======

İmage cropper by h7Crop.js ~ Optional movement image cropper
Resize image by buttons or mousewhell

Required
=======
* Jquery js
* h7Crop js

 ```javascript
<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="h7Crop.js"></script>
 ```
Support
======
İ.E7 + and Modern Browser

İnstall
======
 ```javascript
 <script type="text/javascript">
   $(function(){
       $("#cropMe").h7Crop({
           viewPortId:"corpr", // or default
           viewPortW:500, //default **500**
           viewPortH:200, //default **250**
           viewButton:false, //default **true**
           ratio:0.75, //default **1**
           maskImage:"mask.png" //default **null**
       },function(e){
         $("#cropdata").text("x=>"+e.x+"\ny=>"+e.y+"\nw=>"+e.w+"\nh=>"+e.h);
       });
    });
 </script>   
 
<div id="cropdata"></div>
<img src="simple.jpg" id="cropMe" />
 ```
Options & Detail
==============
```
**viewPortId**:"def", **optional** (value or default) viewport id
**viewPortW**: 500, **optional** (value or default 500) viewport width
**viewPortH**: 250, **optional** (value or default 250) viewport height
**ratio**: 1, **optional** (value or default 1) image scale ratio
**viewButton**:true, **optional** (default true or value false) buttons view
**maskImage**:null  **optional** (default null) mask image link
```
Functions Detail
===============
```
function(e){
e.x,
e.y
}
**e** by cordination object have by param x,y,w,h
**x** => image selected x
**y** => image selected y
**w** => image selected width
**h** => image selected height
```
Demo
=====
*[Demo Page](http://rawgithub.com/badyguard14/h7Crop/master/public_html/index.html)

