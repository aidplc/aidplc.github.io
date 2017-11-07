// [Created by Hasim S. Choudhary on 27-Oct-2014]

var FAQLitsItems = "";
var catValue = "";

function InitializeFAQSearchResult() {	
    catValue = $("#lblSelectedCategory").text();
    $(".rightpanel .accordionFAQSearchResult").children().find(".panel").each(function () {
        if ($(this).children("h6").text().toLowerCase().indexOf($(".faq-search .faq-search").val().toLowerCase()) >= 0 && $(".faq-search .faq-search").val() != "") {
            $(this).addClass("active");
            $(this).children(".content").css("display", "block");
        }
    });

    $("#breadCrumbSelectedCategory").html(catValue);
    $("#breadCrumbTitleSelectedCategory").html(catValue);
    messages = {
	    emailAddress: $('.span-PleaseEnterEmailAddressText').text(),
	    suggestionsRef: $('.span-PleaseEnterSuggestionText').text()
	};  
    GetFAQSearchResultData();
}

function processFBYes(idRef) {
    $("#" + idRef).parent().parent().prev().css('display', 'block');
    $("#" + idRef).parent().parent().css('display', 'none');

}

function ValidateDataFAQSearchResult(ref) {
    var emailRef = $(ref).parent().parent().parent().parent().find("tbody > tr:nth-child(1) input");
    var suggesionRef = $(ref).parent().parent().parent().parent().find("tbody > tr:nth-child(2) textarea");
    var emailValidateFg = false;
    var suggesionValidateFg = false;
    if (!validateEmail(emailRef.val()) || emailRef.val() == "") {
        emailRef.addClass("errorEmail");
    }
    else {
        emailValidateFg = true;
        if (emailRef.hasClass("errorEmail")) emailRef.removeClass("errorEmail");
    }
    if (suggesionRef.val() == "") {
        suggesionRef.addClass("errorEmail");
    }
    else {
        suggesionValidateFg = true;
        if (suggesionRef.hasClass("errorEmail")) suggesionRef.removeClass("errorEmail");
    }

    if (emailValidateFg && suggesionValidateFg) {
        $(ref).parent().append("<span style=\"display: none;\">Suggestions submitted</span>");
        $(ref).parent().find("span").fadeIn("slow");
        setTimeout(function (ref) { $(ref).find("span").fadeOut(500, function () { $(ref).remove(); }); }, 3000, $(ref).parent());
        $(ref).prev().click();
    }
    else {
        return false;
    }
}

function SubmitSuggestionsFAQSearchResult(ref) {
    $(ref).parent().parent().parent().parent().prev().find("ul").empty();
    var emailRef = $(ref).parent().parent().parent().parent().find("tbody > tr:nth-child(1) input");
    var suggesionRef = $(ref).parent().parent().parent().parent().find("tbody > tr:nth-child(2) textarea");
    var faqItemID = $(ref).attr("FAQItemID");
    var faqQuestionText = $(ref).attr("QuestionText");
    var emailValidateFg = false;
    var suggesionValidateFg = false;
    if (!validateEmail(emailRef.val()) || emailRef.val() == "") {
        $(ref).parent().parent().parent().parent().prev().css("display", "block");
        emailRef.addClass("errorEmail");
        $(ref).parent().parent().parent().parent().prev().find("ul").append("<li>" + messages.emailAddress + "</li>");
    }
    else {
        emailValidateFg = true;
        if (emailRef.hasClass("errorEmail")) emailRef.removeClass("errorEmail");
    }
    if (suggesionRef.val() == "") {
        $(ref).parent().parent().parent().parent().prev().css("display", "block");
        suggesionRef.addClass("errorEmail");
        $(ref).parent().parent().parent().parent().prev().find("ul").append("<li>" + messages.suggestionsRef + "</li>");
    }
    else {
        suggesionValidateFg = true;
        if (suggesionRef.hasClass("errorEmail")) suggesionRef.removeClass("errorEmail");
    }

    if (emailValidateFg && suggesionValidateFg) {
        $(ref).parent().parent().parent().parent().prev().css("display", "none");
        SaveFAQSuggestions(ref, faqItemID, emailRef.val(), suggesionRef.val(), faqQuestionText);
        return false;
    }
    else {          
        return false;
    }
}

