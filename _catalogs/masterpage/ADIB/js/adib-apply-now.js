// [Created by Hasim S. Choudhary on 26-Oct-2014]

var submitformdata = {
    firstName: $('.span-EnterYourNameMessageText').text(),
    emailAddress: $('.span-EnterYourEmailMessageText').text(),
    contactNum: $('.span-EnterYourEmailContactMessageText').text()
};

applynowformdata = {
    firstName: "Please enter your name.",
    emailAddress: "Please enter your email address.",
    contactNum: "Please enter your contact number."
};


// Added for Insufficient Anti-automation to protect form submission by robot program or spam sender
setTimeout(function () {
    try {
        $('[id$="email"]').val($('.span-chk-val1').text());
    }
    catch (e) { }
}, 5000);

// Contact us form starts here 
function InitializeContactUsForm() {
    $("#Onlineform #btnSubmit").on("click", function (e) {
        var cnt = 0;
        $("#Onlineform .error-container ul").empty();
        if ($("#Onlineform #firstname").val() == "") {
            cnt++;
            $("#Onlineform #firstname").addClass("error");
            $("#Onlineform .error-container ul").append("<li>" + submitformdata.firstName + "</li>");
        } else { $("#Onlineform #firstname").removeClass("error"); }
        if (!validateEmail($("#Onlineform #emailAddress").val()) || $("#Onlineform #emailAddress").val() == "") {
            cnt++;
            $("#Onlineform #emailAddress").addClass("error");
            $("#Onlineform .error-container ul").append("<li>" + submitformdata.emailAddress + "</li>");
        } else { $("#Onlineform #emailAddress").removeClass("error"); }
        if (!validateNumber($("#Onlineform input[id=contactNo]").val()) || $("#Onlineform input[id=contactNo]").val() == "") {
            cnt++;
            $("#Onlineform input[id=contactNo]").addClass("error");
            $("#Onlineform .error-container ul").append("<li>" + submitformdata.contactNum + "</li>");
        } else { $("#Onlineform input[id=contactNo]").removeClass("error"); }
        if (cnt > 0) {
            e.preventDefault();
            $("#Onlineform .error-container").css("display", "block");
        }
        else {
            $("#Onlineform .error-container").css("display", "none");
        }
    });

    $("#callbackForm #btnSubmit2").on("click", function (e) {
        var cnt = 0;
        $("#callbackForm .error-container ul").empty();
        if ($("#callbackForm #firstName1").val() == "") {
            cnt++;
            $("#callbackForm #firstName1").addClass("error");
            $("#callbackForm .error-container ul").append("<li>" + submitformdata.firstName + "</li>");
        } else { $("#callbackForm #firstName1").removeClass("error"); }
        if (!validateNumber($("#callbackForm input[id=contactNo2]").val()) || $("#callbackForm input[id=contactNo2]").val() == "") {
            cnt++;
            $("#callbackForm input[id=contactNo2]").addClass("error");
            $("#callbackForm .error-container ul").append("<li>" + submitformdata.contactNum + "</li>");
        } else { $("#callbackForm input[id=contactNo2]").removeClass("error"); }
        if (cnt > 0) {
            e.preventDefault();
            $("#callbackForm .error-container").css("display", "block");
        }
        else {
            $("#callbackForm .error-container").css("display", "none");
        }
    });

    $("#emailForm, #emailForm1").click(function () {

        if ($(this).parents('li').find('.email-form').is(":hidden")) {
            $(this).addClass('active');
            $(this).parents('li').addClass('active').find('.email-form').slideDown(400);

        }
        else {
            $(this).parents('li').removeClass('active').find('.email-form').slideUp(400);
            $(this).parents('li').find('.email-button').removeClass('active');

        }
        $(".Thankyoucls").removeClass("show");
        $(".Thankyoucls").addClass("hide");
        $(".Thankyoucls1").removeClass("show");
        $(".Thankyoucls1").addClass("hide");
    });

    $("#emailFormClose, #emailFormClose1").click(function () {
        $(this).parents('li').removeClass('active').find('.email-form').slideUp(400);
        $(this).parents('li').find('.email-button').removeClass('active');
        $(".Thankyoucls").removeClass("show");
        $(".Thankyoucls").addClass("hide");
        $(".Thankyoucls1").removeClass("show");
        $(".Thankyoucls1").addClass("hide");
    });
}

