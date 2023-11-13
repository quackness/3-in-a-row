

async function fetchGameAPI() {
  let response = await fetch('https://prog2700.onrender.com/threeinarow/sample');
  // waits until the request completes...
  let gameDataAPI = await response.json();
  gameDataAPI = gameDataAPI.rows;
  console.log(gameDataAPI);
  document.querySelector('#theGame').innerHTML = createTable();
  function createTable() {
    let table = "<table>";
    let rows = "";
    for (let i = 0; i < gameDataAPI.length; i++) {
      rows += "<tr>";
      console.log(">>", gameDataAPI[i])
      let tableData = ""
      for (let j = 0; j < gameDataAPI[i].length; j++) {
        //gameDataAPI[i][j] is an object, must loop through it 
        // tableData += "<td>" + gameDataAPI[i][j] + "</td>";
        // console.log("table data", gameDataAPI[i][j]);
        tableData += "<td> Data </td>";
        console.log("table data", tableData);
      }
      rows += tableData;
      rows += "</tr>";
      console.log("rows", rows)
    }
    table += rows;
    table += "</table>";
    console.log(table);
  }

};



createTable();
// function createGameTable() {
//   let gameHTML = "<table>";
//   gameHTML += "</table>";
//   return gameHTML;
// }



fetchGameAPI();
