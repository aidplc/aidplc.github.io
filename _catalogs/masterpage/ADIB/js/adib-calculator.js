// [Created by Hasim S. Choudhary on 02-Nov-2014]

var boolPercentFinance = true;
var boolTenure = true;
var digitsOnly = /[1234567890]/g;
var integerOnly = /[0-9\.]/g;
var alphaOnly = /[A-Za-z\' ']/g;
var alphaNumeric = /[A-Za-z0-9]/g;
var emailpattern = /[A-Za-z0-9\.\@]/g;
var postalAddress = /[A-Za-z0-9\' ']/g;
var details = /[A-Za-z0-9\' '\.\@]/g;

function restrictCharacters(myfield, e, restrictionType) {
    if (!e) var e = window.event
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var character = String.fromCharCode(code);
    if (code == 27) { this.blur(); return false; }
    if (!e.ctrlKey && code != 9 && code != 8 && code != 36 && code != 37 && code != 38 && (code != 39 || (code == 39 && character == "'")) && code != 40) {
        if (character.match(restrictionType)) {
            return true;
        } else {
            return false;
        }
    }
}

function CurrencyFormatted(amount) {
    var i = parseInt(amount);
    if (isNaN(i)) {
        i = 0;
    }
    var minus = '';
    if (i < 0) {
        minus = '-';
    }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    if (s.indexOf('.') < 0) {
        s += '.';
    }
    if (s.indexOf('.') == (s.length - 2)) {
        s += '0';
    }
    s = minus + s;
    return s;
}

function CommaFormatted(amount) {
    var delimiter = ","; // replace comma if desired
    var a = amount.split('.', 2)
    var d = a[1];
    var i = parseInt(a[0]);
    if (isNaN(i)) {
        return '';
    }
    var minus = '';
    if (i < 0) {
        minus = '-';
    }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) {
        a.unshift(n);
    }
    n = a.join(delimiter);
    if (d.length < 1) {
        amount = n;
    } else {
        amount = n + '.' + d;
    }
    amount = minus + amount;
    return amount;
}

function InitCalculators() {
    try { InitializeSavingsPlanner(); } catch (e) { }
    try { InitializeRetirementPlanner(); } catch (e) { }
    try { InitializeCarFinanceCalculator(); } catch (e) { }
    try { InitializeCarIjarah(); } catch (e) { }
    try {
        var valProfitRate = parseFloat($('.span-calc-home-finance-profit-rate').text(),10);
        var valPercentFinance = parseFloat($('.span-calc-home-finance-percent-finance').text(),10);
        var valTenure = parseInt($('.span-calc-home-finance-tenure').text(),10);

        $('#txtProfit_Rate').val(valProfitRate + '%');
        
        $("input.numeric").numeric();
        $(".Percent").change(function (event) {
                $(".errmsg").html("");
            var $value = $(this).val();
            if ($value > valPercentFinance) {
                $(this).css('border', 'solid 1px #f00');
                $(this).after('<span class="errmsg">value not be more than ' + valPercentFinance + '</span>')
                boolPercentFinance = false;
            }
            else {
                $(this).css('border', 'solid 1px #214b7d');
                $("#errPercent_Finance").html('');
                boolPercentFinance = true;
            }

        });
        $("#txtTenure").change(function (event) {
            $(".errmsg").html("");
            var $value = $(this).val();
            if ($value > valTenure) {
                $(this).css('border', 'solid 1px #f00');
                 $(this).after('<span class="errmsg">Tenure not be more than ' + valTenure + '</span>');
                boolTenure = false;
            }
            else {
                $(this).css('border', 'solid 1px #214b7d');
                $("#errTenure").html('');
                boolTenure = true;
            }
        });

        $("select.salary").change(function (event) {
            initCalculateValues();
        });

        $("#calculate").click(function () {
            initCalculateValues();
        });

        $("#reset").click(function () {
            $(".maintable").each(function () {
                $("input:text").val('');
                $("input:text").css('border', '');
            });
            $('#txtProfit_Rate').val(valProfitRate + '%');
        });
    }
    catch (e) { }
}

