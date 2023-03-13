import consumption from "../../../../data/consumption.json";
import {
    setCorrectDateVariables,
    checkIfRangeInsideRange,
} from "../../utils";

export default function handler(req, res) {
    var { range } = req.query;

    if (range[0].length < 13) {
        res.status(400).json({
            error: "startDate needs to be on the format YYYY-MM-DDTHH",
        });
    }

    if (range[1].length < 13) {
        res.status(400).json({
            error: "endDate needs to be on the format YYYY-MM-DDTHH",
        });
    }

    if (range[0] && range[1]) {
        var [startDate, endDate] = setCorrectDateVariables(range);

        checkIfRangeInsideRange(res, consumption, startDate, endDate);

        const filteredData = consumption.filter((data) => {
            const fromDate = data.from.substring(0, 13);
            return fromDate >= startDate && fromDate <= endDate;
        });

        // Calculate the total consumption for that range.
        const totalRangeConsumption = parseFloat(
            filteredData
                .reduce((acc, cur) => acc + cur.consumption, 0)
                .toFixed(3)
        );

        var response = {
            totalRangeConsumption,
            startDate,
            endDate,
            filteredData,
        };

        res.status(200).json(response);
    } else {
        res.status(400).json({
            error: "query needs to be /YYYY-MM-DDTHH/YYYY-MM-DDTHH ",
        });
    }
}
