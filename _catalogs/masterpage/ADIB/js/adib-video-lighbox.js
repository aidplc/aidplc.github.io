// [Created by Hasim S. Choudhary on 22-Oct-2014]
// [This file be used to play ADIB configured videos in ligh box]

var sliderRef;
var myPlayer;
var isYoutubeVideo = false;

function makeVideoStr(src, poster, widthRef, heigthRef) {
    var str = "<video id=\"example_video_1\" class=\"video-js vjs-default-skin\" controls preload=\"auto\" width=\"" 
    		+ widthRef + "\" height=\"" + heigthRef + "\" poster=\"" 
    		+ poster + "\" data-setup='{\"example_option\":true}'><source src=\"" 
    		+ src[0] + "\" type='video/mp4'><source src=\"" 
    		+ src[1] + "\" type='video/webm'></video>";
    return str;
}

function makeYouTubeVideoStr(src, widthRef, heigthRef) {
    var str = "<iframe width=\"" + widthRef + "\" height=\"" + heigthRef + "\" src=\"" + src + "\" frameborder=\"0\" ></iframe>";
    return str;
}

function removeVideoLightBoxCarousel() {
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox .imageLargeContainer").remove();
    $(".mediaListContainer .mediaLabGallery .thumbSliderBox .slider1").remove();
}

function InitializeVideoLightBox()
{
	try
	{
		$(".mediaListContainer video").attr({ "width": "640px", "height": "264px" });
		$(".lightBox, .lightBoxContent").hide();
		$(".viewVideoLightBox").click(function () {
		    var renderStr = "";
		    var src;
		    var videoWidth = 600;
		    var videoHeight = 300;
		    if ($(this).attr("videoWidth")) videoWidth = parseInt($(this).attr("videoWidth"));
		    if ($(this).attr("videoHeight")) videoHeight = parseInt($(this).attr("videoHeight"));
		
		    if (String($(this).attr("isYoutube")).toLowerCase() == "true") {
		        isYoutubeVideo = true;
		        src = $(this).attr("youtubeRel");
		        $(".mediaContainer .mediaListContainer").html(makeYouTubeVideoStr(src, videoWidth, videoHeight));
		    }
		    else {
		        isYoutubeVideo = false;
		        var srcArr = [];
		        srcArr.push($(this).attr("videoRelMp4"));
		        srcArr.push($(this).attr("videoRelWebm"));
		        var poster = $(this).attr("videoPoster");
		        $(".mediaContainer .mediaListContainer").html(makeVideoStr(srcArr, poster, videoWidth, videoHeight));
		        videojs("example_video_1").ready(function () {
		            myPlayer = this;
		        });
		    }
		    rePositionLightBoxCarousel(); // this function is available in financialCalendar.js
		
		});
		
		$(".close-video-light-box").click(function () {
        	if (!isYoutubeVideo) _V_('example_video_1').dispose();
        	$(".mediaContainer .mediaListContainer").html("");

        	removeVideoLightBoxCarousel();
        	$(".lightBox, .lightBoxContent").hide();
    	});
		
		$(".dwnldLightBox").click(function () {
		    $(".downloadForm").show();
		    $(".mngerForm").hide();
		    rePositionLightBoxCarousel();
		});
		$(".managerLightBox").click(function () {
		    $(".downloadForm").hide();
		    $(".mngerForm").show();
		    rePositionLightBoxCarousel();
		});
	}
	catch(e){}
}

