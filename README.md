h7Crop
======

İmage cropper by h7Crop.js ~ Optional movement image cropper

Required
=======
* Jquery js
* h7Crop js

 ```javascript
<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="h7Crop.js"></script>
 ```

İnstall
======
 ```javascript
    $(function(){
       $("#cropMe").h7Crop({
           viewPortId:"corpr", // or default
           viewPortW:500, //default **500**
           viewPortH:200, //default **250**
           viewButton:false, //default **true**
           ratio:0.75, //default **1**
           maskImage:"mask.png" //default **null**
       });
    });
    
    <img src="simple.jpg" id="cropMe" />
 ```
