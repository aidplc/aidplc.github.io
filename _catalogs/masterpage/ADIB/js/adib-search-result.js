var SearchLitsItems = "";
var topHeaderSelectedIndex = 0;
var searchKeyWord = "";

function PerformSearch(searchKeyWordControl) {
    $('[id$="txtSearch"]').val($(searchKeyWordControl).val());
    $('input[type="search"]').val($(searchKeyWordControl).val());
    if ($(searchKeyWordControl).val() == "") {
        $('[id$="txtSearch"]').css('border', "1px solid red");
        $('input[type="search"]').css('border', "1px solid red");
        NoResultsFound();
    }
    else {
        if (window.location.pathname.toLowerCase().indexOf('/results') == -1) {
			//window.location.href = String($('#btnsearch').attr("searchonclick"));
            window.location.href = "/en/Pages/Results.aspx";
        }
        $.jStorage.set("searchKeyWord", $(searchKeyWordControl).val());
        $('[id$="txtSearch"]').css('border', "1px solid #d6d6d6");
        $('input[type="search"]').css('border', "1px solid #d6d6d6");
        LoadSearhListData($(searchKeyWordControl).val(), false, false, false, false);
    }
}

function HideLinks()
{
	try
	{
    	// Hide These for for now
        $('[id$="SearchResultsList"] .link-readmore').hide();
        $('input[type="search"]').hide();
        $('[id$="btnsearch"]').hide();
        $('[id$="totalNumberOfPages"]').hide();   
    }
    catch(e){ console.log("Error : " + e.message); }   
}

function InitializeADIBSearchResult() {
    try {
 		HideLinks();
    
        if ($.jStorage.get("topHeaderSelectedIndex") != null) { topHeaderSelectedIndex = parseInt($.jStorage.get("topHeaderSelectedIndex"), 10); }
        if ($.jStorage.get("searchKeyWord") != null) {
            searchKeyWord = $.jStorage.get("searchKeyWord");
        }
        $('[id$="txtSearch"]').val(searchKeyWord);
        $('input[type="search"]').val(searchKeyWord);
        $(".mainheader .rightpan .list-nav li").each(function (index) { if (index == topHeaderSelectedIndex) { $($(this).find("a")).click(); } });
        $(".mainheader .rightpan .list-nav li").click(function () { $.jStorage.set("topHeaderSelectedIndex", $(this).index()); });
        // Top search text box
        $('input[type="search"]').keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) { //Enter keycode                
                PerformSearch($(this));
            }
        });
        $('[id$="txtSearch"]').keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) { //Enter keycode 
                PerformSearch($(this));
            }
        });
        $('[id$="btnSearch"]').click(function () {
            PerformSearch($('[id$="txtSearch"]'));
        });
        if (window.location.pathname.toLowerCase().indexOf('/results') > 1) {
            LoadSearhListData(searchKeyWord, false, false, false, false);
        }
        else {
            $.jStorage.set("searchKeyWord", "");
        }
    }
    catch (e) { console.log("Error in InitializeADIBSearchResult: " + e.message); }
}

function pageselectCallbackSearchResult(page_index, jq) {
    var items_per_page = 5;
    var max_elem = Math.min((page_index + 1) * items_per_page, SearchLitsItems.length);
    var newcontent = '';
    var varKnowMoreText = $('.span-KnowMoreText').text();
    var varResultDisplayedText = $('.span-ResultsDisplayedText').text();
    var varPagesText = $('.span-PagesText').text();
    var totalPages = parseInt(Math.max(SearchLitsItems.length / 5));
    var varReminder = SearchLitsItems.length % 5;
    if (varReminder > 0) {
        totalPages = totalPages + 1;
    }
    var totalResults = SearchLitsItems.length;
    // Iterate through a selection of the content and build an HTML string        
    for (var i = page_index * items_per_page; i < max_elem; i++) {
        newcontent += "<div class='calendar'>";
        newcontent += "<div class='content'>";
        newcontent += "<h2><a href='" + SearchLitsItems[i].URL + "'>" + SearchLitsItems[i].Title + "</a><span style='font-size: small;font-weight: normal;background-color: #DEDEDE;color: black;padding: 5px 10px 5px 10px;margin-left: 5px;position: absolute;'>" + SearchLitsItems[i].Category + "</span></h2>";
        newcontent += "<p>" + SearchLitsItems[i].Description + "</p>";
        newcontent += "<div class='accountlist'>";
        newcontent += "<a href='" + SearchLitsItems[i].URL + "' class='link-readmore'>" + varKnowMoreText + "</a>";
        newcontent += "</div>";
        newcontent += "</div>";
        newcontent += "</div>";
    }
    // Replace old content with new content 
    $('#totalNumberOfPages').html("<span>" + totalResults + "</span> " + varResultDisplayedText + " <span>" + totalPages
        + "</span> " + varPagesText);
    $('#SearchResultsList').html(newcontent);
    $("#s4-workspace").scrollTop(0);
    return false;
}

