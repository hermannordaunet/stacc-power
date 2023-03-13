import consumption from "../../../data/consumption.json"
import { analyzeDataByHour } from "../utils"

export default function handler(req, res) {
  const hourStats = analyzeDataByHour(consumption);

  const response = { hourStats };

  res.status(200).json(response);
};
