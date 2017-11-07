// [Created by Hasim S. Choudhary on 03-Nov-2014]

var currentSlide_VG = 0;
var videoGalleryListItem = "";
var YTVidArr_VG = [];
var VJSVidArr_VG = [];
var sliderRef_VG = "";

function InitializeVideoGallery() {
    if ($('.span-videogallery').length > 0) {
        $(".mediaListContainer .mediaLabGallery .imageLargeContainer > .imageLarge iframe").each(function (i) {
            YTVidArr_VG.push(this);
        });
        $(".mediaListContainer .mediaLabGallery .imageLargeContainer > .imageLarge video").each(function (i) {
            VJSVidArr_VG.push($(this).attr("id"));
        });
        $(".mediaContainer").css("display", "none");
        $("#message").css("display", "none");
        $(".imageLarge").css("display", "none");
        $(".imageLargeContainer").children().eq(currentSlide_VG).css("display", "block");
        sliderRef_VG = $('.slider1').bxSlider({
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
                currentSlide_VG = newIndex;
            },
            onSlidePrev: function ($slideElement, oldIndex, newIndex) {
                currentSlide_VG = newIndex;
            }
        });

        $(".slide").on("click", function () {
            currentSlide_VG = Number($(".slider1 > div#" + $(this).attr("id")).index());
            $(".imageLarge").css("display", "none");
            $(".imageLargeContainer").children().eq(currentSlide_VG).css("display", "block");
            $('.slider1 > div img').css("border", "none");
            $('.slider1 > div:nth-child(' + (currentSlide_VG + 1) + ') img').css("border", "2px solid #00A7E8");
            updateThumbnailOpacity_VG();
            //sliderRef_VG.startAuto();       
        });
        $('.slider1 > div:nth-child(1) img').css("border", "2px solid #00A7E8");
        if ($('.slider1 > div').length < 5) {
            $('.bx-wrapper .bx-next, .bx-wrapper .bx-prev').addClass('hide');
        }
        $(".bx-pager").hide();
        $(".mediaContainer").hide();

        // Load Data()
        GetVideoGalleryDataFromServer();
    }
}

function GenerateSlider_VG() {
    $(".imggallery a").click(function () {
        var currentSlideid = String($(this).attr('href').split("#")[1]);
        $(".pagination, .imggallery").hide();
        $(".mediaContainer").show();
        $(".backTo").show();
        sliderRef_VG.goToSlide($(".imageLargeContainer > div#" + currentSlideid).index());
        currentSlide_VG = Number($(".imageLargeContainer > div#" + currentSlideid).index());
        $(".imageLarge").css("display", "none");
        $(".imageLargeContainer > div#" + currentSlideid).css("display", "block");
        updateThumbnailOpacity_VG();
        $('.bx-next, .bx-prev').removeClass('hide');
    });
    $(".imageLargeContainer .imageLarge a.backTo").click(function () {
        window.location.href = document.referrer;
    });
}

function playPauseYTVideo_VG(state) {
    for (var i = 0; i < YTVidArr_VG.length; i++) {
        var iframe = YTVidArr_VG[i].contentWindow;
        func = state == 'pause' ? 'pauseVideo' : 'playVideo';
        iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
    }
    $("video").trigger("pause");
}

function pauseVidJSVideo_VG(state) {
    for (var i = 0; i < VJSVidArr_VG.length; i++) {
        var myPlayer = videojs(VJSVidArr_VG[i]);
        state == "pause" ? myPlayer.pause() : myPlayer.play();
    }
}

function updateThumbnailOpacity_VG() {
    playPauseYTVideo_VG("pause");
    pauseVidJSVideo_VG("pause");
}

function pageselectCallbackForVideoGallery(page_index, jq) {
    var items_per_page = 9;
    var max_elem = Math.min((page_index + 1) * items_per_page, videoGalleryListItem.length);
    var newcontent = "  <ul>";
    // Iterate through a selection of the content and build an HTML string
    for (var i = page_index * items_per_page; i < max_elem; i++) {

        newcontent += "<li class='" + videoGalleryListItem[i].class + "'>";
        newcontent += "<a href='" + videoGalleryListItem[i].hrefId + "' description ='" + videoGalleryListItem[i].description + "' largeImage ='" + videoGalleryListItem[i].largeImage + "' smallImage ='" + videoGalleryListItem[i].smallImage + "'>";
        newcontent += "<img src='" + videoGalleryListItem[i].ImagePath + "' alt='" + videoGalleryListItem[i].Title + "' title='" + videoGalleryListItem[i].Title + "'/>";
        newcontent += " <p>";
        newcontent += "" + videoGalleryListItem[i].Title + "";
        newcontent += "</p>";
        newcontent += " <span>";
        newcontent += "" + videoGalleryListItem[i].Date + "";
        newcontent += "</span>";
        newcontent += "</a>";
        newcontent += "</li>";
    }
    newcontent += "</ul>";

    // Replace old content with new content
    $('#videoGallerypages').html(newcontent);
    GenerateSlider_VG();
    $("#s4-workspace").scrollTop(0);

    var vidNumRef = (String(window.location.href.split("#")[1]));
    if ($(".imageLargeContainer > div#" + vidNumRef).index() >= 0) {
        $(".pagination, .imggallery").hide();
        $(".mediaContainer").show();
        $(".backTo").show();
        currentSlide_VG = $(".imageLargeContainer > div#" + vidNumRef).index();
        $(".imageLarge").css("display", "none");
        $(".imageLargeContainer > div#" + vidNumRef).css("display", "block");
        $('.bx-next, .bx-prev').removeClass('hide');
    }
    return false;
}

function getOptionsFromFormVideoGallery() {
    var opt = { callback: pageselectCallbackForVideoGallery };
    opt["items_per_page"] = $('.span-ItemsPerPage').text();;
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

function GetVideoGalleryDataFromServer() {
    $(".backTo").hide();
    $(".mediaContainer").hide();
    var varNoRecordFoundClientID = $('.span-messageClientID').text();
    $("#" + varNoRecordFoundClientID).css("display", "none");
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
    newURL = newURL + "/_vti_bin/listdataapi.aspx/GetVideoGalleryList";
    $.ajax({
        type: "POST",
        url: newURL,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d != "No Data Found") {
                $("#" + varNoRecordFoundClientID).css("display", "none");
                videoGalleryListItem = $.parseJSON(msg.d);
                var optInit = getOptionsFromFormVideoGallery();
                $("#Pagination").pagination(videoGalleryListItem.length, optInit);
            }
            else {
                $("#" + varNoRecordFoundClientID).css("display", "block");
            }
        },
        error: function (error) {
        }
    });
}
