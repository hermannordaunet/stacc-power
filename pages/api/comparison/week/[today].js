import spot from "../../../../data/spot.json";
import providers from "../../../../data/providers.json";
import consumption from "../../../../data/consumption.json";

import {
    checkIfRangeInsideRange,
    getSpotPriceByNO,
    getProviderPrices,
} from "../../utils";

export default function handler(req, res) {
    const { today } = req.query;

    // data
    const spotData = spot["Spotpris-per-time"];

    // Cut the string to only get the date
    const date = new Date(today.substring(0, 10));
    date.setDate(date.getDate() - 7);

    const queryStartDate = date.toISOString().substring(0, 10).concat("T00");;
    const queryEndDate = today.substring(0, 10).concat("T23");

    checkIfRangeInsideRange(res, consumption, queryStartDate, queryEndDate);

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
