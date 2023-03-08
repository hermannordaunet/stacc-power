import consumption from "../../../data/consumption.json";

export default function handler(req, res) {

    const totalConsumption = parseFloat(consumption.reduce((acc, cur) => acc + cur.consumption, 0).toFixed(3));

    // TODO: Return the total consumption of the data we have

  // Send back a response with the processed data
    res.status(200).json({ totalConsumption });
}
