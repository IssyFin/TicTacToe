//Using revealing module pattern since this is expected to be a smaller application

//Set up our players array
var players = [];
var difficultySetting = 1;
var gameMode;

//Create elements for our new game screen
const newGameScreen = document.createElement('newGameScreen');
newGameScreen.classList.add("popup");  
const newGameMsg = document.createElement('div');
const buttonRow = document.createElement('div');
buttonRow.classList.add("pSelectButtonRow");
const difficultyButtonRow = document.createElement('div');
difficultyButtonRow.classList.add("dSelectButtonRow");
const selectOnePlayer = document.createElement('button');
const selectTwoPlayers = document.createElement('button');
selectOnePlayer.classList.add("playerCountSelect");
selectTwoPlayers.classList.add("playerCountSelect");
const selectDifficulty = document.createElement('div');
selectDifficulty.classList.add("pSelectButtonRow");
const selectEasy = document.createElement('button');
selectEasy.classList.add("diffButton");
const selectMedium = document.createElement('button');
selectMedium.classList.add("diffButton");
const selectHard = document.createElement('button');
selectHard.classList.add("diffButton");

//Create elements for our finished game screen
const winScreen = document.createElement('winScreen'); //create a div for the winscreen
winScreen.classList.add("popup"); //give the win screen a popup class
const winnerMsg = document.createElement('div');
const playAgainMsg = document.createElement('div');

//The Game Flow Module handles player changes, newgame and reset buttons, and player score
var gameFlow = (function(){
    var _activePlayer = 1; 
    
    //Cache Dom:
     var cacheDom = (function (){
        this.board = document.querySelector('#gameBoard');
        this.square = document.querySelectorAll('.square');
        this.squareArray = [...this.square];
        this.reset = document.querySelector('#reset');
        this.newGame = document.querySelector('#newGame');
    })();

    //Bind Events:
    var bindEvents = (function(){
            newGame.addEventListener("click",function(){
                if(board.contains(winScreen)){
                    board.removeChild(winScreen);
                }
                startNewGame();
                _activePlayer = 1;
            });
            reset.addEventListener("click",function(){
                if(board.contains(winScreen)){
                    board.removeChild(winScreen);
                }
                startNewGame();
                _activePlayer = 1;
                players = [];
                displayController.displayStartPopup();
            })
        })();    

    //Render:
    var render = (function (){
    })();

    //Makes players for a 1-player game
    function newPlayers1(difficulty){//Public
        let name1 = prompt("Player, please enter your name: ")
        let player1 = Player(name1,0);
        let name2 = "";
        if(difficulty=== 3){
            player2 = CPU("Artemis",0,3) 
        }
        else if(difficulty ===2 ){
            player2 = CPU("Chandra",0,2);
        }
        else{
            player2 = CPU("Luna",0,1);
        }
        players.push(player1);
        players.push(player2);
        displayController.removeStartPopup();
        displayController.updateScoreboard();
        gameMode = 1;
    }
    //Makes players for a 2-player game
    function newPlayers2(){//Public
        let name1=prompt("Player 1, please enter your name:");
        let name2 = prompt("Player 2, please enter your name:");
        let player1 = Player(name1,0);
        let player2 = Player(name2,0);
        players.push(player1);
        players.push(player2);
        displayController.removeStartPopup();
        displayController.updateScoreboard();
        gameMode = 2;
    }
    
    //Change Player:
    function changePlayer(){//Public
        if(_activePlayer === 1){
            _activePlayer = 2;
        }
        else{
            _activePlayer = 1;
        }
    };

    //reports the current player;
    function currentPlayer(){
        return _activePlayer;
    };

    var startNewGame = function (){
        gameBoard.clearBoard();
        if(_activePlayer === 2){
            _activePlayer = 1;
        }
    };
    
    var incrementScore = function(playerNumber){
        if(playerNumber===1){
            // _playerOneScore++;
        }
        else{
            // _playerTwoScore++;
        }
        displayController.updateScoreboard();
    };

    return{bindEvents,cacheDom,render,currentPlayer,changePlayer,startNewGame, incrementScore,newPlayers1,newPlayers2};
})();

