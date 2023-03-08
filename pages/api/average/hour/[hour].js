import consumption from "../../../../data/consumption.json";
import { analyzeDataByHour } from "../../../utils"

export default function handler(req, res) {
  const { hour } = req.query;

  const date = new Date(hour); // Convert the ISO 8601 string to a Date object
  const reqHour = date.getHours(); // Get the weekday name

  const hourStats = analyzeDataByHour(consumption);

  const hourAverage = hourStats[reqHour.toString()]["mean"];

  const response = { hourAverage }

  res.status(200).json(response);
};