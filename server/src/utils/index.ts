import dayjs, { Dayjs } from "dayjs";

function getNumberOfSecondsToMidnight(
  dateEnd: string,
  dateStart: Dayjs = dayjs()
): number {
  const date = dayjs(dateEnd).add(1, "day").startOf("day");
  return date.diff(dateStart, "seconds");
}

export { getNumberOfSecondsToMidnight };
