DEMO

http://codepen.io/W_W_/pen/BWJOXv

1. Static HTML

    Put the required stylesheet at the top of your markup:

     <link rel="stylesheet" href="'your_path..'/carousel/css/carousel.style.css">

    Put the script at the bottom of your markup right after jQuery:

     <script src="'your_path..'/carousel/js/carousel.js.js"></script>

2. Usage:
   
    <div class="your-class"></div>

    $(function(){
	   $('.your-class').carousel({
	       imgArr: [] // Add your images here in array. Min. 3 images! Ex. ['"your_path.."/1.jpg','"your_path.."/2.png','"your_path.."/2.png'],
           slideSpeed: // set time duration for moving to next slide in milliseconds.(optional) Ex. 1000
	   });
    });

P.S. You must set the height property to your-class.