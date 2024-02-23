const noOfLifts = document.querySelector("#lifts");
const noOfFloors = document.querySelector("#floors");
const submitBtn = document.querySelector("#submit-btn");
const inputForm = document.querySelector(".input-form");

const allLiftsArray = [];

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
    getClosestLift(floorNo);
  });

  downBtn.addEventListener("click", () => {
    getClosestLift(floorNo);
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

  allLiftsArray.push({ element: newLift, currentFloor: 1, isBusy: false });

  newLift.append(leftDoor, rightDoor);
};

// get closest lift + not busy
const getClosestLift = (destinationFloor) => {
  let minDistance = Number(noOfFloors.value) + 1;
  let closestLiftIndex;

  // find the closest lift.
  for (let i = 0; i < allLiftsArray.length; i++) {
    if (!allLiftsArray[i].isBusy) {
      let dis = Math.abs(allLiftsArray[i].currentFloor - destinationFloor);
      if (dis < minDistance) {
        minDistance = dis;
        closestLiftIndex = i;
        console.log("closestLiftIndex", closestLiftIndex);
      }
    }
  }
  if (allLiftsArray[closestLiftIndex]) {
    allLiftsArray[closestLiftIndex].isBusy = true;
    console.log("destination floor", destinationFloor);

    moveLift(destinationFloor, allLiftsArray[closestLiftIndex].element.id);
  } else {
    console.log("All lifts are busy as of now.");
  }
  console.log("allLiftsArray", allLiftsArray);
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

  setTimeout(() => {
    setTimeout(() => {
      openDoors(liftId, floorNo);
    });
  }, duration);
};

// Opens the doors of the lift.
const openDoors = (liftId, floorNo) => {
  document.getElementById(liftId).classList.add("open");

  setTimeout(() => {
    console.log("this is after the lift has arrived its destination.");
    closeDoors(liftId, floorNo);
  }, 2500);
};

// Closes the doors of the lift.
const closeDoors = (liftId, floorNo) => {
  document.getElementById(liftId).classList.remove("open");
  setTimeout(() => {
    const selectedLiftIndex = allLiftsArray.findIndex(
      (lift) => lift.element.id === liftId
    );
    if (selectedLiftIndex !== -1) {
      allLiftsArray[selectedLiftIndex].isBusy = false;
      allLiftsArray[selectedLiftIndex].currentFloor = floorNo;
      console.log("allLiftsArray after doors closing.", allLiftsArray);
    } else {
      console.log("Lift not found in the array.");
    }
  }, 2500);
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
    return resetBtn;
  });
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

    // Reset the game and bring back lifts to the first floor.
  }
});
