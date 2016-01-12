$(function() {
    var postData = {};
    var driverID;
    var vehicleID;
    /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     *
     * Sample Code
     * (c) by AutoJini.com/Octadyne Systems
     *  support@octadyne.com
     *
     * Looking to learn a new language... then checkout ColdFusion.
     * It's powerful, easy and fun to work on.
     * No more escaping of your HTML code...
     *
     * Free to use as long as credit is given and this header remains intact...
     * Released under MIT Lic.
     * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
     var protoCall = "https://";
     var host = "api.edmunds.com";

         // Make sure to change the API KEY
     var apiKey = "nu29vkwu8zeemdkr2hvxy7n6";
     var fmt = "json";
     var standardParams = "&fmt=" + fmt +  "&api_key=" + apiKey + "&callback=?";
     var $yearSelect = jQuery('#year');
     var $makeSelect = jQuery('#make');
     var $modelSelect = jQuery('#model');
     var $styleSelect = jQuery('#style');

     // lets bind some events on document.ready.
     jQuery(function(){
         $yearSelect.on('change', function() { getMakeModelsByYear()});
         $makeSelect.on('change', function() { enableModelDropdown() });
         $modelSelect.on('change', function() { getStyles() });
         // lets build the year drop down.
         ajEdmundsBuildYear();
     });

     // method to build the year drop down.
     function ajEdmundsBuildYear()
     {
         var endYear = 2000,
             baseYear = new Date().getFullYear();
         $yearSelect.empty();
         $yearSelect.append('<option value="">---    </option>');
        $makeSelect.append('<option value="">---    </option>');
        $modelSelect.append('<option value="">---    </option>');
         for(var yyyy=baseYear; yyyy>=endYear; yyyy--)
         {
             $yearSelect.append('<option value="' + yyyy + '">' + yyyy +'</option>');
         }
     }

     // get the makes and models for a year in one go...
     function getMakeModelsByYear()
     {
         var year = $yearSelect.val(),
             endPoint = "/api/vehicle/v2/makes",
             view = "basic",
             options = "year=" + year + "&view=" + view + standardParams,
             postURL = protoCall + host + endPoint + "?" + options;
         jQuery.getJSON(postURL,
             function(data) {
                  // clear the make drop down... re add the first option... remove dsiabled attr.
                  $makeSelect.empty();
                  $makeSelect.append('<option value="">---    </option>');
                  $makeSelect.removeAttr('disabled');
                  $modelSelect.empty();
                 $modelSelect.append('<option value="">---    </option>');

                  // loop the makes... each make contains model... add the make in make drop down and models in model dd
                  jQuery.each(data.makes, function(i, val) {
                       make = data.makes[i];
                       $makeSelect.append('<option value="' + make.niceName + '">' + make.name + '</option>');
                       jQuery.each(make.models, function(x, val){
                            model = make.models[x];
                            $modelSelect.append('<option make="' + make.niceName +'" value="' + model.niceName + '">' + model.name + '</option>');
                       });
                  });
             });
     }

     // since we already grabed the models...
     // now just matter of showing only the matching models for a make.
     function enableModelDropdown()
     {
         var make =  $makeSelect.val();
         $modelSelect.removeAttr('disabled');
         $modelSelect.find('option').not('[value="-1"]').hide();
         $modelSelect.find('option[make=' + make + ']').show();

     }

     // grab the styles... pretty much same as
     // getMakeModelsByYear()
     function getStyles()
     {
         var year = $yearSelect.val(),
             make = $makeSelect.val(),
             model = $modelSelect.val(),
             endPoint = "/api/vehicle/v2/" + make + "/" + model + "/" + year + "/styles",
             view = "basic",
             options = "view=" + view + standardParams,
             postURL = protoCall + host + endPoint + "?" +  options;
         jQuery.getJSON(postURL,
             function(data) {
                  $styleSelect.empty();
                  $styleSelect.removeAttr('disabled');
                  $styleSelect.append('<option value="-1">Select Style</option>');
                  jQuery.each(data.styles, function(i, val) {
                       style = data.styles[i];
                       $styleSelect.append("<option value='" + style.id + "'>" + style.name + "</option>");
                  });
             });
     }

   });
