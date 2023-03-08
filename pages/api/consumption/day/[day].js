import consumption from "../../../../data/consumption.json";
import { checkIfDateInsideRange } from "../../../../pages/utils";

export default function handler(req, res) {
  const { day } = req.query;

  // Cut the string to only get the date
  const dateSubString = day.substring(0, 10);

  checkIfDateInsideRange(res, consumption, dateSubString);

  // Filter the data to only have the data from the given date
  const filteredData = consumption.filter((d) =>
    d.from.startsWith(dateSubString)
  );

  // Calculate the total consumption for that day.
  const totalDayConsumption = parseFloat(
    filteredData.reduce((acc, cur) => acc + cur.consumption, 0).toFixed(3)
  );

  // Return zero if date is invalid
  const response = { filteredData, totalDayConsumption, dateSubString };

  // Send back a response with the processed data
  res.status(200).json(response);
}
