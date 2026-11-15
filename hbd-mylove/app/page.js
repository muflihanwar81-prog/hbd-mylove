"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import OpeningSection from "@/components/OpeningSection";
import BirthdaySection from "@/components/BirthdaySection";
import MemoriesSection from "@/components/MemoriesSection";
import LetterSection from "@/components/LetterSection";
import ReasonsSection from "@/components/ReasonsSection";
import WishesSection from "@/components/WishesSection";
import FinaleSection from "@/components/FinaleSection";
import Navigation from "@/components/Navigation";
import MusicPlayer from "@/components/MusicPlayer";
import FloatingHearts from "@/components/FloatingHearts";
import SparkleStars from "@/components/SparkleStars";
import PhotoModal from "@/components/PhotoModal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleOpen = () => {
    setIsOpened(true);
    // Smooth scroll to birthday section
    setTimeout(() => {
      document.getElementById("birthday")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleRestart = () => {
    setIsOpened(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleClosePhoto = () => {
    setSelectedPhoto(null);
  };

  return (
    <main className="relative">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Background Effects */}
      {!isLoading && (
        <>
          <FloatingHearts />
          <SparkleStars />
        </>
      )}

      {/* Navigation - show only when opened */}
      {isOpened && !isLoading && <Navigation />}

      {/* Music Player - show only when opened */}
      {isOpened && !isLoading && <MusicPlayer />}

      {/* Opening Section */}
      {!isLoading && (
        <OpeningSection onOpen={handleOpen} isOpened={isOpened} />
      )}

      {/* Main Content - show only when opened */}
      {isOpened && !isLoading && (
        <>
          <BirthdaySection />
          <MemoriesSection onPhotoClick={handlePhotoClick} />
          <LetterSection />
          <ReasonsSection />
          <WishesSection />
          <FinaleSection onRestart={handleRestart} />
        </>
      )}

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={handleClosePhoto}
      />
    </main>
  );
}