//The Display Controller handles the scoreboard, player names, and popups for the winner
var displayController = (function(){
    var _difficultyBound = false;
 //Cache Dom:
    var cacheDom = (function (){
        this.board = document.querySelector('#gameBoard');
        this.square = document.querySelectorAll('.square');
        this.squareArray = [...this.square];
        this.pOneScore = document.querySelector('#oneScore');
        this.pTwoScore = document.querySelector('#twoScore');
        this.pOneName = document.querySelector('#oneName');
        this.pTwoName = document.querySelector('#twoName');
    })();

    //Bind Events:
    var bindEvents = (function(){
        var winScreenBind = function(){   
            winScreen.addEventListener("click",removeEndPopup);
        }
        var onePlayerBind = function(){
            selectOnePlayer.addEventListener("click",selectDifficultyScreen);
        }
        var twoPlayerBind = function(){
            selectTwoPlayers.addEventListener("click",gameFlow.newPlayers2);
        }
        var difficultyBind = function(){
            // selectEasy.addEventListener("click",gameFlow.newPlayers1);
            if(_difficultyBound===false){
            selectEasy.addEventListener("click",function(){
                gameFlow.newPlayers1(1);
                difficultyButtonRow.removeChild(selectEasy);
                difficultyButtonRow.removeChild(selectMedium);
                difficultyButtonRow.removeChild(selectHard);
                newGameScreen.removeChild(newGameMsg);
                newGameScreen.removeChild(difficultyButtonRow);
            });
            selectMedium.addEventListener("click",function(){
                gameFlow.newPlayers1(2);
                difficultyButtonRow.removeChild(selectEasy);
                difficultyButtonRow.removeChild(selectMedium);
                difficultyButtonRow.removeChild(selectHard);
                newGameScreen.removeChild(newGameMsg);
                newGameScreen.removeChild(difficultyButtonRow);
            });
            selectHard.addEventListener("click",function(){
                gameFlow.newPlayers1(3);
                difficultyButtonRow.removeChild(selectEasy);
                difficultyButtonRow.removeChild(selectMedium);
                difficultyButtonRow.removeChild(selectHard);
                newGameScreen.removeChild(newGameMsg);
                newGameScreen.removeChild(difficultyButtonRow);
            });
            _difficultyBound=true;
        }
        else{}
        }
        return {winScreenBind,onePlayerBind,twoPlayerBind,difficultyBind};
        })();    

    //Render:
    var render = (function (){
    })();

    //Pop-up for Winner:
    var displayEndPopup = function (endGameType){//public
        board.appendChild(winScreen);
        winScreen.appendChild(winnerMsg);
        winScreen.appendChild(playAgainMsg);
        winnerMsg.textContent = endGameType;
        playAgainMsg.textContent = "Click New Game to play again.";
        displayController.bindEvents.winScreenBind();
    };

    var displayStartPopup = function(){//public
        board.appendChild(newGameScreen);
        newGameScreen.appendChild(newGameMsg);
        newGameScreen.appendChild(buttonRow);
        buttonRow.appendChild(selectOnePlayer);
        buttonRow.appendChild(selectTwoPlayers);
        newGameMsg.textContent = "Select the number of players: ";
        selectOnePlayer.textContent = "One Player";
        selectTwoPlayers.textContent = "Two Players";
        displayController.bindEvents.onePlayerBind();
        displayController.bindEvents.twoPlayerBind();
    }

    //Take down endgame pop-up:
    var removeEndPopup = function(){//public
        board.removeChild(winScreen);
    }

    //Take down new game pop-up:
    var removeStartPopup = function(){//public
        board.removeChild(newGameScreen);
    }
    
    var selectDifficultyScreen = function(){//public, but could be made private
        newGameScreen.removeChild(newGameMsg);
        newGameScreen.removeChild(buttonRow);
        newGameScreen.appendChild(newGameMsg);
        newGameScreen.appendChild(difficultyButtonRow);
        newGameMsg.textContent = "Select difficulty: ";
        difficultyButtonRow.appendChild(selectEasy);
        selectEasy.textContent = "Easy";
        difficultyButtonRow.appendChild(selectMedium);
        selectMedium.textContent = "Medium";
        difficultyButtonRow.appendChild(selectHard);
        selectHard.textContent = "Hard";
        displayController.bindEvents.difficultyBind();
    }

    var updateScoreboard = function(){//public
        pOneScore.textContent = players[0].getScore();
        pTwoScore.textContent = players[1].getScore();
        pOneName.textContent = players[0].getName();
        pTwoName.textContent = players[1].getName();
    }

    return{bindEvents,cacheDom,render, displayEndPopup, removeStartPopup, removeEndPopup, updateScoreboard,displayStartPopup};
})();


