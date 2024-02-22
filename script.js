const noOfLifts = document.querySelector("#lifts");
const noOfFloors = document.querySelector("#floors");
const submitBtn = document.querySelector("#submit-btn");
const inputForm = document.querySelector(".input-form");
let i = -1;
const liftQueue = [];

// Lift status object to track which lift is serving each floor
const liftStatus = {};

// floor generator.
const generateFloor = (floorNo) => {
  const newFloor = document.createElement("div");
  const upBtn = document.createElement("button");
  const downBtn = document.createElement("button");

  newFloor.className = "floor";
  newFloor.id = `floor-${floorNo}`;
  newFloor.textContent = `Floor ${floorNo}`;

  upBtn.textContent = "Up";
  downBtn.textContent = "Down";
  upBtn.classList.add("btn", "up-btn", "bold-600");
  downBtn.classList.add("btn", "down-btn", "bold-600");

  const floorBtnContainer = document.createElement("div");
  floorBtnContainer.className = "floor-btn-container";
  floorBtnContainer.append(upBtn, downBtn);
  floorBtnContainer.style.position = "absolute";
  floorBtnContainer.style.left = "70px";

  upBtn.addEventListener("click", () => {
    addRequest(floorNo, "up");
  });

  downBtn.addEventListener("click", () => {
    addRequest(floorNo, "down");
  });

  newFloor.appendChild(floorBtnContainer);
  document.getElementById("container").append(newFloor);
};

// Generates a lift.
const generateLift = (liftNo) => {
  const newLift = document.createElement("div");
  newLift.className = "lift";
  newLift.id = `lift-${liftNo}`;

  document.getElementById("container").lastElementChild.appendChild(newLift);

  // Doors
  const leftDoor = document.createElement("div");
  const rightDoor = document.createElement("div");
  leftDoor.className = "left-door";
  rightDoor.className = "right-door";

  newLift.append(leftDoor, rightDoor);
};

// Moves the lift.
const moveLift = (floorNo, liftId) => {
  const lift = document.getElementById(liftId);

  // Calculate the distance to move the lift. The floor is 100px height each.
  const distance = (floorNo - 1) * 100;

  // Calculate the number of floors to move the lift.
  const totalFloorsToMove = distance / 100;

  // Calculate the duration for the lift to move 2s per floor.
  const duration = 2000 * totalFloorsToMove;

  // Move the lift using CSS transition
  lift.style.transition = `transform ${duration}ms ease-in-out`;
  lift.style.transform = `translateY(-${distance}px)`;

  // Wait for the transition to end
  lift.addEventListener("transitionend", () => {
    openDoors(floorNo, liftId);
  });

  // Update lift status
  liftStatus[floorNo] = liftId;
};

// Opens the doors of the lift.
const openDoors = (floorNo, liftId) => {
  document.getElementById(liftId).classList.add("open");

  // Wait for the transition to end
  document.getElementById(liftId).addEventListener("transitionend", () => {
    closeDoors(liftId);
  });

  // If there is a request in the queue for the same floor and direction, call the lift again
  callLift(floorNo);
};

// Closes the doors of the lift.
const closeDoors = (liftId) => {
  document.getElementById(liftId).classList.remove("open");
};

// Adds a new request to the lift queue.
const addRequest = (floorNo, direction) => {
  if (direction === "up" && liftStatus[floorNo]) {
    // If a lift is already serving this floor, open its doors
    openDoors(floorNo, liftStatus[floorNo]);
  } else if (direction === "down" && liftStatus[floorNo]) {
    // If a lift is already serving this floor, open its doors
    openDoors(floorNo, liftStatus[floorNo]);
  } else {
    // Otherwise, add a new request to the queue
    liftQueue.push({ floor: floorNo, direction });
    callLift(floorNo);
  }
};

// Calls a lift to serve the next request in the queue.
const callLift = (floorNo) => {
  if (liftQueue.length > 0) {
    const { floor, direction } = liftQueue.shift();
    const liftId = liftSelector();
    moveLift(floor, liftId);
  }
};

// Selects the next lift in the sequence.
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

// Generates a button with the text provided.
const generateBtn = (text) => {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.classList.add("btn", "generate-btn", "bold-600");
  return btn;
};

// Creates a button that will reset the lifts.
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

// Generates a restart button.
const restartBtnHandler = () => {
  const restartBtn = generateBtn("Restart");

  restartBtn.addEventListener("click", function () {
    inputForm.style.display = "block";
    document.getElementById("container").innerHTML = "";

    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach((input) => {
      input.value = "";
    });
  });

  return restartBtn;
};

// Main function that is called when the submit button is clicked.
submitBtn.addEventListener("click", function (event) {
  // Prevent default behavior.
  event.preventDefault();
  // Reset the game and bring back lifts to the first floor.
  const resetBtn = resetBtnHandler();

  // Restart the game.
  const restartBtn = restartBtnHandler();

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");
  btnContainer.append(restartBtn, resetBtn);

  document.getElementById("container").appendChild(btnContainer);
  btnContainer.style.textAlign = "center";

  if (+noOfFloors.value < 1 || +noOfLifts.value < 1) {
    // Validation
    alert("Please enter a valid value for the number of floors/lifts.");
    return;
  } else {
    inputForm.style.display = "none";

    // Generate each floor.
    for (let i = +noOfFloors.value; i > 0; i--) {
      generateFloor(i);
    }

    // Generate each lift.
    for (let j = 1; j <= +noOfLifts.value; j++) {
      generateLift(j);
    }

    const allFloors = document.querySelectorAll(".floor");

    // Display the first floor down btn and last floor up button to none.
    allFloors[0].querySelector(".up-btn").style.display = "none";
    allFloors[allFloors.length - 1].querySelector(".down-btn").style.display =
      "none";
  }
});
