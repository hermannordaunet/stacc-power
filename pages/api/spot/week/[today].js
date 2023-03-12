import spot from "../../../../data/spot.json";
import { checkIfRangeInsideRange } from "../../../../pages/utils";

export default function handler(req, res) {
  const { today } = req.query;
  const data = spot["Spotpris-per-time"]

  // Cut the string to only get the date
  const endDate = today.substring(0, 10);

  const date = new Date(endDate);
  date.setDate(date.getDate() - 7);
  const startDate = date.toISOString().substring(0, 10);

  checkIfRangeInsideRange(res, data, startDate, endDate);

  const filteredData = data.filter((d) => {
    const fromDate = d.from.substring(0, 10);
    return fromDate >= startDate && fromDate <= endDate;
  });

  var response = { filteredData, startDate, endDate };

  res.status(200).json(response);
}
