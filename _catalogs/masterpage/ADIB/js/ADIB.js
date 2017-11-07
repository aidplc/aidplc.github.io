
var sliderRef;
var YTVidArr = [];
var VJSVidArr = [];
var messages = { emailAddress: "Please enter your email address.", };
/* From Master Page Start Here */

function contryDropDownChange() {
    window.location.href = String($("#HeaderDropdownList").val());
}

function changeShareLink(fdUrl, TweetUrl, linkedInUrl, instaUrl, gPlusUrl)
{
 if(fdUrl != "") $('.fb-share-button').attr("data-href", fdUrl); else $('.fb-share-button').attr("data-href", String(window.location.href));
 if(TweetUrl != "") $('.#-share-button').attr("data-url", TweetUrl); else $('.#-share-button').attr("data-url", String(window.location.href));
 if(linkedInUrl != "") $('#linkedin-share-button').attr("data-url", linkedInUrl); else $('#linkedin-share-button').attr("data-url", String(window.location.href));
 if(gPlusUrl != "") $('#gplus-share-button').attr("href", String("https://plus.#.com/share?url="+gPlusUrl)); else $('#gplus-share-button').attr("href", String("https://plus.#.com/share?url="+window.location.href));
 if(instaUrl != "") $('.instaShareBoxHiddenEle').attr("data-url", instaUrl); else $('.instaShareBoxHiddenEle').attr("data-url", String(window.location.href));
}

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.#.net/en_US/all.js#xfbml=1&appId=193426410835519";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', '#-jssdk'));

//!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'https':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.#/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', '#-wjs');
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.#/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', '#-wjs');

function #Share()
{
	var myWindow = window.open($(".instaShareBoxHiddenEle").attr("data-url"),"MsgWindow","width=600,height=600");
	//myWindow.document.write("<iframe src=\""+$(".instaShareBoxHiddenEle").attr("data-url")+"\" title=\"# Widget\" allowTransparency=\"true\" frameborder=\"0\" scrolling=\"no\" style=\"border:none; overflow:hidden; width:390px; height:390px\"></iframe>");	
}
function hideSocialNetSectionBox()
{
	$(".shareBox").addClass("hidden");
}

// main Navigation event functionality 
$(".main-nav ul.list-nav > li > a:first-child").on("click", function(e){
	//selectMainNavTab($(".main-nav ul.list-nav > li").index($(this).parent()));
});

function selectMainNavTab(num)
{
	$(".main-nav ul.list-nav > li").removeClass("active");
	$(".main-nav ul.list-nav > li").eq(num).addClass("active");
}

function InitializeAllSlider()
{
	try
	{
		InitializeCardSlider();
	}
	catch(e){}
	try
	{
		InitializeAwardsRecognitionSlider();
	}
	catch(e){}
	try
	{
		if($(".pills").length>0)
		{
			$(".slideshow .content").css("margin-top","20%");
		}
		else
		{
			$(".slideshow .content").css("margin-top","10%");
		}
		
		// Reduce the space from left menu if added more than once
		$( ".list-account" ).each(function( index ) {
			if(index != 0)
			{
				$(this).css("margin-top","-22px");  
			}
		});
	}
	catch(e){}
}

// Slider Starts Here

// Filters Tools Calculators
function checkBoxChangeToolsCalculators() {
    var cntToolsCalculators = 0;
    $(".CLS_DDL_Category").each(function (i) {
        if ($(this).prop("checked")) {
            cntToolsCalculators++;
            str += ':not([prodselected^="' + $(this).val() + '"])';
            str1 += ':not([prodselected^="' + $(this).val() + '"])';
            str2 += ':not([prodselected^="' + $(this).val() + '"])';
        }
    });
}

function InitializeFiltersToolsCalculators() {
    $('.CLS_DDL_Category01').prop('disabled', true).trigger("chosen:updated");
    if (cntToolsCalculators == 0) {
        $('.CLS_DDL_Category01').prop('disabled', false).trigger("chosen:updated");
    }
    else {
        $(str).remove();
        $(str1).remove();
        $(str2).remove();
        $('.CLS_DDL_Category01').prop('disabled', true).trigger("chosen:updated");
    }

    $(".CLS_DDL_Category").change(function () {
        checkBoxChangeToolsCalculators();
    });

    $(".CLS_DDL_Category01").chosen().change(function () {
        $('input:checkbox').prop('checked', false);
        $('input:checkbox[value="' + $(this).val() + '"]').prop('checked', true);
        if ($(this).val() != "All Categories") $(this).prop('disabled', true).trigger("chosen:updated");
        checkBoxChangeToolsCalculators();
    });
}

