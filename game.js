var ifGameStarted = false;
var ifKeyPressed = false;
var level = 0;

var buttonColours = [ "red", "blue", "green", "yellow" ];

var gamePattern = [];
var userClickedPattern = [];

var screenSize = screen.width;

init();
function init() {
	if (screenSize <= 540) {
		$("#level-title").html("Press the button.");
		$('.start-button').css('display', 'inline-block');
	}
}

function nextSequence() {
	var randomNumber = Math.floor(Math.random() * 4);

	var randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
	level++;
}

$(".btn").click(function() {
	var userChosenColour = $(this).attr("id");

	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);

	if (userClickedPattern.length == level) {
		checkAnswer(userClickedPattern);
	}

});

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	$("#" + currentColour).fadeOut(100).fadeIn(100);
	$("#" + currentColour).addClass("pressed");

	setTimeout(function() {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

$(document).on('keypress', function(e) {

	if (ifGameStarted == false) {
		ifGameStarted = true;
		if (ifGameStarted) {
			$("h1").html("Level " + level);
		}
		nextSequence();
	}

});

$(".start-Button").click(function() {
	if (ifGameStarted == false) {
		ifGameStarted = true;
		if (ifGameStarted) {
			$("h1").html("Level " + level);
		}
		nextSequence();

		$(".start-Button").css('display', 'none');
	}
});

function checkAnswer(userAnswer) {
	buttonClicked = userAnswer.length;
	var isSuccess = false;

	if (buttonClicked == gamePattern.length) {
		for (var i = 0; i < buttonClicked; i++) {
			if (userAnswer[i] == gamePattern[i]) {
				// console.log("Success");
				isSuccess = true;
			} else {
				// console.log("Fail");
				isSuccess = false;
			}
		}

	} else {
		console
				.log("Number of colors selected is not equal to the game pattern color number");
		isSuccess = false;
	}

	userClickedPattern = [];

	if (isSuccess) {
		$("h1").html("Level " + level);
		setTimeout(nextSequence, 1000);
		console.log("level " + (level - 1) + " crossed.");
	} else {
		console.log("level " + (level - 1) + " failed.");

		if (screenSize <= 540) {
			$("h1").html("Game Over. Click the button to restart.");
		} else {
			$("h1").html("Game Over. Press any key to restart.");
		}

		ifGameStarted = false;
		gamePattern = [];
		level = 0;
		playSound("wrong");
		$(".start-Button").css('display', 'inline-block');
	}
}