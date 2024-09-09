import dayjs, { Dayjs } from "dayjs";

export const formatDate = (date: Dayjs | null): string => {
  if (!date) {
    return "";
  }
  return date.format("MM-DD-YYYY");
};

const getOrdinalSuffix = (day: number) => {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export  const formatDDate = (dateTime: string) => {
  const date = dayjs(dateTime);
  const dayOfMonth = date.date();
  return date.format(`MMMM D[${getOrdinalSuffix(dayOfMonth)}] | h:mm a`);
};
