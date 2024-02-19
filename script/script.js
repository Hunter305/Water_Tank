let submitButton = document.getElementById("getAns");

console.log("inpElement.");
submitButton.addEventListener("click", () => {
  let inpValue = document.getElementById("water_tank_input").value;
  const filledWaterHeight = inpValue.split(",").map(filledWater => +filledWater);
  const waterFilled = calculateFilledWaterUnit(filledWaterHeight);
  console.log(waterFilled);
  console.log(filledWaterHeight);
});

let calculateFilledWaterUnit = waterFilled => {
  let totalWater = 0;
  const left = [];
  const right = [];

  left[0] = waterFilled[0];
  for (let i = 1; i < waterFilled.length; i++) {
    left[i] = Math.max(waterFilled[i], left[i - 1]);
  }

  right[waterFilled.length - 1] = waterFilled[waterFilled.length - 1];
  for (let i = waterFilled.length - 2; i >= 0; i--) {
    right[i] = Math.max(waterFilled[i], right[i + 1]);
  }

  for (let i = 0; i < waterFilled.length; i++) {
    totalWater += Math.min(left[i], right[i]) - waterFilled[i];
  }

  return totalWater;
};
