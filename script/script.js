let submitButton = document.getElementById("getAns");

console.log("inpElement.");
submitButton.addEventListener("click", () => {
  let inpValue = document.getElementById("water_tank_input").value;
  console.log(inpValue);
});
