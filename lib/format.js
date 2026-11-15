export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export function getCountdown(birthdayDate) {
  const now = new Date();
  const birthday = new Date(birthdayDate);
  birthday.setFullYear(now.getFullYear());
  if (birthday < now) {
    birthday.setFullYear(now.getFullYear() + 1);
  }
  const diff = birthday - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, isPassed: false };
}

export function padZero(num) {
  return String(num).padStart(2, "0");
}
