// [Created by Hasim S. Choudhary on 28-Oct-2014]

var OffersPrmotionsLitsItems = "";
var locationDropDownListRef = "";
var typeDropDownListRef = "";
var allLocationDropDownListRef = "";

// Added for Insufficient Anti-automation to protect form submission by robot program or spam sender
setTimeout(function () {
    try {
        $('[id$="email"]').val($('.span-chk-val1').text());
    }
    catch (e) { }
}, 5000);

function InitializeOffersAndPromotions() {
    if ($('#OfferAndPromotionsDataPages').length > 0) {
        setTimeout(function () {
            try {
                filterOfferAndPromotions();
            }
            catch (e) { }
        }, 5000);
    }
}

function removeDuplicateOffersPromotions() {
    var arrRef = [];
    var arrRef1 = [];
    var arrRef2 = [];
    $(".CLS_DDL_Location > option").each(function (j) {
        var flag = false;
        for (var i = 0; i < arrRef.length; i++) {
            if (arrRef[i] == $(this).text()) {
                flag = true;
            }
        }
        if (!flag) {
            arrRef.push($(this).text());
        } else {
            $(this).remove();
        }
    });

    $(".CLS_DDL_Types > option").each(function (j) {
        var flag = false;
        for (var i = 0; i < arrRef1.length; i++) {
            if (arrRef1[i] == $(this).text()) {
                flag = true;
            }
        }
        if (!flag) {
            arrRef1.push($(this).text());
        } else {
            $(this).remove();
        }
    });

    $(".CLS_DDL_AllLocation > option").each(function (j) {
        var flag = false;
        for (var i = 0; i < arrRef2.length; i++) {
            if (arrRef2[i] == $(this).text()) {
                flag = true;
            }
        }
        if (!flag) {
            arrRef2.push($(this).text());
        } else {
            $(this).remove();
        }
    });
    $('.CLS_DDL_Location').trigger("chosen:updated");
    $('.CLS_DDL_Types').trigger("chosen:updated");
    $('.CLS_DDL_AllLocation').trigger("chosen:updated");
}

function checkBoxChangeOffersPromotions() {
    $('.CLS_DDL_Location').css("display", "block");
    $('.CLS_DDL_Location').html(String(locationDropDownListRef)).trigger("chosen:updated");
    $('.CLS_DDL_Location').css("display", "none");

    $('.CLS_DDL_Types').css("display", "block");
    $('.CLS_DDL_Types').html(String(typeDropDownListRef)).trigger("chosen:updated");
    $('.CLS_DDL_Types').css("display", "none");

    $('.CLS_DDL_AllLocation').css("display", "block");
    $('.CLS_DDL_AllLocation').html(String(allLocationDropDownListRef)).trigger("chosen:updated");
    $('.CLS_DDL_AllLocation').css("display", "none");

    var str = ".CLS_DDL_Location ";
    var str1 = ".CLS_DDL_Types ";
    var str2 = ".CLS_DDL_AllLocation ";

    var cnt = 0;
    $(".CLS_DDL_Category").each(function (i) {
        if ($(this).prop("checked")) {
            cnt++;
            str += ':not([prodselected^="' + $(this).val() + '"])';
            str1 += ':not([prodselected^="' + $(this).val() + '"])';
            str2 += ':not([prodselected^="' + $(this).val() + '"])';
        }
    });

    if (cnt == 0) {
        $('.CLS_DDL_Location').prop('selectedIndex', 0);
        $('.CLS_DDL_Types').prop('selectedIndex', 0);
        $('.CLS_DDL_AllLocation').prop('selectedIndex', 0);
        $('.CLS_DDL_Category01').prop('disabled', false).trigger("chosen:updated");
    }
    else {
        $(str).remove();
        $(str1).remove();
        $(str2).remove();
        $('.CLS_DDL_Location').trigger("chosen:updated");
        $('.CLS_DDL_Types').trigger("chosen:updated");
        $('.CLS_DDL_AllLocation').trigger("chosen:updated");
        $('.CLS_DDL_Location,.CLS_DDL_Types, .CLS_DDL_AllLocation').prop('disabled', false).trigger("chosen:updated");
        $('.CLS_DDL_Category01').prop('disabled', true).trigger("chosen:updated");
    }
    removeDuplicateOffersPromotions();
}

