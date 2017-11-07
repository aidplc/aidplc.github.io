// [Created by Hasim S. Choudhary on 26-Oct-2014]
 
var NewsLitsItems = "";
var defaultloaded = false;
function pageselectCallback_News(page_index, jq) {
    var items_per_page = 5;
    var max_elem = Math.min((page_index + 1) * items_per_page, NewsLitsItems.length);
    var newcontent = '';
    var varShareText = $('.span-ShareText').text();
    var varKnowMoreText = $('.span-KnowMoreText').text();
     // Iterate through a selection of the content and build an HTML string
     for (var i = page_index * items_per_page; i < max_elem; i++) {
         newcontent += "<div class='calendar'>";
         newcontent += "<div class='span3 financial-thumb'>";
         newcontent += "<a href='News_Details.aspx?id=" + NewsLitsItems[i].ID + "'>";
         newcontent += "<img alt='" + NewsLitsItems[i].Title + "' title='" + NewsLitsItems[i].Title + "'  src='" + NewsLitsItems[i].ImageLink + "'/>";
         newcontent += "</a>";
         newcontent += "<div class='calendar-social'>";
         newcontent += "<p>" + varShareText + "</p>";
         newcontent += "<ul class='financial-social'>";
         newcontent += "<li class='fb'><a onclick='ShareTo#_News(this," + NewsLitsItems[i].ID + ");'></a></li>";
         newcontent += "<li class='tw'><a onclick='ShareTo#_News(this," + NewsLitsItems[i].ID + ");'></a></li>";
         newcontent += "<li class='in'><a onclick='ShareToLinkedIn_News(this," + NewsLitsItems[i].ID + ");'>";
         newcontent += "</a></li>";
         newcontent += "</ul>";
         newcontent += "</div>";
         newcontent += "</div>";
         newcontent += "<div class='content'>";
         newcontent += "<h2>";
         newcontent += "<a href='News_Details.aspx?id=" + NewsLitsItems[i].ID + "'>";
         newcontent += NewsLitsItems[i].Title;
         newcontent += "</a></h2>";
         newcontent += "<p>" + NewsLitsItems[i].Subtitle + "</p>";
         newcontent += "<div class='applicable'>";
         newcontent += "<span class='expiry'>";
         newcontent += NewsLitsItems[i].Date;
         newcontent += "</span></div>";
         newcontent += "<div class='accountlist'>";
         newcontent += "<a class='link-readmore' href='News_Details.aspx?id=" + NewsLitsItems[i].ID + "'>";
         newcontent += varKnowMoreText + "</a>";
         newcontent += "</div>";
         newcontent += "</div>";
         newcontent += "</div>";
     }
     // Replace old content with new content
     $('#NewsDisplayList').html(newcontent);
     $("#s4-workspace").scrollTop(0);
     return false;
 }

 function getOptionsFromFormForNews() {
     var opt = { callback: pageselectCallback_News };
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

 function LoadNewsData(strSelectedYear, strSelectedMonth) {
     var varNoRecordFoundClientID = $('.span-messageClientID').text();
     $("#" + varNoRecordFoundClientID).css("display", "none");
     var pathArray = window.location.pathname.split('/');
     var secondLevelLocation = pathArray[1];
     var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
     newURL = newURL + "/_vti_bin/listdataapi.aspx/GetNewsList";
     $.ajax({
         type: "POST",
         url: newURL,
         data: "{'year':'" + strSelectedYear + "','month':'" + strSelectedMonth + "'}",
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (msg) {
             if (msg.d != "No Data Found") {
                 NewsLitsItems = $.parseJSON(msg.d);
                 var optInit = getOptionsFromFormForNews();
                 $("#Pagination").pagination(NewsLitsItems.length, optInit);
                 if(NewsLitsItems.length > 5)
                 {
                 	$("#Pagination").show();
                 }
                 else
                 {
                 	$("#Pagination").hide();
                 }
             }
             else {
                 $("#" + varNoRecordFoundClientID).css("display", "block");
                 $("#Pagination").hide();
             }
         },
         error: function (error) {
         }
     });
}

function InitializeNews()
{
    allmonths = $('.allmonth').html();
    // Select Default Year and Month as Current-Year and Current-Month
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var currentYear = (new Date()).getFullYear();
    var currentMonthIndex = (new Date()).getMonth();
   
    var isMonthSelected = false;
    var isYearSelected = false;
    var lastMonthIndex = 0;
    var lastYearSelected = 0;

    $(".allyear option").each(function (){
        lastYearSelected = $(this).index();
        if($(this).val() == currentYear)
        {
        	$('.allyear').prop('selectedIndex', $(this).index()).trigger("chosen:updated");	
        	isYearSelected = true;
        	$('.allmonth').html(String(allmonths));
        	var str = '.allmonth :not([year^="' + $(this).val() + '"])';
        	$(str).remove();
        }
    });
    
    if(!isYearSelected)
    {
    	$('.allyear').prop('selectedIndex', lastYearSelected).trigger("chosen:updated");
    }
    
    $(".allmonth option").each(function (){
    	lastMonthIndex = $(this).index();
        if($(this).val() == months[currentMonthIndex])
        {
        	$('.allmonth').prop('selectedIndex', $(this).index()).trigger("chosen:updated");
        	isMonthSelected = true;	
        }
    });
    
    if(!isMonthSelected)
    {
    	$('.allmonth').prop('selectedIndex', lastMonthIndex).trigger("chosen:updated");
    }
    
    loadFilteredNewsData();          
                                
    $(".allyear").chosen().change(function () {
    	isMonthSelected = false;
        $('.allmonth').html(String(allmonths));
        var str = '.allmonth :not([year^="' + $(this).val() + '"])';
        $(str).remove();
        $(".allmonth option").each(function (){
			lastMonthIndex = $(this).index();
    		if($(this).val() == months[currentMonthIndex])
    		{
    			$('.allmonth').prop('selectedIndex', $(this).index()).trigger("chosen:updated");
    			isMonthSelected = true;	
    		}
    	});
        if(!isMonthSelected)
	    {
	    	$('.allmonth').prop('selectedIndex', lastMonthIndex).trigger("chosen:updated");
	    }
        loadFilteredNewsData();
    });
                
    $(".allmonth").chosen().change(function () {
        loadFilteredNewsData();
    });
}

function loadFilteredNewsData() {
     $('#NewsDisplayList').empty();
     $("#Pagination").empty();
     LoadNewsData($(".allyear").val(), $(".allmonth").val());
}

// Social Sharing for ADIB News
function ShareTo#_News(link, NewsID) {
    var titleText = $(link).closest(".calendar").find(".content > h5 > a").text();
    var url = window.location.href;
    var pageShareURL = url.replace(url.substr(url.lastIndexOf('/') + 1), '') + "News_Details.aspx?id=" + NewsID;
    var str1 = "https://www.#/sharer/sharer.php?m2w&s=100&p[url]=";
    var str2 = "&p[images][0]=";
    var str3 = "&p[title]=";
    var str4 = "&p[summary]=";
    var resultStr = str1 + escape(pageShareURL);
    window.open(resultStr, 'sharer3', 'toolbar=0,status=0,width=548,height=325');
}
function ShareTo#_News(link, NewsID) {
    var titleText = $(link).closest(".calendar").find(".content > h5 > a").text();
    var #Data = titleText;
    var url = window.location.href;
    var pageShareURL = url.replace(url.substr(url.lastIndexOf('/') + 1), '') + "News_Details.aspx?id=" + NewsID;
    var str1 = "https://#/intent/tweet?original_referer=https%3A%2F%2Fabout.#%2Fresources%2Fbuttons&text=";
    var str2 = "%0A";
    var resultStr = str1 + escape(pageShareURL) + str2 + escape(#Data);
    window.open(resultStr, 'sharer1', 'toolbar=0,status=0,width=548,height=325');
}
function ShareToLinkedIn_News(link, NewsID) {
    var titleText = $(link).closest(".calendar").find(".content > h5 > a").text();
    var titalRef = titleText;
    var summaryRef = titalRef;
    var url = window.location.href;
    var pageShareURL = url.replace(url.substr(url.lastIndexOf('/') + 1), '') + "News_Details.aspx?id=" + NewsID;
    var str1 = "http://www.#/shareArticle?mini=true&url=";
    var str2 = "&title=";
    var str3 = "&summary=";
    var resultStr = str1 + pageShareURL + str2 + titalRef + str3 + summaryRef;
    window.open(resultStr, 'sharer2', 'toolbar=0,status=0,width=548,height=325');
}
