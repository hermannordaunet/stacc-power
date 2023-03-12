import spot from "../../../../data/spot.json";

export default function handler(req, res) {
  const { year } = req.query;
  const data = spot["Spotpris-per-time"]

  // Cut the string to only get the date
  const dateSubString = year.substring(0, 4);

  // Filter the data to only have the data from the given year
  const filteredData = data.filter((d) => d.from.startsWith(dateSubString));

  const response = {filteredData, dateSubString};

  // Send back a response with the processed data
  res.status(200).json(response);
};