function submitContactUsFirst() {

    try {
        // Added for Insufficient Anti-automation to protect form submission by robot program or spam sender
        if ($('[id$="email"]').val() != $('.span-chk-val2').text()) {
            return false;
        }
    }
    catch (e) { }

    var cnt = 0;
    $("#Onlineform .error-container ul").empty();
    if ($("#Onlineform #firstname").val() == "") {
        cnt++;
        $("#Onlineform #firstname").addClass("error");

        $("#Onlineform .error-container ul").append("<li>" + submitformdata.firstName + "</li>");
    } else { $("#Onlineform #firstname").removeClass("error"); }
    if (!validateEmail($("#Onlineform #emailAddress").val()) || $("#Onlineform #emailAddress").val() == "") {
        cnt++;
        $("#Onlineform #emailAddress").addClass("error");
        $("#Onlineform .error-container ul").append("<li>" + submitformdata.emailAddress + "</li>");
    } else { $("#Onlineform #emailAddress").removeClass("error"); }
    if (!validateNumber($("#Onlineform input[id=contactNo]").val()) || $("#Onlineform input[id=contactNo]").val() == "") {
        cnt++;
        $("#Onlineform input[id=contactNo]").addClass("error");
        $("#Onlineform .error-container ul").append("<li>" + submitformdata.contactNum + "</li>");
    } else { $("#Onlineform input[id=contactNo]").removeClass("error"); }
    if (cnt > 0) {

        $("#Onlineform .error-container").css("display", "block");
        return false;
    }
    else {

        $("#Onlineform .error-container").css("display", "none");
    }
    var FullName = $('#firstname').val();
    var CountryCode = $('#staticNoText').val();
    var ContactID = $('#contactNo').val();
    var EmailID = $('#emailAddress').val();
    var ischecked = $("#emailme02").is(":checked");
    var titleDDSelect = $('[id$="titleDDSelect"] option:selected').text();
    var PreferredTimeToCall = $("#PreferredTimeToCall option:selected").text();
    var prefMedium = $("#prefMedium option:selected").text();
    var Message = $('#txtArea').val();
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
    newURL = newURL + "/_vti_bin/listdataapi.aspx/SaveOnlineInQuiryFormData";
    $.ajax({
        type: "POST",
        url: newURL,
        data: "{'FullName':'" + FullName + "','CountryCode':'" + CountryCode + "','ContactID':'" + ContactID + "','EmailID':'" + EmailID + "','PreferredTimeToCall':'" + PreferredTimeToCall + "','prefMedium':'" + prefMedium + "','Message':'" + Message + "','titleDDSelect':'" + titleDDSelect + "','ischecked':'" + ischecked + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $('#firstname').val("");
            $('#staticNoText').val("");
            $('#contactNo').val("");
            $('#emailAddress').val("");
            $('#txtArea').val("");
            $('#PreferredTimeToCall option').filter(function () { return $.trim($(this).text()) == "Select"; }).attr('selected', true);
            $('#prefMedium option').filter(function () { return $.trim($(this).text()) == "Select"; }).attr('selected', true);
            $("#Onlineform").css('display', 'none');
            $(".Thankyoucls").addClass("show")
            return false;
        }
    });
    return false;
}

function submitContactUsSecond() {

    try {
        // Added for Insufficient Anti-automation to protect form submission by robot program or spam sender
        if ($('[id$="email"]').val() != $('.span-chk-val2').text()) {
            return false;
        }
    }
    catch (e) { }

    var cnt = 0;
    $("#callbackForm .error-container ul").empty();
    if ($("#callbackForm #firstName1").val() == "") {
        cnt++;
        $("#callbackForm #firstName1").addClass("error");
        $("#callbackForm .error-container ul").append("<li>" + submitformdata.firstName + "</li>");
    } else { $("#callbackForm #firstName1").removeClass("error"); }
    if (!validateNumber($("#callbackForm input[id=contactNo2]").val()) || $("#callbackForm input[id=contactNo2]").val() == "") {
        cnt++;
        $("#callbackForm input[id=contactNo2]").addClass("error");
        $("#callbackForm .error-container ul").append("<li>" + submitformdata.contactNum + "</li>");
    } else { $("#callbackForm input[id=contactNo2]").removeClass("error"); }
    if (cnt > 0) {
        $("#callbackForm .error-container").css("display", "block");
        return false;
    }
    else {
        $("#callbackForm .error-container").css("display", "none");
    }
    var FullName = $('#firstName1').val();
    var CountryCode = $('#staticNo2').val();
    var ContactID = $('#contactNo2').val();
    var titleDDSelect = $('[id$="titleName"] option:selected').text();
    var PreferredTimeToCall = $("#prefTime2 option:selected").text();
    var Message = $('#txMessage2').val();
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
    newURL = newURL + "/_vti_bin/listdataapi.aspx/SaveRegisterCallbackFormData";
    $.ajax({
        type: "POST",
        url: newURL,
        data: "{'FullName':'" + FullName + "','CountryCode':'" + CountryCode + "','ContactID':'" + ContactID + "','PreferredTimeToCall':'" + PreferredTimeToCall + "','Message':'" + Message + "','titleDDSelect':'" + titleDDSelect + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#callbackForm").css('display', 'none');
            $(".Thankyoucls1").addClass("show")
            $('#firstName1').val("");
            $('#staticNo2').val("");
            $('#contactNo2').val("");
            $('#txMessage2').val("");
            $('#prefTime2 option').filter(function () { return $.trim($(this).text()) == "Select"; }).attr('selected', true);
            return false;
        }
    });
    return false;
}

