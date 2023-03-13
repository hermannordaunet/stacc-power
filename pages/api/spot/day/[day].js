import spot from "../../../../data/spot.json";
import { checkIfDateInsideRange } from "../../../../pages/utils";

export default function handler(req, res) {
    const { day } = req.query;

    // Cut the string to only get the date
    const dateSubString = day.substring(0, 10);
    const data = spot["Spotpris-per-time"];


    // Filter the data to only have the data from the given date
    const filteredData = data.filter((d) => d.from.startsWith(dateSubString));

    // Return the spotprices for the given day
    const response = { filteredData, dateSubString };

    // Send back a response with the processed data
    res.status(200).json(response);
}
