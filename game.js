

async function fetchGameAPI() {
  let response = await fetch('https://prog2700.onrender.com/threeinarow/sample');
  // waits until the request completes...
  let gameDataAPI = await response.json();
  gameDataAPI = gameDataAPI.rows;
  console.log(gameDataAPI);
  document.querySelector('#theGame').innerHTML = createTable();
  // createTable();let 
  // let singleData;
  function createTable() {
    let table = "<table>";
    let rows = "";
    for (let i = 0; i < gameDataAPI.length; i++) {
      rows += "<tr>";
      console.log(">>", gameDataAPI[i])
      let tableData = ""
      for (let j = 0; j < gameDataAPI[i].length; j++) {
        // singleData = gameDataAPI[i][j];
        tableData += `<td id='row${i}col${j}' class='state${gameDataAPI[i][j].currentState}'></td>`;
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

  function displayDate(event) {
    console.log(event);
    // in target find IdleDeadline, parse it to extract the row and column
  }

  let td = document.querySelectorAll('td')
  for (let i = 0; i < td.length; i++) {
    td[i].addEventListener("click", displayDate);
    //event.target.id
    console.log(event.target.id)
  }



};



// createTable();
// function createGameTable() {
//   let gameHTML = "<table>";
//   gameHTML += "</table>";
//   return gameHTML;
// }



fetchGameAPI();
