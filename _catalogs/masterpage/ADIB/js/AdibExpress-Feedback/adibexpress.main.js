/// <reference path="../../thankyou-happy.aspx" />
$(document).ready(function(e) {
//try { if(window.location.href.toLowerCase().indexOf("adib.ae") != -1){ window.location.href = "http://www.adib.ae"}} catch (e) { }
    var score1 = 0;    // to calculate overall experience points
    var score2 = 0;    // to calculate solutions and advice points
    var score3 = 0;    // to calculate staff service points
    var title1;
    var title2;
    var title3;
    
    var totalScore = 0;  // to caculate total satisfaction points
    var comment1;   // comments for overall experience
    var comment2;   // comments for solutions and advice
    var comment3;   // comments for staff
    var newNumber;   // new number from unhappy customer's page will be stored in this
    var registeredNo = "0589652222";  //this is un-happy customer registered no which cmes from external web service
    var fistName = "User"; // This value comes from query string
    
    var arrayComments = [];
    var arrayQuestionID = [];
    var arrayPoints = [];
    
    var CustomerId = getParameterByName('id');  // Use this method to call from query string
    
    var pathArray = window.location.pathname.split('/');
    var secondLevelLocation = pathArray[1];
    var siteURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;

    //alert("siteURL: " + siteURL);
    
    //CustomerId = "1";
    
    $('#loading').hide();
    $('#index').show();
    $('#happyCustomer').hide();
    $('#unhappyCustomer').hide(); 
    
    
    // Temporary hiding Change Number button
    $('#btnNewNumber').hide();

    var FeedBackTypeID= "1";
    
    GetUserData(FeedBackTypeID, CustomerId );

    GetFirstName(CustomerId);
    
    //$('#firstName').text("Dear " + fistName + ",");

/*Feedback page*/
	//textarea focus add class
    $('[data-comment] textarea').focus(function(){
		$(this).parent('.comment-box').addClass('focus');
	});//end
	
	//textarea focus remove class 
	$('[data-comment] textarea').focusout(function(){
		$(this).parent('.comment-box').removeClass('focus');
	});//end
	
	//data-btn_comment (Add comments box)
	$('[data-btn_comment]').click(function(){
		if ( $(this).parent().next('.comment-box').is(":hidden") ) {
			$(this).parent().next('.comment-box').show();
			$(this).parent().next('.comment-box').children().focus();
			$(this).val('Cancel');
		}
		else {
			$(this).parent().next('.comment-box').hide();
			$(this).val('Add Comments');
			$(this).parent().next('.comment-box').children().val('');    // to delete the comments from variable one cancel clicked 
		}
		
	});//end
	
	
		//smiley hover - help text show event
	$('[data-rating] a').mouseenter(function(){
		$this = $(this);
		$val = $this.attr('title');
		$this.parent().children('.text').text($val);
	});
	
	$('[data-rating] a').mouseleave(function(){
		$this = $(this);
		$val = $this.parent().children('.active').attr('title');
		$this.parent().children('.text').text($val);
	});
    //end
    
      //add active class on clicked smiley - overall experience
	$('[data-rating] a').click(function(){
	    $this = $(this);	    
		$this.parent().children('a').removeClass('active');
		$this.addClass('active');
		var title = $this.parent().children('.active').attr('title');
	});//end
	
/*Thank you page*/
	//Change number click functionality
	$('[data-changenum]').click(function(){
		if ( $('#changeNumber').is(":hidden") ) {
			$('#changeNumber').fadeIn();
			$('[data-changenum]').text('Cancel');
			$('#btnNewNumber').focus();
		}
		else {
			$('#changeNumber').hide();
			$('[data-changenum]').text('Change Number');
		}
		
	});
	//end	
	
	//Click on "Yes Please"
	$('[data-call="yes"]').click(function(){
		$("#registeredNo").text(registeredNo);
		$('#call-actions').fadeOut(400,function(){
			$('#registered-number').fadeIn();
		});
		
	});//end
	
	//Click on "No Thanks"
	$('[data-call="no"]').click(function(){
		$('#call-actions').fadeOut(400,function(){
			$('#msg-sorry').fadeIn();
		});
		
	});
	//end
	
	$("#btnsubmit").click(function () {
	    var totalPoints = 0;   // to calculate total score 
	    
	    $('textarea').each( 
        function(){
        arrayComments.push($(this).val());
        }
        );
        
        $('[data-rating]').each( 
        function(){
        $this = $(this);	    
		var title = $this.children('.active').attr('title');
		if (title == "Dissatisfied") { 
		                arrayPoints.push("0");
		                totalPoints = totalPoints + 0;
					}
					else if (title == "Didn't like it") {
					    arrayPoints.push("10");
					    totalPoints = totalPoints + 10;
					}
					else if (title == "Just OK") {
					    arrayPoints.push("20");
					    totalPoints = totalPoints + 20;
					}
					else if (title == "Liked it") {
					    arrayPoints.push("30");
					    totalPoints = totalPoints + 30;
					}
					else if (title == "Loved it") {
					    arrayPoints.push("40");
					    totalPoints = totalPoints + 40;
					}
        }
        );

    
  	    for (i = 0; i < arrayComments.length; i++) { 
                SaveUserData(CustomerId, arrayQuestionID[i], arrayComments[i], "", arrayPoints[i]);
	    }
			
		var totalMarks = arrayComments.length * 40;	
		var percenrage = (totalPoints * 100) / totalMarks;    // to calculate user satisfaction perentage
	
		if (percenrage >= 80) {
	    $('#happyCustomer').show();
	    $('#index').hide();
	    $('#unhappyCustomer').hide();
	    }   
	    else {
	    $('#unhappyCustomer').show();
	    $('#index').hide();
	    $('#happyCustomer').hide();
	    }

	});
    //end
$("#inputNewNo").keydown(function (e) {
  if (e.keyCode == 13) {
      $('#btnNewNumber').click();
    return false; 
  }
});
  
    
    jQuery('#inputNewNo').keyup(function () { 
    this.value = this.value.replace(/[^0-9\+]/g,'');
});

	$("#btnNewNumber").click(function () {
	    newNumber = $("#inputNewNo").val();
	    var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[1];
        var siteURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
        $("#registeredNo").text(newNumber);

	     $.ajax({  
	        type: "POST",
	        url: "/_layouts/15/AdibExpressSharePoint/Comm.aspx/UpdateCustomerPhoneNo",
	        data: '{ "customerID": "'+ CustomerId +'", "newPhoneNo": "'+ newNumber +'", "siteURL": "'+ siteURL +'" }',
	        contentType: "application/json; charset=utf-8",  
	        dataType: "json",
	        success: function(msg) { 
	        
	        if(msg.d == 'True'){
	      
             document.getElementById("changeNumber").style.display="none";
             $('[data-changenum]').text('Change Number');
	        }
	        else
	        {
	        $('#spanmsg').show();
	        $('#spanmsg').html("<b style='color:red;'>An unexpected error has occurred. please try again later or contact support!</b>");
	        $('#spanmsg').delay(8000).css('display','none');

	        }
	        
	        },
	        error: function (msg) {
						alert("Failed: "+ msg.status + ": " + msg.statusText);
						
					}  
	         });
	    return false;
	});

    // Gets user's name from Query String
	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
    //end
    
    function GetFirstName(CustomerID)
    {
        var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[1];
        var siteURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;

         $.ajax({  
	        type: "POST",
	        url: "/en/_layouts/15/AdibExpressSharePoint/Comm.aspx/GetFirstName",
	        data: '{ "id": "'+ CustomerID +'", "siteURL":"'+ siteURL +'"}',
	        contentType: "application/json; charset=utf-8",  
	        dataType: "json",
	        success: function(msg) { 
	        fistName = msg.d[0].FirtName;
	        $('#firstName').text("Dear " + fistName + ",");
	        registeredNo = msg.d[0].PhoneNumber;
	        }
	         });
    }
    
    
    function GetUserData(FeedBackTypeID, CustomerId)
    {
        var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[1];
        var siteURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;

    $.ajax({  
	        type: "POST",
	        url: "/en/_layouts/15/AdibExpressSharePoint/Comm.aspx/GetUserInfo",
	        data: '{ "FeedBackTypeID": "'+ FeedBackTypeID+'", "siteURL": "'+ siteURL +'", "customerId": "'+ CustomerId+'"}',
	        contentType: "application/json; charset=utf-8",  
	        dataType: "json",
	        success: function(msg) {  
	        
	        if(msg.d.length ==0)	        
	        {
	        $('#userMsg').text("You feedback has already been submitted to us.");
	        }
	        else
	        {
	        
	        for (i = 0; i < msg.d.length; i++) { 
	        
	        arrayQuestionID.push(msg.d[i].Id);
            $(".list-questions").append("<li><p>" + msg.d[i].Question + "</p> <div class=\"rating\" data-rating> <a href=\"javascript:void(0);\" class=\"i-hated\" title=\"Dissatisfied\"></a><a href=\"javascript:void(0);\" class=\"i-didnt-like\" title=\"Didn\'t like it\"></a>   <a href=\"javascript:void(0);\" class=\"i-just-ok\" title=\"Just OK\"></a><a href=\"javascript:void(0);\" class=\"i-liked\" title=\"Liked it\"></a><a href=\"javascript:void(0);\" class=\"i-loved\" title=\"Loved it\"></a><div class=\"text\">Smiley help text here</div></div><div class=\"comment-btn\"><input type=\"button\" value=\"Add Comments\" class=\"btn btn-transparent\" data-btn_comment /></div><div class=\"comment-box\" data-comment><textarea id= \"textAreaComment\" placeholder=\"Type your comments here.\"></textarea></div></li>");
             
            }
	       	 }   	         
			/*Feedback page*/
			//textarea focus add class
		    $('[data-comment] textarea').focus(function(){
				$(this).parent('.comment-box').addClass('focus');
			});//end
			
			//textarea focus remove class 
			$('[data-comment] textarea').focusout(function(){
				$(this).parent('.comment-box').removeClass('focus');
			});//end
			
			//data-btn_comment (Add comments box)
			$('[data-btn_comment]').click(function(){
				if ( $(this).parent().next('.comment-box').is(":hidden") ) {
					$(this).parent().next('.comment-box').show();
					$(this).parent().next('.comment-box').children().focus();
					$(this).val('Cancel');
				}
				else {
					$(this).parent().next('.comment-box').hide();
					$(this).val('Add Comments');
					$(this).parent().next('.comment-box').children().val('');    // to delete the comments from variable one cancel clicked 
									
				    }
				
			});//end

	          //smiley hover - help text show event
			$('[data-rating] a').mouseenter(function(){
				$this = $(this);
				$val = $this.attr('title');
				$this.parent().children('.text').text($val);
			});
		
			$('[data-rating] a').mouseleave(function(){
				$this = $(this);
				$val = $this.parent().children('.active').attr('title');
				$this.parent().children('.text').text($val);
			});
		    //end


			 //add active class on clicked smiley - overall experience
				$('[data-rating] a').click(function(){
				    $this = $(this);	    
					$this.parent().children('a').removeClass('active');
					$this.addClass('active');
					var title = $this.parent().children('.active').attr('title');
					if (title == "Dissatisfied") { 
					    score1 = 0;
					}
					else if (title == "Didn't like it") {
					    score1 = 10;
					}
					else if (title == "Just OK") {
					    score1 = 20;
					}
					else if (title == "Liked it") {
					    score1 = 30;
					}
					else if (title == "Loved it") {
					    score1 = 40;
					}
					
					//alert("score: " + score1);
					title1 = title; 
					//alert("Total score1 = " + score);
			
				});//end
		     	
            $('#loading').hide();
	        },
	        error: function (msg) {
                
	            alert("Failed: "+ msg.status + ": " + msg.statusText);
	        }  
	    });
	    	 
    }
    
    function SaveUserData(CustomerId, FB_QuestionsId, Ans_Description, Ans_DescriptionAr, Ans_Point)
    {
        var pathArray = window.location.pathname.split('/');
        var secondLevelLocation = pathArray[1];
        var siteURL = window.location.protocol + "//" + window.location.host + "/" + secondLevelLocation;
     $.ajax({  
	        type: "POST",
	        url: "../_layouts/15/AdibExpressSharePoint/Comm.aspx/SaveUserData",
	        data: '{ "CustomerId": "'+ CustomerId +'","FB_QuestionsId":"'+ FB_QuestionsId +'", "Ans_Description":"'+ Ans_Description +'", "Ans_DescriptionAr":"'+ Ans_DescriptionAr +'", "Ans_Point":"'+ Ans_Point +'" , "siteURL":"'+ siteURL +'"}',
	        // data: '{ "id": "'+ id +'"}',
	        contentType: "application/json; charset=utf-8",  
	        dataType: "json",
	        success: function(msg) {  
       	        },
	        error: function (msg) {
                
	            alert("Failed: "+ msg.status + ": " + msg.statusText);
	        }  
	    });
    }
    
    function RedirectToADIB() {
  window.location = "HTTP://adib.ae";
}
    
});