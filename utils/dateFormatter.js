export function formatDate(dateString) {
  const date = new Date(dateString);

  // Get the day of the week (0-6, where 0 is Sunday)
  const dayOfWeek = date.toLocaleString("en-IN", { weekday: "long" });

  // Get the day of the month
  const dayOfMonth = date.toLocaleString("en-IN", { day: "numeric" });

  // Get the month name
  const monthName = date.toLocaleString("en-IN", { month: "long" });

  // Combine the parts to form the desired format
  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthName}`;

  return formattedDate;
}

export function formatTime(dateString) {
  const date = new Date(dateString);
  // Get the time in 12-hour format with AM/PM
  const time = date.toLocaleString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedTime = `${time}`;

  return formattedTime;
}
