// [Created by Hasim S. Choudhary on 28-Oct-2014]

var imageGalleryDescription = "";
var imageGalleryTitle = "";
var ImageGalleryItems = "";

function generateImageGalleryCarousal() {
    $(".backTo").hide();
    var sliderRef;
    var currentSlide;
    var renderNewArr = [];       
    
    $(".imggallery ul li.imgblock > a").click(function () {         
        $(".pagination, .imggallery").hide();
        $(".mediaContainer").show();
        $(".backTo").show();
        renderNewArr = [];
        var largeImageArr = $(this).attr("largeImage").split(",");
        var smallImageArr = $(this).attr("smallImage").split(",");
        imageGalleryDescription = $(this).attr("description");
        imageGalleryTitle = "";
        imageGalleryTitle = $(this).find("p").html();
        var ImageDesc = $(this).attr("description").split("###");
        for (var i = 0; i < largeImageArr.length; i++) {
            var arr = [];
            arr.push(largeImageArr[i]);
            arr.push(smallImageArr[i]);
            arr.push(ImageDesc[i]);
            renderNewArr.push(arr);
        }
        renderLightBoxImageGalleryCarousel(renderNewArr);
        addLightBoxImageGalleryCarousel()

    });
  
    
}

//Home slider initialize
function renderLightBoxImageGalleryCarousel(arr) {       
    if (arr.length > 0) {            
        $(".mediaContainer .mediaListContainer .mediaLabGallery .thumbSliderBox").append("  <a class=\"backTo\">Back to Image Gallery</a><h2>" + imageGalleryTitle + "</h2><div class=\"imageLargeContainer\"></div>");
        $(".mediaContainer .mediaListContainer .mediaLabGallery .thumbSliderBox").append("<div class=\"imageDescription\"></div>");
        for (var i = 0; i < arr.length; i++) {

            $(".mediaContainer .mediaListContainer .mediaLabGallery .thumbSliderBox .imageDescription").append("<div class=\"imageDesc\"><p></p></div>");
            $(".mediaContainer .mediaListContainer .mediaLabGallery .thumbSliderBox .imageDescription > .imageDesc").each(function (i) {
                $(this).find("p").html(arr[i][2]);
            });
        }
        $(".mediaContainer .mediaListContainer .mediaLabGallery .thumbSliderBox").append("<div class=\"slider1\"></div>");
        for (var i = 0; i < arr.length; i++) {
            $(".mediaContainer .mediaListContainer .mediaLabGallery .thumbSliderBox .imageLargeContainer").append("<div class=\"imageLarge\"><img></div>");
            $(".mediaContainer .mediaListContainer .mediaLabGallery .thumbSliderBox .slider1").append("<div id=\"slide_" + i + "\" class=\"slide\"><img></div>");
        }
        $(".mediaContainer .mediaListContainer .mediaLabGallery .thumbSliderBox .imageLargeContainer > .imageLarge").each(function (i) {
            $(this).find("img").attr("src", arr[i][0]);
        });
        $(".mediaContainer .mediaListContainer .mediaLabGallery .thumbSliderBox .slider1 > .slide").each(function (i) {
            $(this).find("img").attr("src", arr[i][1]);
        });
    }
}
function updateThumbnailOpacityImageGallery() {
   // sliderRef.goToSlide(currentSlide);
}
function onSlideClickRefImageGallery() {
    currentSlide = Number($(".slider1 > div#" + $(this).attr("id")).index());
    $(".imageLarge").css("display", "none");
    $(".imageLargeContainer").children().eq(currentSlide).css("display", "block");
    $(".imageDesc").css("display", "none");
    $(".imageDescription").children().eq(currentSlide).css("display", "block");
    $('.slider1 > div img').css("border", "none");
    $('.slider1 > div:nth-child(' + (currentSlide + 1) + ') img').css("border", "2px solid #00A7E8");       
    updateThumbnailOpacityImageGallery();
}

function removeLightBoxCarouselImageGallery() {
    if (sliderRef) {
        sliderRef.destroySlider();
        $(".slide").off("click", onSlideClickRefImageGallery);
    }
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox .imageLargeContainer").remove();
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox .imageDescription").remove();
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox .slider1").remove();
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox p").remove();
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox h2").remove();
}