function SaveFAQSuggestions(ref, strFAQID, strEmailID, strSuggestions, strQuestionText) {               
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
    newURL = newURL + "/_vti_bin/listdataapi.aspx/SaveFAQSuggestions";        
        $.ajax({
            type: "POST",                
            url: newURL,                
            data: "{'strFAQID':'" + strFAQID + "','strEmailID':'" + strEmailID + "','strSuggestions':'" + strSuggestions + "','strQuestionText':'" + strQuestionText + "'}",               
            contentType: "application/json; charset=utf-8",

            dataType: "json",

            success: function (msg) {
                processFBYes($(ref).closest(".contentbox").prev().find("div.buttons > input[value=Yes]").attr("id"));
                $(ref).closest(".contentbox").css("display", "none");
            }
        });
}

function UpdateFAQHelpfulCount(ref) {                       
    var strFAQID = $(ref).attr("faqitemid");                
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
    newURL = newURL + "/_vti_bin/listdataapi.aspx/SaveFAQHelpfulCountSuggestions";
    $.ajax({
        type: "POST",
        url: newURL,
        data: "{'strFAQID':'" + strFAQID + "'}",
        contentType: "application/json; charset=utf-8",

        dataType: "json",

        success: function (msg) {                
            processFBYes(ref.id);
            $(ref).parent().parent().next().css("display", "none");
            return false;
        }
    });
    return false;
}

