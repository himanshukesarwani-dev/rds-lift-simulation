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
