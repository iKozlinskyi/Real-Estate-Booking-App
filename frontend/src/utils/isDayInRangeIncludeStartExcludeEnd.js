import moment from "moment";
import isBeforeDay from "./isBeforeDay";
import isInclusivelyAfterDay from "./isInclusivelyAfterDay";

export default function isDayInRangeIncludeStartExcludeEnd(day, rangeStart, rangeEnd) {
  if (!moment.isMoment(day) || !moment.isMoment(rangeStart) || !moment.isMoment(rangeEnd)) return false;

  return isInclusivelyAfterDay(day, rangeStart) && isBeforeDay(day, rangeEnd);
}