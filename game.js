// const cors = require('cors');




async function fetchGameAPI() {
  const response = await fetch('https://prog2700.onrender.com/threeinarow/sample');
  // waits until the request completes...
  const gameDataAPI = await response.json();
  console.log(gameDataAPI);
};

document.querySelector('#theGame').innerHTML = createGameTable();

function createGameTable() {
  let gameHTML = "<table>";
  gameHTML += "</table>";
  return gameHTML;
}


createGameTable();
fetchGameAPI();
