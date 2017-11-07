function resetAll(){
    $("#goods").val('');
    $("#tenure").val('');
    $("#answer").val('');
    $(".errmsg").html("");
}

function validateCalcuAll(){
    var allValid =true;
    $(".errmsg").html("");
    $("#answer").val('');
    if($("#goods").val()==""){        
                $("#goods").css('border', 'solid 1px #f00');
                $("#goods").after('<span class="errmsg">Please enter valid data</span>'); 
                allValid=false;
    }
    else{
         $("#goods").css('border', 'solid 1px #214b7d');
    }
    
   
    if($("#tenure").val()==""){
        $("#tenure").after('<span class="errmsg">Please enter valid tenure</span>');
       allValid=false;
    }
    else{
         var tenure=parseInt($("#tenure").val(),10);
        var div_ans=tenure%3;
        if(isNaN($("#tenure").val())){
            $("#tenure").css('border', 'solid 1px #f00');
            $("#tenure").after('<span class="errmsg">Please enter numbers only</span>');
            allValid=false;
        }
        else if(parseInt($("#tenure").val(),10)<3){
            $("#tenure").after('<span class="errmsg">Tenure can not be less than 3 months.</span>');
            allValid=false;
        }
        else if(parseInt($("#tenure").val(),10)>48){
            $("#tenure").after('<span class="errmsg">Maximum Tenure allowed is 48 months.</span>');            
            allValid=false;
        }
        else if(div_ans!=0){
             $("#tenure").after('<span class="errmsg">Please enter Tenure in multiples of 3 only.</span>');
            allValid=false;
        }
        if(allValid)
	{
		var profit = 0.0125;
		var goods = parseInt($("#goods").val(),10);
		var tenure = parseInt($("#tenure").val(),10);
		ans =(((Number(goods)*Number(profit))*Number(tenure))+Number(goods))/Number(tenure);
		if(ans!=""){
			$("#answer").val(addCommas(ans.toFixed(2)));
		}else{
			$("#answer").val(0);   
		}
		$("#tenure").css('border', 'solid 1px #214b7d');
	}
	else
	{
		return false;
	}
    }
}

function callfn(fname,goods,tenure)
{
	
}

function presizeValue(th) {           
    num = th.value;
    if(num!=""){
        th.value = (parseFloat(num)).toFixed(2);
		if(th.value != 0) {
			$("#goodsVal").val(th.value);
		} else {
			$("#goodsVal").val('');
		}
        th.value = addCommas(th.value)+' AED';
    } else {
		$("#goodsVal").val('');
	}
    return false;
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}