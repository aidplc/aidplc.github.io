// [Created by Hasim S. Choudhary on 22-Oct-2014]
// [This file be used to play ADIB configured videos in ligh box]

var maxHeight = 0;

function InitializeCardCompare()
{
	try	
	{
		$("ul.list-selectcard li a").on("click", function () {
	    var idRef = $(this).closest("table").parent().attr("id");
	    var compaireTxt = $(this).find(".text").eq(0).text();
	    var selectedCardID = $(this).parent().attr("id");
	    $(".card-column").each(function () {
	        if ($(this).attr("id") != idRef) {
	            if ($(this).find("table tbody > tr:first-child td section.box-white > .cardname").text() == compaireTxt) {
	                $(this).find("table tbody > tr:first-child td section.box-white > button").eq(0).trigger("click");
	            }
	        }
	    });
	
	    var arr = String($(this).parent().attr("CardDetails")).split("~");
	    for (var i = 0; i < arr.length; i++) {
	        $(this).closest("table").find("tbody > tr").eq(i + 1).find("td div.back-gray").html(arr[i]);
	    }
	    $(this).parent().parent().parent().prev().css("display", "block");
	    $(this).parent().parent().parent().next().attr("src", $(this).find("img").eq(0).attr("src"));
	    $(this).parent().parent().parent().next().attr("alt", $(this).find("img").eq(0).attr("alt"));
	    $(this).parent().parent().parent().next().attr("title", $(this).find("img").eq(0).attr("title"));
	    $(this).parent().parent().parent().parent().find(".cardname").eq(0).text($(this).find(".text").eq(0).text());
	
	    $(this).parent().parent().parent().parent().parent().find("a.link-readmore").css("visibility", "visible");
	    $(this).parent().parent().parent().parent().parent().find("div.applynow-btn a").css("visibility", "visible");
	    $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().find("tbody > tr:last a.link-readmore").css("visibility", "visible");
	    $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().find("tbody > tr:last div.applynow-btn a").css("visibility", "visible");
	
	    $(this).parent().parent().parent().parent().parent().find("a.link-readmore").attr("href", $(this).parent().attr("url"));
	    $(this).parent().parent().parent().parent().parent().find("div.applynow-btn a").attr("href", $(this).parent().attr("applyurl"));
	
	    $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().find("tbody > tr:last a.link-readmore").attr("href", $(this).parent().attr("url"));
	    $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().find("tbody > tr:last div.applynow-btn a").attr("href", $(this).parent().attr("applyurl"));
	
	    var maxHeight = 0;
	    $(".card-column").each(function (i) {
	        $(this).find("table tbody > tr:last-child").prev().find("div.back-gray").eq(0).css("height", "");
	    });
	    $(".card-column").each(function (i) {
	        if ($(this).find("table tbody > tr:last-child").prev().find("div.back-gray").eq(0).height() > maxHeight) {
	            maxHeight = $(this).find("table tbody > tr:last-child").prev().find("div.back-gray").eq(0).outerHeight();
	        }
	    });
	    $(".card-column").each(function (i) {
	        $(this).find("table tbody > tr:last-child").prev().find("div.back-gray").eq(0).css("height", maxHeight);
	    });
	
	    AddCardForComparision(selectedCardID);
		});
		$("ul.list-selectcard").each(function () {
		    try { $(this).find("#" + $(this).attr("val")).eq(0).find("a").trigger("click"); } catch (e) { }
		});
		$(".card-column").each(function () {
		    $(this).find("table tbody > tr:first-child td section.box-white > button").eq(0).on("click", function () {
		        $(this).css("display", "none");
		        $(this).closest("table").find("tbody > tr").not(':first').not(':last').find("td div.back-gray").html("&nbsp;");
		        $(this).parent().find(".cardname").eq(0).prev().attr("src", "/en/SiteCollectionImages/nocard.jpg");
		        $(this).parent().find(".cardname").eq(0).html("&nbsp;");
		        $(this).parent().parent().find("a.link-readmore").css("visibility", "hidden");
		        $(this).parent().parent().find("div.applynow-btn a").css("visibility", "hidden");
		        $(this).parent().parent().parent().parent().parent().parent().find("tbody > tr:last a.link-readmore").css("visibility", "hidden");
		        $(this).parent().parent().parent().parent().parent().parent().find("tbody > tr:last div.applynow-btn a").css("visibility", "hidden");
		    });
		    if (String($(this).find("table tbody > tr:first-child td section.box-white > img").attr("src")).indexOf("nocard.jpg") > -1) {
		        $(this).find("table tbody > tr:first-child td section.box-white > button").eq(0).trigger("click");
		    }
		});
		
		$(".card-column").each(function (i) {
		    if ($(this).find("table tbody > tr:last-child").prev().find("div.back-gray").eq(0).height() > maxHeight) {
		        maxHeight = $(this).find("table tbody > tr:last-child").prev().find("div.back-gray").eq(0).outerHeight();
		    }
		});
		$(".card-column").each(function (i) {
		    $(this).find("table tbody > tr:last-child").prev().find("div.back-gray").eq(0).css("height", maxHeight);
		});
	}
	catch(e){}
}

function AddCardForComparision(cardID) 
{
    if (typeof (Storage) != "undefined") {
        var storedCards = localStorage.getItem("CardsToCompare");
        if (storedCards == null || storedCards == "") {
            localStorage.setItem("CardsToCompare", cardID);
        }
        else {
            storedCards = storedCards + "," + cardID;
            localStorage.setItem("CardsToCompare", storedCards);
        }
    }
}
    
