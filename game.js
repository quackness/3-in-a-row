

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
      // console.log(">>", gameDataAPI[i])
      let tableData = ""
      for (let j = 0; j < gameDataAPI[i].length; j++) {
        tableData += `<td id='row${i}col${j}' class='state${gameDataAPI[i][j].currentState}'></td>`;
        // console.log("table data", tableData);
      }
      rows += tableData;
      rows += "</tr>";
      // console.log("rows", rows)
    }
    table += rows;
    return table += "</table>";
    // console.log(table);
  }

  function changeTileColour(event) {
    console.log("event", event);
    console.log("event", event.target.id);
    let classtoBeChanged = document.getElementById(event.target.id)
    console.log("classtoBeChanged", classtoBeChanged.className);
    if (classtoBeChanged.className === "state0") {
      classtoBeChanged.className = "state1"
    } else if (classtoBeChanged.className === "state1") {
      classtoBeChanged.className = "state2"
    } else {
      classtoBeChanged.className = "state0"
    }
  }

  // in target find IdleDeadline, parse it to extract the row and column


  let td = document.querySelectorAll('td')
  for (let i = 0; i < td.length; i++) {
    td[i].addEventListener("click", changeTileColour);
    //event.target.id
    // console.log(event.target.id)
  }



};



// createTable();
// function createGameTable() {
//   let gameHTML = "<table>";
//   gameHTML += "</table>";
//   return gameHTML;
// }



fetchGameAPI();