function applyFunOffersAndPromotions() {
    var str = ".CLS_DDL_Outlet ";
    var cnt = 0;
    $(".CLS_DDL_Category").each(function (i) {
        if ($(this).prop("checked")) {
            cnt++;
            str += ':not([prodselected^="' + $(this).val() + '"])';
        }
    });
    $('.CLS_DDL_Outlet').css("display", "block");
    $('.CLS_DDL_Outlet').html(String(outletDropDownListRef)).trigger("chosen:updated");
    $('.CLS_DDL_Outlet').css("display", "none");
    $('.CLS_DDL_Outlet').prop('disabled', false).trigger("chosen:updated");
    if (cnt > 0) {
        $('.CLS_DDL_Outlet').css("display", "block");
        $('.CLS_DDL_Outlet').html(String(outletDropDownListRef)).trigger("chosen:updated");
        $('.CLS_DDL_Outlet').css("display", "none");
        $('.CLS_DDL_Outlet').prop('disabled', false).trigger("chosen:updated");
        $(str).remove();
        $('.CLS_DDL_Outlet').trigger("chosen:updated");
    }
}

function pageselectCallbackOffersPromotions(page_index, jq) {
    var items_per_page = 5;
    var max_elem = Math.min((page_index + 1) * items_per_page, OffersPrmotionsLitsItems.length);
    var varKnowMore = $(".span-KnowMore").text();
    var varApply = $(".span-Apply").text();
    var varApplicablefor = $(".span-Applicablefor").text();
    var varValiduntill = $(".span-Validuntill").text();
    var varShare = $(".span-Share").text();

    var newcontent = "";

    // Iterate through a selection of the content and build an HTML string
    for (var i = page_index * items_per_page; i < max_elem; i++) {
        newcontent += "<div class='calendar'>";
        newcontent += "  <div class='span3 financial-thumb'>";
        newcontent += "<a href='Personal_Offers_And_Promotions_Details.aspx?OfferID=" + OffersPrmotionsLitsItems[i].ID + "'>";
        newcontent += " <img width='153px' height='100px' src=" + OffersPrmotionsLitsItems[i].Imagepath + " alt='" + OffersPrmotionsLitsItems[i].Title + "' title='" + OffersPrmotionsLitsItems[i].Title + "'>";
        newcontent += "</a>";
        newcontent += "   <div class='calendar-social'> ";
        newcontent += "     <p>" + varShare + "</p>";
        newcontent += "     <ul class='financial-social'>";
        newcontent += "        <li class='fb'><a onclick='ShareTo#OffersPrmotions(this," + OffersPrmotionsLitsItems[i].ID + ");'></a></li>";
        newcontent += "       <li class='tw'><a onclick='ShareTo#OffersPrmotions(this," + OffersPrmotionsLitsItems[i].ID + ");'></a></li>";
        newcontent += "      <li class='in'><a onclick='ShareToLinkedInOffersPrmotions(this," + OffersPrmotionsLitsItems[i].ID + ");'></a></li>";
        newcontent += "    </ul>";
        newcontent += " </div>";
        newcontent += " </div> ";
        newcontent += " <div class='content'>";
        newcontent += " <h2><a href='Personal_Offers_And_Promotions_Details.aspx?OfferID=" + OffersPrmotionsLitsItems[i].ID + "' style='cursor: default;'>";
        newcontent += "   " + OffersPrmotionsLitsItems[i].Title + "";
        newcontent += "    </a></h2>";
        newcontent += "  <p>";
        newcontent += "     " + OffersPrmotionsLitsItems[i].Offer_x0020_Description + "";
        newcontent += " </p>";
        newcontent += " <div class='applicable'>";
        newcontent += "    <span class='appicablefor'>" + varApplicablefor + ": " + OffersPrmotionsLitsItems[i].Applicable_x0020_For + "</span> ";
        newcontent += "  <span class='expiry'>" + varValiduntill + ": ";
        newcontent += "    " + OffersPrmotionsLitsItems[i].Expiry_x0020_Date + "";
        newcontent += "  </span></div>";
        newcontent += " <div class='accountlist'>";
        newcontent += " <a class='link-readmore' href='Personal_Offers_And_Promotions_Details.aspx?OfferID=" + OffersPrmotionsLitsItems[i].ID + "'>" + varKnowMore + "</a>";
        newcontent += " <ul>";
        newcontent += "  " + OffersPrmotionsLitsItems[i].ProductTag + "";
        newcontent += "  </ul></div>";
        newcontent += " </div>";
        newcontent += "  </div>";
    }

    // Replace old content with new content
    $('#OfferAndPromotionsDataPages').html(newcontent);
    $("#s4-workspace").scrollTop(0);
    return false;
}

