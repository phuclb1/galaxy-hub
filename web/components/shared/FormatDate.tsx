// Utility function to format a date number (milliseconds since epoch) in DD/MM/YYYY format
const formatDate = (date: number | null): string | null => {
  if (date === null) return null;

  const dateObj = new Date(date); // `date` is the timestamp (milliseconds)
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-indexed, so add 1
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};

export default formatDate;
