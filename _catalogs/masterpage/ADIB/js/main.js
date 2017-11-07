// [Created by Hasim S. Choudhary on 22-Oct-2014]
// Initiate all the scripts from here
// Is the user on an iPad?
var isIpad = navigator.platform.toLowerCase() === "ipad";

//Start event for all scripts
$(document).ready(function () {
    try 
    {              
         InitializeAll();  
         ADIBCrossBrowserIssues();     
         InitializeChatAgents();               
    }
   catch (e) { }
   
});


function InitializeAll()
{
    // try {checkVersion();}catch (e) { } // This is moved in Master Page header to redirect immediatly.
        try {
        if (window.location.href.toLowerCase().indexOf("adib.ae") != -1)
        {
            if (window.location.port != "8080") {
                $('[id$="ms-designer-ribbon"]').hide();
            }
        }
    } catch (e) { }
    try { InitilizePageFunction(); } catch (e) { }
	try {InitializeChatEvents();}catch (e) { }
    try{InitializeSocialLinkEvents();}catch(e){}
	try{Initialize#Map();}catch(e){}
	try{InitializeVideoLightBox();}catch(e){}
    try{InitializeFinancialCalendar();}catch(e){}
    try{InitializeCardCompare();}catch(e){}
    try{InitializeAllSlider();}catch(e){}
    try{InitilizeNewsLetterSubscription();}catch(e){}
    try{InitializeADIBSearchResult();}catch(e){}
    try{InitializeApplyNowForm();}catch(e){}
    try{InitializeContactUsForm();}catch(e){}
    try{InitializeFAQSearchBox();}catch(e){}
    try{InitializeFAQSearchResult();}catch(e){}
    try{InitializeFiltersToolsCalculators();}catch(e){}
    try{InitializeFinancialHealthCheck();}catch(e){}
    try{InitializeFinancialResult();}catch(e){}    
    try{InitializeOffersAndPromotions();}catch(e){}
    try{InitializeOffersAndPromotionsSubscriptions();}catch(e){}
    try{InitializeValidateRequestCall();}catch(e){}
    try{InitializeRetirementPlannerCalculator();}catch(e){}
    try{InitializeImageGallery();}catch(e){}
    try{InitializeVideoGallery();}catch(e){}
    try{InitializeNews();}catch(e){}
    try {InitCalculators(); } catch (e) { }
    try {BindValidationKeyPressEvent(); } catch (e) { }
    try {InitLanguageChange()(); } catch (e) { }
    try{
		setTimeout(function(){
		$('[id$="btnSubscribe"]').click();},3000);
	}catch(e){} 
}

function InitLanguageChange() {
    // Arabic Site
    if (window.location.pathname.toLowerCase().indexOf('/en') == -1) {
        $('[id$="HeaderDropdownList"]').addClass("chosen-rtl");
        $('[id$="language"]').click(function () {
            window.location.href = window.location.pathname.replace("/ar", "/en") + window.location.search;
        });
    }
    else {
        $('[id$="language"]').click(function () {
            window.location.href = window.location.pathname.replace("/en", "/ar") + window.location.search;
        });
    }
    return false;
}


function InitializeSocialLinkEvents() {
    try {
        $(".followUs .socialSitePage").hide();
        $("#faceblayout").show();
        $(".socialBtn:first").addClass("active");

        $(".socialBtn").on('click', function () {
            $(".socialBtn").removeClass("active");
            $(this).addClass("active");
            $(".followUs .socialSitePage").hide();
            var str = "#" + String($(this).attr("id")) + "layout";
            $(str).show();
        });

        $(".shareBox .share div.shareSocialBtn").click(function () {
            $(".expand").hide();
            $(".shareBox .share div.shareSocialBtn").removeClass("active");
            if ($(this).find(".expand").width() == 0) {
                $(".shareBox .share div.shareSocialBtn .expand").css("width", "0");
                $(this).find(".expand").show().animate({ "width": "140px" }, 250);
                $(this).addClass("active");

            }
            else {
                $(this).find(".expand").show().animate({ "width": "0px" }, function () { $(this).hide(); });
                $(this).removeClass("active");
            }
        });
        $(".shareGPlus").hide();
    }
    catch (e) { }
}

// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
function getInternetExplorerVersion() {
    var rv = -1; // Return value assumes failure.

    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

        if (re.exec(ua) != null) {
            rv = parseFloat( RegExp.$1 );
        }
    }
    return rv;
}

function checkVersion() {
    var ver = getInternetExplorerVersion();
    if ( ver > -1 ) {
        if ( ver >= 9.0 ) {
            return true;
        }
        else {
                 window.location.href = "/Pages/BrowserNotSupported_English.aspx";
            return false;
        }
    }
}


function Initialize#Map()
{
	if(window.location.pathname.toLowerCase().indexOf('atmbranches') != -1){
		InitializeATMBranch();
		initialize();
	}
}


