var currentIndex=0;

$('.imageSlide_control li').on('click', function() {
  $( ".imageSlide_control li:nth-child("+(currentIndex+1)+")" ).removeClass('current_slide');
  $(this).addClass('current_slide');
  var index = $( ".imageSlide_control li" ).index($(this));
  var imageWidth = $(".imageSlide_image_slide").width()/4;
  var distance = (index-currentIndex)*imageWidth;
  $(".imageSlide_image_slide").animate({
    right: "+="+distance,
  });
  currentIndex = index;
});