// Financial Result
function InitializeFinancialResult() {
    $(".discloResult").hide();
    $("ul.tabs li:first").addClass("active").show();
    $("ul.tabs li").parent().parent().parent().find(".content .discloResult").show();
    $("ul.tabs li").click(function () {
        $(this).parent().parent().find("ul.tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab       
        $(this).parent().parent().parent().find(".content .discloResult").hide(); //Hide all tab content     
        var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
        activeTab = decodeURIComponent(activeTab);
        $(activeTab).show(); //Fade in the active ID content
        return false;
    });

    $('span[data-js="getnotify"]').click(function () { //Open Subscribe Field
        $(this).hide();
        $(this).parent().parent().find('[data-js="subscribe"]').fadeIn();
    }); //end

    $('a[data-js="subscribe"]').click(function () { //Close Subscribe Field
        $(this).parent().parent().find('[data-js="subscribe"]').hide();
        $(this).parent().parent().find('span[data-js="getnotify"]').fadeIn();
    }); //end

    $("#getNotify").validate();
}

function UpdateFinancialNotification(ref) {
    var strFAQID = $(ref).attr("suggestionId");
    var stryear = $(ref).attr("resultyear");
    var strquorterCount = $(ref).attr("resultquorter");
    var inputtext = $('#lbl' + strFAQID).val();
    
    if (!validateEmail(inputtext) || inputtext == "") {
        $('#lbl' + strFAQID).addClass("error");
        $('#errorContainer' + strFAQID).css("display", "block");
        $('#errorContainer' + strFAQID).find("label").eq(0).remove();
        $('#errorContainer' + strFAQID).append("<label for=\"\" class=\"error\">Please enter your email address</label>");
        return false;
    } else {
        $('#lbl' + strFAQID).removeClass("error");
        $('#errorContainer' + strFAQID).find("label").eq(0).remove();
        $('#errorContainer' + strFAQID).css("display", "none");
    }
   
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
    newURL = newURL + "/_vti_bin/listdataapi.aspx/SaveFinancialNotification";
    if (inputtext != null) {
        $.ajax({
            type: "POST",
            url: newURL,
            data: "{'strFinancialNote':'" + inputtext + "','year':'" + stryear + "','quorter':'" + strquorterCount + "'}",
            contentType: "application/json; charset=utf-8",

            dataType: "json",

            success: function (msg) {

                $('[data-js="subscribe"]').hide();
                $('span[data-js="getnotify"]').fadeIn();
                $('#lbl' + strFAQID).val("");
                return false;
            }
        });
    }
    else {
        return false;
    }
    return false;
}

ExecuteOrDelayUntilScriptLoaded(function () {
    var ctx = SP.ClientContext.get_current();
    var web = ctx.get_web();
    var lists = web.get_lists();
    var list = lists.getByTitle("FinancialResultList");
    ctx.load(list, "LastItemModifiedDate");
    ctx.executeQueryAsync(
        function () {
            var lastmodified = list.get_lastItemModifiedDate();
        },
        function () {
        }
    );
}, "sp.js");

// Financial Health Check
var sliderRefFinancialHealthCheck;
var myPlayerFinancialHealthCheck;
var isYoutubeVideoFinancialHealthCheck = false;

function InitializeFinancialHealthCheck() {
    $(".mediaListContainerFinancialHealthCheck video").attr({ "width": "640px", "height": "264px" });
    $(".lightBox, .lightBoxContent").hide();
    $(".viewLightBox").click(function () {
        var renderStr = "";
        var src;
        var videoWidth = 600;
        var videoHeight = 300;
        if ($(this).attr("videoWidth")) videoWidth = parseInt($(this).attr("videoWidth"));
        if ($(this).attr("videoHeight")) videoHeight = parseInt($(this).attr("videoHeight"));

        if (String($(this).attr("isYoutube")).toLowerCase() == "true") {
            isYoutubeVideoFinancialHealthCheck = true;
            src = $(this).attr("youtubeRel");
            $(".mediaContainer .mediaListContainerFinancialHealthCheck").html(makeYouTubeVideoStrFinancialHealthCheck(src, videoWidth, videoHeight));
        }
        else {
            isYoutubeVideoFinancialHealthCheck = false;
            src = $(this).attr("videoRel");
            var poster = $(this).attr("videoPoster");
            $(".mediaContainer .mediaListContainerFinancialHealthCheck").html(makeVideoStrFinancialHealthCheck(src, poster, videoWidth, videoHeight));
            videojs("example_video_1").ready(function () {
                myPlayerFinancialHealthCheck = this;
            });
        }
        rePositionLightBoxCarousel();

    });
    $(".clsBtnFinancialHealthCheck").click(function () {
        if (!isYoutubeVideoFinancialHealthCheck) _V_('example_video_1').dispose();
        $(".mediaContainer .mediaListContainerFinancialHealthCheck").html("");

        removeLightBoxCarousel();
        $(".lightBox, .lightBoxContent").hide();
    });
}

function makeVideoStrFinancialHealthCheck(src, poster, widthRef, heigthRef) {
    var str = "<video id=\"example_video_1\" class=\"video-js vjs-default-skin\" controls preload=\"auto\" width=\"" + widthRef + "\" height=\"" + heigthRef + "\" poster=\"" + poster + "\" data-setup='{\"example_option\":true}'><source src=\"" + src + ".mp4\" type='video/mp4'><source src=\"" + src + ".webm\" type='video/webm'></video>";
    return str;
}
function makeYouTubeVideoStrFinancialHealthCheck(src, widthRef, heigthRef) {
    var str = "<iframe width=\"" + widthRef + "\" height=\"" + heigthRef + "\" src=\"" + src + "\" frameborder=\"0\" allowfullscreen></iframe>";
    return str;
}

function rePositionLightBoxCarousel() {
    windowHeight = ($(window).height() / 2) - ($(".lightBoxContent").height() / 2);
    windowWidth = ($(window).width() / 2) - ($(".lightBoxContent").width() / 2);
    $(".lightBoxContent").css({ "top": String(windowHeight) + "px", "left": String(windowWidth) + "px" });
    $(".lightBox, .lightBoxContent").show();
}
function removeLightBoxCarousel() {
    if (sliderRefFinancialHealthCheck) {
        sliderRefFinancialHealthCheck.destroySlider();
        $(".slide").off("click", onSlideClickRef);
    }
    $(".mediaListContainerFinancialHealthCheck .mediaLabGallery .thumbSliderBox .imageLargeContainer").remove();
    $(".mediaListContainerFinancialHealthCheck .mediaLabGallery .thumbSliderBox .slider1").remove();
}

// Awards & Recognition
function InitializeAwardsRecognitionSlider()
{
	$('#years_sliderAwardsReco').bxSlider({
        minSlides: 1,
        maxSlides: 6,
        moveSlides: 2,
        slideWidth: 76,
        slideMargin: 24,
        pager: false,
        hideControlOnEnd: true,
        infiniteLoop: false
    });
    
    if ($('#years_sliderAwardsReco li').length < 7) {
    	if($('#years_sliderAwardsReco li').length != 0)
    	{
	        setTimeout(function () {
	            $('.bx-next, .bx-prev').addClass('hide');
	        });
        }
    }
   
    $('#years_sliderAwardsReco a').click(function () {
        id = $(this).attr('href');
        $('#years_sliderAwardsReco li').removeClass('active');
        $(this).parent().addClass('active');
        $('.list-awards').hide();
        $(id).fadeIn();
        return false;
    });
    
    //Initialize thumbnail slider
    $(function () {
        $('#years_sliderAwardsRecoAr').jcarousel({ horizontalDirection: 'rtl', rows: 1 });
    });

    $('#years_sliderAwardsRecoAr a').click(function () {
        id = $(this).attr('href');
        $('#years_sliderAwardsRecoAr li').removeClass('active');
        $(this).parent().addClass('active');
        $('.list-awards').hide();
        $(id).fadeIn();
        return false;
    });
}

// Card Slider
function InitializeCardSlider()
{
	$('#cardOfferSlider').flexslider({
         animation: "slide",
         controlNav: false
     });

	$('#cardCarousel').flexslider({
        animation: "slide",
        controlNav: false,
        slideshow: true,
        itemWidth: 200,
        slideshowSpeed: 4000,
        animationLoop: true,
        asNavFor: '#cardSlider',
        rtl: true
    });
    var flexSliderRef = $('#cardSlider').flexslider({
        animation: "slide",
        controlNav: false,
        directionNav: false,
        slideshow: true,
        smoothHeight: true,
        slideshowSpeed: 4000,
        animationLoop: false,
        sync: "#cardCarousel",
        rtl: true
    });
        
	$("#cardCarousel ul > li > a").each(function (index, value) {
        var link = $(this).attr("href");
        $(this).parent().bind("click", function () {
            if (String(link) != "#") location.href = link;
        });
    });
    $("#cardCarousel ul > li > a[href=#" + window.location.href.split("#")[1] + "]").trigger("click");
}
// Card Slider End here

//Home slider initialize
$('#slider').bxSlider({
	pagerCustom: '.carousel-indicators',
	auto: true
});
//End

$('#banner-slider').flexslider({
	animation: "slide",
	directionNav: false
	});


// ADIB in Coummnity Image Slider similar to banner image without text on it
$(' .ourProfileSilder').bxSlider({
    minSlides: 1,
    useCSS: false,
    maxSlides: 1,
    moveSlides: 1,
    auto: true,
    pause: 3000,
    captions: true,
    controls: false
});
        
 $('#accSlider').bxSlider({
          pagerCustom: '.carousel-indicators',
          auto: true,
          controls: false
});
 
$('#years_slider').bxSlider({
    minSlides: 1,
	maxSlides: 6,
	moveSlides: 2,
	slideWidth: 100,
	slideMargin: 0,
	pager: false,
	hideControlOnEnd: true,
	infiniteLoop: false
});

//Initialize thumbnail slider
$('#directorsThumb').bxSlider({
	minSlides: 1,
	maxSlides: 6,
	moveSlides: 2,
	slideWidth: 100,
	slideMargin: 0,
	pager: false,
	hideControlOnEnd: true,
	infiniteLoop: false
	
});

// Slider Ends Here

// Years click function
$('#years_slider a').click(function(){
                id = $(this).attr('href');
                //add active class
                $('#years_slider li').removeClass('active');
                $(this).parent().addClass('active');
                //show content
                $('.list-awards').hide();
                $(id).fadeIn();
                return false;
});

//Hide arrow controls when slides are less then 7
if ($("#directorsThumb").html()) {
	if($('#directorsThumb li').length < 7){
		if($('#directorsThumb li').length != 0)
		{
			setTimeout(function(){
    			$('.bx-next, .bx-prev').addClass('hide');
			});
		}
	}
}

//Board of Directors show details function
$('#directorsThumb a').click(function(){
	id = $(this).attr('href');
	//add active class
	$('#directorsThumb li').removeClass('active');
	$(this).parent().addClass('active');
	//show content
	$('.board-details').hide();
	$(id).fadeIn();
	return false;
});
//End 

$(".rightpanel a[carryforwardquerystring='true']").click(function(){
 	window.location.href = window.location.protocol + "//" + window.location.host + $(".rightpanel a[carryforwardquerystring='true']").attr("href") + "?" + window.location.href;
 	return false;
});


// Sticky footer animation preview - Run only once - updated by Hasim
function adib_bottomPreview(){
	$('[data-rel="calculatorsContainer"]').addClass('active');
	$('.blackcontainer .container').hide();
	$('#calculatorsContainer').show();
	$('.blackcontainer').slideDown(300);
	$('#calculatorsContainer').animate({opacity:1},300);
	setTimeout(function(){
		adib_closebottombar();
	},1200);
}
$(window).load(function(){
	if(typeof(Storage)!=="undefined")
	{
		if(!localStorage.isStickyBarAnimated)
		{
			adib_bottomPreview();
			localStorage.isStickyBarAnimated=true;			
		}		
	}
	else
	{
		adib_bottomPreview();
	}
});
/* From Master Page End Here */

function FAQSearchBoxButtonClicked() {
    if ($(".faq-search .faq-search").val() == "") {
        $(".faq-search .faq-search").addClass("search-not-valid");
    }
    else {
        var searchedFAQ = $(".faq-search .faq-search").val();
        searchedFAQ = encodeURIComponent(searchedFAQ);       
        var faqCategory = 'General';
        faqCategory = GetQueryStringParameterValue("Category");
        if (faqCategory == "") {
             faqCategory = '';
             window.location.href = 'FAQSearchResult.aspx?SearchText=' + searchedFAQ;// + '&Category=' + faqCategory;
        }
        else {
            window.location.href = 'FAQSearchResult.aspx?SearchText=' + searchedFAQ + '&Category=' + faqCategory;
        }
    }
}

function FAQSearchBoxButtonClickedAutoSuggestionItem(selecteQuestionText, selectedItemID, selectedQuestionCategory) {
    var searchedFAQ = selecteQuestionText;
    searchedFAQ = encodeURIComponent(searchedFAQ);

    var faqCategory = 'General';
    faqCategory = GetQueryStringParameterValue("Category");
    if (faqCategory == "") {
        faqCategory = 'General';
    }
    if (selectedQuestionCategory != "") {
        faqCategory = selectedQuestionCategory;
    }      
    window.location.href = 'FAQSearchResult.aspx?SearchText=' + searchedFAQ + '&FAQItemID=' + selectedItemID + '&Category=' + faqCategory;
}

function FAQSearchBoxTextChanged() {
    if ($(".faq-search .faq-search").hasClass("search-not-valid"))
        $(".faq-search .faq-search").removeClass("search-not-valid");
}

function GetQueryStringParameterValue(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) {
        return "";
    }
    else {
        return results[1];
    }
}

