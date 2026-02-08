"use client";

import React, { useState } from 'react';
import {  Sparkles, } from 'lucide-react';
import confetti from 'canvas-confetti';
import Image from 'next/image';

interface QuestionPhaseProps {
  onYes: () => void;
}

// Typage strict pour la position du bouton
interface ButtonPosition {
  top: string;
  left: string;
  position: 'static' | 'fixed' | 'absolute' | 'relative';
}

const NO_TEXTS = [
  "Non", "Tu es sûre ?", "Vraiment ?", "Réfléchis bien...", "Dernière chance !",
  "Tu brises mon cœur 💔",
  "C'est ton dernier mot ?", "Tu n'as pas le choix "
];

const QuestionPhase: React.FC<QuestionPhaseProps> = ({ onYes }) => {
  const [noBtnPosition, setNoBtnPosition] = useState<ButtonPosition>({ 
    top: 'auto', 
    left: 'auto', 
    position: 'static' 
  });
  const [clickCount, setClickCount] = useState(0);

  const isFinalState = clickCount >= NO_TEXTS.length - 1;

  const handleNoInteraction = () => {
    if (isFinalState) return;
    setClickCount((prev) => prev + 1);
    
    // On retire un peu plus de marge pour éviter que le bouton ne sorte
    const maxX = typeof window !== 'undefined' ? window.innerWidth - 200 : 0;
    const maxY = typeof window !== 'undefined' ? window.innerHeight - 100 : 0;
    
    setNoBtnPosition({
      position: 'fixed',
      top: `${Math.max(20, Math.random() * maxY)}px`,
      left: `${Math.max(20, Math.random() * maxX)}px`,
    });
  };

  const handleYesClick = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    onYes();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#FFF5F7] p-4 text-center select-none">
      <div className="z-10 max-w-md w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-pink-100">
        
        {/* Correction Image : ajout de width, height et unoptimized */}
        <div className="flex justify-center mb-6">
          <Image 
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3h4N2loMW5sM3pnZnZ5cnIwM3plYjJ3ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif" 
            alt="Cute bear asking"
            width={192} 
            height={192}
            unoptimized
            className="w-48 h-48 object-contain"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-pink-600 mb-8 leading-tight">
          Veux-tu être ma Valentine ? <Sparkles className="inline text-yellow-400" />
        </h1>

        <div className="flex flex-col items-center gap-6 h-32 relative">
          <button
            onClick={handleYesClick}
            style={{ transform: `scale(${1 + clickCount * 0.15})` }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg z-30 transition-transform duration-200"
          >
            Oui ! 💖
          </button>

          <button
            onMouseEnter={handleNoInteraction}
            onClick={handleNoInteraction}
            style={{ 
              position: noBtnPosition.position,
              top: noBtnPosition.top,
              left: noBtnPosition.left,
              transition: 'all 0.2s ease'
            }}
            className="bg-rose-400 hover:bg-rose-500 text-white font-semibold py-2 px-6 rounded-full shadow-md whitespace-nowrap"
          >
            {NO_TEXTS[Math.min(clickCount, NO_TEXTS.length - 1)]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPhase;