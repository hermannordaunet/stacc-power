import weather from "../../data/oslo.json";

export default function handler(req, res) {

    res.status(200).json({ weather })
};