function fnCheckValue() {
    var myVal = $("#txtsearch").val();
    if (myVal == "") {

        return false;
    }
    else {
        return true;
    }
}

function EnterEvent(e) {
    if (e.keyCode == 13) {
        if (fnCheckValue()) {
            FAQSearchBoxButtonClicked();
        }
        return false;
    }
}



// This is for Image/Video Slider Starts Here 

$("#accSliderCurrentAccount > li iframe").each(function(i){
	YTVidArr.push(this);
});
$("video").each(function(i){
	VJSVidArr.push($(this).attr("id"));
});
$("video").on("play", function(){
	sliderRef.stopAuto();
});
$(".YT-thumb-btn").each(function(i){
	$(this).on("click", function(){
		sliderRef.stopAuto();
		$(this).removeClass("video-thumb");
		var state = "play";		
		var iframe = YTVidArr[i].contentWindow;
		//div.style.display = state == 'hide' ? 'none' : '';
		func = state == 'pause' ? 'pauseVideo' : 'playVideo';
		iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');		
	});
});

function playPauseYTVideo(state) {
	for(var i=0;i<YTVidArr.length;i++)
	{
		var iframe = YTVidArr[i].contentWindow;
		//div.style.display = state == 'hide' ? 'none' : '';
		func = state == 'pause' ? 'pauseVideo' : 'playVideo';
		iframe.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
	}
	$("video").trigger("pause");
}
function pauseVidJSVideo(state)
{
	for(var i=0;i<VJSVidArr.length;i++)
	{
		var myPlayer = videojs(VJSVidArr[i]);
		state == "pause" ? myPlayer.pause() : myPlayer.play();
	}
}
sliderRef = $('#accSliderCurrentAccount').bxSlider({
	pagerCustom: '.carousel-indicators',
	auto: true,
	controls: false, 
	onSlideBefore: function($slideElement, oldIndex, newIndex)
	{
		playPauseYTVideo("pause");
		/*$(".YT-thumb-btn").each(function(i){
			if(!$(this).hasClass("video-thumb"))
			{
				$(this).addClass("video-thumb");
			}
		});*/ 
		pauseVidJSVideo("pause");		
	}
});


