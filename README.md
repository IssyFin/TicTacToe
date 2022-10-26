# TicTacToe
A project to practice JS
X 1. Create modules for GameFlow, DisplayController, GameBoard and factories for player1 and player2, and any other necessary bits
X 2. Write a JS function to render the gameboard array contents to the webpage (can use X and O for now)
X3. Build function for players to put piece on a specific spot of the gameboard. Make sure they can't play in spots that are already taken
X4. Build logic to check for a gameover (3 pieces in a row or tie)
X5. Let players Xadd name, Xclick start and Xplay again button and a Xdisplay element to congratulate the winning player.
Opt1: On game load (and on reset), pull up a "new game" screen, letting P1 select a cpu vs 2 player game, then allow name input and create player elements in the factory with a score of 0 and a name of whatever was input.
XOpt2: Add a fun font!
6. Add an AI!
    6a: AI can make a random legal move
    6b: Make AI smart (minmax algorithm)
    6c: If this works, show it off! (Don't expect to get this perfect first try)
7. Later improvements: Make square array an array of arrays for a clearer understanding of row# and col#.


New game screen:
first: 2 buttons: 1 player, 2 players, side by side. after hitting button, will prompt for 
    player 1 name, then will prompt for player 2 name. Will then make 2 players w/ score=0 and name = input based on player Factory function.
1 player: then will prompt for user name, then 3 buttons for cpu difficulty (easy, medium, hard). cpus start with score of 0, and name of Luna (easy), Chandra (Medium), and Artemis (Hard)