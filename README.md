# Javascript Widget !
This is javacript widget
Demo https://c0836f24.ngrok.io/

# Setup

 1. Clone https://github.com/sayrahmat41/widget.git
 2. Load CSS and Javascript
  <link rel="stylesheet" href="widget.css">
  <script src="widget.js"></script>
 4. Generate Widget
  <script>
    generate_widget({position: {vertical:"bottom" , horizontal: "right"} ,name: true, phone: true, email: false });
  </script>

## Usage


> generate_widget(options);

Options parameter
 1. position
	position value is array
	position has child vertical and horizontal
	**vertical**
		vertical value is bottom or top
		vertical default value is top
	**horizontal**
		horizontal value is left or right
		vertical default value is left
	example is like this
>   generate_widget({position: {vertical:"bottom" , horizontal: "right"} });
 2. name
	 name value is boolean
example is like this
>   generate_widget({position: {vertical:"bottom" , horizontal: "right"},name : true });
3. phone
	 phone value is boolean
example is like this
>   generate_widget({position: {vertical:"bottom" , horizontal: "right"},name : true, phone:true });
3. email
	 email value is boolean
example is like this
>   generate_widget({position: {vertical:"bottom" , horizontal: "right"},name : true, phone:true,email:false });
