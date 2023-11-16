

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
    // console.log("after:", gameDataAPI)
    // checkGame();
    // }
  }
  // in target find IdleDeadline, parse it to extract the row and column


  let td = document.querySelectorAll('td');
  for (let i = 0; i < td.length; i++) {
    td[i].addEventListener("click", changeTileColour);
    //event.target.id
    // console.log(event.target.id)
  }




  function checkGame(event) {
    let invalid;
    for (let i = 0; i < gameDataAPI.length; i++) {
      invalid = false;
      for (let j = 0; j < gameDataAPI[i].length; j++) {
        // if (gameDataAPI[i][j].currentState !== 0 && gameDataAPI[i][j].currentState === gameDataAPI[i][j].correctState) {
        //   invalid = false;
        //   alert('You won!!')
        // }
        if (gameDataAPI[i][j].currentState !== 0 && gameDataAPI[i][j].currentState !== gameDataAPI[i][j].correctState) {
          invalid = true;
          alert('Something is wrong')
          break;
        }
      }
      if (invalid) {
        break;
      }
    };
    if (!invalid) {
      alert('So far so good')
    }
  };

  //Button creating, attaching it to the dom and filling it up with text
  let gameDiv = document.getElementById("theGame");
  // creating button
  let button = document.createElement('button');
  //displayed on button
  let text = document.createTextNode("Check Puzzle");
  // appending text to button
  button.appendChild(text);
  gameDiv.appendChild(button);
  //click event in the button
  button.addEventListener("click", checkGame);

  //checkbox
  let checkbox = document.createElement('input');
  // Assigning the attributes to created checkbox
  checkbox.type = "checkbox";
  checkbox.name = "name";
  checkbox.value = "value";
  checkbox.id = "status";
  // creating label for checkbox
  let label = document.createElement('label');
  // assigning attributes for the created label tag 
  label.htmlFor = "id";
  gameDiv.appendChild(checkbox);
  gameDiv.appendChild(label);
  gameDiv.appendChild(document.createTextNode('Check incorrect boxes'));
  checkbox.addEventListener("click", highlightIncorrectBoxes);

  function highlightIncorrectBoxes() {
    let checkBox = document.getElementById("status");
    let td = document.querySelectorAll('td');
    if (checkBox.checked === true) {
      let incorrect = [];
      for (let i = 0; i < gameDataAPI.length; i++) {
        for (let j = 0; j < gameDataAPI[i].length; j++) {
          if (gameDataAPI[i][j].currentState !== gameDataAPI[i][j].correctState) {
            console.log(gameDataAPI[i][j])
            // console.log(td.id);
            for (let k = 0; k < td.length; k++) {
              console.log(i, j);
              if (td[k].id === `${i}:${j}`) {
                td[k].className += " incorrect unclickable";
              }
            }

          }

        }


      }
      // } else if (checkBox.checked === false) {
      //   console.log("unhighlight");
      // console.log("incorrect", incorrect);
      // return incorrect;
    }
  };

  // let td = document.querySelectorAll('td');
  // for (let i = 0; i < td.length; i++) {
  //   td[i].className += " incorrect";
  // }
}
fetchGameAPI();
