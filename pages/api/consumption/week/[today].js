import consumption from "../../../../data/consumption.json";
import { checkIfRangeInsideRange } from "../../utils";

export default function handler(req, res) {
    const { today } = req.query;

    // TODO: return the consumption in the last week given the date, if date is valid

    // Cut the string to only get the date
    const endDate = today.substring(0, 10);

    const date = new Date(endDate);
    date.setDate(date.getDate() - 7);
    const startDate = date.toISOString().substring(0, 10);

    checkIfRangeInsideRange(res, consumption, startDate, endDate);

    const filteredData = consumption.filter((data) => {
        const fromDate = data.from.substring(0, 10);
        return fromDate >= startDate && fromDate <= endDate;
    });

    // Calculate the total consumption for that range.
    const totalWeekConsumption = parseFloat(
        filteredData.reduce((acc, cur) => acc + cur.consumption, 0).toFixed(3)
    );

    var response = { totalWeekConsumption, startDate, endDate, filteredData };

    res.status(200).json(response);
}
