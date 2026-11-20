"use client";

import { useState, useEffect } from "react";
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

  // Check URL params for direct inspection/testing
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("stage") === "countdown" || params.get("test") === "countdown") {
        setIsLoading(false);
        setIsUnlocked(true);
      }
    }
  }, []);

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
    <main className="relative min-h-screen bg-[#350B19] text-[#FFF5ED]">
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

      {/* Stage 2: Luxury Maroon & Red Wine 3D Gift Box & Countdown Gate */}
      {isUnlocked && !isMainSiteActive && (
        <CountdownGateSection
          onTimeReached={() => setIsBirthdayReached(true)}
          onPreviewUnlock={() => setPreviewUnlocked(true)}
        />
      )}

      {/* Floating Golden Dust Particles & Stars */}
      {isMainSiteActive && (
        <>
          <FloatingHearts />
          <SparkleStars />
        </>
      )}

      {/* Stage 3: Full Birthday Page (Cinematic Reveal) */}
      {isMainSiteActive && (
        <div className="relative z-10 animate-fade-in transition-opacity duration-1000">
          <OpeningSection />
          <MemoriesSection onPhotoClick={setSelectedPhoto} />
          <GallerySection onPhotoClick={setSelectedPhoto} />
          <LetterSection />
          <WishesSection />
          <FinaleSection onRestart={handleRestart} />
        </div>
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
