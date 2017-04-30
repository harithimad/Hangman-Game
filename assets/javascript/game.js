// declaring variables that is used for the game
var words, pictures, blank, wrongGuess, guessRemain, currentWord, score = 0, loses = 0, wordPic, audioWin, audioLoss;
var gameList = ["scorpion", "ermac", "kabal", "guru", "striker", "raiden"];
setUp();
// intializing game and reseting round
function setUp() {
    console.log(gameList)
    var words = ["scorpion", "ermac", "kabal", "guru", "striker", "raiden"];
        pictures = {scorpion: "assets/images/scorpion.png", kabal: "assets/images/kabal.png", ermac: "assets/images/ermac.png", 
                   guru: "assets/images/goru.png", striker: "assets/images/striker.png", raiden: "assets/images/raiden.png"
               };
        selectedword = Math.floor(Math.random() * gameList.length);
        currentWord = gameList[selectedword];
        index = gameList.indexOf(currentWord);
        gameList.splice(index, 1)
        wordPic = pictures[currentWord];
        wrongGuess = [];
        guessRemain = 10;
        blank = "";
        audioWin = new Audio("assets/sounds/win.mp3");
        audioLoss = new Audio("assets/sounds/lose.mp3");
        availableLetters = "abcdefghijklmnopqrstuvwxyz";
    if (gameList.length ==  0) {
        gameList = words
    }
    // Establishes blanks for letters
    for (var i = 0; i < currentWord.length; i++) {
        
            blank += "_" + "";
    }
};

// Establishes events on key stroke
document.onkeyup = function(event) {

    var userGuess = event.key;
    if (availableLetters.indexOf(userGuess) == -1){
        document.getElementById("status").textContent = "Please type a valid letter";
        return // end and do nothing
    };
    document.getElementById("blanks").textContent = blank;
    document.getElementById("wrongGuesses").textContent = wrongGuess;
    document.getElementById("status").textContent = "Current Word:";
    document.getElementById("completion").textContent = "";
// Checks if guess was correct
    checkGuess(userGuess);
    function checkGuess(userGuess) {
        if (currentWord.indexOf(userGuess) > -1) {
            for (var i = 0; i < currentWord.length; i++) { 
                if (currentWord[i] === userGuess) {
                    // Shows user guess with displayLtrAt function
                    displayLtrAt(userGuess, i);
                    roundOver ();
             }
        }
        // If the guess is wrong it is pushed down into the wrongGuess text area
        } else if (wrongGuess.indexOf(userGuess) === -1) {
            wrongGuess.push(userGuess);
            wrongGuess = wrongGuess.sort();
            document.getElementById("wrongGuesses").textContent = wrongGuess;
            // Subtracts 1 remaining guess
            guessRemain--;
            document.getElementById("remain").textContent = guessRemain;
            roundOver ();
        } 
    }
};
// Puts the user guess in where a blank would be
function displayLtrAt(letter, index) {
    var letterGuess = "";
    for (var i = 0; i < blank.length; i++) 
        if (i === index) {
            letterGuess += letter;
        } else {
            letterGuess += blank[i];
        }
    // Changes guess to upper case
    blank = letterGuess.toUpperCase();

        document.getElementById("blanks").textContent = blank;
    };
// When a round ends
function roundOver () {
// Out of gueesses
    if (guessRemain === 0) {
        document.getElementById("picChange").src = ("assets/images/lose.png");
        document.getElementById("status").textContent = "You lose! The word was:";
        // Plays losing clip
        audioLoss.play();
        document.getElementById("blanks").textContent = currentWord.toUpperCase();
        document.getElementById("completion").textContent = "Press Any Key to Try Again";
        loses++;
        document.getElementById("loses").textContent = loses;
        setUp ();

    }
// Guessed the word correctly
    else if (blank.indexOf("_") === -1 && guessRemain != 0) {
        document.getElementById("status").textContent = "You win! The word was";
        // Plays winning clip
        audioWin.play();
        document.getElementById("completion").textContent = "Press Any Key to Restart";
        document.getElementById("picChange").src = wordPic;
        score++;
        document.getElementById("score").textContent = score;
        setUp();
    } 
};

