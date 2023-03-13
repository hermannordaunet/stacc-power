import weather from "../../../data/weather.json";

export default function handler(req, res) {
    const { time } = req.query;

    if (time.length < 13) {
        return res.status(400).json({
            message:
                "Invalid format, needs to be YYYY-MM-DDTHH or a full ISO time format",
        });
    }

    const queryTime = time.substring(0, 13).concat(":00");

    const idx = weather.hourly.time.indexOf(queryTime);

    const temp2m = weather.hourly.temperature_2m[idx];
    const wind = weather.hourly.windspeed_10m[idx];
    const temp_unit = weather.hourly_units.temperature_2m;
    const wind_unit = weather.hourly_units.windspeed_10m;

    const response = { temp2m, temp_unit, wind, wind_unit };

    res.status(200).json(response);
}
