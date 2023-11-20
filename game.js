//add header
let body = document.querySelector('body');
let header = document.createElement("h1");
let headerText = document.createTextNode("🎲 3-In-A-Row 🎲");
header.append(headerText);
body.prepend(header);



// async function fetchGameAPI(gridChoice) {
async function fetchGameAPI(gridChoice = "sample") {
  let response = await fetch("https://prog2700.onrender.com/threeinarow/" + gridChoice);
  // let response = await fetch("https://prog2700.onrender.com/threeinarow/random/");
  // waits until the request completes...
  let gameDataAPI = await response.json();

  let gameDiv = document.getElementById("theGame");

  gameDataAPI = gameDataAPI.rows;
  let totalSquares = gameDataAPI.length * gameDataAPI.length;
  console.log(gameDataAPI);

  document.querySelector('#theGame').innerHTML = createTable();

  function createTable() {
    let table = "<table>";
    let rows = "";
    for (let i = 0; i < gameDataAPI.length; i++) {
      rows += "<tr>";
      let tableData = ""
      for (let j = 0; j < gameDataAPI[i].length; j++) {
        tableData += `<td id='${i}:${j}' class='state${gameDataAPI[i][j].currentState}${gameDataAPI[i][j].canToggle ? "" : " unclickable"}'></td>`;
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
  }


  let td = document.querySelectorAll('td');
  for (let i = 0; i < td.length; i++) {
    td[i].addEventListener("click", changeTileColour);
  }


  function checkGame(event) {
    let invalid;
    let winner;
    let counted = 0;
    for (let i = 0; i < gameDataAPI.length; i++) {
      winner = false;
      invalid = false;
      for (let j = 0; j < gameDataAPI[i].length; j++) {
        console.log("i", i, "j", j);
        console.log("current", gameDataAPI[i][j].currentState, "correct", gameDataAPI[i][j].correctState);
        if (gameDataAPI[i][j].currentState !== 0 && gameDataAPI[i][j].currentState === gameDataAPI[i][j].correctState) {
          counted++;
          winner = true;
        }
        if (gameDataAPI[i][j].currentState !== 0 && gameDataAPI[i][j].currentState !== gameDataAPI[i][j].correctState) {
          invalid = true;
          // winner = false;
          counted++;
          break;
        }
      }
      if (invalid) {
        winner = false;
        alert('Something is wrong');
        break;
      }
      if (winner && counted !== totalSquares) {
        winner = false;
      }
    };
    // && winner && !invalid

    console.log("winner", winner, "invalid", invalid, "counted", counted);
    if (counted === totalSquares && winner) {
      alert('You won!');
    } else if ((!winner && !invalid)) {
      alert('So far so good!')
    }
    // if (!winner && !invalid) {

    // }
  };

  //Button creating, attaching it to the dom and filling it up with text
  // let gameDiv = document.getElementById("theGame");
  let sideDiv = document.createElement('div');
  sideDiv.classList.add("right-side");
  // creating button
  let button = document.createElement('button');
  //displayed on button
  let text = document.createTextNode("Check Puzzle");
  // appending text to button
  button.appendChild(text);
  gameDiv.appendChild(sideDiv);
  sideDiv.appendChild(button);
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
  let sideDiv2 = document.createElement('div');
  sideDiv2.appendChild(checkbox);
  sideDiv2.appendChild(label);
  label.prepend(document.createTextNode('Check incorrect boxes'));
  sideDiv2.classList.add("check-incorect-boxes");
  sideDiv.appendChild(sideDiv2);
  checkbox.addEventListener("click", highlightIncorrectBoxes);


  //innovative features
  let accessRightSide = document.querySelector(".right-side");
  let counter = document.createElement("div")
  counter.classList.add("counter")
  let counterIntro = document.createElement("p");
  let invalidCheckLimit = 5;
  let counterText = document.createTextNode(getCounterText());

  function getCounterText() {
    return `You can check for invalid boxes only 5 times. Remaining checks left: ${invalidCheckLimit}`;
  };

  counterIntro.appendChild(counterText);
  accessRightSide.appendChild(counter);
  counter.appendChild(counterIntro);

  function updateCounter() {
    counterText.nodeValue = getCounterText();
    if (invalidCheckLimit === 0) {
      checkbox.style.display = "none";
      label.style.display = "none";
    }
  }

  console.log("val", counterText.nodeValue)

  function highlightIncorrectBoxes() {
    let checkBox = document.getElementById("status");
    let td = document.querySelectorAll('td');
    if (checkBox.checked === true) {
      invalidCheckLimit = invalidCheckLimit - 1;
      updateCounter();
      getCounterText();
      // console.log("invalidCheckLimit", invalidCheckLimit);
      for (let i = 0; i < gameDataAPI.length; i++) {
        for (let j = 0; j < gameDataAPI[i].length; j++) {
          if (gameDataAPI[i][j].currentState !== gameDataAPI[i][j].correctState) {
            console.log(gameDataAPI[i][j])
            for (let k = 0; k < td.length; k++) {
              console.log(i, j);
              if (td[k].id === `${i}:${j}`) {
                td[k].className += " incorrect disabled";
              }
            }
          }
        }
      }
    }
    if (checkBox.checked === false) {
      let td = document.querySelectorAll('td');
      console.log("td", td);
      for (let i = 0; i < td.length; i++) {
        td[i].classList.remove("incorrect", "disabled");
      }
    }
  };

}

fetchGameAPI();

let eightByeightBtn = document.createElement('button');
console.log(eightByeightBtn);
let eightByeight = document.createTextNode("8x8");
eightByeightBtn.appendChild(eightByeight);
//add click event
eightByeightBtn.addEventListener("click", () => {
  console.log("8x8");
  fetchGameAPI("8x8");
});
body.append(eightByeightBtn);

let tenByTenBtn = document.createElement('button');
let tenByTen = document.createTextNode("10x10");
tenByTenBtn.appendChild(tenByTen);
body.append(tenByTenBtn);
//add click event
tenByTenBtn.addEventListener("click", () => {
  console.log("clik")
  fetchGameAPI("10x10");
});

let twelveByTwelveBtn = document.createElement('button');
let twelveByTwelve = document.createTextNode("12x12");
twelveByTwelveBtn.appendChild(twelveByTwelve);
body.append(twelveByTwelveBtn);
//add click event
twelveByTwelveBtn.addEventListener("click", () => {
  fetchGameAPI("12x12");
});

// body.append(tenByTenBtn);



// add new buttons
// let grab = document.querySelectorAll("body");
// let gridChoice = document.createElement('button');
// let gridText = document.createTextNode("8x8");
// gridChoice.appendChild(gridText);
// //add click event
// gridChoice.addEventListener("click", () => {
//   console.log("8x8");
//   fetchGameAPI("8x8");
// });
// gameDiv.appendChild(gridChoice);


// https://www.geeksforgeeks.org/how-to-add-a-class-to-dom-element-in-javascript/
// https://stackoverflow.com/questions/50863848/how-to-update-an-html-input-field-using-the-dom
// https://www.geeksforgeeks.org/html-dom-input-checkbox-object/