$(".mediaListContainer video").attr({"width":"640px", "height":"264px"});
$(".lightBox, .lightBoxContent").hide();

// Image/Video Slider Ends here

// Validate Functions
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test($email)) {
        return false;
    } else {
        return true;
    }
}

function validateNumber($number) {
    var phoneReg = /^[0-9/#+-;*]*$/;
    if (!phoneReg.test($number)) {
        return false;
    } else {
        return true;
    }
}

function InitilizeNewsLetterSubscription()
{
	$("#enquiryForm #subscribe").on("click", function (e) {
        var cnt = 0;
        $("#enquiryForm .error-container ul").empty();

        if (!validateEmail($("#enquiryForm #emailAddress").val()) || $("#enquiryForm #emailAddress").val() == "") {
            cnt++;
            $("#enquiryForm #emailAddress").addClass("error");
            $("#enquiryForm .error-container ul").append("<li>" + messages.emailAddress + "</li>");
        } else { $("#enquiryForm #emailAddress").removeClass("error"); }

        if (cnt > 0) {
            e.preventDefault();
            $("#enquiryForm .error-container").css("display", "block");
        }
        else {
            $("#enquiryForm .error-container").css("display", "none");
        }
    });
}

// News letter Subscription
function UpdateSubScribe(ref) {
    var strSubScribeID = $(ref).attr("id");
    var inputtext = $('#emailAddress').val();

    //error Validation
    var cnt = 0;
    $("#enquiryForm .error-container ul").empty();

    if (!validateEmail($("#enquiryForm #emailAddress").val()) || $("#enquiryForm #emailAddress").val() == "") {
        cnt++;
        $("#enquiryForm #emailAddress").addClass("error");
        $("#enquiryForm .error-container ul").append("<li>" + messages.emailAddress + "</li>");
    } else { $("#enquiryForm #emailAddress").removeClass("error"); }

    if (cnt > 0) {
        e.preventDefault();
        $("#enquiryForm .error-container").css("display", "block");
        return false;
    }
    else {
        $("#enquiryForm .error-container").css("display", "none");
    }

    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
    newURL = newURL + "/_vti_bin/listdataapi.aspx/SaveSubscribeWidgetData";
    $.ajax({
        type: "POST",
        url: newURL,
        data: "{'email':'" + inputtext + "'}",
        contentType: "application/json; charset=utf-8",

        dataType: "json",

        success: function (msg) {
            $('#emailAddress').val("");
            $('#thankYoumsg').css('display', 'inline-block');
            return false;
        }
    });
    return false;
}
// News Letter Subscription end here

// Request A Call Validation
function InitializeValidateRequestCall() {
    $(".Validate-Request-Call").on("click", function (e) {
        messages = {
            firstName: "Please enter your name.",
            emailAddress: "Please enter your email address.",
            contactNum: "Please enter your contact number."
        };
        var cnt = 0;
        $("#enquiryForm .error-container ul").empty();
        if ($("#enquiryForm #firstName").val() == "") {
            cnt++;
            $("#enquiryForm #firstName").addClass("error");
            $("#enquiryForm .error-container ul").append("<li>" + messages.firstName + "</li>");
        } else { $("#enquiryForm #firstName").removeClass("error"); }
        if (!validateEmail($("#enquiryForm #emailAddress").val()) || $("#enquiryForm #emailAddress").val() == "") {
            cnt++;
            $("#enquiryForm #emailAddress").addClass("error");
            $("#enquiryForm .error-container ul").append("<li>" + messages.emailAddress + "</li>");
        } else { $("#enquiryForm #emailAddress").removeClass("error"); }
        if ($("#enquiryForm #contactNum").val() == "") {
            cnt++;
            $("#enquiryForm #contactNum").addClass("error");
            $("#enquiryForm .error-container ul").append("<li>" + messages.contactNum + "</li>");
        } else { $("#enquiryForm #contactNum").removeClass("error"); }
        if (cnt > 0) {
            e.preventDefault();
            $("#enquiryForm .error-container").css("display", "block");
        }
        else {
            $("#enquiryForm .error-container").css("display", "none");
        }
    });
}

jQuery.fn.ForceNumericOnly = function(){
     return this.each(function()
     {
         $(this).keydown(function(e)
         {
             var key = e.charCode || e.keyCode || 0;
             // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
             return (
                 key == 8 || 
                 key == 9 ||
                 key == 46 ||
                 (key >= 37 && key <= 40) ||
                 (key >= 48 && key <= 57) ||
                 (key >= 96 && key <= 105));
         });
     });
};

$(".number").ForceNumericOnly();

function ConvertJSONDateToNormalDate(dateInputValue) {
    try
    {
        var dateString = dateInputValue.substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var date = month + "/" + day + "/" + year;
        return date;
    }
    catch (e) { }
}

function FormatOfferDate(dateTimeValue) {
    if (dateTimeValue.indexOf(" ") != -1) {
        dateTimeValue = new Date(Date.parse(dateTimeValue.split(' ')[0]));
    }
    else {
        dateTimeValue = new Date(Date.parse(dateTimeValue));
    }    
    var today;
    var Month = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var Suffix = new Array("th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th");
    var day = dateTimeValue.getDate();

    var month = dateTimeValue.getMonth();

    if (day % 100 >= 11 && day % 100 <= 13)
        today = day + "th";
    else
        today = day + "<sup>" + Suffix[day % 10] + "</sup>";

    return today + " " + Month[month] + " " + dateTimeValue.getFullYear();
}

function LoadWheelsDeals() {
    try {
        var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[1];
        var siteURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
        try {
            $.ajax({
                type: "POST",
                url: siteURL + "/_vti_bin/listdataapi.aspx/GetDataTableFromSharePointList",
                data: "{'siteURL':'" + siteURL + "','listName':'" + "Wheels Deals" + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (returnData) {
                    if (returnData.d != null) {
                        applicationSettings = $.parseJSON(returnData.d);
                        var sectionHTML = "";
                        var dealerURL = "#";
                        var applyNowURL = "#";
                        var isHeaderLoaded = false;
                        var offerDate = "";
                        var finalHTML = "<table id='WheelsDealsOfferTable' class='display dataTable' cellspacing='0' width='100%' role='grid' aria-describedby='example_info' style='width: 100%;'>";
                        finalHTML += "<thead><tr role='row'><th style='display:none;'></th><th class='sorting_asc' tabindex='0' aria-controls='example' rowspan='1' colspan='1' aria-sort='ascending' aria-label='Name: activate to sort column descending' style='width:137px;'></th></tr></thead>";
                        finalHTML += "<tbody>";
                        for (var i = 0; i < applicationSettings.length; i++) {
                            try {
                                offerDate = ConvertJSONDateToNormalDate(applicationSettings[i].OfferExpiryDate);
                                if (applicationSettings[i].IsActive === "1" && new Date(Date.parse(offerDate)) >= new Date()) {
                                    if (!(applicationSettings[i].DealerURL === undefined || applicationSettings[i].DealerURL === null)) {
                                        dealerURL = applicationSettings[i].DealerURL;
                                    }
                                    if (!(applicationSettings[i].ApplyNowLink === undefined || applicationSettings[i].ApplyNowLink === null)) {
                                        applyNowURL = applicationSettings[i].ApplyNowLink;
                                    }
                                    sectionHTML = "<tr role='row'><td  style='display:none;'>" + applicationSettings[i].OrderBy + "</td><td class='sorting_1'><section id='offers'>";
                                    sectionHTML += "<figure><div class='img'><img alt='" + applicationSettings[i].Title + "' src='" + applicationSettings[i].ManufacturerLogoURL + "'>&nbsp;</div><figcaption><h3><a href='" + dealerURL + "'>" + applicationSettings[i].DealerTitle + "</a></h3></figcaption></figure>";
                                    sectionHTML += "<div class='specialOffers'>&nbsp;</div>";
                                    sectionHTML += "<div class='details'>" + applicationSettings[i].OfferDetails + "</div>";
                                    sectionHTML += "<div class='actions'><ul><li class='date'><span>&nbsp;</span><p>OFFER VALID UNTIL<br>" + FormatOfferDate(offerDate) + "</p></li><li class='apply'><a class='applyNow' href='" + applyNowURL + "'><span>&nbsp;</span><p>APPLY NOW</p></a></li></ul></div>";
                                    sectionHTML += "</section></td></tr>";
                                    finalHTML += sectionHTML;
                                }
                            } catch (e) { }
                        }
                        finalHTML += "</tbody></table>";
                        $('[id$="wheels_container_Offers_Listing"]').append(finalHTML);
                        $('#WheelsDealsOfferTable').DataTable({
                            "pagingType": "full_numbers",
                            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, 100]]
                        });
                    }
                }
            });
            return false;
        }
        catch (e) { }
    }
    catch (e) { }
}
// Wheels & Deals Ends Here
function LoadProcurementView() {
    try {
        var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[1];
        var siteURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
        try {
            $.ajax({
                type: "POST",
                url: siteURL + "/_vti_bin/listdataapi.aspx/GetDataTableFromSharePointList",
                data: "{'siteURL':'" + siteURL + "','listName':'" + "ProcurementList" + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (returnData) {
                    if (returnData.d != null) {
                        applicationSettings = $.parseJSON(returnData.d);
                        var sectionHTML = "";
                        var dealerURL = "#";
                        var ReadMoreURL = "#";
                        var isHeaderLoaded = false;
                        var offerDate = "";
                        var finalHTML = "<table id='WheelsDealsOfferTable' class='display dataTable' cellspacing='0' width='100%' role='grid' aria-describedby='example_info' style='width: 100%;'>";
                        finalHTML += "<thead><tr role='row'><th style='display:none;'></th><th class='sorting_asc' tabindex='0' aria-controls='example' rowspan='1' colspan='1' aria-sort='ascending' aria-label='Name: activate to sort column descending' style='width:137px;'></th></tr></thead>";
                        finalHTML += "<tbody>";
						finalHTML += "<div class='single-item'>";
                        for (var i = 0; i < applicationSettings.length; i++) {
                            try {
                                offerDate = ConvertJSONDateToNormalDate(applicationSettings[i].Date);
                                if (applicationSettings[i].IsActive === "1" && new Date(Date.parse(offerDate)) >= new Date()) {
                                    //if (!(applicationSettings[i].ImageLink === undefined || applicationSettings[i].ImageLink === null)) {
                                    //    dealerURL = applicationSettings[i].ImageLink;
                                    //}
                                    //if (!(applicationSettings[i].ID === undefined || applicationSettings[i].ID === null)) {
                                    //    ReadMoreURL = applicationSettings[i].ID; 
                                    //}
                                    sectionHTML = "<tr role='row'><td  style='display:none;'>" + applicationSettings[i].OrderBy + "</td><td class='sorting_1'><section id='offers'>";
									sectionHTML += "<div class='item-content'><h2>" + applicationSettings[i].Title + "</h2><p>" + applicationSettings[i].Subtitle + "</p></div>";
                                    sectionHTML += "<div class='item-left'><p>" + FormatOfferDate(offerDate) + "</p></div>";
									sectionHTML += "<div class='item-right'><a class='link-readmore' href='/en/Pages/Procurementdetails.aspx?ID="+ btoa(applicationSettings[i].ID) +"'>Read More</a></div>";
                                    sectionHTML += "</section></td></tr>";
                                    finalHTML += sectionHTML;
                                }
                            } catch (e) { }
                        }
                        finalHTML += "</div></tbody></table>";
                        $('[id$="Procurement_container_Listing"]').append(finalHTML);
                        $('#WheelsDealsOfferTable').DataTable({
                            "pagingType": "full_numbers",
                            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, 100]]
                        });
                    }
                }
            });
            return false;
        }
        catch (e) { }
    }
    catch (e) { }
}
// LoadProcurementDetail
function LoadProcurementDetailsByID() {
    try {
        var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[1];
        var siteURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
        var varID = '0';
    	varID = atob(GetQueryStringParameterValue("ID"));

        try {
            $.ajax({
                method: "GET",
                url: siteURL + "/_api/web/lists/getbytitle('ProcurementList')/items(" + varID + ")",
                headers: { "Accept": "application/json; odata=verbose" },
                //data: "{'siteURL':'" + siteURL + "','listName':'" + "ProcurementList" + "'}",
                //contentType: "application/json; charset=utf-8",
                //dataType: "json",
                success: function (returnData) {
                    if (returnData.d != null) {
                        applicationSettings = returnData.d;
                        var finalHTML = "<body>";
                        
						finalHTML += "<div class='item-top'><div class='item-top-left'><h3>" + applicationSettings.Title + "</h3></div>";
						finalHTML += "<div class='item-top-right'><a href='/en/Pages/Procurement.aspx' class='backTo'>Back to News</a></div>";
						finalHTML += "</div><div class='item-detail'><p>" + applicationSettings.ProcurementDetailsDescription + "</p></div>";
                        
                        finalHTML += "</body>";
                        $('[id$="ProcurementDetails_container_Listing"]').append(finalHTML);
                    }
                }
            });
            return false;
        }
        catch (e) { }
    }
    catch (e) { }
}
// LoadProcurementDetail Ends