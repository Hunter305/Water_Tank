let submitButton = document.getElementById("getAns");

submitButton.addEventListener("click", () => {
  let inpValue = document.getElementById("water_tank_input").value;
  const filledWaterHeight = inpValue.split(",").map(filledWater => +filledWater);
  const ansTag = document.getElementById("answerTag");
  const waterFilled = calculateFilledWaterUnit(filledWaterHeight);
  ansTag.innerText = waterFilled;
  const bAw = showBricksAndWater(filledWaterHeight);
  const water = onlyWater(filledWaterHeight);
  showBricksAndWater(filledWaterHeight, bAw);
  onlyWater(filledWaterHeight, water);
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

function createBarChart(data, labels, canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  const chartWidth = canvas.width;
  const chartHeight = canvas.height;
  const padding = 50;
  const maxValue = Math.max(...data);
  const barWidth = (chartWidth - padding * 2) / data.length;
  const scaleFactor = (chartHeight - padding * 2) / maxValue;

  ctx.fillStyle = "#0f0";
  for (let i = 0; i < data.length; i++) {
    const barHeight = data[i] * scaleFactor;
    ctx.fillRect(
      padding + i * barWidth,
      chartHeight - padding - barHeight,
      barWidth - 5,
      barHeight
    );
  }

  ctx.fillStyle = "#fff";
  ctx.font = "16px Arial";
  for (let i = 0; i < labels.length; i++) {
    ctx.fillText(labels[i], padding + i * barWidth, chartHeight - padding + 20);
  }

  // Draw Y axis
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, chartHeight - padding);
  ctx.lineTo(chartWidth - padding, chartHeight - padding);
  ctx.strokeStyle = "#fff";
  ctx.stroke();
}

let showBricksAndWater = bricks => {
  let finalCase = [];
  let firstcase = [];
  let secondCase = [];
  let result = [];
  let lastVlueForFirstCase = 0;
  let lastVlueForSecondCase = 0;
  for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];
    if (brick == 0) {
      firstcase.push(lastVlueForFirstCase);
    } else {
      firstcase.push("-");
      lastVlueForFirstCase = brick;
    }
  }
  for (let i = bricks.length - 1; i >= 0; i--) {
    let brick = bricks[i];
    if (brick == 0) {
      secondCase[i] = lastVlueForSecondCase;
    } else {
      secondCase[i] = "-";
      lastVlueForSecondCase = brick;
    }
  }
  for (let i = 0; i < bricks.length; i++) {
    let fc = firstcase[i];
    let sc = secondCase[i];
    if (fc == "-") {
      finalCase[i] = "-";
    } else {
      finalCase[i] = fc - sc > 0 ? sc : fc;
    }
  }
  for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];
    if (brick == 0) {
      result.push(finalCase[i]);
    } else {
      result.push(brick);
    }
  }
  createBarChart(bricks, result, "myChart");
};

function onlyWater(water) {
  let firstCase = new Array(water.length).fill(0);
  let secondCase = new Array(water.length).fill(0);
  let waterLevels = new Array(water.length).fill(0);
  let result = [];

  for (let i = 0; i < water.length; i++) {
    firstCase[i] = i === 0 ? water[i] : Math.max(firstCase[i - 1], water[i]);
  }

  for (let i = water.length - 1; i >= 0; i--) {
    secondCase[i] = i === water.length - 1 ? water[i] : Math.max(secondCase[i + 1], water[i]);
  }

  for (let i = 0; i < water.length; i++) {
    waterLevels[i] = Math.min(firstCase[i], secondCase[i]) - water[i];
  }

  for (let i = 0; i < waterLevels.length; i++) {
    result.push(waterLevels[i] > 0 ? waterLevels[i] : 0);
  }

  createBarChart(result, result, "myChart2");
}