function InitializeChatEvents() {

	$(".i-chatActive").click(function () {
		CheckOnlineAgentsOnServer();
	    $(".chatWrap").slideDown(800);
	});

        $(".chat").click(function () {
		CheckOnlineAgentsOnServer();
	    $(".chatWrap").slideDown(800);
	});

    // for web chat to close the login screen
    $(".minimize").click(function () {
        $(".chatContent").slideToggle(500);
        if ($(this).hasClass("down")) {
            $(".minimize").removeClass("down");
            $(".chatWrapIframe", parent.document).height(420);
        }
        else {
            $(".minimize").addClass("down");
            $(".chatWrapIframe", parent.document).height(45);
        }
    });
    $(".chatClose").click(function () {
        try {
            $(".chatWrap", parent.document).hide();
			localStorage.setItem("IsChatUserAlive","no");
            CloseChat();
		// Set login page back after log out
            if (window.location.pathname.toLowerCase().indexOf('/en') == -1)
                       {
                               $('.chatWrapIframe', parent.document).attr('src', '/ar/_layouts/15/ADIB/Chat/ar/UserLogin.aspx');
                       }
                       else
                       {
                               $('.chatWrapIframe', parent.document).attr('src', '/en/_layouts/15/ADIB/Chat/en/UserLogin.aspx');
                       }

        }
        catch (e) { }
    });
}

//BOTTOM SLIDE UP / SLIDE DOWN FUNCTIONALITY
$('[data-js="bottomlinks"]>li').click(function () {
    var id = $(this).attr('data-rel');

    if ($(this).hasClass('active')) {
        adib_closebottombar();
    }
    else {
        $('[data-js="bottomlinks"]>li').removeClass('active');
        $(this).addClass('active');
        $('.blackcontainer .container').hide();
        $('#' + id).show()
        $('.blackcontainer').slideDown(300);
        $('#' + id).animate({ opacity: 1 }, 300);
    }
});

$('[data-js="bottombarclose"]').click(function () {
    adib_closebottombar();
});

function adib_closebottombar() {
    $('.blackcontainer').slideUp(300, function () {
        $('#videosContainer, #calculatorsContainer').hide();
        $('[data-js="bottomlinks"]>li').removeClass('active');
    });

}
//END

//BOTTOM STICKY BAR FIX FUNCTION
if ($('[data-js="stickyfoo"]').length > 0 && !isIpad) {

    var adib_stickyNav = function () {
        var stickyNavTop = $('.mainfooter').offset().top;
        var scrollTop = $(window).scrollTop() + $(window).height() - 46;
        if (scrollTop > stickyNavTop) {
            $('[data-js="stickyfoo"]').removeClass('sticky');
        } else {
            $('[data-js="stickyfoo"]').addClass('sticky');
        }
    };

    adib_stickyNav();

    if ($("#aspnetForm").html()) {
        $("#aspnetForm > div").scroll(function () {
            adib_stickyNav();
        });
    }
    else {
        $(window).scroll(function () {
            adib_stickyNav();
        });
    }

}
//END

//Current Account page Gray Tabs Arrow slide animation function
var adib_grayTabsAnimate = function () {

    var ulOffsetLeft = $('ul.list-graytabs').offset().left;
    var currentOffset = $(this).offset().left;

    var adib_delta = currentOffset - ulOffsetLeft;
    adib_delta = adib_delta + 12

    $('#adib_tabsArrow').clearQueue().animate({ 'margin-left': adib_delta });

}

$('ul.list-graytabs li').click(adib_grayTabsAnimate);
//end


//Accordion - Created for FAQ page
$('.accordion h6').click(function () {

    if ($(this).next('.content').is(':hidden')) {
        $(this).parents('.accordion').find('.panel').removeClass('active');
        $(this).parents('.panel').addClass('active');
        $(this).parents('.accordion').find('.content').slideUp(500);
        $(this).next('.content').slideDown(500);
    }
    else {
        $(this).parents('.panel').removeClass('active');
        $(this).next('.content').slideUp(500);
    }
});
//End

//FAQ FEEDBACK FORM CLICK EVENTS
/*============NO CLICK===============*/
$('[data-js="feedback"]').click(function () {
    $content = $(this).parents('.feedback-form').find('.contentbox');

    if ($content.is(':hidden')) {
        $(this).addClass('active');
        $(this).parents('.feedback-form').addClass('active');
        $content.slideDown(200);
    }
    else {
        $('.accordion .button.darkblue').removeClass('active');
        $(this).parents('.feedback-form').removeClass('active');
        $content.slideUp(200);
    }
});

/*============Yes CLICK===============*/
$('[data-js=yes-feedback]').click(function () {
    $(this).parents('.bc').hide();
    $(this).parents('.feedback-form').find('.thanks-msg').fadeIn();
    $(this).parents('.feedback-form').find('.contentbox').hide();
});
//END

function bookmarkPageCookies() {
    if (typeof (Storage) !== "undefined") {
        localStorage.adibBookmarkPage = String(window.location.href);
    }
}

