// ============================================
// DATA KONTEN - A Letter For You 💙
// ============================================
// Edit file ini untuk mengubah seluruh konten website
// tanpa perlu mengubah komponen utama.
// ============================================

export const siteConfig = {
  title: "A Letter For You 💙",
  description: "A romantic birthday surprise for someone special",
  secretCode: "241107", // Ganti kode rahasia 6 digit di sini (default: 161103)
};

export const coupleData = {
  name: "My Favorite Person",
  nickname: "Sayang",
  birthday: "24-11-2007", // Format: DD-MM-YYYY atau YYYY-MM-DD
  age: 22,
  partnerName: "Novria Angelina",
};

export const secretCodeData = {
  title: "A Little Secret For You",
  subtitle: "Something special is waiting behind this little secret.",
  buttonText: "Unlock My Surprise",
  wrongCodeMessage: "Oops! That's not the right code. Try again, my love.",
};

export const countdownGateData = {
  badge: "COUNTDOWN TO YOUR SPECIAL DAY ✨",
  title: "A Little More Patience, Love 💙",
  subtitle: "Sesuatu yang sangat indah telah disiapkan khusus untukmu. Beranda utama akan otomatis terbuka tepat pada pukul 00:00 di hari ulang tahunmu!",
  targetDateLabel: "Menuju Pukul 00:00",
  previewButtonText: "Buka Beranda Sekarang (Mode Preview) 🔓",
};

export const openingData = {
  badge: "A SPECIAL DAY FOR SOMEONE SPECIAL",
  greeting: "Happy Birthday,",
  nameGreeting: "My Favorite Person",
  subGreeting: "Today is all about you. A little place filled with memories, love, and everything I wish I could say to you.",
  buttonPrimary: "Begin Our Journey",
  buttonSecondary: "Read My Letter",
  polaroidPhoto: "/images/couple-main.svg",
  polaroidCaption: "Forever My Favorite 💙",
};

export const memoriesData = {
  title: "Our Memories",
  subtitle: "Every moment with you is a treasure I hold close to my heart",
  photos: [
    { id: 1, src: "/images/memory-1.svg", alt: "Our first date", caption: "The day everything changed ✨", date: "Our First Date" },
    { id: 2, src: "/images/memory-2.svg", alt: "Travel together", caption: "Adventures are better with you 🌍", date: "Our Adventure" },
    { id: 3, src: "/images/memory-3.svg", alt: "Candid moment", caption: "Your smile is my favorite view 😊", date: "Candid Moment" },
    { id: 4, src: "/images/memory-4.svg", alt: "Special occasion", caption: "Celebrating us, always 🥂", date: "Celebration" },
    { id: 5, src: "/images/memory-5.svg", alt: "Sunset together", caption: "Sunsets are prettier with you 🌅", date: "Golden Hour" },
    { id: 6, src: "/images/memory-6.svg", alt: "Fun times", caption: "Laughing with you is my therapy 😄", date: "Fun Times" },
  ],
};

export const galleryData = {
  title: "Our Little Moments",
  subtitle: "Every picture tells our beautiful story",
  photos: [
    { id: 1, src: "/images/memory-1.svg", alt: "Moment 1", caption: "The day everything changed ✨" },
    { id: 2, src: "/images/memory-2.svg", alt: "Moment 2", caption: "Adventures are better with you 🌍" },
    { id: 3, src: "/images/memory-3.svg", alt: "Moment 3", caption: "Your smile is my favorite view 😊" },
    { id: 4, src: "/images/memory-4.svg", alt: "Moment 4", caption: "Celebrating us, always 🥂" },
    { id: 5, src: "/images/memory-5.svg", alt: "Moment 5", caption: "Sunsets are prettier with you 🌅" },
    { id: 6, src: "/images/memory-6.svg", alt: "Moment 6", caption: "Laughing with you is my therapy 😄" },
  ],
};

export const letterData = {
  title: "A Letter For You",
  subtitle: "Words from the bottom of my heart",
  opening: "Happy birthday, love ♡",
  paragraphs: [
    "Today is all about you, and all the happiness you bring into other people's lives. I hope your day is filled with genuine smiles, peaceful moments, and everything that makes your heart feel light.",
    "Thank you for being someone so comforting, loving, and special to me.",
    "I'm really grateful for every experience and for all the little moments we share together. No matter what happens, I'll always be cheering for you and wishing the best for you.",
    "I hope you enjoy your day, honey. You deserve all the love in the world.",
  ],
  closing: "With love, always.",
  signature: "💙",
  polaroidPhoto: "/images/couple-main.svg",
  polaroidCaption: "You & Me ♡",
};

export const wishesData = {
  title: "My Birthday Wishes",
  subtitle: "My hopes and dreams for you",
  wishes: [
    "May your days be filled with endless joy and laughter 🌸",
    "May all your dreams come true, one by one 🌟",
    "May you always know how deeply you are loved 💙",
    "May life bring you beautiful surprises at every turn 🎁",
    "May your heart always be as warm as the love we share ✨",
    "May you find peace and happiness in everything you do 🕊️",
  ],
  closingMessage:
    "May this new chapter bring you endless happiness, beautiful memories, and all the things your heart has been wishing for.",
};

export const finalData = {
  title: "Once Again...",
  mainText: "Happy Birthday",
  nameText: "My Love 💙",
  message:
    "Thank you for being born into this world and making my life infinitely better. Here is to another year of love, laughter, and beautiful memories together.",
  restartText: "Relive This Moment 🔄",
  footerText: "Made with 💙 just for you",
};

export const musicData = {
  src: "/music/teman-hidup.wav",
  title: "Teman Hidup",
  artist: "Tulus",
};

export const navItems = [
  { id: "home", label: "Home", icon: "Home" },
  { id: "memories", label: "Our Memories", icon: "Camera" },
  { id: "gallery", label: "Gallery", icon: "Image" },
  { id: "letter", label: "The Letter", icon: "Mail" },
  { id: "wishes", label: "Wishes", icon: "Star" },
];