function getOptionsFromFormOffersPromotions() {
    var opt = { callback: pageselectCallbackOffersPromotions };
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


function filterOfferAndPromotions() {
    $('[id$="Pagination"]').hide();
    var btnid = "btnSubscribe";
    var strcategory = "";
    if ($("#chekbox1").prop("checked") == true) {
        strcategory += "Personal" + ";";
    }
    if ($("#chekbox2").prop("checked") == true) {
        strcategory += "Business" + ";";
    }
    if ($("#chekbox3").prop("checked") == true) {
        strcategory += "Corporate" + ";";
    }
    if ($("#chekbox4").prop("checked") == true) {
        strcategory += "Private" + ";";
    }
    if ($("#chekbox1").prop("checked") == false && $("#chekbox2").prop("checked") == false && $("#chekbox3").prop("checked") == false && $("#chekbox4").prop("checked") == false) {
        strcategory = $("#ddlcategory option:selected").val() + ";";
    }
    var category = strcategory;
    var loc = $("#LocationID option:selected").val();
    var prodname = $("#ddlSelectFilter option:selected").val();
    var type = $("#TypesID option:selected").val();
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
    newURL = newURL + "/_vti_bin/listdataapi.aspx/GetOfferAndPromotionsList";
    $.ajax({
        type: "POST",
        url: newURL,
        data: "{'strOfferDescriptionTextLimit':'" + $(".span-OfferDescriptionTextLimit").text() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if (msg.d != "No Data Found") {
                OffersPrmotionsLitsItems = $.parseJSON(msg.d);
                var optInit = getOptionsFromFormOffersPromotions();
                $("#Pagination").pagination(OffersPrmotionsLitsItems.length, optInit);
                $('[id$="Pagination"]').show();
                return false;
            }
        },
        error: function (error) {
        }
    });
    return false;
}

function ShareTo#OffersPrmotions(link, NewsID) {
    var titleText = $(link).closest(".calendar").find(".content > h5 > a").text();
    var url = window.location.href;
    var pageShareURL = url.replace(url.substr(url.lastIndexOf('/') + 1), '') + "Personal_Offers_And_Promotions_Details.aspx?OfferID=" + NewsID;
    var str1 = "https://www.#/sharer/sharer.php?m2w&s=100&p[url]=";
    var str2 = "&p[images][0]=";
    var str3 = "&p[title]=";
    var str4 = "&p[summary]=";
    var resultStr = str1 + escape(pageShareURL);
    window.open(resultStr, 'sharer3', 'toolbar=0,status=0,width=548,height=325');
}

function ShareTo#OffersPrmotions(link, NewsID) {
    var titleText = $(link).closest(".calendar").find(".content > h5 > a").text();
    var #Data = titleText;
    var url = window.location.href;
    var pageShareURL = url.replace(url.substr(url.lastIndexOf('/') + 1), '') + "Personal_Offers_And_Promotions_Details.aspx?OfferID=" + NewsID;
    var str1 = "https://#/intent/tweet?original_referer=https%3A%2F%2Fabout.#%2Fresources%2Fbuttons&text=";
    var str2 = "%0A";
    var resultStr = str1 + escape(pageShareURL) + str2 + escape(#Data);
    window.open(resultStr, 'sharer1', 'toolbar=0,status=0,width=548,height=325');
}

