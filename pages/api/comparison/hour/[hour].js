import spot from "../../../../data/spot.json";
import providers from "../../../../data/providers.json";
import consumption from "../../../../data/consumption.json";

import { getSpotPriceByNO, getProviderPrices } from "../../utils";

export default function handler(req, res) {
    const { hour } = req.query;

    if (hour.length < 13) {
        return res.status(400).json({
            message:
                "Invalid format, needs to be YYYY-MM-DDTHH or a full ISO time format",
        });
    }

    // data
    const spotData = spot["Spotpris-per-time"];

    const dateSubString = hour.substring(0, 13);
    const queryStartDate = dateSubString;
    const queryEndDate = dateSubString;

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
