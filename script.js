const noOfLifts = document.querySelector("#lifts");
const noOfFloors = document.querySelector("#floors");
const submitBtn = document.querySelector("#submit-btn");
const inputForm = document.querySelector(".input-form");
let i = -1;

// floor generator.

/**
 *generateFloor - generates a floor and returns it.
 * @param {number} floorNos
 */

const generateFloor = (floorNos) => {
  const newFloor = document.createElement("div");
  const upBtn = document.createElement("button");
  const downBtn = document.createElement("button");

  newFloor.className = "floor";
  newFloor.id = `floor-${floorNos}`;
  newFloor.textContent = `Floor ${floorNos}`;

  upBtn.textContent = "Up";
  downBtn.textContent = "Down";
  upBtn.classList.add("btn", "up-btn", "bold-600");
  downBtn.classList.add("btn", "down-btn", "bold-600");

  const floorBtnContainer = document.createElement("div");
  floorBtnContainer.className = "floor-btn-container";
  floorBtnContainer.append(upBtn, downBtn);
  // const hr = document.createElement("hr");
  // hr.className = "hr";
  upBtn.addEventListener("click", () => moveLift(newFloor.id));
  downBtn.addEventListener("click", () => moveLift(newFloor.id));
  newFloor.appendChild(floorBtnContainer);
  document.getElementById("container").append(newFloor);
};

/**
 * generateLift - takes a liftNo and creates a lift.
 * @param {number} liftNo
 */

const generateLift = (liftNo) => {
  const newLift = document.createElement("div");
  newLift.className = "lift";
  newLift.id = `lift-${liftNo}`;
  newLift.textContent = liftNo;
  document.getElementById("container").lastElementChild.appendChild(newLift);
};

/**
 * moveLift - this func moves the lift.
 * @param {number} floorId
 */
const moveLift = (floorId) => {
  const floorNo = floorId.split("-");
  const liftId = liftSelector();
  const lift = document.getElementById(liftId);

  // Move the lift
  lift.style.transform = `translateY(-${(Number(floorNo[1]) - 1) * 100}px)`;
};

// find the next lift and bring it.
/**
 * liftSelector - this function selects the next lift in the sequence.
 * @returns a string of the id of the next lift.
 */

const liftSelector = () => {
  const allLifts = document.querySelectorAll(".lift");

  if (allLifts.length > 0) {
    if (i < allLifts.length - 1) {
      i++;
    } else {
      i = 0;
    }

    return allLifts[i].id;
  } else {
    console.error("No lifts found.");
    return null;
  }
};

/**
 * generateBtn - It will generate a button with the text provided.
 * @param {string} text
 * @returns button element
 */
const generateBtn = (text) => {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.classList.add("btn", "generate-btn", "bold-600");
  return btn;
};

/**
 * resetBtnHandler - creates a button that will reset the lifts.
 * @returns a button element that will reset the lifts.
 */

const resetBtnHandler = () => {
  const resetBtn = generateBtn("Reset");

  resetBtn.addEventListener("click", function () {
    const allLifts = document.querySelectorAll(".lift");
    i = -1;
    allLifts.forEach((lift) => {
      lift.style.transform = `translateY(0)`;
    });
  });

  return resetBtn;
};

/**
 * submitBtn is the main function that is called when the submit button is clicked.
 * It creates the no. of lifts, and no. of floors required.
 */

submitBtn.addEventListener("click", function (event) {
  // to prevent default behaviour.
  event.preventDefault();

  if (+noOfFloors.value < 1 || +noOfLifts.value < 1) {
    // validation
    alert("Please enter a valid number");
    return;
  } else {
    inputForm.style.display = "none";

    // This will generate each floor.
    for (let i = +noOfFloors.value; i > 0; i--) {
      generateFloor(i);
    }

    // This will generate each lift.
    for (let j = 1; j <= +noOfLifts.value; j++) {
      generateLift(j);
    }

    const allFloors = document.querySelectorAll(".floor");

    // display the first floor down btn and last floor up button to none.
    allFloors[0].querySelector(".up-btn").style.display = "none";
    allFloors[allFloors.length - 1].querySelector(".down-btn").style.display =
      "none";

    // This will reset the game and bring back lifts to the first floor.
    const resetBtn = resetBtnHandler();

    // This will restart the game.
    const restartBtn = restartBtnHandler();

    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    btnContainer.append(restartBtn, resetBtn);

    document.getElementById("container").appendChild(btnContainer);
    btnContainer.style.textAlign = "center";
  }
});
