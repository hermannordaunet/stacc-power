import consumption from "../../../../data/consumption.json";

export default function handler(req, res) {
  const { year } = req.query;

  // Cut the string to only get the date
  const dateSubString = year.substring(0, 4);

  // Filter the data to only have the data from the given date
  const filteredData = consumption.filter((d) => d.from.startsWith(dateSubString));

  // Calculate the total consumption for that year.
  const totalYearConsumption = parseFloat(
    filteredData.reduce((acc, cur) => acc + cur.consumption, 0).toFixed(3)
  );

  // Return zero if date is invalid

  const response = {filteredData, totalYearConsumption, dateSubString};

  // Send back a response with the processed data
  res.status(200).json(response);
};
