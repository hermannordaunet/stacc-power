import spotData from "../../data/spot.json";

export default function handler(req, res) {
    res.status(200).json(spotData);
}
