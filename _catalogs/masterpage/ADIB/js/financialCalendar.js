// [Created by Hasim S. Choudhary on 22-Oct-2014]
// largeImage and smallImage arr dynamically rendered ////// 
var windowHeight = ($(window).height() / 2) - ($(".lightBoxContent").height() / 2);
var sliderRef;
var currentSlide;
var renderNewArr = [];

var FinancialCalendarLitsItems = "";

function InitializeFinancialCalendar()
{
	try
	{
		$(".lightBox, .lightBoxContent").hide();
		$(".viewLightBox").click(function () {
		    renderNewArr = [];
		    var largeImageArr = $(this).attr("largeImage").split(",");
		    var smallImageArr = $(this).attr("smallImage").split(",");
		    for (var i = 0; i < largeImageArr.length; i++) {
		        var arr = [];
		        arr.push(largeImageArr[i]);
		        arr.push(smallImageArr[i]);
		        renderNewArr.push(arr);
		    }
		    renderLightBoxCarousel(renderNewArr);
		    addLightBoxCarousel()
		    rePositionLightBoxCarousel();
		});
		
		$(".clsBtn").click(function () {
		    removeLightBoxCarousel();
		    $(".lightBox, .lightBoxContent").hide();
		});
		MakeAjaxCallForFinancialCalendar();
	}
	catch(e){}
}

function MakeAjaxCallForFinancialCalendar()
{
	try
	{
		var varDownloadFileText = $('.span-DownloadFileText').text();// "Download File";
	     var varViewFileText = $('.span-ViewFileText').text();//"View File";
	     var varSupportedMaterialText = $('.span-SupportedMaterialText').text();//"Supported Material";
	     $(".financial-calender-message").css("display", "none");         
	     var pathArray = window.location.pathname.split('/');
	     var secondLevelLocation = pathArray[1];
	     var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
	     newURL = newURL + "/_vti_bin/listdataapi.aspx/GetFinancialCalendarList";
	     $.ajax({
	         type: "POST",
	         url: newURL,
	         data: "{'DownloadFileText':'" + varDownloadFileText + "','ViewFileText':'" + varViewFileText + "','SupportedMaterialText':'" + varSupportedMaterialText + "'}",
	         contentType: "application/json; charset=utf-8",
	
	         dataType: "json",
	
	         success: function (msg) {                 
	             if (msg.d != "No Data Found") {
	                 $(".financial-calender-message").css("display", "none");
	                 FinancialCalendarLitsItems = $.parseJSON(msg.d);                     
	                 var optInit = getOptionsFromFormForFinancialCalendar();
	                 $("#Pagination").pagination(FinancialCalendarLitsItems.length, optInit);
	                
	             }
	             else {
	                 $(".financial-calender-message").css("display", "block");
	             }	
	         },
	         error: function (error) {
	         }
	     });
	}
	catch(e){}
}

//Home slider initialize
function rePositionLightBoxCarousel() {
    windowHeight = ($(window).height() / 2) - ($(".lightBoxContent").height() / 2);
    windowWidth = ($(window).width() / 2) - ($(".lightBoxContent").width() / 2);
    $(".lightBoxContent").css({ "top": String(windowHeight) + "px", "left": String(windowWidth) + "px" });
    $(".lightBox, .lightBoxContent").show();
}

function renderLightBoxCarousel(arr) {
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox").append("<div class=\"imageLargeContainer\"></div>");
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox").append("<div class=\"slider1\"></div>");
    for (var i = 0; i < arr.length; i++) {
        $(".mediaListContainer .mediaLabGallery .thumbSliderBox .imageLargeContainer").append("<div class=\"imageLarge\"><img onload=\"rePositionLightBoxCarousel();\" alt=\"\"></div>");
        $(".mediaListContainer .mediaLabGallery .thumbSliderBox .slider1").append("<div id=\"slide_" + i + "\" class=\"slide\"><img onload=\"rePositionLightBoxCarousel();\ alt=\"\"></div>");
    }
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox .imageLargeContainer > .imageLarge").each(function (i) {
        $(this).find("img").attr("src", arr[i][0]);
    });
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox .slider1 > .slide").each(function (i) {
        $(this).find("img").attr("src", arr[i][0]);
    });
}

function updateThumbnailOpacity() {
    //sliderRef.goToSlide(currentSlide);
}

function onSlideClickRef() {
    //sliderRef.startAuto();
    currentSlide = Number($(this).attr("id").split("_")[1]);
    $(".imageLarge").css("display", "none");
    $(".imageLargeContainer").children().eq(currentSlide).css("display", "block");
    $('.slider1 > div img').css("border", "none");
    $('.slider1 > div:nth-child(' + (currentSlide + 1) + ') img').css("border", "2px solid #00A7E8");
    updateThumbnailOpacity();
    //sliderRef.startAuto();
}

function removeLightBoxCarousel() {
    if (sliderRef) {
        sliderRef.destroySlider();
        $(".slide").off("click", onSlideClickRef);
    }
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox .imageLargeContainer").remove();
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox .slider1").remove();
}

