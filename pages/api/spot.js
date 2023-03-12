import spotData from "../../data/localization.json";
import { convertDate } from "../utils";

export default function handler(req, res) {
    res.status(200).json(spotData);
}
