import spot from "../../../../data/spot.json";
import providers from "../../../../data/providers.json";
import consumption from "../../../../data/consumption.json";

import {
    setCorrectDateVariables,
    checkIfRangeInsideRange,
    getSpotPriceByNO,
    getProviderPrices,
} from "../../../utils";

export default function handler(req, res) {
    var { range } = req.query;

    if (!range[0] || !range[1]) {
        res.status(400).json({
            error: "query needs to be /YYYY-MM-DDTHH/YYYY-MM-DDTHH ",
        });
    }

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

    var [queryStartDate, queryEndDate] = setCorrectDateVariables(range);

    checkIfRangeInsideRange(res, consumption, queryStartDate, queryEndDate);

    // data
    const spotData = spot["Spotpris-per-time"];

    const { totalConsumption, spotPriceByNO, startDate, endDate } =
        getSpotPriceByNO(
            res,
            spotData,
            consumption,
            queryStartDate,
            queryEndDate
        );

    const providerPrices = getProviderPrices(
        providers,
        totalConsumption,
        spotPriceByNO
    );

    const response = {
        startDate,
        endDate,
        spotPriceByNO,
        totalConsumption,
        providerPrices,
    };

    res.status(200).json(response);
}
