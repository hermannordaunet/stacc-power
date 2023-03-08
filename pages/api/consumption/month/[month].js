import consumption from "../../../../data/consumption.json";

export default function handler(req, res) {
  const { month } = req.query;

  // TODO: return the consumption in the month given, if date is valid

  // Cut the string to only get the date
  const dateSubString = month.substring(0, 7);

  // Filter the data to only have the data from the given date
  const filteredData = consumption.filter((d) =>
    d.from.startsWith(dateSubString)
  );

  // Calculate the total consumption for that month.
  const totalMonthConsumption = parseFloat(
    filteredData.reduce((acc, cur) => acc + cur.consumption, 0).toFixed(3)
  );

  const response = { filteredData, totalMonthConsumption, dateSubString };
  // Return zero if date is invalid
  // Send back a response with the processed data
  res.status(200).json(response);
};
