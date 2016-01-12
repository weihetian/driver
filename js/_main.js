var current = 0;

$('.next_btn').click(function(){
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