function ShareToLinkedInOffersPrmotions(link, NewsID) {
    var titleText = $(link).closest(".calendar").find(".content > h5 > a").text();
    var titalRef = titleText;
    var summaryRef = titalRef;
    var url = window.location.href;
    var pageShareURL = url.replace(url.substr(url.lastIndexOf('/') + 1), '') + "Personal_Offers_And_Promotions_Details.aspx?OfferID=" + NewsID;
    var str1 = "http://www.#/shareArticle?mini=true&url=";
    var str2 = "&title=";
    var str3 = "&summary=";
    var resultStr = str1 + pageShareURL + str2 + titalRef + str3 + summaryRef;
    window.open(resultStr, 'sharer2', 'toolbar=0,status=0,width=548,height=325');
}

// Offers And Promotions Subscriptions
function InitializeOffersAndPromotionsSubscriptions() {
    $("#enquiryForm #btnSubscribeOffersAndPromotionsSubscription").on("click", function (e) {
        var cnt = 0;
        var messages = {

            emailAddress: "Please enter your email address.",
            contactNum: "Please enter your contact number."
        };
        $("#enquiryForm .error-container ul").empty();

        if (!validateEmail($("#enquiryForm #EmilID").val()) || $("#enquiryForm #EmilID").val() == "") {
            cnt++;
            $("#enquiryForm #EmilID").addClass("error");
            $("#enquiryForm .error-container ul").append("<li>" + messages.emailAddress + "</li>");
        } else { $("#enquiryForm #EmilID").removeClass("error"); }

        if (!validateNumber($("#enquiryForm #ContactID").val()) || $("#enquiryForm #ContactID").val() == "") {
            cnt++;
            $("#enquiryForm #ContactID").addClass("error");
            $("#enquiryForm .error-container ul").append("<li>" + messages.contactNum + "</li>");
        } else { $("#enquiryForm #ContactID").removeClass("error"); }

        if (cnt > 0) {
            e.preventDefault();
            $("#enquiryForm .error-container").css("display", "block");
        }
        else {
            $("#enquiryForm .error-container").css("display", "none");
        }
    });
}

function UpdateSubScribeOffer(ref) {

    try {
        // Added for Insufficient Anti-automation to protect form submission by robot program or spam sender
        if ($('[id$="email"]').val() != $('.span-chk-val2').text()) {
            return false;
        }
    }
    catch (e) { }


    var messages = {

        emailAddress: "Please enter your email address.",
        contactNum: "Please enter your contact number."
    };
    var strSubScribeID = $(ref).attr("id");
    var ContactID = $('#ContactID').val();
    var EmailID = $('#EmilID').val();
    var selectedOffer = $("#SubOfferID option:selected").text()
    //error Validation
    var cnt = 0;
    $("#enquiryForm .error-container ul").empty();
    if (!validateEmail($("#enquiryForm #EmilID").val()) || $("#enquiryForm #EmilID").val() == "") {
        cnt++;
        $("#enquiryForm #EmilID").addClass("error");
        $("#enquiryForm .error-container ul").append("<li>" + messages.emailAddress + "</li>");
    } else { $("#enquiryForm #EmilID").removeClass("error"); }
    if (!validateNumber($("#enquiryForm #ContactID").val()) || $("#enquiryForm #ContactID").val() == "") {
        cnt++;
        $("#enquiryForm #ContactID").addClass("error");
        $("#enquiryForm .error-container ul").append("<li>" + messages.contactNum + "</li>");
    } else { $("#enquiryForm #ContactID").removeClass("error"); }
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
    newURL = newURL + "/_vti_bin/listdataapi.aspx/SaveSubscribeOfferData";
    $.ajax({
        type: "POST",
        url: newURL,
        data: "{'selectedOffer':'" + selectedOffer + "','ContactID':'" + ContactID + "','EmailID':'" + EmailID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $('#ContactID').val("");
            $('#EmilID').val("");
            $('#thankYoumsg').css('display', 'inline-block');
            return false;
        }
    });
    return false;
}