

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
        tableData += `<td id='${i}:${j}' class='state${gameDataAPI[i][j].currentState}${gameDataAPI[i][j].canToggle ? "" : " unclickable"}'></td>`;
        if (!gameDataAPI[i][j].canToggle) {
          //add class which disables pointer events
          // console.log("unclickable");

        }
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
    let [i, j] = event.target.id.split(":");
    // console.log("arr", arr);
    // let clickable = gameDataAPI[parseInt(i)][parseInt(j)].canToggle;
    let classtoBeChanged = document.getElementById(event.target.id)
    console.log("classtoBeChanged", classtoBeChanged.className);
    console.log("top of changeTileColour:", gameDataAPI[parseInt(i)][parseInt(j)].currentState);
    // classtoBeChanged.classList.remove(classtoBeChanged.className);
    // if (clickable) {
    console.log(classtoBeChanged)
    if (classtoBeChanged.className === "state0") {
      classtoBeChanged.className = "state1";
      gameDataAPI[parseInt(i)][parseInt(j)].currentState = 1;
    } else if (classtoBeChanged.className === "state1") {
      classtoBeChanged.className = "state2"
      gameDataAPI[parseInt(i)][parseInt(j)].currentState = 2;
    } else {
      classtoBeChanged.className = "state0"
    }
    console.log("after:", gameDataAPI)
    check();
    // }
  }
  // in target find IdleDeadline, parse it to extract the row and column


  let td = document.querySelectorAll('td')
  for (let i = 0; i < td.length; i++) {
    td[i].addEventListener("click", changeTileColour);
    //event.target.id
    // console.log(event.target.id)
  }

  // let btn = document.createElement("button");
  // console.log("button", btn);
  // document.querySelector('button');

  function check() {
    let invalid;
    for (let i = 0; i < gameDataAPI.length; i++) {
      invalid = false;
      for (let j = 0; j < gameDataAPI[i].length; j++) {
        if (gameDataAPI[i][j].currentState !== 0 && gameDataAPI[i][j].currentState !== gameDataAPI[i][j].correctState) {
          invalid = true;
          alert('incorect tile position')
          break;
        }
      }
      if (invalid) {
        break;
      }
    };
    if (!invalid) {
      alert('correct')
    }

  }





}



// createTable();
// function createGameTable() {
//   let gameHTML = "<table>";
//   gameHTML += "</table>";
//   return gameHTML;
// }



fetchGameAPI();
