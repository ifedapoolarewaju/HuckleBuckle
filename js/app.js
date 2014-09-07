/*************************************************************************************
Huckle Buckle Beanstalk....
a.k.a HuckleBerry Pie....
nah...just reminds me of the pie...
but a.k.a "Hot or Cold" though

TO ENJOY THIS FILE, YOU MIGHT WANT TO START FROM THE BOTTOM..."GAMEPLAY" section

but then again you're a professional so.....you'd understand anyway..
*************************************************************************************/

//global variables store user inputs
var userInput,
	userPreviousInput = 0;


//object that defines beanstalk characteristics...describes the object which the player seeks
var beanstalk = {
	teaseMsg: "oops! You can't catch me",
	position: null,
	
	keep: function(){
		beanstalk.position = Math.floor((Math.random()*beanstalk.upperBound))
	},
	
	upperBound : 100,
	
	lowerBound : 0,
}


/***gameManager object handles the entire gamePlay*****/
var gameManager = {

	neutralMsg: "Neither hot nor cold",

	winningMsg : "Congratulations!!! \n You just found the Beanstalk!",

	hotterMsg : "you getting hotter",

	colderMsg : "you getting colder",

	hottestMsg: "This is about the hottest you can get!!",

	invalidInputMsg : "Input invalid",

	//resets the game
	reset: function (){
		beanstalk.keep();
		$("#winner_block").hide();
		$("#beanstalk_msg_block").hide();
		$("#input_submit").show();
		$("#user_input").val("");
		$("#heat_scale").val(0);
		$("#output_block").text("");
		userPreviousInput = 0;
		userInput = null;
		console.log(beanstalk.position);
	},
	
	//validates user input
	UserInputIsValid: function(){
		if(!isNaN(parseInt(userInput, 10)) && userInput >= beanstalk.lowerBound && userInput <= beanstalk.upperBound && userInput.indexOf(" ")===-1)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	//handles user input
	handleUserInput: function (event){
		var outputMsg;
		userInput = $("#user_input").val()
		if(gameManager.UserInputIsValid()){
			userInput = parseInt(userInput, 10);
			
			//if user/player wins
			if(userInput === beanstalk.position)
			{
				$("#winner_block").slideDown().text(gameManager.winningMsg);
				outputMsg = gameManager.hottestMsg;

				//hides input button so game cant continue after player wins
				$("#input_submit").hide();
			}
			
			//confirms if user/player got colder
			else if(Math.abs((beanstalk.position - userInput)) > Math.abs((beanstalk.position - userPreviousInput)))
			{
				outputMsg = gameManager.colderMsg;	
			}

			//confirms if user/player got hotter
			else if(Math.abs((beanstalk.position - userInput)) < Math.abs((beanstalk.position - userPreviousInput)))
			{
				outputMsg = gameManager.hotterMsg;
			}

			//confirms if user/player didnt cahnge temperature
			else if(Math.abs((beanstalk.position - userInput)) === Math.abs((beanstalk.position - userPreviousInput)))
			{
				outputMsg = gameManager.neutralMsg;
			}
			//outputs outcome of user/player's guess
			$("#output_block").text(outputMsg);
			$("#beanstalk_msg_block").show().text(beanstalk.teaseMsg).fadeOut(800);
			
			//sets heat scale value
			$("#heat_scale").val(100 - Math.abs(beanstalk.position - userInput));
			userPreviousInput = userInput;
		}

		else
		{
			//user/player typed in an invalid input
			$("#output_block").text(gameManager.invalidInputMsg);
		}
	}
}


/*********************************************************
					GAMEPLAY
**********************************************************/
//resets game once document is ready
$(document).ready(gameManager.reset);

$("#input_submit").click(gameManager.handleUserInput);
$("#restart_button").click(gameManager.reset);

//prevents enter key from submitting form before user input is passed to handler
$("#user_input").keypress(function(event){
	if (event.which==13)
	{
		event.preventDefault();
		gameManager.handleUserInput();
	}
});