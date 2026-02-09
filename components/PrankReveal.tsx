"use client";

import React, { useEffect, useState, useRef } from 'react';
import { RefreshCcw, Copy, Check } from 'lucide-react';

const LOADING_MESSAGES = [
  "Analyse du niveau de naïveté...",
  "Calcul du quotient amoureux...",
  "Vérification des antécédents...",
  "Génération d'une blague nulle...",
  "Rédaction du certificat..."
];

const PrankReveal: React.FC = () => {
  const [roast, setRoast] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingText, setLoadingText] = useState(LOADING_MESSAGES[0]);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1. Gestion des messages de chargement
    const messageInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = LOADING_MESSAGES.indexOf(prev);
        return LOADING_MESSAGES[(currentIndex + 1) % LOADING_MESSAGES.length];
      });
    }, 1500);

    // 2. Simulation ou appel du Roast (On peut mettre des phrases en dur ici)
    const timer = setTimeout(() => {
      setRoast("Félicitations ! Tu es officiellement la personne la plus naïve de ce début d'année. 🏆");
      setLoading(false);
      clearInterval(messageInterval);
    }, 4000);

    // 3. Tentative de lecture forcée pour Mobile
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("L'autoplay avec son a été bloqué par le navigateur, tentative en muet...", error);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, []);

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-start pt-10 px-4 text-center overflow-y-auto pb-10 select-none">
      

      <h1 className="text-4xl md:text-6xl font-black text-pink-600 mb-6 uppercase tracking-tighter">
       YAAA CELLE LA !!!!
      </h1>
      
      <div className="bg-white rounded-2xl p-4 shadow-xl mb-8 transform -rotate-2 border-4 border-pink-200 max-w-lg w-full">
         <p className="text-xl md:text-2xl text-gray-700 font-bold">
            Demain vient encore!
         </p>
      </div>

      {/* Video Container - Format compatible Mobile */}
      <div className="w-full max-w-3xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden mb-10 ring-8 ring-pink-300 ring-offset-4 ring-offset-rose-50 relative">
        <video 
            ref={videoRef}
            src="/jonny.mp4" 
            loop 
            playsInline // Indispensable pour iOS
            webkit-playsinline="true"
            className="w-full h-full object-cover pointer-events-none"
            disablePictureInPicture
        >
          Ton navigateur ne supporte pas la vidéo.
        </video>
        {/* Shield invisible pour empêcher la pause au toucher */}
        <div className="absolute inset-0 z-10 bg-transparent"></div>
      </div>

 

      <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-6 py-3 bg-white text-pink-600 rounded-full font-bold shadow-md hover:shadow-lg transition active:scale-95"
      >
          {copied ? <Check size={20} /> : <Copy size={20} />}
          {copied ? "Lien copié !" : "Piéger quelqu'un d'autre"}
      </button>
    </div>
  );
};

export default PrankReveal;