$(document).ready(function() {

	prepValues();

	$('#resistCount').text(good);
	$('#giveInCount').text(bad);
	if (ratio > 0) {
		$('#ratio').text(ratio+'%');
	} else {
		$('#ratio').text('\u221e');
	}

    $("#resistButton").click(function(){
    	good++;
        $('#resistCount').text(good);
        localStorage["good"] = good;
        updatePercentage();
    }); 

	$("#giveInButton").click(function(){
    	bad++;
        $('#giveInCount').text(bad);
        localStorage["bad"] = bad;
        updatePercentage();
    }); 

	$('#clear').click(function () {
		localStorage[""]
		localStorage.removeItem("good");
		localStorage.removeItem("bad");
		localStorage.removeItem("ratio");

		prepValues();

		$('#resistCount').text(good);
		$('#giveInCount').text(bad);
		$('#ratio').text(ratio);
	})

});

function updatePercentage() {
	ratio = ((good/(good+bad))*100).toFixed(0);
	$('#ratio').text(ratio+'%');
	localStorage["ratio"] = ratio;
	if (ratio <= 30) {
		$('#ratio').addClass('inTrouble');
	} else {
		$('#ratio').removeClass('inTrouble');
	}
}

function updateRatio() {
	if(bad == 0) {
		$('#ratio').text('\u221e');
	} else {
		ratio = (good/bad).toFixed(2);
		$('#ratio').text(ratio);
		localStorage["ratio"] = ratio;
	}
}

function prepValues() {
	good = localStorage.good;
	if (good == undefined) { good = 0 }

	bad = localStorage.bad;
	if (bad == undefined) { bad = 0 }

	ratio = localStorage.ratio;
	if (ratio == undefined) {
		if (good == undefined || bad == undefined) {
			ratio = 0;
			good = 0;
			bad = 0;
		} else if (bad == 0) {
			ratio = '\u221e';
		} else {
			ratio = ((good/(good+bad))*100).toFixed(0);;
		}
	}
}