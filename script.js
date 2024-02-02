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

const generateLift = (liftNos) => {
  const newLift = document.createElement("div");
  newLift.className = "lift";
  newLift.id = `lift-${liftNos}`;
  newLift.textContent = liftNos;
  document.getElementById("container").lastElementChild.appendChild(newLift);
};