function pageselectCallbackFAQSearchResult(page_index, jq) {
     var items_per_page = 5;
     var max_elem = Math.min((page_index + 1) * items_per_page, FAQLitsItems.length);
     var newcontent = '';         
     var varThanYouMessage = $(".span-ThankYouForYourFeedbackText").text();
     var varWasThisHelpfulMessage = $(".span-WasThishelpfulText").text();
     var varYesButtonText = $(".span-YesText").text();
     var varNoButtonText = $(".span-NoText").text();
     var varCloseButtonText = $(".span-CloseText").text();
     var varHelpUsToGetBetterText = $(".span-HelpUsGetBetterText").text();
     var varPleaseCorrectErrorText = $(".span-PleaseCorrectErrorText").text();
     var varEmailAddressText = $(".span-EmailAddressText").text();
     var varEmailHintText = $(".span-EmailHintText").text();
     var varSuggestionHintText = $(".span-SuggestionHintText").text();
     var varSubmitSuggestionText = $(".span-SubmitSuggestionText").text();
     var varAnySuggestionText = $(".span-AnySuggestionText").text();
     
     // Iterate through a selection of the content and build an HTML string
     for (var i = page_index * items_per_page; i < max_elem; i++) {
         newcontent += " <section class='panel'>";             
         newcontent += "<h6 >" + FAQLitsItems[i].Question + "</h6>";
         newcontent += "<div class='content'>";
         newcontent += "<p>" + FAQLitsItems[i].Answer + "</p>";
         newcontent += "<section class='feedback-form'>";
         newcontent += "<div class='thanks-msg'  id='divThanksMessage' >"+varThanYouMessage+"</div>";
        
         //Button box
         
         newcontent += "<div class='row-fluid bc'>";
         newcontent += "<p class='bold'  id='pWasThisHelpful'>" + varWasThisHelpfulMessage + "</p>";
         newcontent += "<div class='buttons'> ";
         
          newcontent += "<input id='btnYesHelpful" + FAQLitsItems[i].ID + "' FAQItemID='" + FAQLitsItems[i].ID + "'  value='" + varYesButtonText + "'";
          newcontent += " class='button tiny darkblue yesBtn' onclick='javascript:return UpdateFAQHelpfulCount(this);' />";
                    
         newcontent += " <a href='javascript:void(0);' class='button tiny darkblue' data-js='feedback' >" + varNoButtonText + "</a> </div>";
         newcontent += " <a href='javascript:void(0);' class='close' data-js='feedback' >" + varCloseButtonText + "</a>";
         newcontent += "</div>";             
        
         //Second box
         
         newcontent += "<div class='contentbox'>";
         newcontent += "<h5 class='color-darkblue' id='h2HelpusGetBetter'>"+varHelpUsToGetBetterText+"</h5>";
         newcontent += "<form>";
         newcontent += "<div id='errorContainer' class='error-container'>";
         newcontent += "<p>"+varPleaseCorrectErrorText+"</p>";
         newcontent += "<ul>";
         newcontent += "</ul>";
         newcontent += "</div>";
         newcontent += "<table class='table'>";
         newcontent += "<tr>";
         newcontent += "<td >"+varEmailAddressText+"</td>";
         newcontent += "<td><input name='' type='email' placeholder='" + varEmailHintText + "' /></td>";                          
         newcontent += "</tr>";
         newcontent += "<tr>";
         newcontent += "<td>" + varAnySuggestionText + "</td>";
         newcontent += "<td><textarea  name='' cols='1' rows='4' placeholder='" + varSuggestionHintText + "'></textarea></td>";
         newcontent += "</tr>";
         newcontent += "<tr>";
         newcontent += "<td>&nbsp;</td>";
         newcontent += "<td>";
         newcontent += "<input id='dummyButton' type='button' onclick='javascript: return SubmitSuggestionsFAQSearchResult(this);' value='" + varSubmitSuggestionText + "' class='button tiny darkblue' FAQItemID='" + FAQLitsItems[i].ID + "' QuestionText='" + FAQLitsItems[i].Question + "' />";
         newcontent += "</td>";
         newcontent += "</tr>";
         newcontent += "</table>";
         newcontent += "</form>";
         newcontent += "</div>";
         
         newcontent += "</section>";
         newcontent += "</div>";
         newcontent += " </section>";            
     }

     // Replace old content with new content
     $('#accordionFAQSearchResult').html(newcontent);         
     ApplyFAQAccordionSearchResult();
     $("#s4-workspace").scrollTop(0);

     return false;
 }

 function getOptionsFromFormFAQSearchResult() {
     var opt = { callback: pageselectCallbackFAQSearchResult };
     opt["items_per_page"] = $(".span-ItemsPerPage").text();
     opt["num_display_entries"] = 5;
     opt["num_edge_entries"] = 1;
     opt["prev_text"] = $(".span-pagingPreviousText").text();
     opt["next_text"] = $(".span-pagingNextText").text();

     // Avoid html injections in this demo
     var htmlspecialchars = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }
     $.each(htmlspecialchars, function (k, v) {
         opt.prev_text = opt.prev_text.replace(k, v);
         opt.next_text = opt.next_text.replace(k, v);

     })
     return opt;
 }

 
 function GetFAQSearchResultData() {
     var strFAQCategory = GetQueryStringParameterValue("Category");
     var strFAQItemID = GetQueryStringParameterValue("FAQItemID");
     var varNoRecordFoundClientID = $(".span-messageClientID").text();
     $("#" + varNoRecordFoundClientID).css("display", "none");
     var pathArray = window.location.pathname.split('/');
     var secondLevelLocation = pathArray[1];
     var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
     newURL = newURL + "/_vti_bin/listdataapi.aspx/GetFAQList";
     $.ajax({
         type: "POST",
         url: newURL,
         data: "{'category':'" + strFAQCategory + "','faqitemid':'" + strFAQItemID + "'}",
         contentType: "application/json; charset=utf-8",

         dataType: "json",

         success: function (msg) {
             if (msg.d != "No Data Found") {
                 $("#" + varNoRecordFoundClientID).css("display", "none");
                 FAQLitsItems = $.parseJSON(msg.d);
                 var optInit = getOptionsFromFormFAQSearchResult();
                 $("#Pagination").pagination(FAQLitsItems.length, optInit);
             }
             else {
                 $("#" + varNoRecordFoundClientID).css("display", "block");
             }
         },
         error: function (error) {
         }
     });
 }

 function ApplyFAQAccordionSearchResult() {
    $('.accordionFAQSearchResult h6, #accordionFAQSearchResult h6').click(function () {

        if ($(this).next('.content').is(':hidden')) {
            $(this).parents('.accordionFAQSearchResult, #accordionFAQSearchResult').find('.panel').removeClass('active');
            $(this).parents('.panel').addClass('active');
            $(this).parents('.accordionFAQSearchResult, #accordionFAQSearchResult').find('.content').slideUp(500);
            $(this).next('.content').slideDown(500);
        }
        else {
            $(this).parents('.panel').removeClass('active');
            $(this).next('.content').slideUp(500);
        }
    });

    $('[data-js="feedback"]').click(function () {
         $content = $(this).parents('.feedback-form').find('.contentbox');

         if ($content.is(':hidden')) {
             $(this).addClass('active');
             $(this).parents('.feedback-form').addClass('active');
             $content.slideDown(200);
         }
         else {
             $('.accordionFAQSearchResult .button.darkblue, #accordionFAQSearchResult .button.darkblue').removeClass('active');
             $(this).parents('.feedback-form').removeClass('active');
             $content.slideUp(200);
         }
     });

     $(".rightpanel .accordionFAQSearchResult,.rightpanel #accordionFAQSearchResult").children().find(".panel").each(function () {
         if ($(this).children("h6").text().toLowerCase().indexOf($(".faq-search .faq-search").val().toLowerCase()) >= 0 && $(".faq-search .faq-search").val() != "") {
             $(this).addClass("active");
             $(this).children(".content").css("display", "block");
         }
     });
 }
