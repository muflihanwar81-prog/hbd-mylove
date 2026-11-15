// Ganti tanggal di bawah dengan tanggal ulang tahun Novria.
const BIRTHDAY_DATE = "2026-12-01T00:00:00"; // Format: YYYY-MM-DDTHH:mm:ss

const intro = document.getElementById("intro");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let musicPlaying = false;

document.getElementById("openGift").addEventListener("click", () => {
  intro.classList.add("hide");
  music.play().then(() => {
    musicPlaying = true;
    musicToggle.innerHTML = "♫ <span>Musik: ON</span>";
  }).catch(() => {
    musicToggle.innerHTML = "♫ <span>Putar musik</span>";
  });
});

musicToggle.addEventListener("click", () => {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    musicToggle.innerHTML = "♫ <span>Musik: OFF</span>";
  } else {
    music.play().then(() => {
      musicPlaying = true;
      musicToggle.innerHTML = "♫ <span>Musik: ON</span>";
    }).catch(() => {
      alert("Tambahkan file lagu-kita.mp3 ke folder assets/music terlebih dahulu.");
    });
  }
});

function updateCountdown() {
  const target = new Date(BIRTHDAY_DATE).getTime();
  const now = Date.now();
  const distance = target - now;
  const label = document.getElementById("birthdayDateLabel");
  const message = document.getElementById("countdownMessage");
  if (Number.isNaN(target)) {
    message.textContent = "Tanggal ulang tahun belum diatur. Silakan ubah BIRTHDAY_DATE di script.js.";
    return;
  }
  label.textContent = new Date(BIRTHDAY_DATE).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric"
  });
  if (distance <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent = "00");
    message.textContent = "Hari spesialmu sudah tiba! Selamat ulang tahun, Novria! ♡";
    return;
  }
  document.getElementById("days").textContent = String(Math.floor(distance / 86400000)).padStart(2,"0");
  document.getElementById("hours").textContent = String(Math.floor(distance / 3600000) % 24).padStart(2,"0");
  document.getElementById("minutes").textContent = String(Math.floor(distance / 60000) % 60).padStart(2,"0");
  document.getElementById("seconds").textContent = String(Math.floor(distance / 1000) % 60).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("blowCandle").addEventListener("click", () => {
  document.getElementById("flame").classList.add("off");
  document.getElementById("wishMessage").textContent = "Semoga semua doa baikmu satu per satu menjadi nyata. ♡";
  document.getElementById("blowCandle").textContent = "Wish sent with love ♡";
});

document.getElementById("secretBtn").addEventListener("click", () => {
  const message = document.getElementById("secretMessage");
  const isHidden = message.hidden;
  message.hidden = !isHidden;
  document.getElementById("secretBtn").textContent = isHidden ? "Tutup pesan rahasia" : "Buka pesan rahasia";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
