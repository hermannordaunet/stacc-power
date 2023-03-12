import spot from "../../../../data/spot.json";
import {
  setCorrectDateVariables,
  checkIfRangeInsideRange,
} from "../../../../pages/utils";

export default function handler(req, res) {
  var { range } = req.query;

  if (range[0].length < 13) {
    res.status(400).json({ error: "startDate needs to be on the format YYYY-MM-DDTHH" });
  };

  if (range[1].length < 13) {
    res.status(400).json({ error: "endDate needs to be on the format YYYY-MM-DDTHH" });
  };

  const data = spot["Spotpris-per-time"]

  if (range[0] && range[1]) {
    var [startDate, endDate] = setCorrectDateVariables(range);


    checkIfRangeInsideRange(res, data, startDate, endDate);

    const filteredData = data.filter((d) => {
      const fromDate = d.from.substring(0, 13);
      return fromDate >= startDate && fromDate <= endDate;
    });

    var response = { filteredData, startDate, endDate };

    res.status(200).json(response);
  } else {
    res
      .status(400)
      .json({ error: "query needs to be /YYYY-MM-DD/YYYY-MM-DD " });
  }
}
