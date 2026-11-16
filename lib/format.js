export function formatDate(dateString) {
  try {
    const date = parseDate(dateString);
    if (!date || isNaN(date.getTime())) return dateString;
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  } catch {
    return dateString;
  }
}

export function parseDate(dateStr) {
  if (!dateStr) return new Date();
  if (dateStr instanceof Date) return dateStr;
  
  const str = String(dateStr).trim();
  // Check if DD-MM-YYYY or DD/MM/YYYY
  const parts = str.split(/[-/]/);
  if (parts.length === 3) {
    if (parts[0].length === 2 && parts[2].length === 4) {
      // DD-MM-YYYY -> YYYY-MM-DD
      return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
  }
  const parsed = new Date(str);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function getCountdown(birthdayDate) {
  const now = new Date();
  const birthday = parseDate(birthdayDate);
  
  // Set target to exactly 00:00:00
  birthday.setHours(0, 0, 0, 0);
  birthday.setFullYear(now.getFullYear());

  // Check if today is the birthday day (and past 00:00)
  const isToday = now.getDate() === birthday.getDate() && now.getMonth() === birthday.getMonth();
  if (isToday) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
  }

  // If the date in this year has already passed, target next year's birthday
  if (birthday < now) {
    birthday.setFullYear(now.getFullYear() + 1);
  }

  const diff = birthday - now;
  if (diff <= 0 || isNaN(diff)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPassed: false };
}

export function padZero(num) {
  if (isNaN(num)) return "00";
  return String(num).padStart(2, "0");
}