//Calculate Values
function initCalculateValues() {
    
    var allFieldsEntered = true;
    $(".errmsg").html("");
    $(".maintable input:text:enabled").each(function () {
        if($(this).val()=="")
        {
            $(this).css('border', 'solid 1px #f00');
            $(this).after('<span class="errmsg">Please enter valid data</span>');
        }
        else
        {
            $(this).css('border', 'solid 1px #d6d6d6');
        }
    });
    
    if ($('select.salary') != null) {
      if ($("select.salary").val() == "Select") {
            $("select.salary").css('border', 'solid 1px #f00');
            $("select.salary").before('<span class="errmsg">Please select proper value</span>');
        }
    }
        
    if (!allFieldsEntered) {
        return false;
    }
    
    if (boolPercentFinance && boolTenure) {
        var $Property_Value = $('#txtProperty_Value').val();
        var $Percent_Finance = $('#txtPercent_Finance').val();
        var $Tenure = $('#txtTenure').val();
        var $Profit_Rate = $('.span-calc-home-finance-profit-rate').text();

        if ($('select.salary') != null) {
            var $Salary = $('select.salary').val();
            if ($Salary == 'Yes') {
                $('#txtProfit_Rate').val($('.span-calc-home-finance-profit-rate-salary').text());
                $Profit_Rate = $('.span-calc-home-finance-profit-rate-salary').text();
            } 
	    else if ($Salary <= 'No') {
                $('#txtProfit_Rate').val($('.span-calc-home-finance-profit-rate').text());
                $Profit_Rate = $('.span-calc-home-finance-profit-rate').text();
            } 
        }

        var $Total_Finance_Amount = ($Property_Value * $Percent_Finance / 100);
        if (!isNaN($Total_Finance_Amount)) {
            $('#txtTotal_Finance_Amount').val($Total_Finance_Amount);
        }

        /*Compound Interest Calculations*/
        var $Monthly_Installment = Math.round($Total_Finance_Amount * ($Profit_Rate / 12) / 100 * (Math.pow(1 + ($Profit_Rate / 12) / 100, $Tenure * 12) / (Math.pow(1 + ($Profit_Rate / 12) / 100, $Tenure * 12) - 1)));
        if (!isNaN($Monthly_Installment)) {
            $('#txtMonthly_Installment').val($Monthly_Installment);
        }

        /*Simple Interest Calculations
        var $Monthly_Installment = Math.round(($Total_Finance_Amount + ($Total_Finance_Amount * $Profit_Rate * $Tenure / 100)) / ($Tenure * 12));
        if (!isNaN($Monthly_Installment)){
            $('#txtMonthly_Installment').val($Monthly_Installment);
        }
        */
    }
}

function SetMainTable() {
    $('.maintable').attr("cellspacing", 0);
    $('.maintable').attr("cellpadding", 10);
    $('.maintable').attr("border", 0);
}

