"use client";

import { motion } from "framer-motion";
import { letterData } from "@/lib/data-konten";

/* ── Smooth Easing Curves ── */
const easeSoft = [0.22, 1, 0.36, 1];
const easePop = [0.34, 1.56, 0.64, 1];

/* ── Custom Polaroid Frame with White Inner Area ── */
function PolaroidFrame({ photo, alt = "Memory", className = "", style = {} }) {
  return (
    <div className={`relative select-none ${className}`} style={style}>
      {/* 1. Inner Photo Window (Inner frame is pure ivory/white background) */}
      <div
        className="absolute bg-[#FFF9F0] overflow-hidden shadow-inner flex items-center justify-center"
        style={{
          left: "17.5%",
          top: "13.5%",
          width: "70.5%",
          height: "61%",
          transform: "rotate(-2.53deg)",
          transformOrigin: "center center",
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#FFF9F0]" />
        )}
      </div>

      {/* 2. Vintage Maroon Polaroid Frame Overlay */}
      <img
        src="/images/letter-stickers/polaroid-frame-cutout.png"
        alt="Vintage Polaroid Frame"
        className="relative z-10 w-full h-auto pointer-events-none drop-shadow-2xl"
      />
    </div>
  );
}

export default function LetterSection() {
  const photo1 = letterData.polaroidPhoto1 || letterData.polaroidPhoto || "/images/museum-5.jpg";
  const photo2 = letterData.polaroidPhoto2 || "/images/museum-15.jpg";

  return (
    <section
      id="letter"
      className="relative min-h-[100dvh] w-full flex items-center justify-center px-3 sm:px-6 py-[clamp(1rem,3dvh,2.5rem)] overflow-hidden select-none"
      style={{
        backgroundColor: "#4A0714", // Deep romantic maroon
        backgroundImage: "radial-gradient(circle at 50% 30%, #641526 0%, #4A0714 65%, #350710 100%)",
      }}
    >
      {/* ── Background Subtle Scrapbook Ambience ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeSoft }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {/* Soft textured vignettes */}
        <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#641526]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#350710]/60 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

      {/* ── 5. SNOOPY DENGAN BUKET BUNGA (Kiri Bawah) ── */}
      <motion.div
        initial={{ opacity: 0, x: -70, y: 70 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4, ease: easeSoft }}
        whileHover={{ scale: 1.06, rotate: 3, transition: { duration: 0.25 } }}
        className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-25 w-[clamp(4.5rem,10vw,11rem)] pointer-events-auto select-none drop-shadow-2xl cursor-pointer"
        title="Snoopy with red roses"
      >
        <img
          src="/images/letter-stickers/snoopy-flowers.png"
          alt="Snoopy with Roses"
          className="w-full h-auto"
        />
      </motion.div>

      {/* ── 9. SPIDER-MAN (Kanan Bawah Dekat Kue) ── */}
      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.85, ease: easePop }}
        whileHover={{ scale: 1.08, rotate: -4, transition: { duration: 0.25 } }}
        className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 md:right-8 z-35 w-[clamp(3.5rem,8vw,9.5rem)] pointer-events-auto select-none drop-shadow-2xl cursor-pointer"
        title="Cute Spiderman"
      >
        <img
          src="/images/letter-stickers/spiderman.png"
          alt="Cute Spiderman"
          className="w-full h-auto"
        />
      </motion.div>

      {/* ── Main Composition Container ── */}
      <div className="relative z-20 w-full max-w-[1360px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-[clamp(1rem,3dvh,2rem)] lg:gap-8 px-2 sm:px-4 my-auto">

        {/* ── LEFT COLUMN: Vinyl + Stacked Polaroid Frames + Wax Seal + Stars ── */}
        <div className="relative shrink-0 flex flex-col items-center justify-center w-full max-w-[280px] sm:max-w-xs lg:w-[clamp(200px,22vw,280px)] lg:self-center">

          {/* ── 1. VINYL RECORD (Kiri Atas, Sedikit Miring) ── */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -45 }}
            whileInView={{ opacity: 1, x: 0, rotate: -12 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeSoft }}
            whileHover={{ scale: 1.05, rotate: -5, transition: { duration: 0.3 } }}
            className="absolute -top-8 sm:-top-12 -left-4 sm:-left-8 z-0 w-[clamp(5rem,9vw,10rem)] pointer-events-auto select-none drop-shadow-2xl cursor-pointer"
            title="Romantic Vinyl Record"
          >
            <img
              src="/images/letter-stickers/vinyl-record.png"
              alt="Vinyl Record"
              className="w-full h-auto"
            />
          </motion.div>

          {/* ── 2. BINGKAI FOTO BERTUMPUK (Slide dari Kiri Bawah dengan Rotate) ── */}
          {/* Top Polaroid (Photo 1) */}
          <motion.div
            initial={{ opacity: 0, x: -60, y: 50, rotate: -15 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35, ease: easeSoft }}
            whileHover={{ scale: 1.03, rotate: -2, zIndex: 30, transition: { duration: 0.25 } }}
            className="relative z-20 transition-shadow duration-300 w-[clamp(115px,16vw,200px)] cursor-pointer"
          >
            <PolaroidFrame photo={photo1} alt="Memory 1" />
          </motion.div>

          {/* Bottom Polaroid (Photo 2) */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: 60, rotate: 18 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.45, ease: easeSoft }}
            whileHover={{ scale: 1.03, rotate: 2, zIndex: 30, transition: { duration: 0.25 } }}
            className="relative z-10 transition-shadow duration-300 w-[clamp(115px,16vw,200px)] -mt-[clamp(2.5rem,5dvh,4rem)] ml-[clamp(2rem,4vw,4.5rem)] cursor-pointer"
          >
            <PolaroidFrame photo={photo2} alt="Memory 2" />

            {/* ── 4. WAX SEAL DI SUDUT BINGKAI FOTO (Zoom In dengan Efek Pop) ── */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -25 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.75, ease: easePop }}
              whileHover={{ scale: 1.15, rotate: 8, transition: { duration: 0.2 } }}
              className="absolute -bottom-2 -left-3 z-40 w-10 sm:w-12 pointer-events-auto select-none drop-shadow-xl cursor-pointer"
              title="Wax Seal with Rose Stamp"
            >
              <img
                src="/images/letter-stickers/wax-seal.png"
                alt="Wax Seal"
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>

          {/* ── 3. BINTANG MERAH DI SEKITAR BINGKAI FOTO (Pop-up Menggunakan Scale) ── */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.65, ease: easePop }}
            whileHover={{ scale: 1.15, rotate: 10, transition: { duration: 0.2 } }}
            className="absolute left-0 sm:left-2 top-[60%] -translate-y-1/2 z-30 w-12 sm:w-16 pointer-events-auto drop-shadow-xl select-none cursor-pointer"
            title="Red Embroidered Stars"
          >
            <img
              src="/images/letter-stickers/red-stars.png"
              alt="Red Stars"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: Stacked Paper Letter Sheets + Accents ── */}
        <div className="relative flex-1 w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl flex items-center justify-center">

          {/* ── STIKER KIRI ATAS: Karakter memegang buket bunga mawar merah ── */}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.5, ease: easeSoft }}
            whileHover={{ scale: 1.08, rotate: -3, transition: { duration: 0.2 } }}
            className="absolute -top-8 sm:-top-14 -left-2 sm:-left-6 z-35 w-[clamp(4rem,7vw,7.5rem)] pointer-events-auto select-none drop-shadow-2xl cursor-pointer"
            title="Cute Character with Flower Bouquet"
          >
            <img
              src="/images/letter-stickers/character-bouquet.png"
              alt="Character with Flowers"
              className="w-full h-auto"
            />
          </motion.div>

          {/* ── STIKER TENGAH ATAS: 3 Hati Pixel Merah ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.55, ease: easePop }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            className="absolute -top-4 sm:-top-7 left-1/2 -translate-x-1/2 z-35 w-[clamp(4.5rem,8vw,8rem)] pointer-events-auto select-none drop-shadow-lg cursor-pointer"
            title="Pixel Hearts"
          >
            <img
              src="/images/letter-stickers/pixel-hearts.png"
              alt="Pixel Hearts"
              className="w-full h-auto"
            />
          </motion.div>

          {/* ── STIKER KANAN ATAS: Disco Mirror Ball dengan Bintang Merah ── */}
          <motion.div
            initial={{ opacity: 0, y: -50, x: 30, scale: 0.8, rotate: 15 }}
            whileInView={{ opacity: 1, y: 0, x: 0, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.6, ease: easeSoft }}
            whileHover={{ scale: 1.08, rotate: 10, transition: { duration: 0.2 } }}
            className="absolute -top-8 sm:-top-12 -right-2 sm:-right-6 z-35 w-[clamp(4rem,7vw,7rem)] pointer-events-auto select-none drop-shadow-2xl cursor-pointer"
            title="Disco Ball with Red Stars"
          >
            <img
              src="/images/letter-stickers/disco-ball.png"
              alt="Disco Ball"
              className="w-full h-auto"
            />
          </motion.div>

          {/* Layer 3: Deepest Background Paper Sheet */}
          <div
            className="absolute -bottom-2 -right-1 sm:-right-3 left-2 top-3 rounded-[2px] pointer-events-none"
            style={{
              backgroundColor: "#EBDAC5",
              transform: "rotate(1.8deg)",
              boxShadow: "0 15px 35px rgba(53, 7, 16, 0.45)",
            }}
          />

          {/* Layer 2: Middle Paper Sheet */}
          <div
            className="absolute -bottom-1 -left-1 sm:-left-2 right-1 top-1.5 rounded-[2px] pointer-events-none"
            style={{
              backgroundColor: "#F7EEDF",
              transform: "rotate(-0.8deg)",
              boxShadow: "0 18px 40px rgba(53, 7, 16, 0.5)",
            }}
          />

          {/* ── Layer 1: Main Top Paper Sheet (Slide Up + Fade In) ── */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: -3, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeSoft }}
            className="relative z-20 rounded-[2px] px-[clamp(1rem,3vw,3.5rem)] py-[clamp(1rem,2.5dvh,2.5rem)] transition-shadow duration-300 border border-[#E9A0AA]/25 w-full flex flex-col justify-center"
            style={{
              backgroundColor: "#FFF9F0", // Ivory Paper
              boxShadow:
                "0 25px 60px rgba(53, 7, 16, 0.6), 0 10px 25px rgba(53, 7, 16, 0.35), 0 0 0 1px rgba(233, 160, 170, 0.15)",
            }}
          >
            {/* Judul Surat: Fade In dengan Sedikit Zoom */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: easeSoft }}
              className="text-[clamp(1.75rem,5.2dvh,4.5rem)] text-center tracking-normal mb-[clamp(0.15rem,0.8dvh,0.5rem)] font-normal leading-tight"
              style={{
                fontFamily: "'Alex Brush', 'Dancing Script', cursive",
                color: "#521321", // Deep burgundy text
                textShadow: "0 2px 6px rgba(82, 19, 33, 0.12)",
              }}
            >
              Dari aku untukmu
            </motion.h2>

            {/* Subjudul: Salutation */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: easeSoft }}
              className="text-center text-[clamp(10px,1.4dvh,14px)] font-medium tracking-wide mb-[clamp(0.4rem,1.4dvh,1.25rem)]"
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                color: "#E9A0AA", // Pink accent
              }}
            >
              happy birthday,  sweet heart
            </motion.p>

            {/* Isi Surat: Format Paragraf Melebar dengan Scroll Halus di Layar Kecil */}
            <div
              className="space-y-[clamp(0.35rem,1.2dvh,0.85rem)] text-center text-[clamp(11px,1.55dvh,14px)] leading-relaxed font-normal w-full max-w-3xl lg:max-w-4xl mx-auto max-h-[clamp(180px,46dvh,420px)] overflow-y-auto pr-1 sm:pr-2 scrollbar-thin"
              style={{ color: "#521321" }}
            >
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.7, ease: easeSoft }}
              >
                Selamat ulang tahun sayang. Hari ini adalah hari spesial karena seseorang yang begitu berarti lahir ke dunia. Aku berharap di umurmu yang ke 19 ini kamu selalu diberikan kebahagiaan, kesehatan, dan segala hal baik yang selama ini kamu impikan segera terwujud satu persatu.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.8, ease: easeSoft }}
              >
                Aku mungkin nggak selalu bisa memberikan hal-hal yang sempurna, tapi aku ingin kamu tahu kalau kehadiranmu adalah salah satu hal terindah yang pernah aku punya. Terima kasih sudah hadir, sudah menjadi dirimu sendiri, dan sudah memberikan banyak warna dalam hari-hariku.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.9, ease: easeSoft }}
              >
                Kalau suatu hari nanti kamu merasa lelah, merasa kurang, atau dunia terasa terlalu berat, ingatlah kalau kamu sangat berharga. Kamu pantas dicintai, dihargai, dan mendapatkan semua kebahagiaan yang ada di dunia ini.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 1.0, ease: easeSoft }}
              >
                Aku berharap bisa terus melihat senyummu, mendengar cerita-ceritamu, menemani hari-harimu, dan merayakan lebih banyak ulang tahun bersamamu. Jangan pernah merasa sendirian, ya. Aku akan selalu berharap yang terbaik untukmu.
              </motion.p>
            </div>

            {/* ── 8. KUE ULANG TAHUN (Di Kanan Bawah Surat) ── */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 40, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.7, ease: easeSoft }}
              whileHover={{ scale: 1.08, rotate: 4, transition: { duration: 0.2 } }}
              className="absolute -bottom-4 sm:-bottom-8 -right-2 sm:-right-6 z-30 w-[clamp(3.5rem,8vw,7.5rem)] pointer-events-auto select-none drop-shadow-xl cursor-pointer"
              title="Watercolor Birthday Cake"
            >
              <img
                src="/images/letter-stickers/birthday-cake.png"
                alt="Birthday Cake"
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
