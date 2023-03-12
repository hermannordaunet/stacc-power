import spot from "../../../data/spot.json";
import providers from "../../../data/providers.json";
import consumption from "../../../data/consumption.json";

import { getSpotPriceByNO, getProviderPrices } from "../../utils";

export default function handler(req, res) {
    const spotData = spot["Spotpris-per-time"];
    const { totalConsumption, spotPriceByNO, startDate, endDate } =
        getSpotPriceByNO(res, spotData, consumption);

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
