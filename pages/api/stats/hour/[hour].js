import consumption from "../../../../data/consumption.json";
import { analyzeDataByHour } from "../../../utils"

export default function handler(req, res) {
  const { hour } = req.query;

  if (hour.length < 13) {
    return res.status(400).json({
      message:
          "Invalid format, needs to be YYYY-MM-DDTHH or a full ISO time format",
  });
  }


  const date = new Date(hour.substring(0, 13).concat(":00")); // Convert the ISO 8601 string to a Date object
  const reqHour = date.getHours(); // Get the hour

  const hourStats = analyzeDataByHour(consumption);

  const hourAverage = hourStats[reqHour.toString()]

  const response = { hourAverage }

  res.status(200).json(response);
};