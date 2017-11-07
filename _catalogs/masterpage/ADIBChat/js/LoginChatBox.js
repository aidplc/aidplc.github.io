function LoginClick() {
    parent.window.location.href = String(jQuery("#BankingType").val());
}

function dropDownChange() {
    $("a.link-register").attr("href", $('#BankingType>option:selected').attr("RegisterLink"));
}

function ChatClick() {
    window.location.href = String($('#btnChatNow').attr("chatOnclick"));
}

//window.setInterval(function () {
//   CheckOnlineAgentsOnServer();
//}, 5000);

function InitializeChatAgents() {
    if (localStorage.getItem("IsChatUserAlive") == "yes") {
        $('.i-chat').css('background-position', '-74px -9px');
        $('.chatWrapIframe', window.parent.document).contents().find('.i-chat').css('background-position', '-74px -9px');
        $('.chatWrapIframe', window.parent.document).attr('src', localStorage.getItem("ReConnectChatUrl"));
        $(".chatWrap", window.parent.document).slideDown(800)();
    }
    else {
        CheckOnlineAgentsOnServer();
    }
}

function CheckOnlineAgentsOnServer() {
    try {
        var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[1];
        var rootSiteURL = window.location.protocol + "//" + window.location.host + "/";
        var newURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
        newURL = newURL + "/_vti_bin/listdataapi.aspx/GetOnlineStatusOfAgents";
        var departmentID = "1";
        if (window.location.pathname.toLowerCase().indexOf('/en') == -1) {
            departmentID = "2";
        }

	$('.i-chat').css('background-position', '-523px -9px');
                    $('.chatWrapIframe', window.parent.document).contents().find('.i-chat').css('background-position', '-523px -9px');
                    // Display User Email Screen
                    if (window.location.pathname.toLowerCase().indexOf('/en') == -1) {
                        if ($('.chatWrapIframe', window.parent.document).attr('src') != "/ar/_layouts/15/ADIB/Chat/ar/SendMail.aspx") {
                            $('.chatWrapIframe', window.parent.document).attr('src', '/ar/_layouts/15/ADIB/Chat/ar/SendMail.aspx');
                        }
                    }
                    else {
                        if ($('.chatWrapIframe', window.parent.document).attr('src') != "/en/_layouts/15/ADIB/Chat/en/SendMail.aspx") {
                            $('.chatWrapIframe', window.parent.document).attr('src', '/en/_layouts/15/ADIB/Chat/en/SendMail.aspx');
                        }
                    }

        $.ajax({
            type: "POST",
            url: newURL,
            data: "{'departmentID':'" + departmentID + "','siteURL':'" + rootSiteURL + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (onlineAgentStatus) {
                if ($.parseJSON(onlineAgentStatus.d).status == "true") {
                    $('.i-chat').css('background-position', '-74px -9px');
                    $('.chatWrapIframe', window.parent.document).contents().find('.i-chat').css('background-position', '-74px -9px');
                    if (localStorage.getItem("IsChatUserAlive") == "yes") {
                        $('.chatWrapIframe', window.parent.document).attr('src', localStorage.getItem("ReConnectChatUrl"));
                        $(".chatWrap", parent.document).slideDown(800)();
                    }
                    else {
                        // Display User Login Screen
                        if (window.location.pathname.toLowerCase().indexOf('/en') == -1) {
                            if ($('.chatWrapIframe', window.parent.document).attr('src') == "/ar/_layouts/15/ADIB/Chat/ar/SendMail.aspx") {
                                $('.chatWrapIframe', window.parent.document).attr('src', '/ar/_layouts/15/ADIB/Chat/ar/UserLogin.aspx');
                            }
                        }
                        else {
                            if ($('.chatWrapIframe', window.parent.document).attr('src') == "/en/_layouts/15/ADIB/Chat/en/SendMail.aspx") {
                                $('.chatWrapIframe', window.parent.document).attr('src', '/en/_layouts/15/ADIB/Chat/en/UserLogin.aspx');
                            }
                        }
                    }
                }
                else // Agent is off-line
                {
                    $('.i-chat').css('background-position', '-523px -9px');
                    $('.chatWrapIframe', window.parent.document).contents().find('.i-chat').css('background-position', '-523px -9px');
                    // Display User Email Screen
                    if (window.location.pathname.toLowerCase().indexOf('/en') == -1) {
                        if ($('.chatWrapIframe', window.parent.document).attr('src') != "/ar/_layouts/15/ADIB/Chat/ar/SendMail.aspx") {
                            $('.chatWrapIframe', window.parent.document).attr('src', '/ar/_layouts/15/ADIB/Chat/ar/SendMail.aspx');
                        }
                    }
                    else {
                        if ($('.chatWrapIframe', window.parent.document).attr('src') != "/en/_layouts/15/ADIB/Chat/en/SendMail.aspx") {
                            $('.chatWrapIframe', window.parent.document).attr('src', '/en/_layouts/15/ADIB/Chat/en/SendMail.aspx');
                        }
                    }
                }
            }
        });
        return false;
    }
    catch (e) { }
}