import consumption from "../../../../data/consumption.json";
import {
  setCorrectDateVariables,
  checkIfRangeInsideRange,
} from "../../../../pages/utils";

export default function handler(req, res) {
  var { range } = req.query;

  if (range[0] && range[1]) {
    var [startDate, endDate] = setCorrectDateVariables(range);

    checkIfRangeInsideRange(res, consumption, startDate, endDate);

    const filteredData = consumption.filter((data) => {
      const fromDate = data.from.substring(0, 10);
      return fromDate >= startDate && fromDate <= endDate;
    });

    // Calculate the total consumption for that range.
    const totalRangeConsumption = parseFloat(
      filteredData.reduce((acc, cur) => acc + cur.consumption, 0).toFixed(3)
    );

    var response = { filteredData, totalRangeConsumption, startDate, endDate };

    res.status(200).json(response);
  } else {
    res
      .status(400)
      .json({ error: "query needs to be /YYYY-MM-DD/YYYY-MM-DD " });
  }
}
