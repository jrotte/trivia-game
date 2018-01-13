	var triviaQuestions = [{
	question: "What year did the Cubs recently win the World Series?",
	answerList: ["1988", "2016", "1994", "2001"],
	answer: 1
},{
	question: "Who was the MVP of the Cubs World Series?",
	answerList: ["Ben Zobrist", "Joe Jackson", "Peter Gibbons", "Mark Cuban"],
	answer: 0
},{
	question: "Who was the best basketball player in Bulls history?",
	answerList: ["Michael Jordan", "Scottie Pippen", "Shaq", "Kobe"],
	answer: 0
},{
	question: "Who was the best running back in Bears history?",
	answerList: ["Gary Payton", "Gary Johnson", "Walter Payton", "Dwight Schrute"],
	answer: 2
},{
	question: "Where do the Cubs play baseball?",
	answerList: ["Memphis", "United Center", "Mars", "Wrigley"],
	answer: 3
},{
	question: "How many championships did Michael Jordan win?",
	answerList: ["6", "0", "1", "3"],
	answer: 0
},{
	question: "Which of these people played for the Bulls?",
	answerList: ["Ron Swanson", "Dennis Rodman", "Chuck Prater", "Neil Armstrong"],
	answer: 1
},{
	question: "Which of these colors is part of the Bulls jersey?",
	answerList: ["Green", "Brown", "Red", "Blue"],
	answer: 2
},{
	question: "Who was the coach of the Chicago Bulls in the 90s?",
	answerList: ["Drew Barrymore", "Phil Jackson", "Phil Knight", "Pete Rose"],
	answer: 1
},{
	question: "What is the name of the Chicago hockey team?",
	answerList: ["Bears", "Lions", "Panthers", "Blackhawks"],
	answer: 3
},{
	question: "Who did the Cubs beat in the World series recently?",
	answerList: ["Cleveland", "Ole Miss", "Virginia", "Yankees"],
	answer: 0
},{
	question: "What other baseball team plays in Chicago besides the Cubs?",
	answerList: ["Hornets", "White Sox", "Bulls", "Blackhawks"],
	answer: 1
},{
	question: "Who was the 2nd best player on the Bulls in the 90s?",
	answerList: ["Brett Johnson", "Steve Johnson", "Drew Johsnon", "Scottie Pippen"],
	answer: 3
},{
	question: "Where did Michael Jordan go to college?",
	answerList: ["UNC", "OSU", "ASU", "TCU"],
	answer: 0
},{
	question: "What movie did Michael Jordan star in?",
	answerList: ["Oceans Eleven", "Forrest Gump", "Space Jam", "Fast and Furious"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Correct!",
	incorrect: "Wrong!",
	endTime: "Too Slow!",
	finished: "Score Summary"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();

	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;

	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