function ADIBCrossBrowserIssues()
{
	try
	{              
        //Cross Browser Placeholder starts here
		if (!Modernizr.input.placeholder) {
		    $('[placeholder]').focus(function () {
		        var input = $(this);
		        if (input.val() == input.attr('placeholder')) {
		            input.val('');
		            input.removeClass('placeholder');
		        }
		    }).blur(function () {
		        var input = $(this);
		        if (input.val() == '' || input.val() == input.attr('placeholder')) {
		            input.addClass('placeholder');
		            input.val(input.attr('placeholder'));
		        }
		    }).blur();
		    $('[placeholder]').parents('form').submit(function () {
		        $(this).find('[placeholder]').each(function () {
		            var input = $(this);
		            if (input.val() == input.attr('placeholder')) {
		                input.val('');
		            }
		        })
		    });
		}
		// Cross Browser Placeholder end here
	}
	catch(e){}
}

// Application Settings
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var currentSiteURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
                
    function GetSiteListsfromServer() {
        try {
            $.ajax({
                type: "POST",
                url: currentSiteURL + "/_vti_bin/listdataapi.aspx/GetListNames",
                data: "{'siteurl':'" + $($(".ddlSites option:selected")).text() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (listnames) {
                    var listnamesdata = $.parseJSON(listnames.d).listname.split(',');
                    $(".ddlLists").empty();
                    for(var counter = 0; counter < listnamesdata.length; counter++)
                    {
                        $(".ddlLists").append("<option value=\"" + listnamesdata[counter] + "\">" + listnamesdata[counter] + "</option>");
                    }
                }
            });
            return false;
        }
        catch (e) { }
    }
    
    
    function ClearAllListItems() {
        $('[id$="dvMessage"]').text('');
        
        if($($(".ddlSites option:selected")).text().trim() == "")
        {
            alert("Select Site URL");
            $('[id$="dvMessage"]').html("<b style='color:red'>Select Site URL</b");
            return false;
        }
        
        if($($(".ddlLists option:selected")).text().trim() == "")
        {
            alert("Select List");
            $('[id$="dvMessage"]').html("<b style='color:red'>Select List</b");
            return false;
        }
        
        if (!confirm('Are you sure to clear all data?')) {
            return false;
        }
        if (!confirm('Are you sure? This is just a double check')) {
            return false;
        }       
        try {
            $.ajax({
                type: "POST",
                url: currentSiteURL + "/_vti_bin/listdataapi.aspx/ClearAllListItems",
                data: "{'siteurl':'" + $($(".ddlSites option:selected")).text() + "','listname':'" + $($(".ddlLists option:selected")).text() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (returnValue) {
                    if ($.parseJSON(returnValue.d).status == "true") {
                        $('[id$="dvMessage"]').text("Operation completed successfull");
                    }
                    else {
                        $('[id$="dvMessage"]').html("<b style='color:red'>Error while deleting reocrds</b");
                    }
                }
            });
            return true;
        }
        catch (e) {}        
    }
    
    
    function GenerateNewID() {
        $('[id$="dvMessage"]').text('');
            try {
                $.ajax({
                    type: "POST",
                    url: currentSiteURL + "/_vti_bin/listdataapi.aspx/GenerateNewID",
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (returnValue) {
                        $('[id$="dvMessage"]').html("New Generated ID is : <b>" + $.parseJSON(returnValue.d).newID + "</b");
                    }
                });
                return true;
            }
            catch (e) {}
    }
    
    function EncryptTextValue() {
        $('[id$="dvMessage"]').text('');
        $('[id$="txtEncrypt"]').removeClass("error");
        if($('[id$="txtEncrypt"]').val() == "")
        {
        	$('[id$="dvMessage"]').html("Enter value to encrypt");
        	$('[id$="txtEncrypt"]').addClass("error");
        	return false;
        }
	        if(currentSiteURL == "http://spwebsrv01:8080/Lists" || currentSiteURL == "http://spwebsrv02:8080/Lists")
	        {
	        	currentSiteURL = window.location.protocol + "//" + window.location.host + "/en"
	        }
            try {
                $.ajax({
                    type: "POST",
                    url: currentSiteURL + "/_vti_bin/listdataapi.aspx/EncryptData",
                    data: "{'valueToEncrypt':'" + $('[id$="txtEncrypt"]').val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (returnValue) {
                        $('[id$="dvMessage"]').html("Encrypted Value is : <b>" + $.parseJSON(returnValue.d).EncryptedValue + "</b");
                    }
                });
                return true;
            }
            catch (e) {}
    }
 
 
    function DecryptTextValue() {
        $('[id$="dvMessage"]').text('');
            try {
                $.ajax({
                    type: "POST",
                    url: currentSiteURL + "/_vti_bin/listdataapi.aspx/DecryptData",
                    data: "{'valueToDecrypt':'" + $('[id$="txtEncrypt"]').val() + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (returnValue) {
                        $('[id$="dvMessage"]').html("Decrypted Value is : <b>" + $.parseJSON(returnValue.d).DecryptedValue+ "</b");
                    }
                });
                return true;
            }
            catch (e) {}
    }
 
 
// End for Application Settings

// To run only one time and then cache it. 
//Only one time we need to automaticlaly open the sticky footer content for user.
$(window).load(function () {
	$("#s4-workspace").scrollTop(0);
    bookmarkPageCookies();
    try
    {
    	adib_stickyNav();
    }
    catch(e){}
});

