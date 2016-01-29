var current = 0;

$('.next_btn').click(function(){
  if(!check_save_input(current)){
    return;
  }

  // $('.progress_bar_list')
  $( "li.active" ).next().addClass("active");


  if(current==0){

      current++;
    $('.fist_page').transition({ x:-10, opacity: 0 },function(){
      $('.fist_page').hide();
        $('.second_page').show();
      $('.second_page').transition({ x:-10, opacity: 1},function(){

      });

    });
  }else if(current == 1){
      current++;
    $('.second_page').transition({ x:-20, opacity: 0 },function(){
      $('.second_page').hide();
        $('.third_page').show();
      $('.third_page').transition({ x:-10, opacity: 1},function(){

      });
    });
  }
})

function check_save_input(num){
  var pass=true;

  if(num==0){
    var first_name = $('#input-firstname').val();
    var last_name = $('#input-lastname').val();
    var email = $('#input-email').val();
    var confirm_email=$('#input-confirm_email').val();
    var phone = $('#input-phone').val();
    var where = $('#input-where').val();

    var input_list = document.getElementsByName('input__field-1');

    var labels = document.getElementsByTagName('LABEL');


    for(var i = 0; i < input_list.length; i++) {
      if(input_list[i].value == "")
      {


           for (var j = 0; j < labels.length; j++) {
             var elem = document.getElementById(labels[j].htmlFor);
             if (elem==input_list[i]){
               $(labels[j]).addClass("empty_input");

             }

           }

           pass =false;
    //    input_list[i].label.innerHTML = 'Look ma this works!';

      //  $(input_list[i]).addClass("empty_input");

      }
      }



  }else if(num==1){
    var year = $('#year').val();
    var make = $('#make').val();
    var model = $('#model').val();
    var color = $('#color').val();
    var condition = $('#condition').val();
    var input_list = document.getElementsByName('input__field-2');

    var labels = document.getElementsByTagName('LABEL');


    for(var i = 0; i < input_list.length; i++) {
      if(input_list[i].value == "")
      {


           for (var j = 0; j < labels.length; j++) {

             var elem = document.getElementById(labels[j].htmlFor);

             if (elem==input_list[i]){
              // $(labels[i]).addClass("empty_input");
               $(labels[j]).addClass("empty_input");
               $(elem).addClass("empty_input_border");
             }

           }

           pass =false;
    //    input_list[i].label.innerHTML = 'Look ma this works!';

      //  $(input_list[i]).addClass("empty_input");

    }
      }
  }else if(num==2){
    var home_zip = $('#input-home_zip').val();
    var home_city = $('#input-home_city').val();
    var work_zip = $('#input-work_zip').val();
    var work_city=$('#input-work_city').val();
    var miles_day = $('#input-average_miles_day').val();
    var miles_weekend = $('#input-average_miles_weekend').val();

    var input_list = document.getElementsByName('input__field-3');

    var labels = document.getElementsByTagName('LABEL');


    for(var i = 0; i < input_list.length; i++) {
      if(input_list[i].value == "")
      {


           for (var j = 0; j < labels.length; j++) {
             var elem = document.getElementById(labels[j].htmlFor);
             if (elem==input_list[i]){
               $(labels[j]).addClass("empty_input");

             }

           }

           pass =false;
    //    input_list[i].label.innerHTML = 'Look ma this works!';

      //  $(input_list[i]).addClass("empty_input");

      }
      }

  }
  return pass;
}

$('.left_btn').click(function(){
  // $('.progress_bar_list')

  if(current!=0){
    var n = current+1;
    $( "li.active:nth-child("+n+")" ).removeClass("active");

  }

  if(current==1){
      current--;
    $('.second_page').transition({ x:0, opacity: 0 },function(){
      $('.second_page').hide();
        $('.fist_page').show();
      $('.fist_page').transition({ x:0, opacity: 1},function(){

      });

    });
  }else if(current == 2){
      current--;
    $('.third_page').transition({ x:0, opacity: 0 },function(){
      $('.third_page').hide();
        $('.second_page').show();
      $('.second_page').transition({ x:-10, opacity: 1},function(){

      });
    });
  }

})
