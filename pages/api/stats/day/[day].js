import consumption from "../../../../data/consumption.json";
import { calculatConsumptionByWeekday, countDaysByWeekday } from "../../utils"

export default function handler(req, res) {
  const { day } = req.query;

  const date = new Date(day.substring(0, 10)); // Convert the ISO 8601 string to a Date object
  const weekdayName = date.toLocaleDateString("en-US", { weekday: "long" }); // Get the weekday name

  const weekdayTotals = calculatConsumptionByWeekday(consumption)
  const dayCounts = countDaysByWeekday(consumption)

  const averageWeekdaysTotals = {};
  for (const key in weekdayTotals) {
    averageWeekdaysTotals[key] = weekdayTotals[key] / dayCounts[key];
  }
  
  const averageForWeekday = averageWeekdaysTotals[weekdayName];

  const response = { averageForWeekday, weekdayName, day};

  res.status(200).json(response);
};