// contact us form end here

function InitializeApplyNowForm() {
    try {
        $("#enquiryForm input[type=submit]").on("click", function (e) {
            if (!SubmitApplyNowForm()) {
                return false;
            }
        });
        
        // Remove all placeholder values from text boxes
         $($($(".tbl-email")).find("input")).each(function () {
         	//if($(this).is(":text"))
         	//{
         		$(this).attr('placeholder',"");
         	//}         	
         })
    }
    catch (e) { }

    // For Widget
    try {
        $("#toolCalculateWrap #submit").on("click", function (e) {
            ApplyNowFormWidget()
        });
    }
    catch (e) { }
}

function GetApplyNowFilledValue() {
    var rowCount = $('#mainTable tr').length;
    var hiddenValueClientID = $('.xxx').text();
    var controlCount = rowCount * 2;
    var refArr = [];
    for (i = 1; i <= controlCount; i++) {
        var labelid = $("#lableName" + i).text()
        var refStr = labelid + "|||||";
        var dummyArr = [];
        if ($("#ControlID" + i).attr("type") == "Text" || $("#ControlID" + i).attr("type") == "Email" || $("#ControlID" + i).attr("type") == "tel" || $("#ControlID" + i).attr("type") == "Checkbox" || $("#ControlID" + i).attr("type") == "Number") {
            dummyArr.push($("#ControlID" + i).val());
        }
        else {
            dummyArr.push($("#ControlID" + i + " option:selected").text());
        }
        refStr += dummyArr.join("|||||");
        refArr.push(refStr);

    }
    $('[id$="hdnValue"]').val(refArr.join("$$$$$"));
}



function SaveApplyNowFormWidgetDataCall() {
    try {
        var productName = $('.span-apply-now-product-name').text();
        var fullname = $('[id$="ToolsAndCalcPlanner"] #name').val();
        var emailAddress = $('[id$="ToolsAndCalcPlanner"] #email').val();
        var contactNumber = $('[id$="ToolsAndCalcPlanner"] #number').val();
        var isADIBExistingCustomer = "No";
        if ($('.radio-existing-customer') != null) {
            isADIBExistingCustomer = $('.radio-existing-customer input[type="radio"]:checked').val();
        }

        var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[1];
        var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
        $.ajax({
            type: "POST",
            url: newURL + "/_vti_bin/listdataapi.aspx/SaveApplyNowWidgetData",
            data: "{'productName':'" + productName + "','fullName':'" + fullname + "','emailAddress':'" + emailAddress + "','contactNumber':'" + contactNumber + "','isADIBExistingCustomer':'" + isADIBExistingCustomer + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                if ($('.span-apply-now-continue-url').text() == "") {
                    $('[id$="ToolsAndCalcPlanner"]').html($('.span-apply-now-success-html').html())
                }
                else {
                    // redirect to continue URL
                    window.location.href = newURL + "/" + $('.span-apply-now-continue-url').text();
                }
            }
        });
    }
    catch (e) { }
}


function Validate_ApplyNow_FormWidget() {
    var cnt = 0;

    $('[id$="applyNowFormErrorContainer"] ul').empty();
    if ($('[id$="ToolsAndCalcPlanner"] #name').val() == "") {
        cnt++;
        $('[id$="ToolsAndCalcPlanner"] #name').addClass("error");
        $('[id$="applyNowFormErrorContainer"] ul').append("<li>" + applynowformdata.firstName + "</li>");
    } else { $('[id$="ToolsAndCalcPlanner"] #name').removeClass("error"); }
    if (!validateEmail($('[id$="ToolsAndCalcPlanner"] #email').val()) || $('[id$="ToolsAndCalcPlanner"] #email').val() == "") {
        cnt++;
        $('[id$="ToolsAndCalcPlanner"] #email').addClass("error");
        $('[id$="applyNowFormErrorContainer"] ul').append("<li>" + applynowformdata.emailAddress + "</li>");
    } else { $('[id$="ToolsAndCalcPlanner"] #email').removeClass("error"); }
    if ($('[id$="ToolsAndCalcPlanner"] #number').val() == "" || !validateNumber($('[id$="ToolsAndCalcPlanner"] #number').val())) {
        cnt++;
        $('[id$="ToolsAndCalcPlanner"] #number').addClass("error");
        $('[id$="applyNowFormErrorContainer"] ul').append("<li>" + applynowformdata.contactNum + "</li>");
    } else { $('[id$="ToolsAndCalcPlanner"] #number').removeClass("error"); }
    if (cnt > 0) {
        $('[id$="applyNowFormErrorContainer"]').css("display", "block");
        return false;
    }
    else {
        $('[id$="applyNowFormErrorContainer"]').css("display", "none");
        SaveApplyNowFormWidgetDataCall();
        return true;
    }
}


