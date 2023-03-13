import consumption from "../../../../data/consumption.json";
import { checkIfDateInsideRange } from "../../utils";

export default function handler(req, res) {
  const { hour } = req.query;
  const dateSubString = hour.substring(0, 13);

  // Cut the string to only get the date
  if (hour.length < 13) {
    return res.status(400).json({ message: "Invalid format, needs to be YYYY-MM-DDTHH or a full ISO time format" });
  }
  
  // Filter the data to only have the data from the given hour
  const filteredData = consumption.filter((d) =>
    d.from.startsWith(dateSubString)
  );

  // Calculate the total consumption for that hour.
  const totalHourConsumption = parseFloat(
    filteredData.reduce((acc, cur) => acc + cur.consumption, 0).toFixed(3)
  );

  const response = { totalHourConsumption, dateSubString, filteredData };
  // Return zero if date is invalid
  // Send back a response with the processed data
  res.status(200).json(response);
};