//The Game Board Module handles markers, valid moves, grid clearing, and win conditions
var gameBoard = (function(){
    var _gameFinished = false; //private

    //Cache Dom:
    var cacheDom = (function (){
        this.board = document.querySelector('#gameBoard');
        this.square = document.querySelectorAll('.square');
        this.squareArray = [...this.square];
    })();

    //Bind Events:
    var bindEvents = (function(){
        for (var i = 0; i < this.squareArray.length; i++) {
            this.squareArray[i].addEventListener("click",displayMarker);
        }})();    

    //Render:
    var render = (function (){
    })();

    //Display Marker:
    function displayMarker(){
        if(_gameFinished === false){
            if(validMove(this)===true){
                if(gameFlow.currentPlayer()===1){
                    this.classList.add("p1Controlled");
                }
                else{
                    this.classList.add("p2Controlled");
                }
                _gameOverCheck(this);
                gameFlow.changePlayer();
                if(gameMode === 1 && _gameFinished ===false){
                    computerMove();
                }
            }
            else{
                alert("This square is taken; please select a valid square.")
            }
        }
        else{
            alert("The game is over! Please click New Game to play again.");
        }
    }


    //Computer move to follow player  move
    function computerMove(){
        let chosenSquare = players[1].makeAMove();
        if(_gameFinished === false){
            squareArray[chosenSquare].classList.add("p2Controlled");
        }
        _gameOverCheck(squareArray[chosenSquare]);
        gameFlow.changePlayer();
    }

    function validMove(square){
        if(!square.classList.contains("p1Controlled")&&!square.classList.contains("p2Controlled")){
            return true;
        }
        else{
            return false;
        }
    }

    function _gameOverCheck(square){ //private
        //Note: indexing is as below:
        //  0   1   2
        //  3   4   5
        //  6   7   8
        //Based on row and col number, check the row, col, and diag for a match.

        //Current player:
        let _currentPlayer = gameFlow.currentPlayer();
        let _playerClassName = "";
        if(_currentPlayer===1){
            _playerClassName = "p1Controlled";
        }
        else if(_currentPlayer===2){
            _playerClassName = "p2Controlled"
        }

        //Determine row and column
        let{row,col} = _findSquareLocation(square);

        //Check to see if 3-in-a-row (by player type and class list)
        let _colMatch = _checkColEquality(col,_playerClassName);
        let _rowMatch = _checkRowEquality(row,_playerClassName);
        let _diagMatch = _checkDiagEquality(row,col,_playerClassName);

        //Check for a tie (no moves left)
        let _tieMatch = _checkTie();

        //If we have a match or a tie, the game is over.
        if(_colMatch===true||_rowMatch===true||_diagMatch===true){
            _gameFinished = true;
            // if(gameFlow.currentPlayer()===1){
            if(_currentPlayer===1){
                gameFlow.incrementScore(1);
                players[0].incrementScore();
                displayController.updateScoreboard();
                displayController.displayEndPopup(players[0].getName()+" Wins!");
            }
            // else if(gameFlow.currentPlayer()===2){
            else {
                players[1].incrementScore();
                gameFlow.incrementScore(2);
                displayController.displayEndPopup(players[1].getName()+" Wins!");
            }
        }
        else if(_tieMatch ===true){
            _gameFinished = true;
            displayController.displayEndPopup("It's a tie!");
        }
        else{};
    }
    
    function _findSquareLocation(square){ //private; find where in the grid the square is located
        //Maths:
        //col: i%3+3 should give the column number (6 gives 0, 2 gives 2, and 1 gives 1
        //row: round up (i/3) gives row#: 7 gives 3, 4 gives 2, 1 gives 1

        let position = squareArray.indexOf(square);
        let col = (position%3)+1;
        let row = Math.ceil((position+1)/3);
        return{col,row};
    }

    function _checkRowEquality(row,pControl){ //private; determine if row elements match
        //Math: if e multiply the row number by 3 and subtract 2, we get the index.
        //(1 to 1, 2 to 4, 3 to 7);
        //Note that we subtract by 3, not 2, since js is zero indexed
        let firstElement = row*3-3;
        let rowMatch = (squareArray[firstElement].classList.contains(pControl)&&squareArray[firstElement+1].classList.contains(pControl)&&squareArray[firstElement+2].classList.contains(pControl));
        return rowMatch;
    }

    function _checkColEquality(col,pControl){//private; determine if col elements match
        //column number is equal to the first index in the column (minus 1 since zero indexed)
        let colMatch = (squareArray[col-1].classList.contains(pControl)&&squareArray[col+2].classList.contains(pControl)&&squareArray[col+5].classList.contains(pControl));
        return colMatch;
    }

    function _checkDiagEquality(row,col,pControl){
        
        //If center square is empty, return false.
        //This stops a false diagonal match return while diags are blank since not a valid diag every round.
        if(!squareArray[4].classList.contains("p1Controlled")&&!squareArray[4].classList.contains("p2Controlled")){
            return false;
        }

        //essentially an XOR. If we're in one of the cardinal directions (eg top middle,
        // mid-right), there is no way for us to have a diagonal so we return false.
        if(((row===2) && !(col===2)) || (!(row===2) && (col===2))){
            return false;
        }

        //If played on a valid diagonal, check both diagonal directions.
        else{
            if((squareArray[0].classList.contains(pControl)&&squareArray[4].classList.contains(pControl)&&squareArray[8].classList.contains(pControl))
            || (squareArray[2].classList.contains(pControl)&&squareArray[4].classList.contains(pControl)&&squareArray[6].classList.contains(pControl))){       
                return true;
            }
            else{
                return false;
            }
        }
    }

    function _checkTie(){
        //Iterate through the square Array; if there are blank spaces left, it's not a tie game yet.
        let tie = true;
        for(i=0;i<squareArray.length;i++){
            if(!squareArray[i].classList.contains("p1Controlled")&&!squareArray[i].classList.contains("p2Controlled")){
                tie = false;
                return tie;
            }
            else{}
        }
        return tie;
    }

    // function clearBoard(){
    var clearBoard = function(){
        for(i=0;i<squareArray.length;i++){
            if(squareArray[i].classList.contains("p1Controlled")){
                squareArray[i].classList.remove("p1Controlled");
            }
            else if(squareArray[i].classList.contains("p2Controlled")){
                squareArray[i].classList.remove("p2Controlled");
            }
        }
        _gameFinished = false;
    }

    return{bindEvents,cacheDom,render,validMove,clearBoard,_findSquareLocation,_checkRowEquality,_checkColEquality,_checkDiagEquality};
})();


