  //alert('masterImage running');

  //console.log("snakes running");
  /********************************************************************************************************

  //dependencies
  JQuery
  JQueryMobile




  *********************************************************************************************************/

  function masterImage(mstrObj){
   //Image Tool Kit
   //console.log("in the pit");
   //properties
   //required

   if(mstrObj == undefined){alert("canvas object parameter is not defined."); return;}
   if(mstrObj.home == undefined){alert("canvas object needs \"home:'container id string'\"."); return;}
   var home = mstrObj.home;

   var iUN = mstrObj.iUN || Math.round(Math.random() * 10000);//see iUN get and set
   var canvas_type = mstrObj.type || "thumbnail";//NOTE may not need #remove
   var canvas_mode = mstrObj.mode || "default";//NOTE may not need #remove


   //at 100 x100 or 50 x50 the image is adjusted perfectly
   //100 x 80 the image is stretched
   //NOTE image 4:3 aspect ratio multiply by 3/4ths or .75
   var type_str = (canvas_mode != "default") ? canvas_type + "_" + canvas_mode : canvas_type;

   //used to set the various canvas default dimensions (if they arent manually entered)
   switch(type_str)
   {
     case "thumbnail":
       var default_width = 50;
       var default_height =  50;
     break;

     case "profile":
       var default_width = 100;
       var default_height = 100;
     break;

     case "profile_edit":
       var default_width = 200;
       var default_height = 200;
     break;

     case "image":
       var default_width = 100;
       var default_height = 75;
     break;
   }//end switch




   var canvas_width = mstrObj.width || default_width;
   var canvas_height = mstrObj.height || default_height;


   //HTML generated variable
   //window['CANVAS_IMG_URL'] = "<?php echo JUri::root(); ?>components/com_arc/xfiles/images/";
   var img_default = window['ARC_IMG_URL'] + "flame.png";

   //properties
   var canvas = "";
   var context_obj = "";
   var action = mstrObj.action || "";
   var prefix = mstrObj.varName || "masImg";//get set
   var fill_content = "";
   //console.log(display);
   var custom_class = "";
   var add_to_class = "false";
   var custom_id = "";
   var id_type = "default";
   var first_run = "true";
   var sli_ctrl_inputA = "";
   var	sli_ctrl_inputB = "";
   var mousedown =  false;
   var last_panel_clicked_id = "";//remove
   var last_x = "default";
   var last_y = "default";
   var offset_x = 0;
   var offset_y = 0;
   var img_label = "default";
   var slide_limit = 500;
   //var display_size = "default";

   var img_url = (mstrObj != undefined && mstrObj.url != undefined) ? mstrObj.url : img_default;

   //obj_globals
   var src_x = 0;
   var src_y = 5;
   var img_w = 500;
   var img_h = 500;
   var can_x = 0;
   var can_y = 0;
   var can_w = canvas_width;
   var can_h = canvas_height;

   //NOTE I don't need this. won't be saving this to local storage #remove
   /*try{
   if(localStorage != undefined && localStorage.canvas_tutorial != undefined && localStorage.canvas_tutorial != "")
   {
     var local_str = localStorage.canvas_tutorial;
     var local_ary = local_str.split(",");
     img_url = local_ary[0];
     src_x = local_ary[1];
     src_y = local_ary[2];
     img_w = local_ary[3];
     img_h = local_ary[4];
     can_x = local_ary[5];
     can_y = local_ary[6];
     can_w = local_ary[7];
     can_h = local_ary[8];
   }//end if
   }catch(e){
     console.log("nope. reload failed.")
   }*/

   var obj_els = {};
   var event_ids = [];


   //methods
   this.setContent = function(sC){fill_content = sC;}//
   this.get_event_ids = function(){return event_ids;}
   this.setCustomClass = function(clsStr,addPar){custom_class = clsStr; add_to_class = addPar || true;/*addPar is nothing yet*/}
   this.setCustomId = function(cId){custom_id = cId; id_type = "custom";}

   var image_object=new Image();


    var create_canvas = function(c_cont){

      var bigDaddy = (document.getElementById(c_cont)) ? document.getElementById(c_cont) : document.getElementsByClassName(c_cont)[0];
       //clears container
     //if(clearHome == "true"){}
       bigDaddy.innerHTML = "";//

       /********************************  Sample Code  *****************************************

       ***************************************************************************************/

             //alert("data object is " + dataObject);
             //gets container


         var add_custom_class = (custom_class != "") ? custom_class  : "";

         canvas = document.createElement("canvas");
         canvas.id = prefix + "_ImgCanvas" + "_" + iUN;

         event_ids.push(canvas.id);

         canvas.className = prefix + "__ImgCanvas" + iUN + " " + prefix + "__ImgCanvas "  + prefix + " ImgCanvas " + add_custom_class;

         if(fill_content != ""){canvas.innerHTML = fill_content;}

         bigDaddy.appendChild(canvas);

         context_obj = canvas.getContext('2d');
         canvas.width = canvas_width;
         canvas.height = canvas_height;

    }//end create_preview

   var draw_me = function() {

      //console.log("draw running");

     //clear the canvas
     //canvas.width = canvas.width;

           if (canvas.getContext) {

             image_object.onload=function(){

             //needs this to keep drawing movements smooth
             canvas.width = canvas_width;
             canvas.height = canvas_height;

             context_obj.drawImage(image_object, src_x, src_y, img_w, img_h, can_x, can_y, can_w, can_h);
             //console.log("image_object",image_object);//try here

             }//end onload//


             image_object.src=img_url;
             //console.log("image_object",image_object);//nothing to run yet here so its ""
             //var dataURL = canvas.toDataURL("image/png");
             //console.log("image_object height = ",image_object.height);
           }//end if


       }//end draw_me

       var canvas_editor = function()
       {



       }//end canvas_editor


       this.display = function(){
         switch(canvas_mode)
         {
           case "edit":
             //prep edit elements that add canvas
             control_panel();
             //draw it
             draw_me();
           break;

           default:
             create_canvas(home);
             draw_me();
           break;

         }//end switch
       }//end display


       /********************************   SCRAP SECTION BELOW   ****************************************/

       //NOTE i don't need this panel array - i will need a btn array in its place.
       var ctrl_ary = [
       {
       "label":"POSIION",
       "contents":"IP",
       "title":"Image Position",
       },
       {
       "label":"SCALE",
       "contents":"IS",
       "title":"Image Scale",
       },
       {
       "label":"BORDERS",
       "contents":"CB",
       "title":"Canvas Borders",
       },
       {
       "label":"BORDER SCALE",
       "contents":"BS",
       "title":"Canvas Border scale",
       },
       {
       "label":"BACKGROUND COLOR",
       "contents":"BC",
       "title":"Background Color",
       },
       {
       "label":"RESET",
       "contents":"RE",
       "title":"Reset All",
       }

       ];//end ctrl_ary

        var size_ary = [
       {
       "label":"XS",
       "contents":"XS",
       "title":"for extra small images",
       "size":"100",
       "scale":"200%",
       "zoom":"5X",
       "limit":"150"
       },{
       "label":"S",
       "contents":"S",
       "title":"for small images",
       "size":"640",
       "scale":"100%",
       "zoom":"4X",
       "limit":"700"
       },
       {
       "label":"M",
       "contents":"M",
       "title":"for medium images",
       "size":"1280",
       "scale":"50%",
       "zoom":"3X",
       "limit":"1330"
       },
       {
       "label":"L",
       "contents":"L",
       "title":"for large images",
       "size":"2560",
       "scale":"25%",
       "zoom":"2X",
       "limit":"2610"
       },
       {
       "label":"XL",
       "contents":"XL",
       "title":"for extra large images",
       "size":"5120",
       "scale":"12.5%",
       "zoom":"1X",
       "limit":"5170"
       }

       ];//end size_ary

       //size_ary.reverse();

     var control_panel = function(){

       //object properties


       //local variables

       //jqm collapsible
       var bigDaddy = document.getElementsByClassName(home)[0];
       //clear the container
       bigDaddy.innerHTML = "";

       var edit_box = document.createElement("div");
       edit_box.id = "edit_box" + iUN;
       edit_box.className = "edit_box" + iUN + " edit_box ";//test_orange
       //collapsible set


       //make the other Stuff

       //edit_sectionB
       var edit_sectionB = document.createElement("div");
       edit_sectionB.id = "edit_sectionB" + iUN;
       edit_sectionB.className = "edit_sectionB" + iUN + " edit_sectionB ";//test_blue

           //canvas_cont
           var canvas_cont = document.createElement("div");
           canvas_cont.id = "canvas_cont" + iUN;
           canvas_cont.className = "canvas_cont" + iUN + " canvas_cont ";//test_purple
 obj_els["edit_home_id"] = canvas_cont.id;



           //edit_slider_box
           var edit_slider_box = document.createElement("div");
           edit_slider_box.id = "edit_slider_box" + iUN;
           edit_slider_box.className = "edit_slider_box" + iUN + " edit_slider_box ";//test_yellow

               //edit_lock_box
               var edit_lock_box = document.createElement("div");
               edit_lock_box.id = "edit_lock_box" + iUN;
               edit_lock_box.className = "edit_lock_box" + iUN + " edit_lock_box test_pink";

                         //edit_lock_box
               var edit_slider_cont = document.createElement("div");
               edit_slider_cont.id = "edit_slider_cont" + iUN;
               edit_slider_cont.className = "edit_slider_cont" + iUN + " edit_slider_cont ";//test_green


           edit_slider_box.appendChild(edit_lock_box);
           edit_slider_box.appendChild(edit_slider_cont);

       edit_sectionB.appendChild(canvas_cont);

                               //edit_resize_box
           var edit_resize_box = document.createElement("div");
           edit_resize_box.id = "edit_resize_box" + iUN;
           edit_resize_box.className = "edit_resize_box" + iUN + " edit_resize_box ";


       //$(".ctrl_cont").addClass("hibernate");
       //$(".col_label").removeClass("hide");
       edit_box.appendChild(edit_resize_box);
       edit_box.appendChild(edit_sectionB);
       edit_box.appendChild(edit_slider_box);

                     //edit_cmd_label
           var edit_cmd_label = document.createElement("div");
           edit_cmd_label.id = "edit_cmd_label" + iUN;
           edit_cmd_label.className = "edit_cmd_label" + iUN + " edit_cmd_label test_orange";


           var ctrl_box = document.createElement("div");
           ctrl_box.id = "ctrl_box" + iUN;
           ctrl_box.className = "ctrl_box" + iUN + " ctrl_box edit_sectionA ";



       edit_box.appendChild(ctrl_box);
       edit_box.appendChild(edit_cmd_label);


       bigDaddy.appendChild(edit_box);




       var test_nbr = 3;
       //content for ctrl_box
       for(var x = 0; x < ctrl_ary.length ; x++){

         var ec_Nm = "edit_ctrl_btn" + x;
         var edit_ctrl_btn = document.createElement("button");
         edit_ctrl_btn.id = "edit_ctrl_btn" + iUN + "_" + x;
         edit_ctrl_btn.className = "edit_ctrl_btn" + iUN + "_"  + x + " edit_ctrl_btn" + x + " edit_ctrl_btn ";
         edit_ctrl_btn.setAttribute("href","#");
         edit_ctrl_btn.dataset.nbr = x;
         edit_ctrl_btn.dataset.contents = ctrl_ary[x].contents;
         edit_ctrl_btn.title = ctrl_ary[x].title;
         //edit_ctrl_btn.innerHTML = "<h5>" + ctrl_ary[x].label + "</h5>";
         obj_els[ec_Nm] = edit_ctrl_btn;

         //helps set up the correct call inside the event listener
         obj_els["contents" + x] = ctrl_ary[x].contents;


         obj_els[ec_Nm].addEventListener("click",function(e){
           //i used this.dataset so it doesn't pass the updated x of the for loop
           //and everything ending up being on click of the last index nbr passed
           e.preventDefault();
           var sNbr = this.dataset.nbr;
           var my_contents = this.dataset.contents
           run_contents(my_contents);
         })//end c_Nm

        ctrl_box.appendChild(edit_ctrl_btn);

       }//end for


       //content for edit_resize_box
        for(var y = 0; y < size_ary.length ; y++){

         var er_Nm = "edit_resize_btn" + y;
         var edit_resize_btn = document.createElement("button");
         edit_resize_btn.id = "edit_resize_btn" + iUN + "_" + y;
         edit_resize_btn.className = "edit_resize_btn" + iUN + "_"   +y + " edit_resize_btn" + y + " edit_resize_btn ";
         edit_resize_btn.setAttribute("href","#");
         edit_resize_btn.dataset.nbr = y;
          edit_resize_btn.dataset.contents = size_ary[y].contents;
         edit_resize_btn.title = size_ary[y].title;
         edit_resize_btn.innerHTML = "<h6>" + size_ary[y].zoom + "</h6>";
         obj_els[er_Nm] = edit_resize_btn;

         //helps set up the correct call inside the event listener
         obj_els["contents" + y] = size_ary[y].contents;


         obj_els[er_Nm].addEventListener("click",function(e){
           //i used this.dataset so it doesn't pass the updated x of the for loop
           //and everything ending up being on click of the last index nbr passed
           e.preventDefault();
           var sNbr = this.dataset.nbr;
           var my_contents = this.dataset.contents
           run_contents(my_contents);
         })//end c_Nm

        edit_resize_box.appendChild(edit_resize_btn);

       }//end for

       create_canvas(obj_els["edit_home_id"]);
       run_contents("IP");

     }//end control_panel



     var run_contents = function(str)
     {
       switch(str)
       {
         case "IP":
           //image position
           add_slider_input(0);
         break;

         case "IS":
           //image scale
           add_slider_input(1);
         break;

         case "CB":
           //canvas border
           add_slider_input(2);
         break;

         case "BS":
           //canvas border scale
           add_slider_input(3);
         break;

         case "BC":

         break;

         case "RE":
           reset_canvas();
         break;

           //resize section
         case "XS":
           reset_canvas();

           img_w = size_ary[0].size;
           img_h = img_w;
           can_w = canvas_width;
           can_h = canvas_width;
           slide_limit = size_ary[0].limit;
           img_label = size_ary[0].label;

           control_panel();
           draw_me();

         break;

         case "S":
           reset_canvas();

           img_w =  size_ary[1].size;
           img_h = img_w;
           can_w = canvas_width;
           can_h = canvas_width;
           slide_limit = size_ary[1].limit;
           img_label = size_ary[1].label;

           control_panel();
           draw_me();
         break;

         case "M":
           reset_canvas();

           img_w =  size_ary[2].size;
           img_h = img_w;
           can_w = canvas_width;
           can_h = canvas_width;
           slide_limit = size_ary[2].limit;
           img_label = size_ary[2].label;

           control_panel();
           draw_me();
         break;

         case "L":
           reset_canvas();

           img_w =  size_ary[3].size;
           img_h = img_w;
           can_w = canvas_width;
           can_h = canvas_width;
           slide_limit = size_ary[3].limit;
           img_label = size_ary[3].label;
           //canvas.width = canvas.width;

           control_panel();
           draw_me();

         break;

         case "XL":
           reset_canvas();

           img_w =  size_ary[4].size;
           img_h = img_w;
           can_w = canvas_width;
           can_h = canvas_width;
           slide_limit = size_ary[4].limit;
           img_label = size_ary[4].label;
           //canvas.width = canvas.width;
           control_panel();
           draw_me();

         break;

       }//end switch

     }//end run_contents

     var reset_canvas = function()
     {
               src_x = 0;
               src_y = 0;
               img_w = 500;
               img_h = 500;
               can_x = 0;
               can_y = 0;
               can_w = canvas_width;
               can_h = canvas_width;
               //canvas.width = canvas.width;
               create_canvas(obj_els["edit_home_id"]);
               draw_me();

     }//end reset_canvas

     //html5 slider research
     //https://codepen.io/collection/DgYaMj/2/
     //http://thenewcode.com/757/Playing-With-The-HTML5-range-Slider-Input
     //http://danielstern.ca/range.css/#/
     //http://www.cssportal.com/style-input-range/


     var add_slider_input = function(nbr)
     {
       var home = document.getElementsByClassName("edit_slider_cont")[0];
       home.innerHTML = "";

             //reset slide input
     sli_ctrl_inputA = "";
     sli_ctrl_inputB = "";

       var styleA = (nbr == 0 || nbr == 1) ? "goofy" : "default";//may need to make this different with html range slider
       var styleB = (nbr == 0 || nbr == 1) ? "default" : "goofy";//reverse for html slider
       var my_limit = (nbr == 0 || nbr == 1) ? slide_limit: canvas_width;//

       //SLIDER A
         var sli_ctrl_contA = document.createElement("div");
         sli_ctrl_contA.id = "sli_ctrl_contA";
         sli_ctrl_contA.className = "sli_ctrl_contA";//

           //input
           /*
             var sli_ctrl_inputA = document.createElement("input");
             sli_ctrl_inputA.id = "sli_ctrl_inputA";
             sli_ctrl_inputA.className = "sli_ctrl_inputA";//
             sli_ctrl_inputA.setAttribute("data-slider-id","sli_ctrl_inputA");//
             sli_ctrl_inputA.setAttribute("data-slider-min","-" + my_limit);//
             sli_ctrl_inputA.setAttribute("data-slider-max",my_limit);//
             sli_ctrl_inputA.setAttribute("data-slider-step","1");//
             var set_valA = slide_data("A",nbr);
             var goof_A = set_valA * -1;//natural opposite effect
             var ctrl_valA = (style == "goofy") ? goof_A : set_valA;
             sli_ctrl_inputA.setAttribute("data-slider-value", ctrl_valA);//
             //sli_ctrl_inputA.setAttribute("data-slider-handle","custom");//ninja stars section
             sli_ctrl_inputA.type = "text";
             sli_ctrl_inputA.onfocus = function(){this.select();}
             */

             sli_ctrl_inputA = document.createElement("input");
             sli_ctrl_inputA.id = "sli_ctrl_inputA";
             sli_ctrl_inputA.className = "sli_ctrl_inputA sli_ctrl_input slider";
             sli_ctrl_inputA.name = "sli_ctrl_inputA";
             //sli_ctrl_inputA.dataset.type = "range";
             sli_ctrl_inputA.type = "range";
             sli_ctrl_inputA.setAttribute("min","-" + my_limit);
             //max changes depending on user access
             //verified server side
             //entered range number can't be greater than db record of your max access
             sli_ctrl_inputA.setAttribute("max",my_limit);
             var set_valA = slide_data("A",nbr);
             var goof_A = set_valA * -1;//natural opposite effect
             var ctrl_valA = (styleA == "goofy") ? goof_A : set_valA;
             sli_ctrl_inputA.setAttribute("value",ctrl_valA);

         sli_ctrl_contA.appendChild(sli_ctrl_inputA);//

             //A onchange function below


             var sli_ctrl_boxA = document.createElement("input");
             sli_ctrl_boxA.id = "sli_ctrl_boxA";
             sli_ctrl_boxA.className = " sli_ctrl_boxA";//
             sli_ctrl_boxA.value = set_valA;//src_x;
             sli_ctrl_boxA.type = "number";
             sli_ctrl_boxA.onfocus = function(){this.select(); }

             sli_ctrl_boxA.oninput = function(){
             sli_ctrl_inputA.value = sli_ctrl_boxA.value;
               slide_data("A",nbr,{"value" :	sli_ctrl_boxA.value, "val_oper": "add"});
               //src_x = sli_ctrl_inputA.value;
               sliderA.setValue();
               draw_me();
             }//end on oninput



           //sli_ctrl_contA.appendChild(sli_ctrl_boxA);

       //END SLIDER A

       //SLIDER B
         var sli_ctrl_contB = document.createElement("div");
         sli_ctrl_contB.id = "sli_ctrl_contB";
         sli_ctrl_contB.className = "sli_ctrl_contB";

           //input
           /*
             var sli_ctrl_inputB = document.createElement("input");
             sli_ctrl_inputB.id = "sli_ctrl_inputB";
             sli_ctrl_inputB.className = "sli_ctrl_inputB";//
             sli_ctrl_inputB.setAttribute("data-slider-id","sli_ctrl_inputB");//
             sli_ctrl_inputB.setAttribute("data-slider-min","-" + my_limit);
             sli_ctrl_inputB.setAttribute("data-slider-max",my_limit);//
             sli_ctrl_inputB.setAttribute("data-slider-step","1");//
             var set_valB = slide_data("B",nbr);
             var goof_B = set_valB * -1;//natural opposite effect
             var ctrl_valB = (style == "goofy") ? goof_B : set_valB;
             sli_ctrl_inputB.setAttribute("data-slider-value",ctrl_valB);
             sli_ctrl_inputB.setAttribute("data-slider-orientation","vertical");
             //sli_ctrl_inputB.setAttribute("data-slider-handle","custom");//ninja stars section
             sli_ctrl_inputB.type = "text";
             sli_ctrl_inputB.onfocus = function(){this.select();}
             */


             sli_ctrl_inputB = document.createElement("input");
             sli_ctrl_inputB.id = "sli_ctrl_inputB";
             sli_ctrl_inputB.className = "sli_ctrl_inputB sli_ctrl_input slider";
             sli_ctrl_inputB.name = "sli_ctrl_inputB";
             //sli_ctrl_inputB.dataset.type = "range";
             sli_ctrl_inputB.type = "range";
             sli_ctrl_inputB.setAttribute("min","-" + my_limit);
             //max changes depending on user access
             //verified server side
             //entered range number can't be greater than db record of your max access
             sli_ctrl_inputB.setAttribute("max",my_limit);
             var set_valB = slide_data("B",nbr);
             var goof_B = set_valB * -1;//natural opposite effect
             var ctrl_valB = (styleB == "goofy") ? goof_B : set_valB;
             sli_ctrl_inputB.setAttribute("value",ctrl_valB);

         sli_ctrl_contB.appendChild(sli_ctrl_inputB);


             //console.info("sli_ctrl_inputB");//
             //console.dir(sli_ctrl_inputB);

             var sli_ctrl_boxB = document.createElement("input");
             sli_ctrl_boxB.id = "sli_ctrl_boxB";
             sli_ctrl_boxB.className = "sli_ctrl_boxB";//
             sli_ctrl_boxB.value = set_valB;//src_y;
             sli_ctrl_boxB.type = "number";
             sli_ctrl_boxB.onfocus = function(){this.select(); }

             //boxB input event
             sli_ctrl_boxB.oninput = function(){
               sli_ctrl_inputB.value = sli_ctrl_boxB.value;
               slide_data("B",nbr,{"value" : 	sli_ctrl_boxB.value, "val_oper": "add"});
               //src_y = sli_ctrl_inputB.value;
               sliderB.setValue();
               draw_me();
             }//end on oninput



           //sli_ctrl_contB.appendChild(sli_ctrl_boxB);

       home.appendChild(sli_ctrl_contA);
       home.appendChild(sli_ctrl_contB);

       /*
       var sliderA = new Slider('#sli_ctrl_inputA', {
         formatter: function(value) {
           return 'Current value: ' + value;
         }
       });//end new slider script

       console.info("sliderA");
       console.dir(sliderA);
       //http://seiyria.com/bootstrap-slider/

       var sliderB = new Slider('#sli_ctrl_inputB', {
         formatter: function(value) {
           return 'Current value: ' + value;
         }
       });//end new slider script
       */

       //$('input').slider();//calls both sliders
       //$('#sli_ctrl_inputA').slider();//
       //$("#lat_slider").on('change',function(){slideUpdate({'mode':gEd_mode,'dir':'lattitude'});});
       //$("#lon_slider").on('change',function(){slideUpdate({'mode':gEd_mode,'dir':'longitude'});});


           //$("#sli_ctrl_contB").on('change',function(){
           sli_ctrl_inputB.oninput = function(e){
             console.log("slider B = ",sli_ctrl_inputB.value);
           image_update({"ltr":"B", "nbr":nbr, "style":styleB, "mode":"motion", "slide_el":sli_ctrl_inputB, "box_el":sli_ctrl_boxB});

           };//end on blur

           //A onchange function
           //$("#sli_ctrl_contA").on('change',function(){
           sli_ctrl_inputA.oninput = function(){
           console.log("slider A = ",sli_ctrl_inputA.value);
           image_update({"ltr":"A", "nbr":nbr, "style":styleA, "mode":"motion", "slide_el":sli_ctrl_inputA, "box_el":sli_ctrl_boxA});

           };//end on blur//
       //http://seiyria.com/bootstrap-slider/

       //END SLIDER B

           canvas_mouse_events("set");

           canvas.onmouseover = function()
           {
             //
             canvas_mouse_events("set");

             window.onmousemove = function(e)
             {

               //console.log(e);
               if(mousedown == true)
               {

               //stops the mouse from hightlighting everyting on the page
               //e.preventDefault();

                 //e.clientX,Y = mouse position in the browser window
                 var y = e.clientY;//this number is a large # like 400 or 600
                 var x = e.clientX;
                 var pos = getMousePos(e)
                 var pos_x = pos.x; //converts to a small number like 37
                 var pos_y = pos.y;


                 if(last_x != "default" && last_x != x)
                 {
                   //i use "default" initially so i can tell if the object
                   //ever moved at all, if never used i set it in the else

                   if(x < last_x)
                   {
                     //then its going right
                     //this if helps me determine which way the mouse is moving

                     //console.log("x is less");
                     //calculate how far away the new mouse position is from the
                     //last mouse position
                     //var new_x = last_x - x;
                     //console.log("new_x = ",new_x);
                     //var cur_val_x = parseInt(sli_ctrl_inputA.value);
                     //sli_ctrl_inputA.value = cur_val_x -  new_x //pos_x;//cur_val_x - 50;

                     //what i need is to calculate how far img is from the
                     //point of origin basically the img_last_x  then i need to
                     //calculate how far the mouse is from that position and
                     //use it as an offset.


                     var cur_val_x = parseInt(sli_ctrl_inputA.value);
                     var new_x = pos_x + offset_x;
                     console.log("new_x = ",new_x);
                     console.log("styleA = ",styleA);
                     //sli_ctrl_inputA.value = new_x;



                   }else
                   {
                     //if it uses this section then its going left
                     //console.log("x is more");
                     //var new_x = x - last_x;
                     //console.log("new_x = ",new_x);
                     //var cur_val_x = parseInt(sli_ctrl_inputA.value);
                     //sli_ctrl_inputA.value = cur_val_x + new_x//pos_x//cur_val_x + 50;

                     var cur_val_x = parseInt(sli_ctrl_inputA.value);
                     var new_x = pos_x + offset_x;
                     console.log("new_x = ",new_x);
                     console.log("styleA = ",styleA);
                     //sli_ctrl_inputA.value =  new_x;

                   }//end else x
                   //console.log("new x val= ",sli_ctrl_inputA.value);
                   if(nbr == 0)
                   {
                     sli_ctrl_inputA.value =  new_x;
                     image_update({"ltr":"A", "nbr":nbr, "style":styleA, "mode":"motion", "slide_el":sli_ctrl_inputA, "box_el":sli_ctrl_boxA});//
                   }else
                   {
                     src_x = new_x * -1;
                     draw_me();
                   }//end else


                 }//end if last_x

                 if(last_y != "default")
                 {
                   //what is important here is whether im above
                   //or below the origin

                   if(y < last_y && last_y != y)
                   {
                     //then its going up
                     //console.log("y is less");
                     //var new_y = last_y - y;
                     //console.log("new_y = ",new_y);
                     //var cur_val_y = parseInt(sli_ctrl_inputB.value);
                     //sli_ctrl_inputB.value = cur_val_y - new_y//pos_y//poscur_val_y - 50;

                     //then its going up
                     var new_y = pos_y + offset_y;

                     //console.log("mm pos_y = ",pos_y);
                     //console.log("mm new_y = ",new_y);
                     //console.log("mm offset_y = ",offset_y);

                     //sli_ctrl_inputB.value = new_y;

                   }else
                   {
                     //console.log("y is more");
                     //var new_y =  y - last_y;
                     //console.log("new_y = ",new_y);
                     //var cur_val_y = parseInt(sli_ctrl_inputB.value);
                     //sli_ctrl_inputB.value = cur_val_y + new_y//pos_y//cur_val_y + 50;
                     //then its going up
                     //console.log("y is less");

                     //var cur_val_y = parseInt(sli_ctrl_inputB.value);
                     //var new_y = pos_y - cur_val_y;
                     var new_y = pos_y + offset_y;

                     //console.log("mm pos_y = ",pos_y);
                     //console.log("mm new_y = ",new_y);
                     //console.log("mm offset_y = ",offset_y);

                     //sli_ctrl_inputB.value = new_y;

                   }//end else x



                   //console.log("new input value = ",sli_ctrl_inputB.value);
                   if(nbr == 0)
                   {
                     sli_ctrl_inputB.value = new_y  * -1;
                     image_update({"ltr":"B", "nbr":nbr, "style":styleB, "mode":"motion", "slide_el":sli_ctrl_inputB, "box_el":sli_ctrl_boxB});
                   }else
                   {
                     //using this without modification creates
                     //and opposite effect during moving.
                     //src_y = new_y;

                     //modify with new_y * -1
                     src_y = new_y * -1;

                     draw_me();
                   }//end else
                 }


                 // i use this the clear the default word and to set the
                 //last move for each subsequent mousemove after it runs the
                 //above processes
                 last_x = x;
                 last_y = y;
                 //console.log("mouse-x = ",x);
                 //console.log("last_x = ",last_x);
                 //console.log("pos_x = ",pos_x);
                 //console.log("pos_y = ",pos_y);

               }else
               {
                 //clear the tracker
                 //last_x = "";
                 //last_y = "";
               }
               //end if

             }//end canvas mousemove
           }//on mouse over

     }//end add_slider_input


     function getMousePos(e) {

     //this section returns the mouse position minus the
     //canvas' top or left window position. "rect"

     var canvas_el = document.getElementById("tutorial");
     var rect = canvas.getBoundingClientRect();

     //console.log("rect.left" + rect.left);

     return {
       x: (e.clientX - rect.left) ,
       y: (e.clientY - rect.top)
     };

   }//- canvas_size/2  - canvas_size/2

   var canvas_mouse_events = function(aVar,cId)
   {

     //this function adds and removes events that affects the canvas
     //once you are outside of the canvas and you let the mouse up
     //this is designed to clear these mouse events from the memory so
     //no event occurs again until you are "mouseover"'d the canvans where
     //which will set up these events again.
     var action = aVar || "remove";
     var canvas_id = cId;
     var canvas_el = document.getElementById(cId);

     if(action == "set"){

           canvas.onmousedown = function(e){
             mousedown = true;
             e.preventDefault();
             var d = new Date();
             //console.log("onmousedown mousedown = ",mousedown);
             //console.log("time = ",d.toLocaleString());
             var pos = getMousePos(e)
             var pos_x = pos.x;
             var pos_y = pos.y;
             //x is dealing with different values so
             //the math is addition not subtraction

             //this offset number has to be
             //permanent not recalculating so it
             //doesn't migrate to another position

             //pos_x - src_x; & pos_y - src_y; produced errant results
             //pos_x/y is always negative - you cant click on other
             //side of origin - so to properly calculate the offset
             //change mouse position read out from the positive int
             //representing the amount of canvas points from the
             //origin to a more accurate negative number representing
             //the actual canvas position
             var act_x = (pos_x * -1);
             var act_y = (pos_y * -1);

             offset_x = act_x - src_x;
             //console.log("md src_x  = ",src_x);
             //console.log("md pos_x  = ",pos_x);
             //console.log("md offset_x  = ",offset_x);



             offset_y = act_y - src_y;
             //console.log("md src_y  = ",src_y);//-214
             //console.log("md pos_y  = ",pos_y);//84.8
             //console.log("md offset_y  = ",offset_y);//298


             //console.log("offset_x  = ",offset_x);
             canvas_mouse_events("set");
                                          }
           //canvas.onmouseover = function(){mousedown = false; console.log("onmouseover mousedown = ",mousedown);}
           //canvas.onmouseout = function(){mousedown = false; console.log("onmouseout mousedown = ",mousedown);}
           window.onmouseup = function()
           {
             mousedown = false;

            }

     }else{
           mousedown = false;
           canvas.onmousedown = "";
           canvas.onmousemove = "";
     }//end else
   }//end canvas_mouse_events

     var image_update = function(mObj){
     //console.info("image update running");

     var style = mObj.style;
     var ltr = mObj.ltr;

     var nbr = mObj.nbr;
     var mode = mObj.mode;//"motion" or not ("input" as other)

     var slide_el = mObj.slide_el;
     var box_el = mObj.box_el;

     var target_el = (mode == "motion") ? slide_el : box_el;

     if(mode == "motion")
     {
       //make regular and goofy foot (opposite) values
       var val_regular_input =  target_el.value;
       var val_goof_input = target_el.value * -1;
       var input_val = (style == "goofy") ? val_goof_input : val_regular_input;
       box_el.value = input_val;//unique to motion
     }else
     {
       if(ltr = "A"){
         sli_ctrl_inputA.value = box_el.value;
       }else{
         sli_ctrl_inputB.value = box_el.value;
       }

       var input_val = box_el.value;
       //slide_data("B",nbr,{"value" : 	sli_ctrl_boxB.value, "val_oper": "add"});
       //src_y = sli_ctrl_inputB.value;

     }

     slide_data(ltr,nbr,{"value" :	input_val, "val_oper": "add"});


     if(mode == "input"){
       if(ltr == "A")
       {
         //make these "object properties"
         sliderA.setValue();//unique to input
       }else
       {
         sliderB.setValue();//unique to input
       }
     }//end if mode ==  input

     draw_me();

   }//end image_update

     var slide_data = function(ltr,nbr,obj)
     {
       //span_set2 view_span span3 view_span3
       var slide_ltr = ltr;
       var nbr = nbr;
       var val = (obj != undefined && obj.value != undefined) ? obj.value : "";
       var val_oper = (obj != undefined && obj.val_oper != undefined) ? obj.val_oper : "get_value";

       var slide_id = ltr+nbr;
       var span_id_str = "span" + slide_id;
       var targetSpan = document.getElementById(span_id_str);

       if(val != "" && val_oper == "add" || val_oper == "both"){
         //A covers x and width
         //B covers y and height
         switch(slide_id)
         {
             case "A0":
                 src_x = val;
                 //targetSpan.innerText = val;
             break;
             case "B0":
                 src_y = val;
                 //targetSpan.innerText = val;
             break;

             case "A1":
                 img_w = val;
                 //targetSpan.innerText = val;
             break;
             case "B1":
                 img_h = val;
                 //targetSpan.innerText = val;
             break;

             case "A2":
                 can_x = val;
                 //targetSpan.innerText = val;
             break;
             case "B2":
                 can_y = val;
                 //targetSpan.innerText = val;
             break;

             case "A3":
                 can_w = val;
                 //targetSpan.innerText = val;
             break;
             case "B3":
                 can_h = val;
                 //targetSpan.innerText = val;
             break;
         }//end switch
       }//end if

       if(val_oper == "get_value" || val_oper == "both"){
         switch(slide_id)
         {
             case "A0":
               return src_x;
             break;
             case "B0":
               return src_y;
             break;
             case "A1":
                 return img_w;
             break;
             case "B1":
                 return img_h;
             break;
             case "A2":
               return can_x;
             break;
             case "B2":
               return can_y;
             break;

             case "A3":
               return can_w;
             break;
             case "B3":
               return can_h;
             break;
         }//end switch
       }//end if

     }//end slide_dataA


 /*

   //this.draw_me = function(){ draw_me();  };
 */


 }//end masterImage

  //use this area to run scripts


  //NOTE i may not need this. #remove?
  /*
  function set_dimensions()
  {
    //console.log(document.body.clientHeight);
    var c_width = document.body.clientWidth;
    console.log(document.body.clientWidth);

    var canvas_el = document.getElementById("tutorial");
    var ctrl_el = document.getElementById("info_cont");
    //
    var dyn_var = (document.body.clientWidth > 499) ? 2.7 : 1.2;
    var w_calc = parseInt(c_width) / dyn_var;
    //console.log(w_calc/10);//
    canvas_el.style.height = w_calc + "px";

    //ctrl_el.style.height = w_calc + "px";
  }//end set_dimensions

  //set_dimensions();
  */
