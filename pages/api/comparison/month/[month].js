import spot from "../../../../data/spot.json";
import providers from "../../../../data/providers.json";
import consumption from "../../../../data/consumption.json";

import { getSpotPriceByNO, getProviderPrices } from "../../../utils";

export default function handler(req, res) {
    const { month } = req.query;

    // Cut the string to only get the date
    const dateSubString = month.substring(0, 7);
    const queryStartDate = dateSubString.concat("-01T00");
    const queryEndDate = dateSubString.concat("-31T23");

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
