import { Dayjs } from "dayjs";

export const formatDate = (date: Dayjs | null): string => {
  if (!date) {
    return "";
  }
  return date.format("MM-DD-YYYY");
};
