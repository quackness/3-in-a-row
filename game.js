

async function fetchGameAPI() {
  let response = await fetch('https://prog2700.onrender.com/threeinarow/sample');
  // waits until the request completes...
  let gameDataAPI = await response.json();
  gameDataAPI = gameDataAPI.rows;
  console.log(gameDataAPI);
  document.querySelector('#theGame').innerHTML = createTable();
  // createTable();
  function createTable() {
    let table = "<table>";
    let rows = "";
    for (let i = 0; i < gameDataAPI.length; i++) {
      rows += "<tr>";
      console.log(">>", gameDataAPI[i])
      let tableData = ""
      for (let j = 0; j < gameDataAPI[i].length; j++) {
        //gameDataAPI[i][j] is an object, must loop through it 
        console.log("**", gameDataAPI[i][j])
        // tableData += "<td>" + gameDataAPI[i][j].currentState + "</td>";
        // if (gameDataAPI[i][j].currentState === 0) {
        tableData += `<td class='state${gameDataAPI[i][j].currentState}'></td>`;

        //   // document.querySelector('td').style.backgroundColor = "pink";
        // }
        // if (gameDataAPI[i][j].currentState === 1) {
        //   tableData += "<td> blue </td>";
        // }
        // if (gameDataAPI[i][j].currentState === 2) {
        //   tableData += "<td> white </td>";
        // }
        // console.log("table data", gameDataAPI[i][j]);
        // tableData += "<td> Data </td>";
        console.log("table data", tableData);
      }
      rows += tableData;
      rows += "</tr>";
      console.log("rows", rows)
    }
    table += rows;
    return table += "</table>";
    console.log(table);
  }

};



// createTable();
// function createGameTable() {
//   let gameHTML = "<table>";
//   gameHTML += "</table>";
//   return gameHTML;
// }



fetchGameAPI();