function SubmitApplyNowForm() {
    var enterMessage = "Please enter valid and required value for ";
    var selectMessage = "Please select valid and required value for ";
    try {
        // Added for Insufficient Anti-automation to protect form submission by robot program or spam sender
        if ($('[id$="email"]').val() != $('.span-chk-val2').text()) {
            return false;
        }
    }
    catch (e) { }
    $("#enquiryForm .error-container ul").empty();
    var errorMsg = new Array();
    
    $("#enquiryForm input[type=text]").each(function (i) {
        if ($(this).val() == "" && $(this).attr("isrequired") == "isrequired") {
            $(this).addClass("error");
             
             errorMsg.push(enterMessage + $(this).parent().prev().text().replace("*",""));
             
         } else { $(this).removeClass("error"); }
    });

    $("#enquiryForm input[type=checkbox]").each(function (i) {
        if ($(this).val() == "" && $(this).attr("isrequired") == "isrequired") {
            $(this).addClass("error");
                  
            errorMsg.push(enterMessage + $(this).parent().prev().text().replace("*",""));
        } else { $(this).removeClass("error"); }
    });
    $("#enquiryForm input[type=email]").each(function (i) {
        if ((!validateEmail($(this).val()) || $(this).val() == "") && $(this).attr("isrequired") == "isrequired") {
            $(this).addClass("error");             
             errorMsg.push(enterMessage + $(this).parent().prev().text().replace("*",""));
        } else { $(this).removeClass("error"); }
    });
    $("#enquiryForm input[type=number]").each(function (i) {
        if ($(this).val() == "" && $(this).attr("isrequired") == "isrequired") {
            $(this).addClass("error");            
            errorMsg.push(enterMessage + $(this).parent().prev().text().replace("*",""));
        } else { $(this).removeClass("error"); }
    });
    $("#enquiryForm input[type=tel]").each(function (i) {
        if (!validateNumber($(this).val()) || $(this).val() == "" && $(this).attr("isrequired") == "isrequired") {
            $(this).addClass("error");                    
            errorMsg.push(enterMessage + $(this).parent().prev().text().replace("*",""));
        } else { $(this).removeClass("error"); }
    });
        
    $("#enquiryForm select").each(function (i) {
        if ($(this).find("option:selected").text().toLowerCase() == "select" && $(this).parent().prev().text().indexOf("*") != -1) {
            $(this).addClass("error");                       
            errorMsg.push(selectMessage + $(this).parent().prev().text().replace("*",""));            
          } else { $(this).removeClass("error"); }
    });    

    if ($('[id$="fileUploader"]').attr("isrequired") == "isrequired") {
        if ($('[id$="fileUploader"]').val() == "") {
            $('[id$="fileUploader"]').addClass("error");            
            errorMsg.push("Plase Choose File for document upload " + $(this).parent().prev().text().replace("*",""));            
          }
        else { $('[id$="fileUploader"]').removeClass("error"); }
    }


   
       var noDuplicationErrorMsg = new Array();    //Array after removing duplication
    for (var i = 0; i < errorMsg.length; i++) {
            if (($.inArray(errorMsg[i], noDuplicationErrorMsg)) == -1) {
                noDuplicationErrorMsg.push(errorMsg[i]);
            }
        }

    if (noDuplicationErrorMsg != " ") {
        for (var i = 0; i <= noDuplicationErrorMsg.length - 1; i++) {
            if (!(noDuplicationErrorMsg[i] == undefined)) {
                $("#enquiryForm .error-container ul").append( "<li>" + noDuplicationErrorMsg[i] + "</li>");
            }
        } 
      }
      
        if(noDuplicationErrorMsg.length > 0)
        {        
       	    $("#enquiryForm .error-container").css("display", "block");
        	return false;        
        }
        else
        {
        	$("#enquiryForm .error-container").css("display", "none");
        	return true;
        }    
}