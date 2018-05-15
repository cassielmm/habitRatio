$(document).ready(function() {

	loadValues();

	$('#resistCount').text(good);
	$('#giveInCount').text(bad);
	if (ratio >= 0) {
		if (display[0] == 'updatePercentage') {
			$('#ratio').text(ratio+'%');
		} else {
			$('#ratio').text(ratio);
		}
	} else {
		$('#ratio').text('\u221e');
	}
	$("#troubleBox").val(trouble);

	checkForTrouble();

    $("#resistButton").click(function(){
    	good++;
        $('#resistCount').text(good);
        localStorage["good"] = good;
        console.log('button: '+display);
        window[display[0]]();
    }); 

	$("#giveInButton").click(function(){
    	bad++;
        $('#giveInCount').text(bad);
        localStorage["bad"] = bad;
        window[display[0]]();
    }); 

    $("#ratioOpt").click(function(){
    	display = ['updateRatio', 'calcRatio'];
    	localStorage['display'] = display;
    	updateRatio();
    	$("#ratioOpt").css('background-color', 'red');
    	$("#percentOpt").css('background-color', '#45c797');

    	/** ! **/
    	trouble = (trouble*2)/100;
    	$("#troubleBox").val(trouble);
    }); 

    $("#percentOpt").click(function(){
    	display = ['updatePercentage', 'calcPercent'];
    	localStorage['display'] = display;
    	updatePercentage();
    	$("#percentOpt").css('background-color', 'red');
    	$("#ratioOpt").css('background-color', '#45c797');

    	/** ! **/
    	trouble = trouble*50;
    	$("#troubleBox").val(trouble);
    }); 

    $("#troubleOpt").click(function(){
    	trouble = $("#troubleBox").val();
    	localStorage['trouble'] = trouble;
    }); 

	$('#clear').click(function() {
		localStorage.removeItem("good");
		localStorage.removeItem("bad");
		localStorage.removeItem("ratio");

		loadValues();

		$('#resistCount').text(good);
		$('#giveInCount').text(bad);
		$('#ratio').text(ratio);
		$('#ratio').removeClass('inTrouble');
	})

});

var updatePercentage = function() {
	console.log("percent");
	calcPercent();
	$('#ratio').text(ratio+'%');
	localStorage["ratio"] = ratio*100;
	checkForTrouble();
}

var updateRatio = function() {
	console.log("ratio");
	if (bad == 0) {
		$('#ratio').text('\u221e');
	} else {
		calcRatio();
		$('#ratio').text(ratio);
	}
	localStorage["ratio"] = ratio*100;
	checkForTrouble();
}

function checkForTrouble() {
	if (ratio == '\u221e') {
	} else if(ratio < trouble) {
		$('#ratio').addClass('inTrouble');
	} else {
		$('#ratio').removeClass('inTrouble');
	}
}

function calcPercent() {
	ratio = ((good/(good+bad))*100).toFixed(0);
}

function calcRatio() {
	console.log(good/bad);
	ratio = (good/bad).toFixed(2);
}

function loadValues() {
	good = parseInt(localStorage.good);
	if (isNaN(good)) { good = 0 }

	bad = parseInt(localStorage.bad);
	if (isNaN(bad)) { bad = 0 }

	trouble = parseInt(localStorage.trouble);
	if (isNaN(trouble)) { trouble = 50 }

	display = localStorage.display;
	if (display == undefined) { display = ['updatePercentage', 'calcPercent'] }
	display = display.split(",");
	if (display[0] == 'updatePercentage') {
		$("#percentOpt").css('background-color', 'red');
	} else {
		$("#ratioOpt").css('background-color', 'red');
	}

	ratio = parseInt(localStorage.ratio)/100;
	console.log(ratio);
	if (isNaN(ratio)) {
		if (bad == 0) {
			ratio = '\u221e';
		} else {
			window[display[1]]();
		}
	}

	console.log('load: '+ratio);
}