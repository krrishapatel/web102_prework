/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // create a new div element for the game card
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');  // Add the class game-card to the div

        // set the inner HTML of the div using a template literal
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img">
            <h2>${game.name}</h2>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
        `;

        // append the newly created div to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function with the correct variable to add all games to the page
addGamesToPage(GAMES_JSON);



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions (backers)
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal, with a dollar sign
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length.toLocaleString();

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const descriptionString = `
    A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length.toLocaleString()} games.
    Currently, ${numUnfundedGames} game${numUnfundedGames === 1 ? '' : 's'} remain unfunded.
`;

// create a new DOM element containing the template string and append it to the description container
const newParagraph = document.createElement('p');
newParagraph.innerHTML = descriptionString;
descriptionContainer.appendChild(newParagraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// ensure GAMES_JSON is accessible globally or passed here if it's in another scope
// assuming GAMES_JSON is an array of game objects with 'pledged' and 'name' properties

const sortedGames = GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// calculating the Top Games
// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame, ...restOfGames] = sortedGames;

// displaying the Top Games
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameElement = document.createElement("p");
topGameElement.textContent = topGame.name; // Assuming 'name' is a property of the game object
firstGameContainer.appendChild(topGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name; // Assuming 'name' is a property of the game object
secondGameContainer.appendChild(secondGameElement);

// customizations (No code required for these steps, just ideas for improvement)
// example of how you might start implementing a search bar (conceptual)
/*
const searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.placeholder = "Search for a game...";
document.body.prepend(searchBar); // Add it somewhere visible
searchBar.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    // Filter games based on search term and re-display
    const filteredGames = GAMES_JSON.filter(game => game.name.toLowerCase().includes(searchTerm));
    // Code to clear and re-render game lists based on filteredGames
});
*/
