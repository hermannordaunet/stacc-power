import spotData from "../../data/localization.json";
import { convertDate } from "../utils"

export default function handler(req, res) {
    spotData["Spotpris per time"].forEach(item => {
        item.from = convertDate(item.from);
    });

    res.status(200).json(spotData);
};