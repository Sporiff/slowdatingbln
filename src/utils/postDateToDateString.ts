export const postDateToDateString = (date: string) => {
  let dateString = new Date(date);

  return dateString.toLocaleDateString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
