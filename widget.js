'use strict';
function generate_widget(options) {
  function qs(n) {
    return document.getElementById(n);
  }
  function init() {
    if (typeof options === 'undefined') {
      this.options = { position: {}, name: true, phone: true, email: true }
    } else {
      this.options = options
    }
    this.valid = false;
    this.fields = { name: false, phone: false, email: false };
    this.position = options ? options.position : {};
    this.widget = document.createElement('div');
    this.widget.className = 'widget';
    this.widgetButton = document.createElement('div');
    this.widgetButton.className = 'widget-btn';
    this.widget.innerHTML = widget_open();
    this.widgetButton.innerHTML = widget_button();
    this.render()
  };

  function widget_open() {
    var widget="";
    widget += "<span class=\"widget_close-btn\">✗<\/span>";
    widget += "<h1 class=\"widget_title\">do you want to a callback?<\/h1>";
    widget += "<p class=\"widget_subtitle\">";
    widget += "Please give us your details and we will get back to you.<\/p>";
    widget += "<form><\/form>";

    return widget;
  }
  function widget_button() {
    var button="";
    button += "<div class=\"phone-icon\">";
    button += "<img src=\"phone_icon.svg\" alt=\"call\">";
    button += "<\/div><div class=\"widget-btn_text\">";
    button += "<p>Click here to get a call-back<\/p>";
    button += "<\/div>";
    return button;
  }
  init.prototype.validate = function() {

    function validatePhone(phone) {
      var re = /[^0-9]/;
      return re.test(Number(phone));
    };

    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(String(email).toLowerCase());
    };

    ///console.log(this.fields);

    // this.fields
    var check =true;
    function check_required(fieldname, rules,errormessage) {

      if (rules=="required") {
        //console.log(qs(fieldname));
        if (qs(fieldname).value.trim() === '') {
          check = (check&&false);
          qs(fieldname+'msg').style.display = 'block';
        } else {
          check = (check&&true);
          qs(fieldname+'msg').style.display = 'none';
        };

      }
      else{
      //rules()
      if (rules) {
        check =  (check&&false);
        //console.log(fieldname);
        qs(fieldname+'msg').innerHTML = errormessage;
        qs(fieldname+'msg').style.display = 'block';
      } 
    }

  }

  for ( var property in this.fields ) {
    if (this.options[property]!=false) {
      check_required(property, 'required') 
    }
  }

  //custom validation
  if (this.options.phone) {
    var check_phone = (validatePhone(qs('phone').value.trim()));
    console.log(check_phone);
    check_required("phone",check_phone,"Invalid Phone"); 
  }
  if (this.options.email) {
    check_required("email", validateEmail(qs('email').value.trim()),"Invalid email"); 
  }

    //console.log(check);
    if (check) {
      this.valid = true
    };
  };

  init.prototype.submit = function() {
    var self = this;
    var ENDPOINT = 'http://apilayer.net/api/validate?access_key=5c1f225561f81f36e80881da646e7f8a';
    var makeRequest = function(url, method) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState !== 4) return;
        if (request.status >= 200 && request.status < 300) {
          var res = JSON.parse(request.response);
          res.valid && (document.getElementsByClassName('widget_form-btn')[0].innerHTML = '<p class="success">we will call you back soon, thanks!</p><button type="submit" class="form-btn">call now</button>');
          if (!res.valid) {
            document.getElementsByClassName('widget_form-btn')[0].innerHTML = '<p class="danger">Make sure the phone number is valid!</p><button type="submit" class="form-btn">call now</button>';
            qs('phonemsg').innerHTML = 'Invalid Phone!';
            qs('phonemsg').style.display = 'block';
          }
        } else {
          document.getElementsByClassName('widget_form-btn')[0].innerHTML = '<p class="danger">Make sure the phone number is valid!</p><button type="submit" class="form-btn">call now</button>';
          qs('phonemsg').innerHTML = 'Invalid Phone!';
          qs('phonemsg').style.display = 'block';
          // If failed
          //alert(JSON.stringify(res));
        }
        //alert(JSON.stringify(res));
        var submitButton = document.getElementsByClassName('form-btn')[0];
        submitButton.onclick = function(e) {
          e.preventDefault();
          self.validate();
          if (self.valid) {
            self.submit();
          };
        };
      };
      // Setup our HTTP request
      request.open('GET', url, true);
      // Send the request
      request.send();
    };

    document.getElementsByClassName('widget_form-btn')[0].innerHTML = '<div class="loader"></div>';

    makeRequest(ENDPOINT+'&number='+qs('phone').value.trim())
  }

  init.prototype.renderForm = function() {
    var form = document.getElementsByTagName('form')[0];
    if (!this.options.name && this.options.name !== undefined) {
      form.innerHTML += ''
    } else {
      form .innerHTML += '<div class="form_field"><p id="namemsg" class="emsg">Required!</p><input type="text" id="name" name="name" placeholder="Your Name"></div>'
    }
    if (!this.options.phone && this.options.phone !== undefined) {
      form.innerHTML += ''
    } else {
      form.innerHTML += '<div class="form_field"><p id="phonemsg" class="emsg">Required!</p><input type="text" id="phone" name="phone" placeholder="Phone Number"></div>'
    }
    form.innerHTML += '<div class="form_field"><select name="purpose" id="purpose"><option value="content">I\'m Interested in Content</option><option value="design">I\'m Interested in Design.</option></select></div>'
    if (!this.options.email && this.options.email !== undefined) {
      form.innerHTML += ''
    } else {
      form.innerHTML += '<div class="form_field"><p id="emailmsg" class="emsg">Required!</p><input type="text" id="email" name="email" placeholder="Email"></div>'
    }
    form.innerHTML += '<div class="widget_form-btn"><button type="submit" class="form-btn">call now</button></div>'
  }

  init.prototype.render = function() {
    var self = this;
    if (this.position.vertical=="bottom") {
      this.widget.style.bottom ='10px';
      this.widgetButton.style.bottom='10px';
    }
    if (this.position.horizontal=="right") {
      this.widget.style.right ='40px';
      this.widgetButton.style.right='40px';
    }

    var container = document.getElementsByTagName('body')[0];
    container.appendChild(this.widget);
    container.appendChild(this.widgetButton);
    this.renderForm();
    var closeButton = document.getElementsByClassName('widget_close-btn')[0];
    closeButton.onclick = function(e) {
      e.preventDefault();
      self.widget.style.display = 'none';
      self.widgetButton.style.display = 'block';
    };
    this.widgetButton.onclick = function(e) {
      e.preventDefault();
      self.widget.style.display = 'block';
      self.widgetButton.style.display = 'none';
    };
    var submitButton = document.getElementsByClassName('form-btn')[0];
    submitButton.onclick = function(e) {
      e.preventDefault();
      self.validate();
      if (self.valid) {
        self.submit();
      };
    };
  }
  return new init();
};
