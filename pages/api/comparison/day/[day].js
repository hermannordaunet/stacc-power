import spot from "../../../../data/spot.json";
import providers from "../../../../data/providers.json";
import consumption from "../../../../data/consumption.json";

import { getSpotPriceByNO, getProviderPrices } from "../../../utils";

export default function handler(req, res) {
    const { day } = req.query;

    // data
    const spotData = spot["Spotpris-per-time"];

    const dateSubString = day.substring(0, 10);
    const queryStartDate = dateSubString.concat("T00");
    const queryEndDate = dateSubString.concat("T23");

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

    // Send back a response with the processed data
    res.status(200).json(response);
}
