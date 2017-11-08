
	
// Is the user on an iPad?
var isIpad = navigator.platform.toLowerCase() === "ipad";


//BOTTOM SLIDE UP / SLIDE DOWN FUNCTIONALITY
$('[data-js="bottomlinks"]>li').click(function(){
	var id = $(this).attr('data-rel');
	
	if($(this).hasClass('active')){
		adib_closebottombar();
	}
	else{
		$('[data-js="bottomlinks"]>li').removeClass('active');
		$(this).addClass('active');
		$('.blackcontainer .container').hide();
		$('#' + id).show()
		$('.blackcontainer').slideDown(300);
		$('#' + id).animate({opacity:1},300);
	}
	
});

$('[data-js="bottombarclose"]').click(function(){
	adib_closebottombar();
});

function adib_closebottombar(){
	$('.blackcontainer').slideUp(300,function(){
		$('#videosContainer, #calculatorsContainer').hide();
		$('[data-js="bottomlinks"]>li').removeClass('active');
	});
	
}
//END

//BOTTOM STICKY BAR FIX FUNCTION
if ($('[data-js="stickyfoo"]').length > 0 && !isIpad){
	
	var adib_stickyNav = function(){  
		var stickyNavTop = $('.mainfooter').offset().top;
		var scrollTop = $(window).scrollTop() + $(window).height() - 46;  
		if (scrollTop > stickyNavTop) {   
		   $('[data-js="stickyfoo"]').removeClass('sticky');   
		} else {  
		   $('[data-js="stickyfoo"]').addClass('sticky');  
		}  
	};  
	  
	adib_stickyNav();  
	  
	if($("#aspnetForm").html())
	{
		$("#aspnetForm > div").scroll(function() {  
			adib_stickyNav();  
		});
	}
	else
	{
		$(window).scroll(function() {  
			adib_stickyNav();  
		});
	}
	
}
//END

//Current Account page Gray Tabs Arrow slide animation function
var adib_grayTabsAnimate = function(){

    var ulOffsetLeft = $('ul.list-graytabs').offset().left;
    var currentOffset = $(this).offset().left;
    
    var adib_delta = currentOffset - ulOffsetLeft;
	adib_delta = adib_delta + 12
    
    $('#adib_tabsArrow').clearQueue().animate({'margin-left': adib_delta});

}

$('ul.list-graytabs li').click(adib_grayTabsAnimate);
//end


//Accordion - Created for FAQ page
$('.accordion h6').click(function(){
	
	if($(this).next('.content').is(':hidden')){
		$(this).parents('.accordion').find('.panel').removeClass('active');
		$(this).parents('.panel').addClass('active');
		$(this).parents('.accordion').find('.content').slideUp(500);
		$(this).next('.content').slideDown(500);
	}
	else{
		$(this).parents('.panel').removeClass('active');
		$(this).next('.content').slideUp(500);
	}
});
//End

//FAQ FEEDBACK FORM CLICK EVENTS
/*============NO CLICK===============*/
$('[data-js="feedback"]').click(function(){
	$content = $(this).parents('.feedback-form').find('.contentbox');
	
	if ($content.is(':hidden')){
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
$('[data-js=yes-feedback]').click(function(){
	$(this).parents('.bc').hide();
	$(this).parents('.feedback-form').find('.thanks-msg').fadeIn();
	$(this).parents('.feedback-form').find('.contentbox').hide();
});
//END


//Cross Browser Placeholder
if(!Modernizr.input.placeholder){
	$('[placeholder]').focus(function() {
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');
	  }
	}).blur(function() {
	  var input = $(this);
	  if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));
	  }
	}).blur();
	$('[placeholder]').parents('form').submit(function() {
	  $(this).find('[placeholder]').each(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
		  input.val('');
		}
	  })
	});
}
//End

function bookmarkPageCookies()
{
	if(typeof(Storage)!=="undefined")
	{
		localStorage.adibBookmarkPage=String(window.location.href);		
	}
	else
	{
		//"Sorry, your browser does not support web storage...";
		
	}
}

// RUNS ON WINDOW LOAD
$(window).load(function(){
	bookmarkPageCookies();
	adib_stickyNav();  
});