//The Player Factory holds info on score and name
const Player = function(name,score){
    const getName = (function(){
        return name;
    })
    const getScore = (function(){
        return score;
    })
    const incrementScore = (function(){
        score = score+1;
    })
    return{getName,getScore,incrementScore};
};

//The CPU function makes a player with an added diffiiculty and functions to determine a move
const CPU = function(name,score,difficulty){
    const prototype = Player(name,score);

    const getDifficulty = (function(){
        return difficulty;
    })

    const makeAMove = function(){

        //On easiest setting, CPU will play in a random square
        if(difficulty===1){
            let _square = 9;//9 is an invalid option, we're just leaving it here as a placeholder
            while(_square===9){
                let choice=Math.floor(Math.random()*9)//pick a random number from 0 to 8
                if(gameBoard.validMove(squareArray[choice])===true){
                    _square = choice;
                }
            }
            return _square;
        }

        // //On medium setting, CPU will play in center if available, then will play 
        //next to an owned spot if possible.
        if(difficulty===2){
            let _square = 9;
            if(gameBoard.validMove(squareArray[4])==true){
                _square=4;
            }
            //if CPU owns middle square, will check around the grid and play the opposite to win
            else if(squareArray[4].classList.contains("p2Controlled")){
                if(squareArray[0].classList.contains("p2Controlled")&&gameBoard.validMove(squareArray[8])){
                    _square=8;
                }
                else if(squareArray[1].classList.contains("p2Controlled")&&gameBoard.validMove(squareArray[7])){
                    _square = 7;
                }
                else if(squareArray[2].classList.contains("p2Controlled")&&gameBoard.validMove(squareArray[6])){
                    _square = 6;
                }
                else if(squareArray[3].classList.contains("p2Controlled")&&gameBoard.validMove(squareArray[5])){
                    _square = 5;
                }
                else if(squareArray[5].classList.contains("p2Controlled")&&gameBoard.validMove(squareArray[3])){
                    _square = 3;
                }
                else if(squareArray[6].classList.contains("p2Controlled")&&gameBoard.validMove(squareArray[2])){
                    _square = 2;
                }
                else if(squareArray[7].classList.contains("p2Controlled")&&gameBoard.validMove(squareArray[1])){
                    _square = 1;
                }
                else if(squareArray[8].classList.contains("p2Controlled")&&gameBoard.validMove(squareArray[0])){
                    _square = 0;
                }
                else{
                    while(_square===9){
                        let choice=Math.floor(Math.random()*9)//pick a random number from 0 to 8
                        if(gameBoard.validMove(squareArray[choice])===true){
                            _square = choice;
                        }
                    }
                }
            }
            //if don't own the center square, check perimeter and get one in line.
            else{
                //if top row is unoccupied by other player, and we have one in the row:
                if((!squareArray[0].classList.contains("p1Controlled")&&!squareArray[1].classList.contains("p1Controlled")&&!squareArray[2].classList.contains("p1Controlled"))&&
                (squareArray[0].classList.contains("p2Controlled")||squareArray[1].classList.contains("p2Controlled")||squareArray[2].classList.contains("p2Controlled"))){
                    while(_square===9){
                        let choice=Math.floor(Math.random()*3);//pick a random number from 0 to 2
                        if(gameBoard.validMove(squareArray[choice])===true){
                            _square = choice;
                        }
                    }
                }
                //same but for bottom row
                else if((!squareArray[6].classList.contains("p1Controlled")&&!squareArray[7].classList.contains("p1Controlled")&&!squareArray[8].classList.contains("p1Controlled"))&&
                (squareArray[6].classList.contains("p2Controlled")||squareArray[7].classList.contains("p2Controlled")||squareArray[8].classList.contains("p2Controlled"))){
                    while(_square===9){
                        let choice=Math.floor(Math.random()*3)+6;//pick a random number from 6 to 8
                        if(gameBoard.validMove(squareArray[choice])===true){
                            _square = choice;
                        }
                    }
                }
                //same but for left column
                else if((!squareArray[0].classList.contains("p1Controlled")&&!squareArray[3].classList.contains("p1Controlled")&&!squareArray[6].classList.contains("p1Controlled"))&&
                (squareArray[0].classList.contains("p2Controlled")||squareArray[3].classList.contains("p2Controlled")||squareArray[6].classList.contains("p2Controlled"))){
                    while(_square===9){
                        let choice=Math.floor(Math.random()*3)*3;//pick a random number btwn 0 3 and 6
                        if(gameBoard.validMove(squareArray[choice])===true){
                            _square = choice;
                        }
                    }
                }
                //same but for right column
                else if((!squareArray[2].classList.contains("p1Controlled")&&!squareArray[5].classList.contains("p1Controlled")&&!squareArray[8].classList.contains("p1Controlled"))&&
                (squareArray[2].classList.contains("p2Controlled")||squareArray[5].classList.contains("p2Controlled")||squareArray[8].classList.contains("p2Controlled"))){
                    while(_square===9){
                        let choice=Math.floor(Math.random()*3)*3+2;//pick a random number btwn 2 5 and 8
                        if(gameBoard.validMove(squareArray[choice])===true){
                            _square = choice;
                        }
                    }
                }
                else{
                    while(_square===9){
                        let choice=Math.floor(Math.random()*9)//pick a random number from 0 to 8
                        if(gameBoard.validMove(squareArray[choice])===true){
                            _square = choice;
                        }
                    }
                }
            }
            return _square;
        }

        // //On difficult setting, follow minmax algorithm
        if(difficulty===3){
            let _square = 9;
            let _moveValue = [0,0,0,0,0,0,0,0,0];//Give all a score of 0

            //build an array to model future moves
            let newArray=[0,0,0,0,0,0,0,0,0];
            for(let i=0;i<9;i++){
                if(squareArray[i].classList.contains("p1Controlled")){
                    newArray[i]=1;
                }
                else if(squareArray[i].classList.contains("p2Controlled")){
                    newArray[i]=2;
                }
                else{
                    newArray[i]=0;
                }
            }

            for(let i=0;i<9;i++){
                //leave at 0 if an invalid move
                if(gameBoard.validMove(squareArray[i])===false){
                    _moveValue[i] = -Infinity;//can't play here, so take away that option
                }
                else{
                    _moveValue[i] = _minimax(i,newArray);
                }
            }
            _square = 4;//all else equal, play in the center square
            for(let i=0;i<9;i++){
                if(_moveValue[i]>_moveValue[_square]){
                    _square = i;
                }
            }
            return _square;
        }
    }

    const _minimax = function(squareOption,arrayToCheck){
        //note, we're only going 3 layers deep
        //General logic: If our next move choice is a win, score is +inf (we want to do this move)
        //If the player's next move would be a win, score is -inf (we don't want to do this move)
        //Afterwards, score is +1 if a win for us, or -1 if a win for the opponent.
        //note thatt array index val of 2 means us (player 2) and 1 is opponent (player1)
        let newArray = arrayToCheck;
        newArray[squareOption] = 2;
        let score = 0; //start with a score of 0
        let {col,row}=gameBoard._findSquareLocation(squareArray[squareOption]);
        
        //Maxplayer (CPU move)
        if(_arrayCheck(newArray,2)===true){
            score=Infinity;
            newArray[squareOption]=0;
            return score;
        }
        else{
            //Min player (Opponent move)
            for(let i=0;i<9;i++){
                if(newArray[i]===0){
                    newArray[i]=1;
                    if(_arrayCheck(newArray,1)===true){
                        score=-100; //-infinity reserved for taken spaces, but still have to assign very - score
                        newArray[squareOption]=0;
                        newArray[i]=0;
                        return score;
                    }
                    else{
                        //Max player (CPU move)
                        for(let j=0;j<9;j++){
                            if(newArray[j]===0){
                                newArray[j]=2;
                                if(_arrayCheck(newArray,2)===true){
                                    score++;
                                }
                                else{
                                    //Min player (Opponent move)
                                    for(let k=0;k<9;k++){
                                        if(newArray[k]===0){
                                            newArray[k]=1;
                                            if(_arrayCheck(newArray,1)===true){
                                                score--;
                                            }
                                            else{
                                                //max player (CPU move)
                                                for(let l=0;l<9;l++){
                                                    if(newArray[l]===0){
                                                        newArray[l]=2;
                                                        if(_arrayCheck(newArray,2)===true){
                                                            score++;
                                                        }
                                                        newArray[l]=0;
                                                    }
                                                }
                                            }
                                            newArray[k]=0;
                                        }
                                    }
                                }
                                newArray[j]=0;
                            }
                        }
                    }
                newArray[i]=0;
            }
        }
        }
        newArray[squareOption] = 0;
        return score;

    }

    const _arrayCheck = function(myArray,playerNum){
        //checks all possible rows, cols, and diags for a match.
        //note: possible lines are:
        //012, 345, 678, 036, 147, 258, 048, 246
        if(((myArray[0]===playerNum)&&(myArray[1]===playerNum)&&(myArray[2]===playerNum))
            ||((myArray[3]===playerNum)&&(myArray[4]===playerNum)&&(myArray[5]===playerNum))
            ||((myArray[6]===playerNum)&&(myArray[7]===playerNum)&&(myArray[8]===playerNum))
            ||((myArray[0]===playerNum)&&(myArray[3]===playerNum)&&(myArray[6]===playerNum))
            ||((myArray[1]===playerNum)&&(myArray[4]===playerNum)&&(myArray[7]===playerNum))
            ||((myArray[2]===playerNum)&&(myArray[5]===playerNum)&&(myArray[8]===playerNum))
            ||((myArray[0]===playerNum)&&(myArray[4]===playerNum)&&(myArray[8]===playerNum))
            ||((myArray[2]===playerNum)&&(myArray[4]===playerNum)&&(myArray[6]===playerNum))
        ){
            return true;
        }
        else{
            return false;
        }
    }
    
    return Object.assign({}, prototype, {getDifficulty,makeAMove,_arrayCheck});  
}

//Initialize:
var init = (function(){
    displayController.displayStartPopup();
})();
