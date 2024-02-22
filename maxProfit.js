function maxProfit(timeUnits) {
  let solutions = [];

  const properties = [
    { building: "T", requiredTime: 5, earnings: 1500 },
    { building: "P", requiredTime: 4, earnings: 1000 },
    { building: "C", requiredTime: 10, earnings: 3000 },
  ];

  properties.sort((a, b) => b.earnings / b.requiredTime - a.earnings / a.requiredTime);

  let remainingTime = timeUnits;
  let developmentPlan = { T: 0, P: 0, C: 0, earnings: 0 };

  for (let property of properties) {
    while (remainingTime >= property.requiredTime) {
      remainingTime -= property.requiredTime;
      developmentPlan[property.building]++;
      developmentPlan["earnings"] += property.earnings;
    }
  }

  solutions.push(`T -> ${developmentPlan["T"]} P-> ${developmentPlan["P"]} C-> ${developmentPlan["C"]} : (Earnings-> $${developmentPlan["earnings"]})`);

  return solutions;
}

console.log(maxProfit(7));
console.log(maxProfit(8));
console.log(maxProfit(13));
