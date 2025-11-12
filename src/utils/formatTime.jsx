export function formatTime(sec) {
  if (typeof sec !== "number" || isNaN(sec)) return "--";

  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  let parts = [];
  if (days) parts.push(`${days} д`);
  if (hours) parts.push(`${hours} г`);
  if (minutes) parts.push(`${minutes} хв`);
  
  if (days || hours || minutes) {
    parts.push(`${seconds < 10 ? '0' : ''}${seconds} с`);
  } else {
    parts.push(`${seconds} с`);
  }

  if (parts.length === 0 && sec === 0) return "0 с";

  return parts.join(" ");
}