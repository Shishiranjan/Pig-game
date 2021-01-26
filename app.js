/*
GAME RULES:

- The game has 2 players, playing in rounds.
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

//The function of query selector is to select the stuff from HTML page.
//Events are like notifications that are sent to notify the code that something happened on the web page.The examples of events are clicking a button, resizing a window, scrolling down or pressing a key.
//Event listener is such a function that performs an action based on a certain event and it waits for a specific event to occur.
//Here btn-roll is the event which we have selected from the HTML page using querySelector method.
//Here in funnction addEventListener there is two arguments passed into it. First one is the event type and second one is the anonymous function which does not have any name and cannot be reused later.
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number here we generate the random number of dice between 1 and 6.By using random property it actually display the random number in decimal number but to avoid this we use floor property.
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result of the dice which we have rolled. To do that first we select the dice class and then display it.
        var diceDOM = document.querySelector('.dice');
         
        diceDOM.src = 'dice-' + dice + '.png'; //Here in this line we display the image of the dice by using src tag of HTML.Here the meaning of the this line is to display dice1.png, dice2.png, dice3.png and so on.


        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //Add score it means that the value which u have got by rolling the dice can be added in ur round score.
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //Here gameplaying is basically the state which tells us that  if game is playing then what has happened and if the game is not playing then in that case what has happened. Here gameplaying can be treated as the state variable.
        // Add CURRENT score to GLOBAL score.
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            //document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    //document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    //Here we reset the scores of player 1 and player 2 to zero and the roundscore is also zero.Here we can actuaally tell the compiler that 
    // what actually happens when we start the new game.
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    
    //Here we reset all the values to zero like we reset the current score for both player to zero. We also reset the global score of both player to be zero.For that we can use the function getElementById. Here we can also reset the name of the player to be player 1 and player 2 after winning the game.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;
//State variables:
//State variables basically tells us the condition of the system. We need the state variables when we need to remember something.








/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable).
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