function addLightBoxCarousel() {
    currentSlide = 0;
    $(".imageLarge").css("display", "none");
    $(".imageLargeContainer").children().eq(currentSlide).css("display", "block");
    console.log("addLightBoxCarousel");
    sliderRef = $('.slider1').bxSlider({
        slideWidth: 114,
        minSlides: 2,
        maxSlides: 4,
        moveSlides: 1,
        /*auto: true,
        mode: 'fade',
        autoDelay: 0,
        startSlide: 2,
        mode: 'vertical/horizontal/fade',*/
        slideMargin: 10,
        hideControlOnEnd: true,
        infiniteLoop: false,
        onSlideNext: function ($slideElement, oldIndex, newIndex) {
            currentSlide = newIndex;
            //$(".imageLarge").css("display", "none");
            //$(".imageLargeContainer").children().eq(currentSlide).css("display", "block");
            //updateThumbnailOpacity();

        },
        onSlidePrev: function ($slideElement, oldIndex, newIndex) {
            currentSlide = newIndex;
            //$(".imageLarge").css("display", "none");
            //$(".imageLargeContainer").children().eq(currentSlide).css("display", "block");
            //updateThumbnailOpacity();

        }
    });
    $('.slider1 > div:nth-child(1) img').css("border", "2px solid #00A7E8");
    if ($('.slider1 > div').length < 5) {
        $('.lightBoxContent .bx-next, .lightBoxContent .bx-prev').addClass('hide');
    }

    $(".slide").on("click", onSlideClickRef);
    $(".bx-pager").hide();
}
//End

function pageselectCallbackFinancialCalendar(page_index, jq) {
           var items_per_page = 5;
           var max_elem = Math.min((page_index + 1) * items_per_page, FinancialCalendarLitsItems.length);
           var newcontent = '';               
           var varLblLinkText = $('.span-ViewAlbum').text();
           var varShareText = $('.span-ShareText').text();
     // Iterate through a selection of the content and build an HTML string
           for (var i = page_index * items_per_page; i < max_elem; i++) {                   
         newcontent += " <section class='panel'>";
         newcontent += "<div class='calendar'>";
         newcontent += "<div class='span3 financial-thumb'>";
         newcontent += "<div class='" + FinancialCalendarLitsItems[i].DivClass + "'>";
         newcontent += "<span class='date'>";
         newcontent += FinancialCalendarLitsItems[i].Day;
         newcontent += "</span>"; 
         newcontent += "<span class='month'>";
         newcontent += FinancialCalendarLitsItems[i].Month;
         newcontent += "</span>"; 
         newcontent += "<span class='year'>";
         newcontent += FinancialCalendarLitsItems[i].Year;
         newcontent += "</span>";
         newcontent += "</div>";
         newcontent += FinancialCalendarLitsItems[i].ImageTag;
         newcontent += "<div class='calendar-social'>"; 
         newcontent += "<p>"+varShareText+"</p>";
         newcontent += "<ul class='financial-social'>";
         newcontent += "<li class='fb'><a href='javascript:void(0);'></a></li>";
         newcontent += "<li class='tw'><a href='javascript:void(0);'></a></li>";
         newcontent += "<li class='in'><a href='javascript:void(0);'></a></li>";
         newcontent += "</ul>";
         newcontent += "</div>";
         newcontent += "</div>"; 
         newcontent += "<div class='content'>";
         newcontent += "<h2>";
         newcontent += FinancialCalendarLitsItems[i].Title;
         newcontent += "</h2><p>";
         newcontent += FinancialCalendarLitsItems[i].Subtitle;
         newcontent += "</p><span class='in-location'>";
         newcontent += FinancialCalendarLitsItems[i].Location;
         newcontent += "</span>";
         newcontent += FinancialCalendarLitsItems[i].DivClass2;
         newcontent += "<a ID='viewAlbum' class='link-readmore viewLightBox' ClientIDMode='Static' ";
         newcontent += " CausesValidation='False' largeImage ='" + FinancialCalendarLitsItems[i].largeImage + "' ";
         newcontent += " smallImage ='" + FinancialCalendarLitsItems[i].smallImage + "'>";
         newcontent += varLblLinkText;
         newcontent += "</a> </span>";
         newcontent += "<div>";
         newcontent += FinancialCalendarLitsItems[i].LiteralVal;                                   
         newcontent += "</div>";
         newcontent += "</div>";
         newcontent += "</div>";

        

     }
     // Replace old content with new content
           $('#FinancialCalendarListView').html(newcontent);
           ApplyViewAlbumLightBox();
           $("#s4-workspace").scrollTop(0);
     return false;
 }

 function getOptionsFromFormForFinancialCalendar() {
     var opt = { callback: pageselectCallbackFinancialCalendar };
     opt["items_per_page"] = $('.span-ItemsPerPage').text();
     opt["num_display_entries"] = 5;
     opt["num_edge_entries"] = 1;
     opt["prev_text"] = $('.span-pagingPreviousText').text();
     opt["next_text"] = $('.span-pagingNextText').text(); 

     // Avoid html injections in this demo
     var htmlspecialchars = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }
     $.each(htmlspecialchars, function (k, v) {
         opt.prev_text = opt.prev_text.replace(k, v);
         opt.next_text = opt.next_text.replace(k, v);

     })
     return opt;
 }

function ApplyViewAlbumLightBox() {
   // largeImage and smallImage arr dynamically rendered ////// 
   var windowHeight = ($(window).height() / 2) - ($(".lightBoxContent").height() / 2);
   var sliderRef;
   var currentSlide;
   var renderNewArr = [];

   $(".lightBox, .lightBoxContent").hide();
   $(".viewLightBox").click(function () {
       renderNewArr = [];
       var largeImageArr = $(this).attr("largeImage").split(",");
       var smallImageArr = $(this).attr("smallImage").split(",");
       for (var i = 0; i < largeImageArr.length; i++) {
           var arr = [];
           arr.push(largeImageArr[i]);
           arr.push(smallImageArr[i]);
           renderNewArr.push(arr);
       }
       renderLightBoxCarousel(renderNewArr);
       addLightBoxCarousel()
       rePositionLightBoxCarousel();
   });
}