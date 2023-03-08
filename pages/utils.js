export function getDateRange(data) {
  // Sort the data by the "from" date in ascending order
  data.sort((a, b) => a.from.localeCompare(b.from));
  // Get the earliest and latest dates
  var earliestDate = data[0].from.split("T")[0];
  var latestDate = data[data.length - 1].from.split("T")[0];
  return {
    earliestDate,
    latestDate,
  };
}

export function checkIfDateInsideRange(res, data, date) {
  const { earliestDate, latestDate } = getDateRange(data);

  if (date < earliestDate || date > latestDate) {
    res.status(400).json({ error: "date outside range" });
  }

  return;
}

export function checkIfRangeInsideRange(res, data, startDate, endDate) {
  const { earliestDate, latestDate } = getDateRange(data);

  if (startDate < earliestDate || endDate > latestDate) {
    return res.status(400).json({ message: "Invalid date range" });
  }

  return;
}

export function setCorrectDateVariables(dates) {
  if (dates[0] > dates[1]) {
    return [dates[1], dates[0]];
  } else {
    return [dates[0], dates[1]];
  }
}

export function filterData(data, startDate, endDate) {
  // Convert start and end dates to ISO strings for comparison
  const startISO = startDate;
  const endISO = endDate;

  // Filter data based on date range
  const filteredData = data.filter((reading) => {
    const readingDate = new Date(reading.from);
    const readingISO = readingDate.toISOString();
    return readingISO >= startISO && readingISO <= endISO;
  });

  return filteredData;
}

export function calculatConsumptionByWeekday(data) {
  // Create a new object to store the sum of consumption for each weekday
  const weekdayTotals = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  for (const entry of data) {
    const date = new Date(entry.from); // Convert the ISO 8601 string to a Date object
    const weekdayName = date.toLocaleDateString("en-US", { weekday: "long" }); // Get the weekday name
    weekdayTotals[weekdayName] += entry.consumption; // Add the consumption value to the appropriate weekday total
  }

  return weekdayTotals;
}

export function countDaysByWeekday(data) {
  const dayCounts = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  const daysSeen = new Set(); // Use a set to track the unique days seen

  for (const entry of data) {
    const date = new Date(entry.from);
    const weekdayName = date.toLocaleDateString("en-US", { weekday: "long" }); // Get the weekday name

    if (!daysSeen.has(date.toDateString())) {
      // Check if this day has already been seen
      dayCounts[weekdayName]++; // Increment the count for the appropriate weekday
      daysSeen.add(date.toDateString()); // Add the day to the set of unique days seen
    }
  }

  return dayCounts;
};


export function analyzeDataByHour(data) {
  const hourData = {};

  for (const entry of data) {
    const from = new Date(entry.from);
    const to = new Date(entry.to);
    const duration = (to - from) / 3600000; // Convert milliseconds to hours
    const consumptionPerHour = entry.consumption / duration;

    for (let i = from.getHours(); i <= to.getHours(); i++) {
      if (!(i in hourData)) {
        hourData[i] = [];
      }

      hourData[i].push(consumptionPerHour);
    }
  }

  const hourStats = {};

  for (const hour of Object.keys(hourData)) {
    const values = hourData[hour];
    const count = values.length;
    const sum = values.reduce((acc, cur) => acc + cur, 0);
    const mean = sum / count;
    const variance = values.reduce((acc, cur) => acc + Math.pow(cur - mean, 2), 0) / (count - 1);
    const stdev = Math.sqrt(variance);

    hourStats[hour] = {
      count,
      sum,
      mean,
      variance,
      stdev,
    };
  }

  return hourStats;
}

export function convertDate(dateString) {
  const [datePart, timePart] = dateString.split(' Kl. ');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes] = timePart.split('-');
  const isoDateString = `${year}-${month}-${day}T${hours.padStart(2, '0')}:00:00`;

  return isoDateString;
}

module.exports = {
  filterData,
  checkIfRangeInsideRange,
  getDateRange,
  checkIfDateInsideRange,
  setCorrectDateVariables,
  calculatConsumptionByWeekday,
  countDaysByWeekday,
  analyzeDataByHour,
  convertDate
};