function addLightBoxImageGalleryCarousel() {
        currentSlide = 0;
        $(".imageLarge").css("display", "none");
        $(".imageLargeContainer").children().eq(currentSlide).css("display", "block");
        $(".imageDesc").css("display", "none");
        $(".imageDescription").children().eq(currentSlide).css("display", "block");
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
            //$(".imageDesc").css("display", "none");
            //$(".imageDescription").children().eq(currentSlide).css("display", "block");
            //updateThumbnailOpacityImageGallery();
        },
        onSlidePrev: function ($slideElement, oldIndex, newIndex) {
            currentSlide = newIndex;
            //$(".imageLarge").css("display", "none");
            //$(".imageLargeContainer").children().eq(currentSlide).css("display", "block");
            //$(".imageDesc").css("display", "none");
            //$(".imageDescription").children().eq(currentSlide).css("display", "block");
            //updateThumbnailOpacityImageGallery();
        }
    });
    $('.slider1 > div:nth-child(1) img').css("border", "2px solid #00A7E8");
    if ($('.slider1 > div').length < 5) {
        $('.bx-wrapper .bx-next, .bx-wrapper .bx-prev').addClass('hide');
    }
    $(".slide").on("click", onSlideClickRefImageGallery);
    $(".bx-pager").hide();
    $(".mediaLabGallery .thumbSliderBox a.backTo").click(function () {
		window.location.href = document.referrer;
    });}

function pageselectCallbackImageGallery(page_index, jq) {
    var items_per_page = 9;
    var max_elem = Math.min((page_index + 1) * items_per_page, ImageGalleryItems.length);
    var newcontent = "  <ul>";
    for (var i = page_index * items_per_page; i < max_elem; i++) {
        var vidNumRefid = (ImageGalleryItems[i].hrefId.split("#")[1]);
        newcontent += "<li id='" + vidNumRefid + "' class='" + ImageGalleryItems[i].class + "'>";
        newcontent += "<a   href=\"" + ImageGalleryItems[i].hrefId + "\"  description=\"" + ImageGalleryItems[i].description + "\" largeImage=\"" + ImageGalleryItems[i].largeImage + "\"  smallImage=\"" + ImageGalleryItems[i].smallImage + "\">";
        newcontent += "<img src='" + ImageGalleryItems[i].ImagePath + "' alt='" + ImageGalleryItems[i].Title + "' title='" + ImageGalleryItems[i].Title + "' />";
        newcontent += " <p>";
        newcontent += "" + ImageGalleryItems[i].Title + "";
        newcontent += "</p>";
        newcontent += " <span>";
        newcontent += "" + ImageGalleryItems[i].Date + "";
        newcontent+="</span>";
        newcontent+="</a>";
        newcontent+="</li>";
    }
    newcontent += "</ul>";
    $('#ImageGallerydata').html(newcontent);
    generateImageGalleryCarousal();
    var vidNumRef = (String(window.location.href.split("#")[1]));      
    if ($(".imggallery ul > li#" + vidNumRef).index() >= 0) {
        $(".pagination, .imggallery").hide();
        $(".mediaContainer").show();
        $(".backTo").show();
        renderNewArr = [];
        var largeImageArr = $(".imggallery ul > li#" + vidNumRef+" a").attr("largeImage").split(",");
        var smallImageArr = $(".imggallery ul > li#" + vidNumRef + " a").attr("smallImage").split(",");
        imageGalleryDescription = $(".imggallery ul > li#" + vidNumRef + " a").attr("description");
        imageGalleryTitle = $(".imggallery ul > li#" + vidNumRef + " a").find("p").html();
        var ImageDesc = $(".imggallery ul > li#" + vidNumRef + " a").attr("description").split("###");
        for (var i = 0; i < largeImageArr.length; i++) {
            var arr = [];
            arr.push(largeImageArr[i]);
            arr.push(smallImageArr[i]);
            arr.push(ImageDesc[i]);
            renderNewArr.push(arr);
        }
        renderLightBoxImageGalleryCarousel(renderNewArr);
        addLightBoxImageGalleryCarousel();
    }
    $("#s4-workspace").scrollTop(0);
    return false;
}

function getOptionsFromFormImageGallery() {
    var opt = { callback: pageselectCallbackImageGallery };
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

function InitializeImageGallery() {
	if ($('.span-imagegallery').length > 0) {
	    $(".backTo").hide();
	    var varImageGalleryID = "";
	    varImageGalleryID = Number(String(window.location.href.split("#")[1]).split("_")[1]);
	    var varNoRecordFoundClientID = $('.span-messageClientID').text();
	    $("#" + varNoRecordFoundClientID).css("display", "none");
	    var pathArray = window.location.pathname.split('/');
	    var secondLevelLocation = pathArray[1];
	    var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
	    newURL = newURL + "/_vti_bin/listdataapi.aspx/GetImageGalleryList";
	    $.ajax({
	        type: "POST",
	        url: newURL,
	        data: "{'strImageGalleryID':'" + varImageGalleryID + "'}",
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	            if (msg.d != "No Data Found") {
	                $("#" + varNoRecordFoundClientID).css("display", "none");
	                ImageGalleryItems = $.parseJSON(msg.d);
	                var optInit = getOptionsFromFormImageGallery();
	                $("#Pagination").pagination(ImageGalleryItems.length, optInit);
	            }
	            else {
	                $("#" + varNoRecordFoundClientID).css("display", "block");
	            }
	        },
	        error: function (error) {
	        }
	    });
    }
}