function BindValidationKeyPressEvent() {
    $('.digitsOnly').bind('keypress', function (e) {
        return restrictCharacters(this, e, digitsOnly);
    });
    $('.integerOnly').bind('keypress', function (e) {
        return restrictCharacters(this, e, integerOnly);
    });
    $('.alphaOnly').bind('keypress', function (e) {
        return restrictCharacters(this, e, alphaOnly);
    });
    $('.alphaNumeric').bind('keypress', function (e) {
        return restrictCharacters(this, e, alphaNumeric);
    });
    $('.emailpattern').bind('keypress', function (e) {
        return restrictCharacters(this, e, emailpattern);
    });
    $('.postalAddress').bind('keypress', function (e) {
        return restrictCharacters(this, e, postalAddress);
    });
    $('.details').bind('keypress', function (e) {
        return restrictCharacters(this, e, details);
    });

    $.fn.center = function () {
        this.css("position", "absolute");
        // this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
        this.css("top", "100px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    }
}

function ProcessIncrementDecrement(currentContronl, operationType) {
    if (currentContronl.css('background-image').toLowerCase().indexOf('_disabled') == -1) {
        var targetInputControl = currentContronl.parent().parent().find('input');
        var currentValue = parseInt(targetInputControl.val().replace(/,/g, ''));
        var makeControlDisabled = false;
        var valueToBeUpdated = 1;
        var answer = 0;
        switch (targetInputControl.attr('id')) {
            case "input-monthly-payment":
            case "input-savings-target":
            case "monthly_need":
            case "existing_saving":
            case "monthly_contribution":
            case "retirement_amount":
            case "existing_savings":
                valueToBeUpdated = 1000;
                if (operationType == "subtraction") {
                    if (currentValue <= 3000) {
                        makeControlDisabled = true;
                    }
                }
                break;
            case "input-growth-rate":
            case "annual_rate":
                if (operationType == "addition") {
                    if (currentValue >= 19) {
                        makeControlDisabled = true;
                    }
                }
                else {
                    if (currentValue <= 2) {
                        makeControlDisabled = true;
                    }
                }
                break;
            case "input-tenure":
            case "years_till_retirement":
            case "years_after_retirement":
            case "current_age":
                if (operationType == "addition") {
                    if (currentValue >= 79) {
                        makeControlDisabled = true;
                    }
                }
                else {
                    if (currentValue <= 2) {
                        makeControlDisabled = true;
                    }
                }
                break;
            case "retirement_age":
                if (operationType == "addition") {
                    if (currentValue >= 119) {
                        makeControlDisabled = true;
                    }
                }
                else {
                    if (currentValue <= 2) {
                        makeControlDisabled = true;
                    }
                }
                break;
        }
        if (operationType == "addition") {
            targetInputControl.val(CommaFormatted(CurrencyFormatted(currentValue + valueToBeUpdated)));
            currentContronl.css('background-image', "url('/_catalogs/masterpage/ADIB/img/addition.png')");
            currentContronl.parent().parent().find('.subtraction').css('background-image', "url('/_catalogs/masterpage/ADIB/img/subtraction.png')");
        }
        else {
            answer = currentValue - valueToBeUpdated;
            if (answer > 0) {
                targetInputControl.val(CommaFormatted(CurrencyFormatted(answer)));
            }
            else {
                targetInputControl.val(CommaFormatted(CurrencyFormatted(currentValue)));
            }
            currentContronl.css('background-image', "url('/_catalogs/masterpage/ADIB/img/subtraction.png')");
            currentContronl.parent().parent().find('.addition').css('background-image', "url('/_catalogs/masterpage/ADIB/img/addition.png')");
        }
        if (makeControlDisabled) {
            if (operationType == "addition") {
                currentContronl.css('background-image', "url('/_catalogs/masterpage/ADIB/img/addition_disabled.png')");
            }
            else {
                currentContronl.css('background-image', "url('/_catalogs/masterpage/ADIB/img/subtraction_disabled.png')");
            }
        }
    }
}

// Savings Planner starts from here

function InitializeSavingsPlanner() {
    try {
        if ($('.radio-savings-planner').length > 0) {
            SetMainTable();
            $('.radio-savings-planner input:radio').click(function () {
                EnsureSavingsPlannerView();
                CalculateSavings();
            });
            $('.addition').click(function () {
                ProcessIncrementDecrement($(this), "addition");
                CalculateSavings();
            });
            $('.subtraction').click(function () {
                ProcessIncrementDecrement($(this), "subtraction");
                CalculateSavings();
            });
            $('.div-savings-planner .maintable input').bind('change keyup keydown blur', function (e) {
                CalculateSavings();
            });
            EnsureSavingsPlannerView();
            CalculateSavings();
            $(".white_content_title a").click(function () {
                $(".black_overlay, .white_content_area").hide();
            });
        }
    }
    catch (e) { }
}

function Validate_ApplyNow_Wealth_Savings_Planner(boolDownload) {
    if (boolDownload) {
        if (Validate_ApplyNow_FormWidget()) {
            // Download custom planner
            var growth_rate = $('[id$="input-growth-rate"]').val();
            var tenure = $('[id$="input-tenure"]').val().replace(/,/g, '');
            var monthly_payment = parseInt($('[id$="input-monthly-payment"]').val().replace(/,/g, ''));
            var future_amount = $('[id$="input-savings-target"]').val().replace(/,/g, '');
            var customerName = $('[id$="ToolsAndCalcPlanner"] #name').val();
            $('[id$="hiddenDownload"]').val(growth_rate + "&" + tenure + "&" + monthly_payment + "&" + future_amount + "&" + customerName);
            $('[id$="btnDownload"]').click();
        }
    }
    else {
        Validate_ApplyNow_FormWidget();
    }
}

function DownloadCustomSavingPlan(boolDownload) {
    if (boolDownload) {
        $('[id$="btnSaveApplyNow"]').hide();
        $('[id$="btnSaveApplyNowDownload"]').show();
    }
    else {
        $('[id$="btnSaveApplyNow"]').show();
        $('[id$="btnSaveApplyNowDownload"]').hide();
    }
    $(".white_content_area").center();
    $(".black_overlay, .white_content_area").show();
}

function EnsureSavingsPlannerView() {
    var activeControl = null;
    var inActiveControl = null;
    if ($(".radio-savings-planner input:radio:checked").val() == "savings-target") {
        activeControl = $('[id$="input-savings-target"]');
        inActiveControl = $('[id$="input-monthly-payment"]');
    }
    else {
        activeControl = $('[id$="input-monthly-payment"]');
        inActiveControl = $('[id$="input-savings-target"]');
    }
    activeControl.val("2,000");
    inActiveControl.val("0");
    activeControl.prop("disabled", false);
    inActiveControl.prop("disabled", true);
    activeControl.parent().parent().find('.subtraction').css('background-image', "url('/_catalogs/masterpage/ADIB/img/subtraction.png')");
    activeControl.parent().parent().find('.addition').css('background-image', "url('/_catalogs/masterpage/ADIB/img/addition.png')");
    inActiveControl.parent().parent().find('.subtraction').css('background-image', "url('/_catalogs/masterpage/ADIB/img/subtraction_disabled.png')");
    inActiveControl.parent().parent().find('.addition').css('background-image', "url('/_catalogs/masterpage/ADIB/img/addition_disabled.png')");
}

function CalculateSavings() {
    var answerHTML = "";
    var purpose = $('[id$="purpose"').val();
    var growth_rate = $('[id$="input-growth-rate"]').val();
    var tenor = $('[id$="input-tenure"]').val().replace(/,/g, '');
    var future_amount = $('[id$="input-savings-target"]').val().replace(/,/g, '');
    var monthly_payment = parseInt($('[id$="input-monthly-payment"]').val().replace(/,/g, ''));
    var totalAmount = 0;
    if ($(".radio-savings-planner input:radio:checked").val() == "savings-target") {
        X = parseFloat((growth_rate / 100 / 12));
        Y = parseFloat(tenor * 12);
        PV = parseFloat(future_amount * X);
        PV_denominator = Math.pow(1 + X, Y) - 1;
        PV = PV / PV_denominator;
        PV = parseInt(PV);
        totalAmount = CommaFormatted(CurrencyFormatted(PV));
        answerHTML = "For the next <span class='saving-planner-year'></span> you need to save<span class='saving-planner-amount'></span>per month";
    }
    else {
        X = parseFloat((growth_rate / 100 / 12));
        Y = parseFloat(tenor * 12);
        Z = monthly_payment;
        FV = (Math.pow((1 + X), Y) - 1) / X;
        FV = parseInt(FV * Z);
        totalAmount = CommaFormatted(CurrencyFormatted(FV));
        answerHTML = "in <span class='saving-planner-year'></span> you would have saved<span class='saving-planner-amount'></span>";
    }
    $(".saving-planner-result").html(answerHTML);
    $(".saving-planner-year").text(tenor + " Year(s)");
    $(".saving-planner-amount").text("AED " + totalAmount);
}

// Savings Planner ends here and Retirement Planner starts from here

function InitializeRetirementPlanner() {
    try {
        if ($('.radio-retirement-planner').length > 0) {
            SetMainTable();
            ShowRetirementPlannerSection("retirement-planner-apply-now");
            $('.radio-retirement-planner input:radio').click(function () {
                CalculateRetirement($(".radio-retirement-planner input:radio:checked").val());
            });
            $('#retirement-planner-step1 .addition').click(function () {
                ProcessIncrementDecrement($(this), "addition");
                CalculateRetirement("");
            });
            $('#retirement-planner-step2 .addition').click(function () {
                ProcessIncrementDecrement($(this), "addition");
                CalculateRetirement("");
            });
            $('#retirement-planner-re-calculate .addition').click(function () {
                ProcessIncrementDecrement($(this), "addition");
                CalculateRetirement($(".radio-retirement-planner input:radio:checked").val());
            });
            $('#retirement-planner-step1 .subtraction').click(function () {
                ProcessIncrementDecrement($(this), "subtraction");
                CalculateRetirement("");
            });
            $('#retirement-planner-step2 .subtraction').click(function () {
                ProcessIncrementDecrement($(this), "subtraction");
                CalculateRetirement("");
            });
            $('#retirement-planner-re-calculate .subtraction').click(function () {
                ProcessIncrementDecrement($(this), "subtraction");
                CalculateRetirement($(".radio-retirement-planner input:radio:checked").val());
            });
            $('#retirement-planner-step1 .maintable input').bind('change keyup keydown blur', function (e) {
                CalculateRetirement("");
            });
            $('#retirement-planner-step2 .maintable input').bind('change keyup keydown blur', function (e) {
                CalculateRetirement("");
            });
            $('#retirement-planner-re-calculate .maintable input').bind('change keyup keydown blur', function (e) {
                CalculateRetirement($(".radio-retirement-planner input:radio:checked").val());
            });

            CalculateRetirement("");

            $('[id$="btnRetirementPlannerSection1Next"]').click(function () {
                ShowRetirementPlannerSection("retirement-planner-step2");
            });
            $('[id$="btnRetirementPlannerStep2Previous"]').click(function () {
                ShowRetirementPlannerSection("retirement-planner-step1");
            });
            $('[id$="btnRetirementPlannerStep2Calculate"]').click(function () {
                ShowRetirementPlannerSection("retirement-planner-result");
            });
            $('[id$="btnRetirementPlannerCalculate"]').click(function () {
                ShowRetirementPlannerSection("retirement-planner-result");
            });
            $('[id$="recalculateRetirementPlanner"]').click(function () {
                ShowRetirementPlannerSection("retirement-planner-re-calculate");
            });
            $('[id$="btnRetirementPlannerCalculatePrevious"]').click(function () {
                ShowRetirementPlannerSection("retirement-planner-step2");
            });
        }
    }
    catch (e) { }
}

function Validate_ApplyNow_Wealth_Retirement_Planner() {
    if (Validate_ApplyNow_FormWidget()) {
        ShowRetirementPlannerSection("retirement-planner-step1");
        isApplyNowComplete = true;
    }
}

function ShowRetirementPlannerSection(sectionToShow) {
    $('[id$="retirement-planner-apply-now"]').hide();
    $('[id$="retirement-planner-step1"]').hide();
    $('[id$="retirement-planner-step2"]').hide();
    $('[id$="retirement-planner-re-calculate"]').hide();
    $('[id$="retirement-planner-result"]').hide();
    $('[id$=' + sectionToShow + ']').show();
    $('*').scrollTop(0);
}

function DownloadCustomRetirementPlan() {

}

function EnsureRetirementPlannerView() {
    if ($(".radio-retirement-planner input:radio:checked").val() == "Monthly Payment") {
        $('.tr-monthly-contribution').show();
        $('.tr-retirement-amount').hide();
    }
    else {
        $('.tr-monthly-contribution').hide();
        $('.tr-retirement-amount').show();
    }
}

function pmt_result(rate, per, nper, pv, fv) {
    fv = parseFloat(fv);
    nper = parseFloat(nper);
    pv = parseFloat(pv);
    per = parseFloat(per);
    if ((per == 0) || (nper == 0)) {
        return (0);
    }
    rate = eval((rate) / (per * 100));
    if (rate == 0) {
        pmt_value = -(fv + pv) / nper;
    } else {
        x = Math.pow(1 + rate, nper);
        pmt_value = ((rate * (fv + x * pv)) / (-1 + x));
    }
    pmt_value = Math.round(pmt_value);
    return (pmt_value);
}

function CalculateRetirement(calculationType) {
    var monthly_need = $("#monthly_need").val().replace(/,/g, '');
    var years_till_retirement = $("#years_till_retirement").val();
    var years_after_retirement = $("#years_after_retirement").val();
    var rate = parseFloat($("#annual_rate").val());
    var currency_title = " AED ";
    var current_age = $('[id$="current_age"]').val();
    var retirement_age = $('[id$="retirement_age"]').val();
    var monthly_contribution = $('[id$="monthly_contribution"]').val().replace(/,/g, '');
    var existing_saving = $('[id$="existing_savings"]').val().replace(/,/g, '');
    var retirement_value_amount = $('[id$="retirement_amount"]').val().replace(/,/g, '');
    var annual_return = 4;
    var inflation = 0;
    var annual_retirement_amount = parseFloat(monthly_need * 12);
    var expression1 = parseFloat(1 + inflation);
    var annual_retirement_amount_at_retirement = annual_retirement_amount * Math.pow(expression1, years_till_retirement);
    var expression1_death = parseFloat(1 + inflation);
    var annual_retirement_amount_at_death = annual_retirement_amount_at_retirement * Math.pow(expression1_death, years_after_retirement);
    var expression_1_retirement_amount = (annual_retirement_amount_at_death + annual_retirement_amount_at_retirement) / 2;
    var total_retirement_amount = (expression_1_retirement_amount * years_after_retirement);

    EnsureRetirementPlannerView();
    $('.monthly-contribution-amount-row').hide();
    $('.monthly-saving-amount-row').show();
    switch (calculationType) {
        case "Monthly Payment":
            $growth_rate = parseFloat(annual_return) - parseFloat(inflation);
            $growth_rate = parseFloat(($growth_rate / 100));
            $nper = parseFloat(retirement_age) - parseFloat(current_age);
            $pv = parseFloat(existing_saving);
            $pmt = monthly_contribution * 12;
            $X = Math.pow(1 + $growth_rate, $nper);
            $FV = (-$pmt + $X * $pmt + $growth_rate * $X * $pv) / $growth_rate;
            $FV = Math.round($FV);
            $('.span-monthly-contribution-amount').text(currency_title + CommaFormatted(CurrencyFormatted(monthly_contribution)));
            $('.span-total-saved-amount').text(currency_title + CommaFormatted(CurrencyFormatted(Math.round($FV))));
            $('.monthly-contribution-amount-row').show();
            $('.monthly-saving-amount-row').hide();
            break;
        case "Retirement Amount":
            $growth_rate = parseFloat(annual_return) - parseFloat(inflation);
            $growth_rate = parseFloat(($growth_rate / 100 / 12));
            $nper = parseFloat(retirement_age) - parseFloat(current_age);
            $nper = $nper * 12;
            $X = parseFloat(($growth_rate / 100));
            $X = Math.pow(1 + $growth_rate, $nper);
            $PV = (($growth_rate * (retirement_value_amount + $X * existing_saving)) / (-1 + $X));
            $PV = $PV / 10; // This needs to be tested and verified later
            $statement_text = "you need to save per month.";
            $('.span-monthly-saving-amount').text(currency_title + CommaFormatted(CurrencyFormatted(parseInt($PV))));
            $('.span-total-saved-amount').text(currency_title + CommaFormatted(CurrencyFormatted(retirement_value_amount)));
            break;
        default:
            var rate_without_division = rate;
            rate = rate / 12;
            var per = 1;
            var nper = (years_till_retirement * 12);
            var pv = parseFloat($("#existing_saving").val().replace(/,/g, ''));
            var fv = -total_retirement_amount;
            var monthly_savings = pmt_result(rate, per, nper, pv, fv);
            $('.span-monthly-saving-amount').text(currency_title + CommaFormatted(CurrencyFormatted(Math.abs(monthly_savings))));
            $('.span-total-saved-amount').text(currency_title + total_retirement_amount);
            break;
    }
}

/* Retirement Planner ends here and Car Finance calculator starts here */

function InitializeCarFinanceCalculator() {
    try {
	        if ($('.adib-car-finance-calc').length > 0) {
	            InitalizeDefaultCarFinanceValues();
	            //$('.adib-car-finance-calc input').bind('change keyup keydown blur', function (e) {
	            $('.adib-car-finance-calc input').bind('blur', function (e) {
	                CalculateCarFinance();
	            });
	           $('[id$="reset-form"]').click(function () {
	            InitalizeDefaultCarFinanceValues();
	        });
        }
    }
    catch (e) { }
}

function InitalizeDefaultCarFinanceValues() {
    try {
        $('[id$="input_car_price"]').val($(".hidden-car-finance-default-values .span-car-price").text());
        $('[id$="input_down_payment"]').val($(".hidden-car-finance-default-values .span-down-payment").text());
        $('[id$="input_insurance_amount"]').val($(".span-insurance-amount").text());
        $('[id$="input_profit_rate"]').val($(".hidden-car-finance-default-values .span-profit-rate").text());
        $('[id$="input_tenure"]').val($(".hidden-car-finance-default-values .span-tenure").text());
        CalculateCarFinance();
    }
    catch (e) { }
}

function CalculateCarFinance() {
    try {
        var priliminaryCost = 0;
        var downPayment = 0;
        var insuranceAmount = 0;
        var profitRate = 0;
        var tenure = 0;
        if ($('[id$="input_car_price"]').val().replace(/,/g, '') != "") {
            priliminaryCost = parseFloat($('[id$="input_car_price"]').val().replace(/,/g, ''), 10);
        }
        if ($('[id$="input_down_payment"]').val().replace(/,/g, '') != "") {
            downPayment = parseFloat($('[id$="input_down_payment"]').val().replace(/,/g, ''), 10);
        }
        if ($('[id$="input_insurance_amount"]').val().replace(/,/g, '') != "") {
            insuranceAmount = parseFloat($('[id$="input_insurance_amount"]').val().replace(/,/g, ''), 10);
        }
        if ($('[id$="input_profit_rate"]').val().replace(/,/g, '') != "") {
            profitRate = parseFloat($('[id$="input_profit_rate"]').val().replace(/,/g, ''));
        }
        if ($('[id$="input_tenure"]').val().replace(/,/g, '') != "") {
            tenure = parseFloat($('[id$="input_tenure"]').val().replace(/,/g, ''));
        }
        var profitAmount = parseFloat(((((priliminaryCost - downPayment) * profitRate) / 100) * tenure / 12) + (((insuranceAmount * profitRate) / 100) * tenure / 12));
        var installAmount = parseFloat((((priliminaryCost - downPayment) + Math.round(profitAmount) + insuranceAmount) / (tenure - 1)));
        var totalSellingPrice = parseFloat((installAmount * (tenure - 1)) + downPayment);
        $('[id$="answer"]').val("AED " + CommaFormatted(CurrencyFormatted(Math.round(installAmount))));

        // Format Values
        $('[id$="input_car_price"]').val(CommaFormatted(CurrencyFormatted(priliminaryCost)));
        $('[id$="input_down_payment"]').val(CommaFormatted(CurrencyFormatted(downPayment)));
        $('[id$="input_insurance_amount"]').val(CommaFormatted(CurrencyFormatted(insuranceAmount)));
    }
    catch (e) { }
}

/* Car Finance calculator ends here and Car ijarah starts */

function InitializeCarIjarah() {
    try {
        if ($('.adib-car-ijarah-calc').length > 0) {

            $('[id$="vehiclePrice"]').bind('change keyup keydown blur', function (e) {
                CalculateCarIjarah();
            });
            $('[id$="ijarahPeriod"]').bind('change keyup keydown blur', function (e) {
                CalculateCarIjarah();
            });
            CalculateCarIjarah();
        }
    }
    catch (e) { }
}

function CalculateCarIjarah() {
    var vehiclePrice = $('[id$="vehiclePrice"]').val().replace(/,/g, '');
    var monthlyInstallment = 0;
    if (vehiclePrice != "") {
        var ijarahPeriod = $('[id$="ijarahPeriod"]').val();
        var interestRateArray = new Array(4.5, 3.75, 3.75, 3.75, 3.75, 3.75);
        var depreciationRateArray = new Array(100, 85, 70, 50, 30, 30);
        var profitRate = 3.99 * 1.813; // profitRateMultiplier
        profitRate = Math.round(profitRate * 100) / 100;
        var downPayment = 0;
        if (vehiclePrice > 500000) {
            vehiclePrice = 500000;
        }
        if (vehiclePrice > 0) {
            var carValue = 0;
            var insurance = 0;
            var loanTenure = ijarahPeriod / 12;
            var addedCost = 0;
            for (var count = 1; count <= loanTenure; count++) {
                // CALCULATE DEPRECIATION
                carValue = (vehiclePrice * depreciationRateArray[count - 1]) / 100;
                if (Math.round((carValue * interestRateArray[count - 1]) / 100) < 2000) {
                    insurance += 2000;
                }
                else {
                    insurance += Math.round((carValue * interestRateArray[count - 1]) / 100);
                }
                addedCost += 200;                          // AAA REGISTRATION
                addedCost += 450;                          // TRAFFIC REGISTRATION
                addedCost += 250;                          // REPLACEMENT
                if (count == 1) {
                    addedCost += 800;      // EXTENDED WARRANTY
                }
            }
        }
        ijarahAmount = vehiclePrice - downPayment;
        var principalAmount = ijarahAmount + insurance + addedCost;
        var rate = profitRate / 100;
        if (rate == 0) {
            monthlyInstallment = principalAmount / ijarahPeriod;
        }
        else {
            monthlyInstallment = principalAmount * (rate / 12) / (1 - 1 / Math.pow(1 + rate / 12, ijarahPeriod));
            monthlyInstallment += 1;
        }
        $('[id$="vehiclePrice"]').val(CommaFormatted(CurrencyFormatted(vehiclePrice)));
    }
    $('[id$="answer"]').html(CommaFormatted(CurrencyFormatted(monthlyInstallment)));
}

/* Car ijarah ends here */