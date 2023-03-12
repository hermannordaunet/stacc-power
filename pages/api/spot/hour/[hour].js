import spot from "../../../../data/spot.json";

export default function handler(req, res) {
  const { hour } = req.query;

  // TODO: return the spotprices for the hour given, if date is valid

  // Cut the string to only get the date
  if (hour.length < 13) {
    return res.status(400).json({ message: "Invalid format, needs to be YYYY-MM-DDTHH or a full ISO time format" });
  }

  const dateSubString = hour.substring(0, 13);
  const data = spot["Spotpris-per-time"]

  // Filter the data to only have the data from the given hour
  const filteredData = data.filter((d) =>
    d.from.startsWith(dateSubString)
  );


  const response = { filteredData, dateSubString };
  // Return zero if date is invalid
  // Send back a response with the processed data
  res.status(200).json(response);
};