
async function fetchGameAPI() {
  let response = await fetch('https://prog2700.onrender.com/threeinarow/sample');
  // waits until the request completes...
  let gameDataAPI = await response.json();
  gameDataAPI = gameDataAPI.rows;
  console.log(gameDataAPI);
  let rows = "";
  for (let i = 0; i < gameDataAPI.length; i++) {
    rows += "<tr>";
    console.log(">>", gameDataAPI[i])
    for (let j = 0; j < gameDataAPI[i].length; j++) {
      console.log("inner array", gameDataAPI[i][j]);
    }
    rows += "</tr>";
    console.log("rows", rows)
  }
};


document.querySelector('#theGame').innerHTML = createGameTable();

function createGameTable() {
  let gameHTML = "<table>";
  gameHTML += "</table>";
  return gameHTML;
}


createGameTable();
fetchGameAPI();
