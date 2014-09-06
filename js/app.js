//'hot or cold' aka 'Huckle Buckle Beanstalk'
var WINNING_MSG = "wins",
	HOTTER_MSG = "hotter",
	COLDER_MSG = "colder",
	INVALID_INPUT_MSG = "Input valid";


var beanstalk,
	beanstalkUpperBound = 100,
	beanstalkLowerBound = 0,
	previousUserInput = 0;


/*starts or restarts game by re-assigning the hidden number*/

function initiate(){
	beanstalk = Math.floor((Math.random()*beanstalkUpperBound));
	console.log(beanstalk);
	//reset user previous input here
}

/*validates user input */
function isValid(userInput){
	if(isNaN(userInput))//(typeof userInput !== "number")
	{
		return false;
	}
	else if(userInput > beanstalkUpperBound || userInput < beanstalkLowerBound)
	{
		return false;
	}
	else
	{
		return true;
	}
}


/*handles the userInput*/
function analyzeUserInput(userInput){
	if(isValid(userInput)){
		userInput = parseInt(userInput);
		if(userInput === beanstalk)
		{
			return WINNING_MSG;
		}
		else if(Math.abs((beanstalk - userInput)) > Math.abs((beanstalk - previousUserInput)))
		{
			return COLDER_MSG;
		}

		else if(Math.abs((beanstalk - userInput)) < Math.abs((beanstalk - previousUserInput)))
		{
			return HOTTER_MSG;
		}
	}

	else if(!isValid(userInput))
	{
		return INVALID_INPUT_MSG;
	}
}

/*********************************************************
interaction with html file
**********************************************************/
$("#input_submit").click(function(){
	var $input = $("#user_input").val();
	var result = analyzeUserInput($input);
	if(result === HOTTER_MSG){
		alert("hotter");
	}

	else if(result === COLDER_MSG){
		alert("colder");	
	}

	else if(result === WINNING_MSG){
		alert("you won");
	}

	else if(result === INVALID_INPUT_MSG){
		alert("invalid");
	}
	previousUserInput = $input;
});

$("#restart_button").click(initiate());