function NoResultsFound() {
    $('[id$="message"]').show();
    $('#totalNumberOfPages').html("");
    $('#SearchResultsList').html("");
    $("#Pagination").hide();
}

function getOptionsFromFormSearchResult() {
    var opt = { callback: pageselectCallbackSearchResult };
    opt["items_per_page"] = $('.span-ItemsPerPage').text();
    opt["num_display_entries"] = 5;
    opt["num_edge_entries"] = 1;
    opt["prev_text"] = $('.span-pagingPreviousText').text();
    opt["next_text"] = $('.span-pagingNextText').text();

    var htmlspecialchars = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }
    $.each(htmlspecialchars, function (k, v) {
        opt.prev_text = opt.prev_text.replace(k, v);
        opt.next_text = opt.next_text.replace(k, v);
    })
    return opt;
}

function LoadSearhListData(strKeyword, varPersonalRefiner, varBusinessRefiner, varCorporateRefiner, varPrivateRefiner) {
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
    newURL = newURL + "/_vti_bin/listdataapi.aspx/GetSearchResultList";
    $.ajax({
        type: "POST",
        url: newURL,
        data: "{'strKeyword':'" + strKeyword + "','isPersonal':'" + varPersonalRefiner + "','isBusiness':'" + varBusinessRefiner + "','isCorporate':'" + varCorporateRefiner + "','isPrivate':'" + varPrivateRefiner + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#Pagination").html("");
            if (msg.d != "No Data Found") {
                $('[id$="message"]').hide();
                SearchLitsItems = $.parseJSON(msg.d);
                var optInit = getOptionsFromFormSearchResult();
                $("#Pagination").pagination(SearchLitsItems.length, optInit);
                $("#Pagination").show();
                HideLinks();
            }
            else {
                NoResultsFound();
            }
        },
        error: function (error) { }
    });
}

function GetSearchKeyWordFromQueryString(name) {
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

function SearchBoxTextChanged() {
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
    if (searchKeyWord == "") {
        return false;
    }
    else {
        return true;
    }
}

function EnterEvent(e) {
    if (e.keyCode == 13) {
        if (fnCheckValue()) {
            LoadSearhListData(searchKeyWord, false, false, false, false);
        }
        return false;
    }
}

function LoadSearhListDataButtonClick() {
    LoadSearhListData(searchKeyWord, false, false, false, false);
}

function ApplySearchRefinerToResult() {
    var chkBusiess = document.getElementById('business');
    var chkCorporate = document.getElementById('corporate');
    var chkPersonal = document.getElementById('personal');
    var chkPrivate = document.getElementById('private');
    var isBusiessChecked = false;
    var isCorporateChecked = false;
    var isPersonalChecked = false;
    var isPrivateChecked = false;

    if (chkBusiess.checked) {
        isBusiessChecked = true;
    }
    if (chkCorporate.checked) {
        isCorporateChecked = true;
    }
    if (chkPersonal.checked) {
        isPersonalChecked = true;
    }
    if (chkPrivate.checked) {
        isPrivateChecked = true;
    }
    LoadSearhListData(searchKeyWord, isPersonalChecked, isBusiessChecked, isCorporateChecked, isPrivateChecked);
}