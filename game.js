var buttonColours=["red","blue","green","yellow"];
var computerPattern=[];
var userPattern=[];
var Start=false;
var level=0;

//Start the Game:
//challenge is to start only one time when keypresses ,its only when game to start for the first time,so we need tracker to start the game.
$(document).keydown(function () {
if(!Start){
    nextSequence();
    Start=true;
}
    
})

//user:
$(".btn").click(function () {
    var userColour=$(this).attr("id");//userColour="blue"(if user clicks blue button then thats id is stored)
userPattern.push(userColour);//userPattern=["blue"];
playSound(userColour);
animationClick(userColour);
checkAns(userPattern.length-1);
})


//computerSequence:
function nextSequence(){
  userPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber= Math.floor(Math.random()*4) //0-3
    var randomColour=buttonColours[randomNumber];//randomColour=buttonColour[2]=randomColour=green;
    computerPattern.push(randomColour);//computerPattern=["greeen"];

     $("#"+randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);





}

//Sounds when button is pressed:
function playSound(name) {
 var audio=new Audio("sounds/"+ name+".mp3");
 audio.play();    
}
 
function animationClick(currentColour) {
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function () {
      $("#"+currentColour).removeClass("pressed")  
    },100);
}
// To check the answers we have to keep track of levels i.e. no of levels = no of choosen colors and every levels userPattern.length===computerPatttern.
function checkAns(currentLevel) {
    if(userPattern[currentLevel]=== computerPattern[currentLevel]){
         if(userPattern.length===computerPattern.length){
            setTimeout(function () {
                nextSequence();
            },1000);
         }
    }
    else{
        playSound("wrong");


        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    }
} 
function startOver(){
    Start=false;
    level=0;
    computerPattern=[];
}
