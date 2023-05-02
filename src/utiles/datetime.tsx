export const monthYearFormat = (date: string) => {
  const formattedDate = new Date(date);
  const month = formattedDate.toLocaleString("default", { month: "long" });
  const year = formattedDate.getFullYear();
  return `${month} ${year}`;
};
