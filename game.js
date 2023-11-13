// const cors = require('cors');

async function fetchGameAPI() {
  const response = await fetch('https://prog2700.onrender.com/threeinarow/sample');
  // waits until the request completes...
  console.log(response.rows);
  const gameDataAPI = await response.json();
  console.log(gameDataAPI);
}
fetchGameAPI();