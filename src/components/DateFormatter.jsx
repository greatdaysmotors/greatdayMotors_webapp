export const formatDate = (dateStamp) => {
  const dateString = dateStamp;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return formattedDate + "  " + formattedTime;
};



