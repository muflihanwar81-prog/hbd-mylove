"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import SecretCodeSection from "@/components/SecretCodeSection";
import CountdownGateSection from "@/components/CountdownGateSection";
import OpeningSection from "@/components/OpeningSection";
import MemoriesSection from "@/components/MemoriesSection";
import GallerySection from "@/components/GallerySection";
import LetterSection from "@/components/LetterSection";
import WishesSection from "@/components/WishesSection";
import FinaleSection from "@/components/FinaleSection";
import Navigation from "@/components/Navigation";
import MusicPlayer from "@/components/MusicPlayer";
import FloatingHearts from "@/components/FloatingHearts";
import SparkleStars from "@/components/SparkleStars";
import PhotoModal from "@/components/PhotoModal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isBirthdayReached, setIsBirthdayReached] = useState(false);
  const [previewUnlocked, setPreviewUnlocked] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [musicTrigger, setMusicTrigger] = useState(false);

  const handleLoadingComplete = () => setIsLoading(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setMusicTrigger(true);

    // Audio triggered directly on user action
    try {
      const audioEl = document.getElementById("bg-music-player");
      if (audioEl && audioEl.paused) {
        audioEl.play().catch((e) => console.log("Audio play caught:", e));
      }
    } catch (e) {
      console.log("Audio trigger error:", e);
    }

    // Scroll to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isMainSiteActive = isUnlocked && (isBirthdayReached || previewUnlocked);

  return (
    <main className="relative min-h-screen bg-[#260814] text-[#FFF5F7]">
      {/* Background audio player - always mounted in DOM for autoplay reliability */}
      <MusicPlayer autoPlayTrigger={musicTrigger} visible={isUnlocked} />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Stage 1: Secret 6-Digit Code Gate */}
      <AnimatePresence mode="wait">
        {!isLoading && !isUnlocked && (
          <SecretCodeSection key="secret-gate" onUnlock={handleUnlock} />
        )}
      </AnimatePresence>

      {/* Stage 2: Minimalist Countdown Gate (Hanya angka putih di atas background biru dongker solid) */}
      {isUnlocked && !isMainSiteActive && (
        <CountdownGateSection
          onTimeReached={() => setIsBirthdayReached(true)}
          onPreviewUnlock={() => setPreviewUnlocked(true)}
        />
      )}

      {/* Floating Particles & Stars (aktif ketika beranda utama sudah terbuka) */}
      {isMainSiteActive && (
        <>
          <FloatingHearts />
          <SparkleStars />
        </>
      )}

      {/* Stage 3: Full Landing Page (aktif setelah 00:00 atau klik preview) */}
      {isMainSiteActive && (
        <>
          <Navigation />
          <div className="relative z-10 transition-opacity duration-700">
            <OpeningSection />
            <MemoriesSection onPhotoClick={setSelectedPhoto} />
            <GallerySection onPhotoClick={setSelectedPhoto} />
            <LetterSection />
            <WishesSection />
            <FinaleSection onRestart={handleRestart} />
          </div>
        </>
      )}

      {/* Lightbox Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </main>
  );
}
