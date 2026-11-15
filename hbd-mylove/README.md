# HBD My Love ❤️

A romantic birthday surprise website built with Next.js, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🎁 **Interactive Opening** - Gift box animation with surprise reveal
- 🎂 **Birthday Celebration** - Beautiful birthday greeting with confetti
- 📸 **Memory Gallery** - Scrapbook-style photo gallery with modal viewer
- 💌 **Love Letter** - Digital letter with typewriter animation effect
- 💖 **Reasons I Love You** - Interactive cards with flip animations
- 🌟 **Birthday Wishes** - Progressive wish reveal with surprise message
- 🎉 **Final Surprise** - Heart rain with confetti celebration
- 🎵 **Background Music** - Play/pause music player
- ⏰ **Countdown Timer** - Live countdown to birthday date
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop

## 🛠️ Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion 14](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Beautiful icons

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/muflihanwar81-prog/hbd-mylove.git
cd hbd-mylove
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

All content can be customized by editing a single file:

### `lib/data-konten.js`

This file contains all website content:

| Section | What You Can Change |
|---------|-------------------|
| `coupleData` | Name, nickname, birthday date, age |
| `openingData` | Greeting text, button text |
| `birthdayData` | Birthday message, photo, caption |
| `memoriesData` | Gallery photos and captions |
| `letterData` | Love letter paragraphs |
| `reasonsData` | Reasons why I love you cards |
| `wishesData` | Birthday wishes and surprise message |
| `finalData` | Finale text and footer |
| `musicData` | Background music file |

### Adding Photos

Place your photos in the `public/images/` directory:
- `couple-main.jpg` - Main birthday photo
- `memory-1.jpg` to `memory-6.jpg` - Memory gallery photos

### Adding Music

Place your background music file in `public/music/`:
- `birthday-song.mp3` - Background music

## 📁 Project Structure

```
hbd-mylove/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout
│   └── page.js              # Main page
├── components/
│   ├── BirthdaySection.js   # Birthday celebration
│   ├── Confetti.js          # Confetti effect
│   ├── Countdown.js         # Countdown timer
│   ├── FinaleSection.js     # Final surprise
│   ├── FloatingHearts.js    # Floating hearts
│   ├── LetterSection.js     # Love letter
│   ├── LoadingScreen.js     # Loading animation
│   ├── MemoriesSection.js   # Photo gallery
│   ├── MusicPlayer.js       # Music player
│   ├── Navigation.js        # Navigation bar
│   ├── OpeningSection.js    # Opening page
│   ├── PhotoModal.js        # Photo viewer
│   ├── ReasonsSection.js    # Reasons cards
│   ├── SparkleStars.js      # Sparkle effects
│   ├── TypewriterText.js    # Typewriter effect
│   └── WishesSection.js     # Birthday wishes
├── lib/
│   ├── animasi.js           # Animation variants
│   ├── data-konten.js       # Content data
│   └── format.js            # Utility functions
├── public/
│   ├── images/              # Photo assets
│   ├── music/               # Music files
│   └── videos/              # Video files
├── docs/                    # Documentation
├── scripts/                 # Utility scripts
└── package.json
```

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 📝 License

This project is made with love ❤️

---

*Made with ❤️ as a birthday surprise*
