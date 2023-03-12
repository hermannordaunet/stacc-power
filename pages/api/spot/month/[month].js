import spot from "../../../../data/spot.json";

export default function handler(req, res) {
  const { month } = req.query;

  // return the spotprices in the month given
  if (month.length < 7) {
    res.status(400).json({ error: "query needs to be on the format YYYY-MM" });
  }

  // Cut the string to only get the date
  const dateSubString = month.substring(0, 7);
  const data = spot["Spotpris-per-time"]

  // Filter the data to only have the data from the given date
  const filteredData = data.filter((d) =>
    d.from.startsWith(dateSubString)
  );

  const response = { filteredData, dateSubString };
  // Return zero if date is invalid
  // Send back a response with the processed data
  res.status(200).json(response);
};
